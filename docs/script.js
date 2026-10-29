const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authTabs = document.querySelectorAll(".auth-tab");

function showAuthForm(type) {
    if (!loginForm || !registerForm) {
        return;
    }

    loginForm.hidden = type !== "login";
    registerForm.hidden = type !== "register";

    authTabs.forEach(function (tab) {
        tab.classList.toggle("active", tab.dataset.form === type);
    });

    document.querySelectorAll(".form-message").forEach(function (message) {
        message.textContent = "";
    });
}

authTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        showAuthForm(tab.dataset.form);
    });
});

document.querySelectorAll("[data-switch]").forEach(function (button) {
    button.addEventListener("click", function () {
        showAuthForm(button.dataset.switch);
    });
});

[loginForm, registerForm].forEach(function (form) {
    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const message = form.querySelector(".form-message");

        message.textContent =
            "Форма тексерілді. Нақты тіркелу немесе кіру жүйесі PHP және MySQL кезеңінде қосылады.";
    });
});