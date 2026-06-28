// ==========================================================================
// script.js - Making the Portfolio Interactive (Week 3)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded and Ready!");

    // 1. DYNAMIC TIME-BASED GREETING (Interactive Feature 1)
    // Updates the tagline area with a time-specific greeting
    const updateGreeting = () => {
        const greetingElement = document.createElement("p");
        greetingElement.className = "dynamic-greeting";
        
        const hour = new Date().getHours();
        let greetingText = "";

        if (hour < 12) {
            greetingText = "Good morning! 🌅";
        } else if (hour < 18) {
            greetingText = "Good afternoon! ☀️";
        } else {
            greetingText = "Good evening! 🌌";
        }

        greetingElement.textContent = `${greetingText} Welcome to my space.`;
        
        // Insert greeting under the role in the header
        const headerContainer = document.querySelector("header .container");
        if (headerContainer) {
            const roleElement = headerContainer.querySelector(".role");
            headerContainer.insertBefore(greetingElement, roleElement.nextSibling);
        }
    };
    updateGreeting();


    // 2. DARK/LIGHT MODE TOGGLE (Interactive Feature 2)
    // Uses localStorage to save user preferences
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Check local storage for existing theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️ Light Mode";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            let currentTheme = "light";
            if (document.body.classList.contains("dark-mode")) {
                currentTheme = "dark";
                themeToggleBtn.textContent = "☀️ Light Mode";
            } else {
                themeToggleBtn.textContent = "🌙 Dark Mode";
            }
            // Save state in LocalStorage
            localStorage.setItem("theme", currentTheme);
        });
    }


    // 3. SHOW/HIDE CONTENT (Interactive Feature 3)
    // Read More / Read Less toggler in the About Section
    const readMoreBtn = document.getElementById("read-more-btn");
    const moreAboutText = document.getElementById("more-about");

    if (readMoreBtn && moreAboutText) {
        readMoreBtn.addEventListener("click", () => {
            const isHidden = moreAboutText.classList.contains("hidden");
            
            if (isHidden) {
                moreAboutText.classList.remove("hidden");
                readMoreBtn.textContent = "Read Less";
            } else {
                moreAboutText.classList.add("hidden");
                readMoreBtn.textContent = "Read More";
            }
        });
    }


    // 4. CONTACT FORM VALIDATION WITH REAL-TIME FEEDBACK
    const contactForm = document.querySelector(".contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");

    // Reusable Error Display Functions
    const showError = (inputElement, errorElement, message) => {
        inputElement.classList.add("error-border");
        errorElement.textContent = message;
        errorElement.style.display = "block";
    };

    const clearError = (inputElement, errorElement) => {
        inputElement.classList.remove("error-border");
        errorElement.textContent = "";
        errorElement.style.display = "none";
    };

    // Real-time Validation Event Listeners (Input Events)
    if (nameInput) {
        nameInput.addEventListener("input", () => {
            if (nameInput.value.trim() !== "") {
                clearError(nameInput, nameError);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener("input", () => {
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailValue === "") {
                clearError(emailInput, emailError);
            } else if (!emailRegex.test(emailValue)) {
                showError(emailInput, emailError, "Please enter a valid email address.");
            } else {
                clearError(emailInput, emailError);
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener("input", () => {
            if (messageInput.value.trim().length >= 10) {
                clearError(messageInput, messageError);
            }
        });
    }

    // Submit Validation
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Stop form submission
            
            let isFormValid = true;

            // Validate Name
            if (nameInput.value.trim() === "") {
                showError(nameInput, nameError, "Name is required.");
                isFormValid = false;
            } else {
                clearError(nameInput, nameError);
            }

            // Validate Email
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailValue === "") {
                showError(emailInput, emailError, "Email is required.");
                isFormValid = false;
            } else if (!emailRegex.test(emailValue)) {
                showError(emailInput, emailError, "Please enter a valid email address.");
                isFormValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            // Validate Message (At least 10 characters)
            if (messageInput.value.trim() === "") {
                showError(messageInput, messageError, "Message is required.");
                isFormValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, "Message must be at least 10 characters long.");
                isFormValid = false;
            } else {
                clearError(messageInput, messageError);
            }

            // Successful Submission Handling
            if (isFormValid) {
                formSuccess.textContent = "Thank you! Your message has been sent successfully.";
                formSuccess.className = "success-message show";
                
                // Reset form
                contactForm.reset();
                
                // Clear success message after 4 seconds
                setTimeout(() => {
                    formSuccess.className = "success-message";
                    formSuccess.textContent = "";
                }, 4000);
            }
        });
    }

    // 5. TYPEWRITER EFFECT (Extra Polish Feature 1)
    const typewriterEl = document.getElementById("typewriter");
    if (typewriterEl) {
        const words = ["AI Enthusiast", "Web Developer", "IoT Innovator", "Problem Solver"];
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        const typeEffect = () => {
            const currentWord = words[wordIdx];
            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = isDeleting ? 50 : 150;

            if (!isDeleting && charIdx === currentWord.length) {
                typeSpeed = 1500; // Pause when word is completely typed
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeEffect, typeSpeed);
        };
        typeEffect();
    }

    // 6. BACK TO TOP BUTTON (Extra Polish Feature 2)
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
