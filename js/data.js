/*
    { 
        id: String | number, 
        title: String,
        author: String,
        year: number,
        isComplete: boolean,
    }
*/

const STORAGE_KEY = "BOOK";

let books = [];

const isStorageExist = () => {
    if(typeof(Storage) === undefined){
        alert("Browser yang anda gunakan tidak mendukung Local Storage");
        return false;
    }
    return true;
}

const saveData = () => {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
}

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data != null){
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

const updateDataToStorage = () => {
    if(isStorageExist()){
        saveData();
    }
}

const composeBookObject = (title, author, year, isCompleted) => {
    return {
        id: + new Date(),
        title,
        author,
        year,
        isCompleted,
    };
}

const findBook = (bookID) => {
    for(book of books){

        if(book.id === bookID){
            return book;
        }
    }
    return null;
}

const findBookIndex = (bookID) => {
    let index = 0;
    
    for(book of books){
        if(book.id === bookID){
            return index;
        }
        index++;
    }
    return -1;
}

const refreshDataFromBooks = () => {
    const listUncompleted = document.getElementById(ID_LIST_BUKU_BELUM_DIBACA);
    const listCompleted = document.getElementById(ID_LIST_BUKU_SUDAH_DIBACA);

    for(book of books){
        const newBook = buatDataBuku(book.title, book.author, book.year, book.isCompleted);
        newBook[ID_BOOK] = book.id;
        
        if(book.isCompleted){
            listCompleted.append(newBook);
        }else{
            listUncompleted.append(newBook);
        }
    }
}