import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/posts';
import { FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

// This function generates the possible paths for all blog posts at build time
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// This function fetches the data for a specific post
async function getPost(params) {
  const postData = await getPostData(params.id);
  return postData;
}

// The main component for displaying a single post
export default async function Post({ params }) {
  const postData = await getPost(params);

  // Fetch all posts to find related ones if needed
  let relatedPosts = [];
  if (postData.related && Array.isArray(postData.related) && postData.related.length > 0) {
    const allPosts = getSortedPostsData();
    relatedPosts = allPosts.filter(
      (post) => postData.related.includes(post.id) && post.id !== postData.id
    );
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
  const postData = await getPost(params);
  return {
    title: postData.title,
    description: postData.excerpt || `Read the blog post titled "${postData.title}"`,
  };
}