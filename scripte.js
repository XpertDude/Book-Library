const addBook = document.getElementById('add-btn');
const inputForm = document.getElementById('input-form');
const bookContainer = document.getElementById('books-added');
const dialogInput = document.getElementById('books-inputs');
const closeBtn = document.getElementById('close-btn');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const numberOfPages = document.getElementById('number-of-pages');
const submitBook = document.getElementById('done-btn');
const updateBtn = document.getElementById('save-btn');
const discardBtn = document.getElementById('discard-btn');
let bookObj = {};  // Initially empty, will be populated from localStorage
let curBookId = null;

const bookObject = () => {
    return {
        id: `${bookTitle.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: bookTitle.value,
        author: bookAuthor.value,
        numberOfPages: numberOfPages.value
    };
}

// Utility function to save books to localStorage
const saveBooksToLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(bookObj));
}

// Utility function to load books from localStorage
const loadBooksFromLocalStorage = () => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        bookObj = JSON.parse(storedBooks);
        Object.keys(bookObj).forEach(id => {
            displayBook(bookObj[id]);
        });
    }
}


// Function to display a book in the book container
function displayBook(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('booksContainer');
    bookElement.id = book.id;
    bookElement.innerHTML = `
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.numberOfPages}</p>
        <div class='buttons'>
            <button id='edit-btn'>Edit</button>
            <button id='delete-btn'>Delete</button>
        </div>
    `;

    bookContainer.appendChild(bookElement);
    const editBtn = bookElement.querySelector('#edit-btn');
    const deleteBtn = bookElement.querySelector('#delete-btn');
    editBtn.addEventListener('click', () => updateBook(book.id));
    deleteBtn.addEventListener('click', () => deleteBook(book.id));
}

// Dialog open and close
function showDialog(e) {
    e.preventDefault();
    dialogInput.showModal();
    addBook.classList.add('hidden');
}

function closeDialog(e) {
    e.preventDefault();
    dialogInput.close();
    addBook.classList.remove('hidden');
}

addBook.addEventListener('click', showDialog);
closeBtn.addEventListener('click', closeDialog);

// Add book to the container
function addABook() {
    if (bookTitle.value === '' || bookAuthor.value === '' || numberOfPages.value === '' || isNaN(Number(numberOfPages.value))) {
        alert('Please provide valid inputs');
        return;
    } else {
        const book = bookObject();
        bookObj[book.id] = book;
        displayBook(book);
        saveBooksToLocalStorage();  // Save to localStorage after adding a book
        inputForm.reset();
        dialogInput.close();
        closeDialog(new Event('close'));
    }
}

submitBook.addEventListener('click', addABook);

// Function to update an existing book
function updateBook(bookId) {
    dialogInput.showModal();
    curBookId = bookId;
    const book = bookObj[bookId];
    bookTitle.value = book.title;
    bookAuthor.value = book.author;
    numberOfPages.value = book.numberOfPages;
    updateBtn.classList.remove('hidden');
    discardBtn.classList.remove('hidden');
    closeBtn.classList.add('hidden');
    submitBook.classList.add('hidden');
}

const updatedBook = () => {
    const book = bookObj[curBookId];
    book.title = bookTitle.value;
    book.author = bookAuthor.value;
    book.numberOfPages = numberOfPages.value;
    const bookElement = document.getElementById(curBookId);
    bookElement.innerHTML = `
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.numberOfPages}</p>
        <div class='buttons'><button id='edit-btn' onclick='updateBook("${book.id}")'>Edit</button>
        <button id='delete-btn' onclick='deleteBook("${book.id}")'>Delete</button></div>
    `;
    saveBooksToLocalStorage();  // Save to localStorage after updating a book
    dialogInput.close();
    updateBtn.classList.add('hidden');
    discardBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');
    submitBook.classList.remove('hidden');
}

discardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputForm.reset();
    dialogInput.close();
    addBook.classList.remove('hidden');
});

updateBtn.addEventListener('click', updatedBook);

// Function to delete a book
function deleteBook(id) {
    const bookElement = document.getElementById(id);
    bookContainer.removeChild(bookElement);
    delete bookObj[id];
    saveBooksToLocalStorage();  // Save to localStorage after deleting a book
}

// Load books from localStorage when the page loads
window.addEventListener('load', loadBooksFromLocalStorage);

// Set the desired maximum length (number of digits)
const maxLength = 7;

// Add an event listener to monitor input changes
numberOfPages.addEventListener('input', function() {
    let value = this.value.toString();
    if (value.length > maxLength) {
        this.value = value.slice(0, maxLength);
    }
});
