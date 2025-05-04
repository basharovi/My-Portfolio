import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';
import { createClient } from 'redis';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const viewsFilePath = path.join(process.cwd(), 'content/blog-views.json');

// Redis connection state
let redisClient = null;
let isRedisAvailable = true;
const REDIS_TIMEOUT = 3000; // 3 seconds timeout

// Initialize Redis client
async function getRedisClient() {
  if (!isRedisAvailable) return null;
  
  if (redisClient) return redisClient;
  
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: REDIS_TIMEOUT
      }
    });
    
    redisClient.on('error', (err) => {
      console.error('Redis client error:', err);
      isRedisAvailable = false;
      if (redisClient) {
        redisClient.quit().catch(console.error);
        redisClient = null;
      }
    });

    await Promise.race([
      redisClient.connect(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Redis connection timeout')), REDIS_TIMEOUT)
      )
    ]);
    
    console.log('Redis connected successfully');
    return redisClient;
  } catch (error) {
    console.error('Redis connection failed:', error.message);
    isRedisAvailable = false;
    if (redisClient) {
      try {
        await redisClient.quit();
      } catch (e) {
        console.error('Error closing Redis client:', e);
      }
      redisClient = null;
    }
    return null;
  }
}

// Get views from JSON file
function getViewsFromFile() {
  try {
    if (!fs.existsSync(viewsFilePath)) {
      const dir = path.dirname(viewsFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(viewsFilePath, JSON.stringify({}), 'utf8');
      return {};
    }
    
    const fileContents = fs.readFileSync(viewsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading file views:', error);
    return null;
  }
}

// Save views to JSON file
function saveViewsToFile(views) {
  try {
    const dir = path.dirname(viewsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(viewsFilePath, JSON.stringify(views, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving views to file:', error);
    return false;
  }
}

// Cache to prevent duplicate increments
let viewIncrementCache = new Set();
setInterval(() => {
  viewIncrementCache = new Set();
}, 10 * 60 * 1000);

// Function to increment view count
export async function incrementPostViews(id) {
  // Prevent duplicate increments in same request
  const now = new Date();
  const cacheKey = `${id}:${now.getHours()}:${now.getMinutes()}`;
  if (viewIncrementCache.has(cacheKey)) {
    return getPostViews(id);
  }
  viewIncrementCache.add(cacheKey);
  
  // Try Redis first
  if (isRedisAvailable) {
    try {
      const client = await Promise.race([
        getRedisClient(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), REDIS_TIMEOUT))
      ]);
      
      if (client) {
        const count = await client.incr(`pageviews:${id}`);
        console.log(`View count for ${id} incremented to ${count} (Redis)`);
        return count;
      }
    } catch (error) {
      console.error('Redis increment failed:', error.message);
      isRedisAvailable = false;
    }
  }
  
  // Fallback to file
  try {
    const views = getViewsFromFile();
    if (views) {
      if (!views[id]) views[id] = 0;
      views[id]++;
      saveViewsToFile(views);
      console.log(`View count for ${id} incremented to ${views[id]} (File)`);
      return views[id];
    }
  } catch (error) {
    console.error('File increment failed:', error.message);
  }
  
  // Return null if both methods failed
  return null;
}

// Function to get view count
export const getPostViews = cache(async (id) => {
  // Try Redis first
  if (isRedisAvailable) {
    try {
      const client = await Promise.race([
        getRedisClient(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), REDIS_TIMEOUT))
      ]);
      
      if (client) {
        const views = await client.get(`pageviews:${id}`);
        if (views !== null) {
          return parseInt(views, 10);
        }
      }
    } catch (error) {
      console.error('Redis get failed:', error.message);
      isRedisAvailable = false;
    }
  }
  
  // Fallback to file
  try {
    const views = getViewsFromFile();
    if (views && views[id] !== undefined) {
      return views[id];
    }
  } catch (error) {
    console.error('File get failed:', error.message);
  }
  
  // Return null if both methods failed
  return null;
});

export async function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return []; 
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsDataPromises = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      return {
        id,
        ...(matterResult.data),
      };
    });
    
  try {
    const allPostsData = await Promise.all(allPostsDataPromises);
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error getting sorted posts data:', error);
    return [];
  }
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse the post metadata section
  const matterResult = matter(fileContents);

  // Convert markdown into HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Get view count with timeout
  let views = null;
  try {
    views = await Promise.race([
      getPostViews(id),
      new Promise((resolve) => setTimeout(() => resolve(null), REDIS_TIMEOUT))
    ]);
  } catch (error) {
    console.error(`Error getting views for post ${id}:`, error.message);
  }

  return {
    id,
    contentHtml,
    views,
    ...(matterResult.data),
  };
}