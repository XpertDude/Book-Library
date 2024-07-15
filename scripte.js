const inputForm = document.getElementById('input-form');
const addBtn = document.getElementById('add-btn');
const booksInputs = document.getElementById('books-inputs');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const titleValue = document.getElementById('title');
const authorValue = document.getElementById('author');
const numberOfPages = document.getElementById('number-of-pages');
const booksAdded = document.getElementById('books-added');
const saveBtn = document.getElementById('save-btn');
const discardBtn = document.getElementById('discard-btn');
const deleteBtn = document.getElementById('delete-btn');
const errorMessage = document.getElementById('error-message');
const theMessage = document.getElementById('message');
const okBtn = document.getElementById('ok-btn');
const myBooks = {};
let curBookId = null;

function showDialog(dialog) {
    dialog.style.display = 'block';
    setTimeout(() => {
        dialog.showModal();
    }, 0);
}

addBtn.addEventListener('click', () => {
    showDialog(booksInputs);
    addBtn.classList.toggle('hidden');
});


function createBookObject() {
    return {
        id: `${titleValue.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleValue.value,
        author: authorValue.value,
        numberOfPages: numberOfPages.value
    };
}

function addBook(book) {
    myBooks[book.id] = book;
    if (titleValue.value === '' || authorValue.value === '' || numberOfPages.value === '' || isNaN(Number(numberOfPages.value))) {
     showDialog(errorMessage);
     theMessage.innerHTML = 'Please provide a valid inputs'
    }else { 
     const bookElement = document.createElement('div');
     bookElement.id = book.id;
              bookElement.innerHTML = `
             <p><strong>Title:</strong> ${book.title}</p>
             <p><strong>Author:</strong> ${book.author}</p>
             <p><strong>Pages:</strong> ${book.numberOfPages}</p>
             <div class='buttons'><button id='edit-btn' onclick='updateBook("${book.id}")'>Edit</button>
             <button id='delete-btn' onclick='deleteBook("${book.id}")'>Delete</button></div>
         `;
     booksAdded.appendChild(bookElement);
     booksAdded.classList.remove('hidden'); // Remove the 'hidden' class
    }
};


okBtn.addEventListener('click', () => {
 booksInputs.showModal();
 errorMessage.close();
 addBtn.classList.toggle('hidden');
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newBook = createBookObject();
    addBook(newBook);
    booksInputs.close();
    addBtn.classList.toggle('hidden');
    inputForm.reset();
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    booksInputs.close();
    addBtn.classList.toggle('hidden');
    inputForm.reset();
});

const updateBook = (bookId) => {
    booksInputs.showModal();
    curBookId = bookId; // Set the global curBookId
    const book = myBooks[bookId];
    titleValue.value = book.title;
    authorValue.value = book.author;
    numberOfPages.value = book.numberOfPages;
    submitBtn.classList.add('hidden');
    cancelBtn.classList.add('hidden');
    saveBtn.classList.remove('hidden');
    discardBtn.classList.remove('hidden');
};

const updatedBook = () => {
    const book = myBooks[curBookId];
    book.title = titleValue.value;
    book.author = authorValue.value;
    book.numberOfPages = numberOfPages.value;
    const bookElement = document.getElementById(curBookId);
    bookElement.innerHTML = `
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.numberOfPages}</p>
        <div class='buttons'><button id='edit-btn' onclick='updateBook("${book.id}")'>Edit</button>
        <button id='delete-btn' onclick='deleteBook("${book.id}")'>Delete</button><div>
    `;

    booksInputs.close();
    saveBtn.classList.add('hidden');
    discardBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    cancelBtn.classList.remove('hidden');
    addBtn.classList.remove('hidden');
    inputForm.reset();
};

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updatedBook();
});

discardBtn.addEventListener('click', (e) => {
 e.preventDefault();
 booksInputs.close();
})

const deleteBook = (ele) => {
 if (ele) {
  delete myBooks[ele];
 } else {
  return;
 }
 const bookElement = document.getElementById(ele);
 if (bookElement) {
  bookElement.remove();
 } else {
  return;
 }
};