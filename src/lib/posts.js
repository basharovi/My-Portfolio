import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const viewsFilePath = path.join(process.cwd(), 'content/blog-views.json');

// Simple in-memory request cache to prevent duplicate view counts in a single request
// This prevents multiple increments during SSR/RSC rendering in Next.js
let viewIncrementCache = new Set();

// Reset cache every 10 minutes to handle long-running server instances
setInterval(() => {
  viewIncrementCache = new Set();
}, 10 * 60 * 1000);

// Helper function to get/initialize the views data
function getViewsData() {
  if (!fs.existsSync(viewsFilePath)) {
    fs.writeFileSync(viewsFilePath, JSON.stringify({}), 'utf8');
    return {};
  }
  
  try {
    const fileContents = fs.readFileSync(viewsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading views data:', error);
    return {};
  }
}

// Helper function to save views data
function saveViewsData(viewsData) {
  fs.writeFileSync(viewsFilePath, JSON.stringify(viewsData, null, 2), 'utf8');
}

// Function to increment view count for a post
export function incrementPostViews(id) {
  // Use a cache key combining post ID and timestamp (minute precision)
  // This prevents multiple increments in the same minute
  const now = new Date();
  const cacheKey = `${id}:${now.getHours()}:${now.getMinutes()}`;
  
  // Skip if this post was already incremented in this request cycle
  if (viewIncrementCache.has(cacheKey)) {
    console.log(`Skipping duplicate view increment for ${id}`);
    // Return current view count without incrementing
    return getPostViews(id);
  }
  
  // Add to cache to prevent duplicates
  viewIncrementCache.add(cacheKey);
  
  const viewsData = getViewsData();
  
  if (!viewsData[id]) {
    viewsData[id] = 0;
  }
  
  viewsData[id]++;
  saveViewsData(viewsData);
  
  console.log(`Incremented view count for ${id} to ${viewsData[id]}`);
  return viewsData[id];
}

// Function to get view count for a post - wrapped with React cache()
export const getPostViews = cache((id) => {
  const viewsData = getViewsData();
  return viewsData[id] || 0;
});

export function getSortedPostsData() {
  // Get file names under /content/blog
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return []; // Return empty array if directory was just created
  }
  
  const viewsData = getViewsData();
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Ensure we only read markdown files
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Add view count
      const views = viewsData[id] || 0;

      // Combine the data with the id
      return {
        id,
        views,
        ...(matterResult.data),
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
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

  // Get view count
  const views = getPostViews(id);

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    views,
    ...(matterResult.data),
  };
}