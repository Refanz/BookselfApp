const body = document.querySelector("body");
const nav = document.querySelector("nav");
const topNav = document.querySelector(".top-nav");
const modeToggle =  document.querySelector(".dark-light");
const searchToggle = document.querySelector(".searchBox");
const sideBarOpen = document.querySelector(".sideBarOpen");
const sideBarClose = document.querySelector(".sideBarClose");

let getMode = localStorage.getItem("mode");

if(getMode === "dark-mode"){
    body.classList.add("dark");
}


// Kode JS untuk mengubah tema gelap dan terang
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");

    if(body.classList.contains("dark") === false) {
        localStorage.setItem("mode", "light-mode");
    }else{
        localStorage.setItem("mode", "dark-mode");
    }
}); 

// Kode JS untuk sidebar
sideBarOpen.addEventListener("click", () => {
    nav.classList.add("active");
})

body.addEventListener("click", e =>{
    let clickedElemt = e.target;

    if(!clickedElemt.classList.contains("sideBarOpen") && !clickedElemt.classList.contains("menu")){
        nav.classList.remove("active");
    }
})