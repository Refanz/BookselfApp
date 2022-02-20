const hlmDataBuku = document.querySelector(".data-buku");
const hlmTambahBuku = document.querySelector(".tambah-buku");
const hlmCariBuku = document.querySelector(".cari-buku");
const btnDataBuku = document.querySelector("#btn-data-buku");
const btnTambahBuku = document.querySelector("#btn-tambah-buku");
const btnCariBuku = document.querySelector("#btn-cari-buku");

btnDataBuku.addEventListener("click", () => {
    hlmDataBuku.classList.add("active");
    hlmCariBuku.classList.remove("active");
    hlmTambahBuku.classList.remove("active");
})

btnTambahBuku.addEventListener("click", () => {
    hlmDataBuku.classList.remove("active");
    hlmCariBuku.classList.remove("active");
    hlmTambahBuku.classList.add("active");
})

btnCariBuku.addEventListener("click", () => {
    hlmDataBuku.classList.remove("active");
    hlmCariBuku.classList.add("active");
    hlmTambahBuku.classList.remove("active");
})

/*
    { 
        id: String | number, 
        title: String,
        author: String,
        year: number,
        isComplete: boolean,
    }
*/

/* DOM DATA BUKU */
const ID_LIST_BUKU_SUDAH_DIBACA = "completed-book";
const ID_LIST_BUKU_BELUM_DIBACA = "uncompleted-book";
const ID_BOOK = "book-id";

const buatDataBuku = (title, author, year, isCompleted) => {
    const textTitle = document.createElement("h3");
    textTitle.setAttribute("id", "judul-buku");
    textTitle.innerHTML = title;

    const imgBook = document.createElement("img");
    imgBook.setAttribute("src","./assets/buku.jpg");
    imgBook.setAttribute("width","150px");
    imgBook.setAttribute("height","200px");
    imgBook.setAttribute("alt","Buku");

    const textAuthor = document.createElement("p");
    textAuthor.setAttribute("id", "author");
    textAuthor.innerText = "Author : " + author;

    const textYear = document.createElement("p");
    textYear.setAttribute("id", "year");
    textYear.innerText = "Year : " + year;

    const textDesc = document.createElement("p");
    textDesc.setAttribute("id", "desc-book");
    textDesc.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, eius minima nisi ea maiores quibusdam autem. Nisi alias pariatur sapiente labore, quia aliquam libero, dolore vel asperiores ab dolorum ipsa!";
    
    const rowDesc = document.createElement("div");
    rowDesc.classList.add("desc");
    rowDesc.append(textAuthor, textYear, textDesc);

    const column = document.createElement("div");
    column.classList.add("column");
    column.append(textTitle, imgBook, rowDesc);

    if(isCompleted === true){
        column.append(
            buatTombolUndo(), 
            buatTombolHapusBuku());
    }else{
        column.append(
            buatTombolSelesaiBaca(),
            buatTombolHapusBuku());

    }

    return column;
}

/* Buat Tombol Aksi */
const buatTombol = (nameTombol, valueTombol, eventListener) => {
    const tombol = document.createElement("input");
    tombol.setAttribute("type", "submit");
    tombol.setAttribute("name", nameTombol);
    tombol.setAttribute("value", valueTombol);
    
    tombol.addEventListener("click", (event) => {
        eventListener(event);
    });

    return tombol;
}

const buatTombolSelesaiBaca = () => {
    return buatTombol("btnSelesai", "Selesai Baca", (event) => {
        tambahBukuKeSelesai(event.target.parentElement);
    });
}

const buatTombolHapusBuku = () => {
    return buatTombol("btnHapus", "Hapus Buku", (event) => {
        hapusBukuDariListCompleted(event.target.parentElement);
    });
}

const buatTombolUndo = () => {
    return buatTombol("btnBelumSelesaiBaca", "Belum Selesai Baca", (event) => {
        undoBukuDariListCompleted(event.target.parentElement);
    });
}

