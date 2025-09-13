/**
 * @file blog.js
 * Handles fetching and displaying blog posts on the page.
 * Best practice is to wait for the DOM to be fully loaded before running the script.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- DATA ---
  // In a real-world application, this data would likely be fetched from a
  // separate JSON file or an API endpoint, not hardcoded in the script.
  const posts = [
    {
      id: "post1",
      title: "First Post",
      date: "September 13, 2025",
      excerpt: "This is my first blog entry. I’ll share updates, ideas, and learnings here."
    },
    {
      id: "post2",
      title: "Second Post",
      date: "September 14, 2025",
      excerpt: "Some thoughts on web development and personal projects."
    }
  ];

  // --- RENDER FUNCTION ---

  /**
   * Creates an HTML article element for a single blog post.
   * This function encapsulates the presentation logic for a post.
   * @param {object} post - The post object containing id, title, date, and excerpt.
   * @returns {HTMLElement} The generated article element.
   */
  const createPostElement = (post) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <h3>${post.title}</h3>
      <p><em>${post.date}</em></p>
      <p>${post.excerpt}</p>
      <a href="posts/${post.id}.html" class="read-more">Read More →</a>
    `;
    return article;
  };

  // --- MAIN EXECUTION ---

  /**
   * Finds the blog list container and populates it with posts.
   */
  const displayBlogPosts = () => {
    const blogListContainer = document.getElementById('blog-list');
    
    // Defensive check: only proceed if the container element exists on the page.
    if (!blogListContainer) {
      console.warn('Blog list container with id "blog-list" not found.');
      return;
    }
    
    // Use a DocumentFragment for performance. It minimizes DOM reflows
    // by appending all elements to the fragment first, then appending the
    // fragment to the DOM in a single operation.
    const fragment = document.createDocumentFragment();
    posts.forEach(post => {
      const postElement = createPostElement(post);
      fragment.appendChild(postElement);
    });

    blogListContainer.appendChild(fragment);
  };

  // Initialize the blog display.
  displayBlogPosts();
});
