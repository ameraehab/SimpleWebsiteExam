const formLogin = document.getElementById("FormLogin");
const formSigup = document.getElementById("FormSignup");
const welcome = document.getElementById("welcome");

document.addEventListener("DOMContentLoaded", function () {
    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.replace("welcomePage.html");


    });
    formSigup.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.replace("welcomePage.html");
    });

}
);

welcome.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.replace("examPage.html");
});

