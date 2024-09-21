function changeWebsiteThemeAccrodingToSystem(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-bs-theme", "light");
    }
}


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    changeWebsiteThemeAccrodingToSystem();
});
