// Toggle light/dark mode
document.getElementById('toggleMode').onclick = () => {
  document.body.classList.toggle('dark-mode');
};

// Basic search filter
document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const books = document.querySelectorAll('.book-card');
  books.forEach(book => {
    const title = book.querySelector('h3').textContent.toLowerCase();
    book.style.display = title.includes(query) ? 'block' : 'none';
  });
});
