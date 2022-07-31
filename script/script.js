let typed = new Typed(".typing", {
    strings:["", "Web Developer", "Full-Stack Developer"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
})
// Aside
const nav = document.querySelector(".nav"),
navList = nav.querySelectorAll("li"),
totalNavList = navList.length,
allSections = document.querySelectorAll(".section"),
totalSection = allSections.length;
for(let i = 0; i < totalNavList; i++){
    const a = navList[i].querySelector("a")
    a.addEventListener("click", (e) => {
        removeBackSection()
        for(let j=0; j < totalNavList; j++){
            if(navList[j].querySelector("a").classList.contains("active")){
                addBackSection(j)
                // allSections[j].classList.add("back-section")
            }
            navList[j].querySelector("a").classList.remove("active")
        }
        e.target.classList.add("active")
        showSection(e.target)
        if(window.innerWidth < 1200){
            asideSectionToggle()
        }
    })
}
function removeBackSection() {
    for(let i = 0; i < totalSection; i++){
        allSections[i].classList.remove("back-section");
    }
}
function addBackSection(j){
    allSections[j].classList.add("back-section")
}
function showSection(element) {
    for(let i = 0; i < totalSection; i++){
        allSections[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1]
    // console.log(target);
    document.querySelector("#" + target).classList.add("active")
}
function updataNav(element) {
    for(let i = 0;i < totalNavList; i++){
        navList[i].querySelector("a").classList.remove("active")
        const target = element.getAttribute("href").split("#")[1]
        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active")
        }
    }
}
document.querySelector(".hire-me").addEventListener("click", (e) => {
    const sectionIndex = e.target.getAttribute("data-section-index")
    showSection(e.target)
    updataNav(e.target)
    removeBackSection()
    addBackSection(sectionIndex)
})
const navTogglerBtn = document.querySelector(".nav-toggler"),
aside = document.querySelector("aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionToggle();
})
function asideSectionToggle() {
    aside.classList.toggle("open")
    navTogglerBtn.classList.toggle("open")
    for(let i = 0; i < totalSection; i++){
        allSections[i].classList.toggle("open")
    }
}
// open in new tab
function openWindow(url){
    window.open(url, "_blank").focus
}