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

const jobSearch = document.getElementById("jobSearch");
const jobCategory = document.getElementById("jobCategory");
const jobCards = document.querySelectorAll(".job-card");
const jobsCount = document.getElementById("jobs-count");
const noJobs = document.getElementById("noJobs");

function filterJobs() {
    if (!jobSearch || !jobCategory) {
        return;
    }

    const searchText = jobSearch.value.trim().toLowerCase();
    const selectedCategory = jobCategory.value;
    let visibleCount = 0;

    jobCards.forEach(function (card) {
        const cardText = card.textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = cardText.includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

        const isVisible = matchesSearch && matchesCategory;

        card.hidden = !isVisible;

        if (isVisible) {
            visibleCount++;
        }
    });

    if (jobsCount) {
        jobsCount.textContent = visibleCount + " вакансия";
    }

    if (noJobs) {
        noJobs.hidden = visibleCount !== 0;
    }
}

if (jobSearch) {
    jobSearch.addEventListener("input", filterJobs);
}

if (jobCategory) {
    jobCategory.addEventListener("change", filterJobs);
}

filterJobs();