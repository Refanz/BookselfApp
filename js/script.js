document.addEventListener("DOMContentLoaded", () => {

    const submitForm = document.getElementById("form-tambah-buku");
    
    submitForm.addEventListener("submit", () => {
        tambahDataBuku();
        event.preventDefault();
    })

    if(isStorageExist()){
        loadDataFromStorage();
    }

})

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
})