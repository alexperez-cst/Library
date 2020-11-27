let buttonBook;
const library = document.querySelector('#library');

const arrayOfBooks = (() => {
	if (localStorage.length === 0) {
		return [];
	}
	displayBooks();
	updateButtonBook();
	return JSON.parse(localStorage.getItem('list'));
})();
const addBookToLibrary = (() => {
	return () => {
		const book = new Book();
		addBookToLocal(book);
		const newBook = createBookHTML(
			book.bookName,
			book.authorName,
			book.pages,
			book.isReaded
		);
		unsetFormulary();
		library.appendChild(newBook);
		updateButtonBook();
	};
})();
const newBook = document.querySelector('#button');
const formulary = document.querySelector('#formBase');
newBook.addEventListener('click', () => {
	formulary.style.display = 'block';
});
function Book() {
	this.bookName = getFormularyValue('#bookName');
	this.authorName = getFormularyValue('#authorName');
	this.pages = getFormularyValue('#pagesNum');
	this.isReaded =
		getFormularyValue("input[name = 'readed']:checked") === 'true'
			? true
			: false;
}
function getFormularyValue(formName) {
	return document.querySelector(formName).value;
}
function updateButtonBook(){
	buttonBook = document.querySelectorAll('.buttonBook');
	buttonBook.forEach((button) => {
		button.addEventListener('click', changeReaded);
	});
}
function displayBooks() {
	const parsedJSON = JSON.parse(localStorage.getItem('list'));
	for(const obj of parsedJSON){
		const newBook = createBookHTML(obj.bookName,obj.authorName,obj.pages,obj.isReaded);
		library.appendChild(newBook);
		updateButtonBook();
	}
}
function addBookToLocal(book) {
	arrayOfBooks.push(book);
	localStorage.setItem('list', JSON.stringify(arrayOfBooks));
}
function createBookHTML(bookName, authorName, pages, isReaded, index) {
	const newHTMLBook = document.createElement('div');
	newHTMLBook.innerHTML += `<div class='book'>	<div id='bookTitle'>✨${bookName}✨</div> <div id='author'><u>${authorName}</u></div>	<div id='pages'>•${pages}•</div> <div id='readed'>${isReaded ? '✔Readed✔' : '❌Not readed❌'}</div>	<button class='buttonStyle buttonBook'>${isReaded ? 'Uncheck Readed' : 'Check Readed'}</button>	</div>`;
	return newHTMLBook;
}
function changeReaded(e){
	const eventTarget = e.target;
	if(eventTarget.textContent === 'Uncheck Readed'){
		eventTarget.textContent = 'Check Readed';
		eventTarget.parentNode.querySelector('#readed').textContent = '❌Not readed❌';
		return;
	}
	eventTarget.textContent = 'Uncheck Readed';
	eventTarget.parentNode.querySelector('#readed').textContent = '✔Readed✔';
}
function unsetFormulary() {
	formulary.style.display = 'none';
}
