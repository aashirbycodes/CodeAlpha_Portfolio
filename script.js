let menuBtn = document.querySelector(".menu-btn");
let navLinks = document.querySelector(".nav-links");

const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const typingText = document.querySelector("#typing-text");
const scrollTop = document.querySelector(".scroll-top");

const contactForm = document.querySelector(".contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const successMessage = document.querySelector("#success-message");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Section Observer
const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            // Remove active from all links
            links.forEach(function (link) {
                link.classList.remove("active");
            });

            // Get current section ID
            const id = entry.target.id;

            // Find matching navbar link
            const activeLink = document.querySelector(
                `.nav-links a[href="#${id}"]`
            );

            // Add active class
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }

    });

});


// Sections Observe
sections.forEach(function (section) {
    observer.observe(section);
});


// Mobile Menu
menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});


// Menu Link Click
links.forEach(function (link) {

    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
    });

});


// Text Changing
const texts = [
    "Frontend Developer",
    "JavaScript Developer",
    "MERN Stack Developer",
    "AI Developer"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;


function typeText() {

    const currentText = texts[index];

    if (!isDeleting) {

        charIndex++;

        typingText.textContent = currentText.substring(0, charIndex);

        if (charIndex === currentText.length) {

            isDeleting = true;

            // 1 second pause
            setTimeout(typeText, 1000);

            return;
        }

    } else {

        charIndex--;

        typingText.textContent = currentText.substring(0, charIndex);

        if (charIndex === 0) {

            isDeleting = false;

            index++;

            if (index >= texts.length) {
                index = 0;
            }
        }
    }

    setTimeout(typeText, isDeleting ? 80 : 150);
}


typeText();


// Scroll To Top
window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        scrollTop.classList.add("show");

    } else {

        scrollTop.classList.remove("show");

    }

});


scrollTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// Form Validation
contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";


    if (nameInput.value.trim() === "") {

        nameError.textContent = "Name Required";

    } else if (emailInput.value.trim() === "") {

        emailError.textContent = "Email Required";

    } else if (!emailPattern.test(emailInput.value.trim())) {

        emailError.textContent = "Invalid Email";

    } else if (messageInput.value.trim() === "") {

        messageError.textContent = "Message Required";

    } else {

        successMessage.textContent = "Message Successful!";

        contactForm.reset();

    }

});