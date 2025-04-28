'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiUser, FiTag, FiShare2 } from 'react-icons/fi';

// Sample blog posts data - in a real app, this would come from a database or API
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2023',
    excerpt: 'Explore the emerging technologies and practices that are shaping the future of web development, from AI-powered tools to serverless architectures.',
    content: `
      <p>Web development continues to evolve at a rapid pace, with new technologies and methodologies emerging constantly. As we move through 2023, several key trends are shaping the way developers build and maintain web applications.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Artificial intelligence is revolutionizing the development process itself. AI-powered code completion tools can now suggest entire functions and blocks of code, helping developers work more efficiently. These tools analyze patterns in existing codebases and learn from developer behaviors to provide increasingly accurate suggestions.</p>
      
      <h2>Serverless Architecture</h2>
      <p>Serverless computing continues to gain popularity as it allows developers to build and run applications without thinking about servers. This approach reduces infrastructure management overhead and can lead to cost savings, as you only pay for the compute resources you actually use.</p>
      
      <h2>Web Assembly (WASM)</h2>
      <p>WebAssembly is enabling high-performance applications on the web. It allows code written in languages like C, C++, and Rust to run in the browser at near-native speed. This technology is opening up new possibilities for web applications, including games, video editing tools, and other compute-intensive tasks traditionally reserved for desktop applications.</p>
      
      <h2>Progressive Web Apps (PWAs)</h2>
      <p>Progressive Web Apps continue to bridge the gap between web and mobile experiences. They offer offline capabilities, push notifications, and can be installed on a user's home screen, providing an app-like experience without requiring users to visit an app store.</p>
    `,
    date: 'June 15, 2023',
    author: 'John Doe',
    category: 'Web Development',
    image: '/images/blog/web-dev-trends.jpg',
    tags: ['Web Development', 'JavaScript', 'AI', 'Serverless', 'WebAssembly', 'PWA']
  },
  {
    id: 2,
    title: 'Mastering CSS Grid: A Comprehensive Guide',
    excerpt: 'Learn how to create complex layouts with CSS Grid, the powerful layout system that makes designing web pages more intuitive and flexible.',
    content: `
      <p>CSS Grid Layout is a two-dimensional layout system designed specifically for the web. It allows you to organize content into rows and columns and has transformed how we design websites.</p>
      
      <h2>Getting Started with CSS Grid</h2>
      <p>To create a grid layout, you first need to set the display property of a container element to "grid". This makes all its direct children become grid items.</p>
      <pre><code>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
      </code></pre>
      
      <h2>Defining Grid Columns and Rows</h2>
      <p>Once you've created a grid container, you can define your columns and rows using the grid-template-columns and grid-template-rows properties. The fr unit is particularly useful, representing a fraction of the available space.</p>
      
      <h2>Placing Items on the Grid</h2>
      <p>Grid items can be precisely placed using properties like grid-column and grid-row, which determine which grid lines an item starts and ends at.</p>
      <pre><code>
.item {
  grid-column: 1 / 3; /* Start at line 1, end at line 3 */
  grid-row: 2 / 4;    /* Start at line 2, end at line 4 */
}
      </code></pre>
      
      <h2>Creating Complex Layouts</h2>
      <p>CSS Grid excels at creating complex layouts that would be difficult with other CSS layout methods. You can create asymmetrical layouts, overlap items, and create responsive designs that adapt to different screen sizes.</p>
    `,
    date: 'May 22, 2023',
    author: 'Jane Smith',
    category: 'CSS',
    image: '/images/blog/css-grid.jpg',
    tags: ['CSS', 'Web Design', 'Layout', 'Responsive Design']
  },
  {
    id: 3,
    title: 'Performance Optimization Tips for React Applications',
    excerpt: 'Discover practical strategies to improve the performance of your React applications, from code splitting to memoization techniques.',
    content: `
      <p>Performance is crucial for providing a good user experience. In React applications, there are several optimization techniques you can apply to ensure your app runs smoothly.</p>
      
      <h2>Code Splitting</h2>
      <p>Large React applications often include a lot of code that isn't necessary for the initial render. Code splitting allows you to "lazy load" just the things that are currently needed by the user, which helps to reduce the initial load time of your app.</p>
      <pre><code>
const ProfilePage = React.lazy(() => import('./ProfilePage'));

function MyApp() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <ProfilePage />
    </React.Suspense>
  );
}
      </code></pre>
      
      <h2>Memoization with React.memo, useMemo, and useCallback</h2>
      <p>Memoization is a technique that helps prevent unnecessary re-renders by "remembering" the result of expensive function calls and returning the cached result when the same inputs occur again.</p>
      <pre><code>
// React.memo prevents re-renders if props don't change
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});

// useMemo memoizes expensive calculations
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback memoizes callback functions
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
      </code></pre>
      
      <h2>Using the Virtual DOM Efficiently</h2>
      <p>React's Virtual DOM helps optimize rendering performance, but you should still be mindful of how your components update. Use tools like the React DevTools Profiler to identify unnecessary re-renders and optimize your component structure accordingly.</p>
      
      <h2>Optimizing Images and Other Assets</h2>
      <p>Images and other assets can significantly impact your application's performance. Use proper image formats, consider lazy loading images, and optimize your asset loading strategy to improve overall performance.</p>
    `,
    date: 'April 10, 2023',
    author: 'John Doe',
    category: 'React',
    image: '/images/blog/react-performance.jpg',
    tags: ['React', 'Performance', 'JavaScript', 'Optimization']
  },
  {
    id: 4,
    title: 'Building Accessible Web Applications: A Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of web accessibility and how to ensure your applications are usable by people of all abilities.',
    content: `
      <p>Web accessibility ensures that websites and applications are usable by people of all abilities and disabilities. This is not only a moral imperative but often a legal requirement.</p>
      
      <h2>Understanding WCAG</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for making web content more accessible. These guidelines are organized around four principles: Perceivable, Operable, Understandable, and Robust (POUR).</p>
      
      <h2>Semantic HTML</h2>
      <p>Using proper HTML elements for their intended purpose is the first step in building accessible websites. Semantic HTML helps screen readers and other assistive technologies understand the structure and meaning of your content.</p>
      <pre><code>
<!-- Instead of this -->
<div class="header">Welcome to My Site</div>

<!-- Use this -->
<h1>Welcome to My Site</h1>
      </code></pre>
      
      <h2>Focus Management</h2>
      <p>Ensuring that your application can be navigated with a keyboard alone is essential for accessibility. This involves managing focus properly, especially in interactive components like modals, dropdowns, and custom widgets.</p>
      
      <h2>ARIA Attributes</h2>
      <p>Accessible Rich Internet Applications (ARIA) attributes can enhance accessibility when semantic HTML isn't sufficient. However, it's important to use ARIA judiciously and test thoroughly with assistive technologies.</p>
      <pre><code>
<button 
  aria-expanded="false" 
  aria-controls="menu-dropdown">
  Open Menu
</button>
<div 
  id="menu-dropdown" 
  role="menu" 
  hidden>
  <!-- Menu items -->
</div>
      </code></pre>
      
      <h2>Testing for Accessibility</h2>
      <p>Accessibility testing should be integrated into your development process. Use tools like axe, WAVE, or Lighthouse for automated testing, but remember that manual testing with keyboard navigation and screen readers is equally important.</p>
    `,
    date: 'March 5, 2023',
    author: 'Sarah Johnson',
    category: 'Accessibility',
    image: '/images/blog/accessibility.jpg',
    tags: ['Accessibility', 'WCAG', 'HTML', 'ARIA', 'UX']
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (params.id) {
      try {
        const postId = parseInt(params.id);
        const foundPost = blogPosts.find(post => post.id === postId);
        
        if (foundPost) {
          setPost(foundPost);
        }
      } catch (error) {
        console.error("Error parsing post ID:", error);
      }
      
      setIsLoading(false);
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Post Not Found</h1>
          <p className="mb-6">Sorry, the blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Blog
        </Link>
        
        {/* Article Header */}
        <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          {/* Featured Image */}
          <div className="h-64 md:h-80 bg-gray-200 dark:bg-gray-700 relative">
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-medium">
              {post.category} - Featured Image
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <FiTag className="mr-2" />
                <span>{post.category}</span>
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
            
            {/* Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
              <h3 className="font-medium mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Share */}
            <div className="mt-8">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FiShare2 />
                Share this article
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 