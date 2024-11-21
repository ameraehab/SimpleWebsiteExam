document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("FormLogin").addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.href = "examPage.html";

    });

    window.history.pushState(null, null, window.location.href);

    window.addEventListener("popstate", function () {
        // Redirect or keep user on the current page
        window.history.pushState(null, null, window.location.href);
    });



})

