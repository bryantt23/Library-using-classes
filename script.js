let myLibrary = [];

class Book {
  // the constructor...
  constructor(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

const myLibraryDefault = [
  new Book('Jurassic Park', 'Michael Crichton'),
  new Book('Jane Eyre', 'Charlotte Bronte', true)
];

const addNewBookForm = document.querySelector('#add-book-form');
const addNewBookButton = document.querySelector('#add-new-book');
const cancelAddingNewBookButton = document.querySelector(
  '#cancel-adding-new-book'
);
const addBookButton = document.querySelector('#add-book');

addNewBookButton.addEventListener('click', () => {
  addNewBookForm.style = 'visibility:visible';
  cancelAddingNewBookButton.style = 'visibility:visible';
  addNewBookButton.style = 'visibility:hidden';
});

cancelAddingNewBookButton.addEventListener('click', e => {
  e.preventDefault();
  addNewBookForm.style = 'visibility:hidden';
  cancelAddingNewBookButton.style = 'visibility:hidden';
  addNewBookButton.style = 'visibility:visible';
});

addBookButton.addEventListener('click', e => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  if (title !== '' && author !== '') {
    addBookToLibrary(new Book(title, author));
    showBooksOnPage();
  }
});

//stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('remove')) {
    //do something
    const index = Number(
      e.target.parentNode.firstChild.getAttribute('data-index')
    );
    myLibrary.splice(index, index + 1);
  }
  if (e.target && e.target.classList.contains('read-status')) {
    //do something
    const index = Number(
      e.target.parentNode.firstChild.getAttribute('data-index')
    );
    const book = myLibrary[index];
    book.read = !book.read;
  }
  showBooksOnPage();
});

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

function showBooksOnPage() {
  updateLocalStorage();
  const allBooks = document.querySelector('#all-books');
  if (allBooks.hasChildNodes()) {
    while (allBooks.firstChild) {
      allBooks.removeChild(allBooks.firstChild);
    }
  }

  myLibrary.forEach((book, index) => {
    const p = document.createElement('p');
    p.innerHTML = `<p data-index=${index}><em>${book.title}</em> by ${
      book.author
    }</p>
    <button class="remove">Remove</button>
    <button class="read-status">${book.read ? 'Read' : 'Unread'}</button>
    `;
    allBooks.appendChild(p);
  });
}

function updateLocalStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function init() {
  const localStorageLibrary = localStorage.getItem('library');
  if (localStorageLibrary) {
    myLibrary = JSON.parse(localStorageLibrary);
  } else {
    myLibrary = myLibraryDefault;
  }
  showBooksOnPage();
  addNewBookButton.click();
}

// window.onload = function () {
init();
// };
