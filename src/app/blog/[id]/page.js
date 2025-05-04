import { getAllPostIds, getPostData, getSortedPostsData, incrementPostViews } from '@/lib/posts';
import { FiCalendar, FiUser, FiArrowLeft, FiEye } from 'react-icons/fi';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

// This function generates the possible paths for all blog posts at build time
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// Server action to increment view counter
async function incrementViews(id) {
  'use server';
  try {
    // Add timeout to prevent hanging
    const incrementPromise = incrementPostViews(id);
    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 5000));
    await Promise.race([incrementPromise, timeoutPromise]);
    revalidatePath(`/blog/${id}`);
  } catch (error) {
    console.error(`Server action error incrementing views for ${id}:`, error);
    // Continue despite errors
  }
}

// This function fetches the data for a specific post
async function getPost(params) {
  // Check if params is an object with id property or if it's the id string directly
  const id = params?.id || params;
  const postData = await getPostData(id);
  
  // Increment view count server-side (only once)
  // This will run only on initial page load, not on metadata generation
  if (params?.incrementView !== false) {
    try {
      // Add timeout to prevent hanging
      const incrementPromise = incrementPostViews(id);
      const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 5000));
      await Promise.race([incrementPromise, timeoutPromise]);
    } catch (error) {
      console.error(`Error incrementing views for ${id}:`, error);
      // Continue despite view count error
    }
  }
  
  return postData;
}

// The main component for displaying a single post
export default async function Post({ params }) {
  const postData = await getPost(params);

  // Fetch all posts to find related ones if needed
  let relatedPosts = [];
  if (postData.related && Array.isArray(postData.related) && postData.related.length > 0) {
    try {
      // Add timeout to prevent hanging
      const postsPromise = getSortedPostsData();
      const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve([]), 5000));
      const allPosts = await Promise.race([postsPromise, timeoutPromise]);
      
      relatedPosts = allPosts.filter(
        (post) => postData.related.includes(post.id) && post.id !== postData.id
      );
    } catch (error) {
      console.error('Error fetching related posts:', error);
      // Continue with empty related posts
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 pt-16">
      <div className="container mx-auto px-2 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Blog
        </Link>
        
        <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 md:p-6">
          {/* Post Header */}
          <header className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {postData.title}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              {postData.date && (
                <div className="flex items-center">
                  <FiCalendar className="mr-2 flex-shrink-0" />
                  <span>{new Date(postData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
              {postData.author && (
                <div className="flex items-center">
                  <FiUser className="mr-2 flex-shrink-0" />
                  <span>By {postData.author}</span>
                </div>
              )}
              {/* View Counter - only show when view data is available */}
              {postData.views !== null && (
                <div className="flex items-center">
                  <FiEye className="mr-2 flex-shrink-0 animate-pulse" />
                  <span>{postData.views} views</span>
                </div>
              )}
            </div>
          </header>

          {/* Post Content - Rendered from HTML */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />

          {/* Related Blogs Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Related Blogs</h2>
              <ul className="space-y-2">
                {relatedPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Back to Blog Link */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

// Optional: Add metadata generation for SEO
export async function generateMetadata({ params }) {
  try {
    // Add timeout to prevent hanging
    const postPromise = getPost({ ...params, incrementView: false });
    const timeoutPromise = new Promise((resolve) => 
      setTimeout(() => resolve({
        title: "Blog Post",
        description: "Loading blog post..."
      }), 5000)
    );
    
    // Pass flag to avoid incrementing view count during metadata generation
    const postData = await Promise.race([postPromise, timeoutPromise]);
    
    // If we got a timeout result with no title, return default metadata
    if (!postData.title) {
      return {
        title: "Blog Post | Bashar Ovi's Blog",
        description: "Loading blog post content..."
      };
    }
    
    // Use excerpt or generate a default description if excerpt is missing
    const description = postData.excerpt || `Read the blog post titled "${postData.title}" by ${postData.author || 'Bashar Ovi'}.`;
    
    // Construct the canonical URL for the post
    const url = `https://basharovi.vercel.app/blog/${params?.id}`; // Fixed potential undefined issue
    
    // Use thumbnail or a default image if thumbnail is missing
    // LinkedIn requires absolute URLs for images
    const imageUrl = postData.thumbnail 
      ? `https://basharovi.vercel.app${postData.thumbnail}` 
      : `https://basharovi.vercel.app/images/blog-thumbnail.jpg`; 

    return {
      title: `${postData.title} | Bashar Ovi's Blog`,
      description: description,
      authors: postData.author ? [{ name: postData.author }] : [{ name: "Bashar Ovi" }],
      keywords: postData.keywords || "blog, software engineering, C#, .NET",
      
      openGraph: {
        title: postData.title,
        description: description,
        url: url,
        siteName: `Bashar Ovi's Blog`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: postData.title,
            type: "image/jpg", // Add explicit image type for LinkedIn
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: postData.date,
        authors: postData.author ? [postData.author] : ["Bashar Ovi"],
        // Add these LinkedIn-specific properties
        "article:published_time": postData.date,
        "article:author": postData.author || "Bashar Ovi",
      },
      
      // Keep twitter metadata if needed
      twitter: {
        card: 'summary_large_image',
        title: postData.title,
        description: description,
        images: [imageUrl],
        creator: '@basharovi',
      },
      
      alternates: {
        canonical: url,
      },
      
      // Add these specific meta tags that LinkedIn sometimes looks for
      other: {
        'og:title': postData.title,
        'og:description': description,
        'og:image': imageUrl,
        'og:url': url,
        'og:type': 'article',
        'og:site_name': `Bashar Ovi's Blog`,
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return fallback metadata
    return {
      title: "Blog Post | Bashar Ovi's Blog",
      description: "Loading blog post content..."
    };
  }
}