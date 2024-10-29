// Function to Initialize Typing Animations Dynamically
function initTypingAnimation(selector, strings) {
    if (document.querySelector(selector)) {
        new Typed(selector, {
            strings: strings,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
        });
    }
}

// Initialize Typing Animations
initTypingAnimation(".home .typing", [
    "AutoCAD Designer",
    "Web Designer",
    "Web Developer",
    "Video Editor",
    "Virtual Assistant"
]);

initTypingAnimation(".about-text .typing", [
    "AutoCAD Designer",
    "Web Designer",
    "Web Developer",
    "Video Editor",
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

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable button during submission
    submitButton.textContent = 'Sending...'; // Provide feedback to the user

    if (this.checkValidity()) {
        fetch(this.action, {
            method: this.method,
            body: new FormData(this),
            headers: {
                'Accept': 'application/json' // Expect a JSON response
            }
        }).then(response => {
            if (response.ok) {
                alert('Your message has been sent!');
                this.reset(); // Clear the form fields
            } else {
                console.error('Error: ', response.statusText); // Log errors for debugging
                alert('There was a problem with your submission. Please try again.');
            }
        }).catch(error => {
            console.error('Fetch Error: ', error); // Log errors for debugging
            alert('Error: ' + error.message);
        }).finally(() => {
            submitButton.disabled = false; // Re-enable button after submission
            submitButton.textContent = 'Send'; // Reset button text
        });
    } else {
        alert('Please fill in all fields.');
        submitButton.disabled = false; // Re-enable button if form is invalid
        submitButton.textContent = 'Send'; // Reset button text
    }
});

// Portfolio Section Logic
(function () {
    const portfolioData = [
        { img: 'images/portfolio/portfolio-1.png', href: 'https://ralphbserrano.wixsite.com/thrive', title: 'Project 1', desc: 'My First Portfolio Design Using Wix' },
        { img: 'images/portfolio/portfolio-2.png', href: 'https://rbsthriveportfolio.my.canva.site/', title: 'Project 2', desc: 'My Second Portfolio Using Canva' },
        { img: 'images/portfolio/portfolio-3.jpg', href: '#', title: 'Project 3', desc: 'Graphic Design for Marketing' },
        { img: 'images/portfolio/portfolio-4.jpg', href: '#', title: 'Project 4', desc: 'E-commerce Website Development' },
        { img: 'images/portfolio/portfolio-5.jpg', href: '#', title: 'Project 5', desc: 'Video Editing for Promotional Content' },
        { img: 'images/portfolio/portfolio-6.jpg', href: '#', title: 'Project 6', desc: 'Mobile App UI/UX Design' },
        { img: 'images/portfolio/portfolio-7.jpg', href: '#', title: 'Project 7', desc: 'Logo Design' },
        { img: 'images/portfolio/portfolio-8.jpg', href: '#', title: 'Project 8', desc: 'Social Media Campaign' },
    ];

    const itemsPerPage = 6;
    let currentPage = 1;

    function displayPortfolioItems(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToDisplay = portfolioData.slice(startIndex, endIndex);

        const portfolioContainer = document.getElementById('portfolioItems');
        portfolioContainer.innerHTML = '';

        itemsToDisplay.forEach(item => {
            const portfolioItem = `
                <div class="portfolio-item padd-15">
                    <div class="portfolio-item-inner shadow-dark">
                        <div class="portfolio-img">
                            <a href="${item.href}" target="_blank">
                                <img src="${item.img}" alt="${item.title}">
                                <div class="overlay">
                                    <h4>${item.title}</h4>
                                    <p>${item.desc}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>`;
            portfolioContainer.innerHTML += portfolioItem;
        });
    }

    function setupPagination() {
        const totalPages = Math.ceil(portfolioData.length / itemsPerPage);
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('page-btn');
            if (i === currentPage) pageButton.classList.add('active');

            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayPortfolioItems(currentPage);
                setupPagination();
            });

            paginationContainer.appendChild(pageButton);
        }
    }

    displayPortfolioItems(currentPage);
    setupPagination();
})();

// Certificates Section Logic
(function () {
    const certificates = [
        { src: "images/certificate/Apprenticeship Certificate.png", title: "Executive Assistant Apprenticeship", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Gold Certificate Masterclass virtual assistant.png", title: "Masterclass in Virtual Assistant", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Best in Setting a Freelancing Brand.png", title: "Best in Setting a Freelancing Brand", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Best in Website Management.png", title: "Best in Website Management", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Getting Hired with these amazon virtual assistant task.png", title: "Amazon Virtual Assistant Tasks", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Content Marketing Strategy in social media.png", title: "Content Marketing Strategy", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/AnotherCertificate.jpg", title: "Another Certificate", description: "Another Place, 2024" },
    ];

    const itemsPerPage = 6;
    let currentPage = 1;

    const itemsPerPagePortfolio = 6;
    let currentPagePortfolio = 1;

    const itemsPerPageCertificates = 6;
    let currentPageCertificates = 1;
    function displayCertificates(page) {
        const container = document.getElementById('certificates-container');
        container.innerHTML = '';

        const start = (page - 1) * itemsPerPageCertificates;
        const end = start + itemsPerPageCertificates;
        const paginatedCertificates = certificates.slice(start, end);

        paginatedCertificates.forEach(cert => {
            const certItem = `
                <div class="certificate-item padd-15">
                    <div class="certificate-item-inner shadow-dark">
                        <div class="certificate-img">
                            <a href="${cert.src}" target="_blank">
                                <img src="${cert.src}" alt="${cert.title}">
                                <div class="overlay">
                                <h4>${cert.title}</h4>
                                <p>${cert.description}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>`;
            container.innerHTML += certItem;
        });
    }

    function setupCertificatePagination() {
        const pagination = document.getElementById('certificate-pagination');
        pagination.innerHTML = '';

        const totalPages = Math.ceil(certificates.length / itemsPerPageCertificates);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.add('page-btn');
            if (i === currentPageCertificates) button.classList.add('active');

            button.addEventListener('click', () => {
                currentPageCertificates = i;
                displayCertificates(currentPageCertificates);
                setupCertificatePagination();
            });

            pagination.appendChild(button);
        }
    }


    displayCertificates(currentPageCertificates); // Ensure this matches the variable
    setupCertificatePagination();
})();

