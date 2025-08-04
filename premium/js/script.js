const books = [
  { title: "Atomic Habits", file: "books/AtomicHabits.pdf" },
  { title: "Rich Dad Poor Dad", file: "books/RichDadPoorDad.pdf" }
];

const bookList = document.getElementById('book-list');
const viewer = document.getElementById('book-viewer');
const pdfFrame = document.getElementById('pdfFrame');
const globalSearch = document.getElementById('globalSearch');

books.forEach(book => {
  const div = document.createElement('div');
  div.className = 'book-item';
  div.textContent = book.title;
  div.onclick = () => openBook(book);
  bookList.appendChild(div);
});

function openBook(book) {
  pdfFrame.src = book.file;
  viewer.classList.remove('hidden');
  bookList.style.display = 'none';
}

function closeViewer() {
  pdfFrame.src = '';
  viewer.classList.add('hidden');
  bookList.style.display = 'grid';
}

function downloadCurrentBook() {
  const link = document.createElement('a');
  link.href = pdfFrame.src;
  link.download = pdfFrame.src.split('/').pop();
  link.click();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

globalSearch.oninput = function () {
  const query = this.value.toLowerCase();
  const items = document.querySelectorAll('.book-item');
  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
};
