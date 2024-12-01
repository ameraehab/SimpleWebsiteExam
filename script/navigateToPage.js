document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("FormLogin").addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.replace("welcomePage.html");


    });
    document.getElementById("FormSignup").addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.replace("welcomePage.html");
    });

}
);
document.getElementById("welcome").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.replace("examPage.html");
});

