import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';
import { createClient } from 'redis';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const viewsFilePath = path.join(process.cwd(), 'content/blog-views.json');

// Redis connection state management
let redisClient = null;
let redisError = false;
let connectionAttempts = 0;
const MAX_CONNECTION_ATTEMPTS = 3;

// Timeout for Redis operations (5 seconds)
const REDIS_TIMEOUT = 5000;

// Initialize Redis client with proper error handling
async function getRedisClient() {
  // If we've already determined Redis is unavailable, don't try again
  if (redisError) {
    return null;
  }
  
  // If we already have a client, return it
  if (redisClient) {
    return redisClient;
  }

  // If we've exceeded max connection attempts, don't try anymore
  if (connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
    console.log(`Maximum Redis connection attempts (${MAX_CONNECTION_ATTEMPTS}) reached`);
    redisError = true;
    return null;
  }

  connectionAttempts++;
  console.log(`Redis connection attempt ${connectionAttempts}/${MAX_CONNECTION_ATTEMPTS}`);

  try {
    // Create client with timeout
    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: REDIS_TIMEOUT,
        reconnectStrategy: false // Disable automatic reconnection to avoid loops
      }
    });
    
    // Handle connection errors
    redisClient.on('error', (err) => {
      console.error('Redis client error:', err);
      if (redisClient) {
        redisClient.quit().catch(console.error);
        redisClient = null;
      }
    });

    // Connect with timeout
    const connectionPromise = redisClient.connect();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Redis connection timeout')), REDIS_TIMEOUT)
    );
    
    // Race connection against timeout
    await Promise.race([connectionPromise, timeoutPromise]);
    
    console.log('Redis connected successfully');
    return redisClient;
  } catch (error) {
    console.error(`Redis connection failed (attempt ${connectionAttempts}/${MAX_CONNECTION_ATTEMPTS}):`, error.message);
    
    // Clean up the failed client
    if (redisClient) {
      try {
        await redisClient.quit();
      } catch (e) {
        console.error('Error closing Redis client:', e);
      }
      redisClient = null;
    }
    
    // If we've reached max attempts, mark Redis as unavailable
    if (connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
      console.log('Maximum Redis connection attempts reached, falling back to disk');
      redisError = true;
    }
    
    return null;
  }
}

// Helper function to get/initialize views from disk
function getDiskViewsData() {
  try {
    if (!fs.existsSync(viewsFilePath)) {
      // Create the directory structure if it doesn't exist
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
    console.error('Error reading disk views data:', error);
    return null;
  }
}

// Helper function to save views to disk
function saveDiskViewsData(viewsData) {
  try {
    // Create the directory structure if it doesn't exist
    const dir = path.dirname(viewsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(viewsFilePath, JSON.stringify(viewsData, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving disk views data:', error);
    return false;
  }
}

// Simple in-memory request cache to prevent duplicate view counts in a single request
let viewIncrementCache = new Set();

// Reset cache every 10 minutes
setInterval(() => {
  viewIncrementCache = new Set();
}, 10 * 60 * 1000);

// Function to increment view count with timeout protection
export async function incrementPostViews(id) {
  // Use a cache key combining post ID and timestamp (minute precision)
  const now = new Date();
  const cacheKey = `${id}:${now.getHours()}:${now.getMinutes()}`;
  
  // Skip if this post was already incremented in this request cycle
  if (viewIncrementCache.has(cacheKey)) {
    console.log(`Skipping duplicate view increment for ${id}`);
    return getPostViews(id);
  }
  
  // Add to cache to prevent duplicates
  viewIncrementCache.add(cacheKey);
  
  // Try Redis with timeout protection
  if (!redisError) {
    try {
      const client = await Promise.race([
        getRedisClient(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Redis operation timeout')), REDIS_TIMEOUT)
        )
      ]);
      
      if (client) {
        const redisKey = `pageviews:${id}`;
        const newCount = await client.incr(redisKey);
        console.log(`Incremented view count for ${id} to ${newCount} (Redis)`);
        return newCount;
      }
    } catch (error) {
      console.error(`Redis increment failed for ${id}:`, error.message);
    }
  }
  
  // Fallback to disk
  try {
    const viewsData = getDiskViewsData();
    if (viewsData) {
      if (!viewsData[id]) {
        viewsData[id] = 0;
      }
      
      viewsData[id]++;
      saveDiskViewsData(viewsData);
      console.log(`Incremented view count for ${id} to ${viewsData[id]} (Disk)`);
      return viewsData[id];
    }
  } catch (error) {
    console.error(`Disk increment failed for ${id}:`, error.message);
  }
  
  // Return null if both methods failed
  return null;
}

// Function to get view count with timeout protection
export const getPostViews = cache(async (id) => {
  // Try Redis with timeout protection if not already marked as unavailable
  if (!redisError) {
    try {
      const client = await Promise.race([
        getRedisClient(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Redis operation timeout')), REDIS_TIMEOUT)
        )
      ]);
      
      if (client) {
        const redisKey = `pageviews:${id}`;
        const views = await client.get(redisKey);
        if (views !== null) {
          return parseInt(views, 10);
        }
      }
    } catch (error) {
      console.error(`Redis get failed for ${id}:`, error.message);
    }
  }
  
  // Fallback to disk
  try {
    const viewsData = getDiskViewsData();
    if (viewsData && viewsData[id] !== undefined) {
      return viewsData[id];
    }
  } catch (error) {
    console.error(`Disk get failed for ${id}:`, error.message);
  }
  
  // Return null if both methods failed
  return null;
});

export async function getSortedPostsData() {
  // Get file names under /content/blog
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return []; // Return empty array if directory was just created
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsDataPromises = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Ensure we only read markdown files
    .map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      
      // Get view count (with error handling)
      let views = null;
      try {
        views = await Promise.race([
          getPostViews(id),
          new Promise((resolve) => setTimeout(() => resolve(null), REDIS_TIMEOUT))
        ]);
      } catch (error) {
        console.error(`Error getting views for ${id}:`, error.message);
      }

      // Combine the data with the id
      return {
        id,
        views,
        ...(matterResult.data),
      };
    });
    
  try {
    // Resolve all promises with timeout
    const allPostsData = await Promise.all(allPostsDataPromises);
    
    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error getting sorted posts data:', error);
    return []; // Return empty array on error
  }
}

export function getAllPostIds() {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return []; // Return empty array if directory was just created
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

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
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

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    views,
    ...(matterResult.data),
  };
}

// Reset Redis state and client
export async function resetRedisConnection() {
  if (redisClient) {
    try {
      await redisClient.quit();
    } catch (error) {
      console.error('Error closing Redis connection:', error);
    }
  }
  redisClient = null;
  redisError = false;
  connectionAttempts = 0;
  console.log('Redis connection state reset');
}