import Link from 'next/link';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { getSortedPostsData } from '@/lib/posts';

export default async function BlogPage() {
  // Fetch data directly in the Server Component
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-24 pt-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Blog
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPostsData && allPostsData.length > 0 ? (
            allPostsData.map(({ id, date, title, author, excerpt, thumbnail }, index) => (
              <article
                key={id}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail */}
                {thumbnail && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                {/* Post Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {date && (
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 flex-shrink-0" />
                        <span>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    )}
                    {author && (
                      <div className="flex items-center">
                        <FiUser className="mr-2 flex-shrink-0" />
                        <span>{author}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/blog/${id}`}>
                      {title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {excerpt && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                      {excerpt}
                    </p>
                  )}

                  {/* Read More Link */}
                  <div className="mt-auto">
                     <Link
                        href={`/blog/${id}`}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline group"
                     >
                        Read More <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                     </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No blog posts found. Create your first post in the content/blog directory.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}