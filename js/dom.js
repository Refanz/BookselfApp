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
