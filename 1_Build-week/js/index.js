function redirectToSecondPage() {
    var checkbox = document.getElementById("spunta");
    if (checkbox.checked) {
        window.location.href = "domande.html";
    } else {
        alert("Devi promettere di rispondere da solo!");
    }
}