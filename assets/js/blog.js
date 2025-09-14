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

const blogList = document.getElementById('blog-list');
if (blogList) {
  posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <h3>${post.title}</h3>
      <p><em>${post.date}</em></p>
      <p>${post.excerpt}</p>
      <a href="posts/${post.id}.html" class="read-more">Read More →</a>
    `;
    blogList.appendChild(article);
  });
}
