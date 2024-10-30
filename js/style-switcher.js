/* TOGGLE STYLE SWITCHER */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})
// hide style switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})
/* THEME COLORS*/
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        }
        else {
            style.setAttribute("disabled", "true")
        }
    })
}
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");

    dayNight.querySelector("i").classList.toggle("fa-spin"); // Toggle spin for sun
    dayNight.querySelector("i").classList.toggle("fa-bounce"); // Toggle bounce for moon
    document.body.classList.toggle("dark");
});

window.addEventListener("load", () => {
    document.body.classList.add("dark");
    dayNight.querySelector("i").classList.add("fa-sun");
    dayNight.querySelector("i").classList.add("fa-spin"); // Add bounce for moon
});
