// Function to Initialize Typing Animations Dynamically
function initTypingAnimation(selector, strings) {
    if (document.querySelector(selector)) {
        new Typed(selector, {
            strings: strings,
            typeSpeed: 100,
            backSpeed: 100,
            loop: true,
        });
    }
}

// Initialize Typing Animations
initTypingAnimation(".home .typing", [
    "Web Designer", 
    "Web Developer", 
    "Video Editor", 
    "Virtual Assistant"
]);

initTypingAnimation(".about-text .typing", [
    "Web Designer", 
    "Graphic Designer", 
    "Virtual Assistant"
]);

/* Aside Navigation */
const nav = document.querySelector(".nav"),
    navLinks = nav.querySelectorAll("li a"),
    allSections = document.querySelectorAll(".section"),
    navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

let totalNavLinks = navLinks.length,
    totalSections = allSections.length;

// Helper: Remove all back-sections
function removeBackSection() {
    allSections.forEach(section => section.classList.remove("back-section"));
}

// Helper: Add back-section to a specific section by index
function addBackSection(index) {
    allSections[index].classList.add("back-section");
}

// Helper: Show the selected section based on the clicked link
function showSection(element) {
    allSections.forEach(section => section.classList.remove("active"));
    const targetID = element.getAttribute("href").split("#")[1];
    document.querySelector(`#${targetID}`).classList.add("active");
}

// Helper: Update active state of navigation links
function updateNav(element) {
    navLinks.forEach(link => link.classList.remove("active"));
    element.classList.add("active");
}

// Handle navigation clicks
navLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
        const currentActiveIndex = [...navLinks].findIndex(link => 
            link.classList.contains("active")
        );

        // Show the selected section and update the back-section
        removeBackSection();
        if (currentActiveIndex !== index) {
            addBackSection(currentActiveIndex);
        }

        showSection(this);
        updateNav(this);

        if (window.innerWidth < 1200) {
            toggleAside();
        }
    });
});

// Handle "Hire Me" button click
document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = parseInt(this.getAttribute("data-section-index"), 10);

    // Remove back-section and add contact back-section
    removeBackSection();
    addBackSection(sectionIndex);  // Contact section index
    showSection(this);  // Show the contact section
    updateNav(document.querySelector('a[href="#contact"]'));  // Update active nav link
});

// Handle logo click event to navigate to home section
document.getElementById("logo").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    const homeLink = document.querySelector('a[href="#home"]'); // Select the home link

    if (homeLink) {
        const currentActiveIndex = [...navLinks].findIndex(link => link.classList.contains("active")); // Get the current active nav link index

        removeBackSection(); // Remove all back-sections
        addBackSection(currentActiveIndex); // Add back-section for the previously active section
        showSection(homeLink); // Show the home section
        updateNav(homeLink); // Update the active navigation state
    }
});

// Toggle aside menu on small screens
navTogglerBtn.addEventListener("click", toggleAside);

function toggleAside() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    allSections.forEach(section => section.classList.toggle("open"));
}

<script>
    document.getElementById('submit-button').onclick = function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        fetch('https://script.google.com/macros/s/AKfycbwu1E0yvJLCIjrIDCLN4lqBkSs0pc9g4mvBei58TTMZBhfTRNOVz-HZVOpdY_w-JNdNrg/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset(); // Reset the form after submission
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again later.');
        });
    };
</script>