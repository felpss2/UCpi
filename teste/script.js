const button = document.getElementById("menu");
const menu = document.getElementById("topicos");

button.addEventListener("click", function () {

    if (menu.style.display === "none"){
        menu.style.display = flex;
        menu.style.flexDirection = "column";
    } else {
        menu.style.dysplay = "none";
    }

})