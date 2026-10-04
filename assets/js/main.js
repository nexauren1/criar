(() => {
const root=document.documentElement, navToggle=document.querySelector("[data-nav-toggle]"), nav=document.querySelector("#site-nav"), themeToggle=document.querySelector("[data-theme-toggle]"), year=document.querySelector("[data-year]");
const saved=localStorage.getItem("forgekit-theme"), preferred=window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme=saved||(preferred?"dark":"light");
if(year) year.textContent=new Date().getFullYear();
navToggle?.addEventListener("click",()=>{const open=nav?.classList.toggle("is-open")||false;navToggle.setAttribute("aria-expanded",String(open));});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("is-open");navToggle?.setAttribute("aria-expanded","false");}));
themeToggle?.addEventListener("click",()=>{const next=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=next;localStorage.setItem("forgekit-theme",next);themeToggle.setAttribute("aria-label",next==="dark"?"Switch to light theme":"Switch to dark theme");});
})();