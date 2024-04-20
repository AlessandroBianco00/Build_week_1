/* --------------------------------- JS PAGINA 1 ---------------------------*/
function redirectToSecondPage() {
    var checkbox = document.getElementById("spunta");
    if (checkbox.checked) {
        window.location.assign("index_domande.html");
    } else {
        alert("Devi promettere di rispondere da solo!");
    }
}