document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("FormLogin").addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.replace("examPage.html");


    });
    document.getElementById("FormSignup").addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.replace("examPage.html");
    });
}
);