const tambahDataBuku = () => {
    const uncompletedListBookId = document.getElementById(ID_LIST_BUKU_BELUM_DIBACA);
    const textTitle = document.getElementById("form-judul-buku").value;
    const textAuthor = document.getElementById("form-author-buku").value;
    const textYear = document.getElementById("form-tahun-buku").value;

    const buku = buatDataBuku(textTitle, textAuthor, textYear, false) ;
    uncompletedListBookId.append(buku);
    kosongkanForm();
    alert("Tambah Buku Selesai");
}

const tambahBukuKeSelesai = (bookElement) => {
    const listCompleted = document.getElementById(ID_LIST_BUKU_SUDAH_DIBACA);
    const textTitle = bookElement.querySelector("div.column > h3").innerText;
    const textAuthor = bookElement.querySelector(".desc > #author").innerText;
    const textYear = bookElement.querySelector(".desc > #year").innerText;

    const newBook = buatDataBuku(textTitle, textAuthor, textYear, true);

    listCompleted.append(newBook);
    bookElement.remove();
}

const hapusBukuDariListCompleted = (bookElement) => {
    bookElement.remove();
}

const undoBukuDariListCompleted = (bookElement) => {
    const listUncompleted = document.getElementById(ID_LIST_BUKU_BELUM_DIBACA);
    const textTitle = bookElement.querySelector("div.column > h3").innerText;
    const textAuthor = bookElement.querySelector(".desc > #author").innerText;
    const textYear = bookElement.querySelector(".desc > #year").innerText;

    const book = buatDataBuku(textTitle, textAuthor, textYear, false);

    listUncompleted.append(book);
    bookElement.remove();
}

/* Kosongkan Form */
const kosongkanForm = () => {
    const fieldTitle = document.getElementById("form-judul-buku");
    const fieldAuthor = document.getElementById("form-author-buku");
    const fieldYear = document.getElementById("form-tahun-buku");

    fieldTitle.value = "";
    fieldAuthor.value = "";
    fieldYear.value = "";
}

/* DOM Search */
const btnSearchBuku = document.getElementById("btn-search-buku");

btnSearchBuku.addEventListener("click", () => {
    const fieldCariBuku = document.querySelector("#field-cari-buku").value;
    const hasil = document.querySelector(".hasil-cari");
    if(fieldCariBuku === ""){
        hasil.innerHTML = "";
    }else{
        hasil.innerHTML = "";
        cariBuku(fieldCariBuku);
    }
})

const cariBuku = (cariBuku) => {
    const kolom = document.querySelector(".hasil-cari");
    let title, author, year;
    const books = document.querySelector(".data-buku").querySelectorAll(".column");

    for(let i = 0; i < books.length; i++){
        if(books[i].querySelector("#judul-buku").innerText.toLowerCase().indexOf(cariBuku.toLowerCase()) > -1){
            title = books[i].querySelector("#judul-buku").innerText;
            author = books[i].querySelector("#author").innerText;
            year = books[i].querySelector("#year").innerText;
            kolom.append(temuBuku(title, author, year));
        }
    }
}

const temuBuku = (textTitle, textAuthor, textYear) => {
    const title = document.createElement("h3");
    title.setAttribute("id", "judul-buku");
    title.innerText = textTitle;

    const author = document.createElement("p");
    author.innerText = "Author : " + textAuthor;

    const year = document.createElement("p");
    year.innerText = "Year : " + textYear;

    const desc = document.createElement("p");
    desc.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, eius minima nisi ea maiores quibusdam autem. Nisi alias pariatur sapiente labore, quia aliquam libero, dolore vel asperiores ab dolorum ipsa!";

    const imgBook = document.createElement("img");
    imgBook.setAttribute("src","./assets/buku.jpg");
    imgBook.setAttribute("width","150px");
    imgBook.setAttribute("height","200px");
    imgBook.setAttribute("alt","Buku");

    const rowDesc = document.createElement("div");
    rowDesc.classList.add("desc");
    rowDesc.append(author, year, desc);

    const col = document.createElement("div");
    col.classList.add("column-hasil");
    col.append(title, imgBook, rowDesc);

    return col;
}