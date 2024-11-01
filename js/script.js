/**
 * Function to Initialize Typing Animations Dynamically
 *
 * @param {string} selector The element selector for the typing animation
 * @param {string[]} strings The array of strings to type
 */
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

/**
 * Initialize Typing Animation for About Section
 *
 * This function takes an array of strings and creates a typing animation
 * in the about section of the page.
 *
 * @param {string[]} strings The array of strings to type
 */
initTypingAnimation(".about-text .typing", [
    "AutoCAD Designer",
    "Web Designer",
    "Web Developer",
    "Video Editor",
    "Virtual Assistant"
]);

/**
 * Get the aside navigation element
 */
const nav = document.querySelector(".nav"),
    navLinks = nav.querySelectorAll("li a"),
    allSections = document.querySelectorAll(".section"),
    navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

/**
 * The total number of navigation links
 */
let totalNavLinks = navLinks.length,
    totalSections = allSections.length;

/**
 * Helper function to remove all back-sections
 */
function removeBackSection() {
    allSections.forEach(section => section.classList.remove("back-section"));
}

/**
 * Helper function to add back-section to a specific section by index
 * @param {number} index The index of the section
 */
function addBackSection(index) {
    allSections[index].classList.add("back-section");
}

/**
 * Helper function to show the selected section based on the clicked link
 * @param {Element} element The clicked link element
 */
function showSection(element) {
    allSections.forEach(section => section.classList.remove("active"));
    const targetID = element.getAttribute("href").split("#")[1];
    document.querySelector(`#${targetID}`).classList.add("active");
}

/**
 * Helper function to update active state of navigation links
 * @param {Element} element The clicked link element
 */
function updateNav(element) {
    navLinks.forEach(link => link.classList.remove("active"));
    element.classList.add("active");
}

/**
 * Handle navigation clicks
 */
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

/**
 * Handle "Hire Me" button click
 */
document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = parseInt(this.getAttribute("data-section-index"), 10);

    // Remove back-section and add contact back-section
    removeBackSection();
    addBackSection(sectionIndex);  // Contact section index
    showSection(this);  // Show the contact section
    updateNav(document.querySelector('a[href="#contact"]'));  // Update active nav link
});

/**
 * Handle logo click event to navigate to home section
 */
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

/**
 * Toggle aside menu on small screens
 */
navTogglerBtn.addEventListener("click", toggleAside);

/**
 * Toggle the aside navigation
 */
function toggleAside() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    allSections.forEach(section => section.classList.toggle("open"));
}

/**
 * Contact Form Submission
 * Listens for form submission event on the contact form and sends the form data
 * to the server using the Fetch API. If the response is successful, it clears
 * the form fields and alerts the user. If there is an error, it logs the error
 * and alerts the user. It also handles the case where the form is invalid.
 */
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable button during submission
    submitButton.textContent = 'Sending...'; // Provide feedback to the user

    /**
     * Check if the form is valid and send the form data to the server.
     * If the response is successful, clear the form fields and alert the user.
     * If there is an error, log the error and alert the user.
     */
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
// This script is responsible for displaying the portfolio items and setting up the pagination
(function () {
    const portfolioData = [
        { img: 'images/portfolio/portfolio-1.png', href: 'https://ralphbserrano.wixsite.com/thrive', title: 'Project', desc: 'My First Portfolio Design Using Wix' },
        { img: 'images/portfolio/portfolio-2.png', href: 'https://rbsthriveportfolio.my.canva.site/', title: 'Project', desc: 'My Second Portfolio Using Canva' },
        { img: 'images/portfolio/portfolio-3.png', href: 'https://jbyissbfb.wixsite.com/jbyiss', title: 'Project', desc: 'Website Created Using Wix' },
        { img: 'images/portfolio/portfolio-4.png', href: 'https://drive.google.com/drive/folders/1t1Sqg93MnBAAawg3LchpzNKHMdmXc2uM?usp=sharing', title: 'Project', desc: 'Email Management' },
        { img: 'images/portfolio/portfolio-5.png', href: 'https://drive.google.com/drive/folders/1Fh69DgwzEqQnxiKRVe1tcVdGDdqC3Ue0?usp=sharing', title: 'Project', desc: 'Trello/Project Management' },
        { img: 'images/portfolio/portfolio-6.png', href: 'https://drive.google.com/drive/folders/1XEGWaVMGvh1O-NnxmJydV0KIOsChHlLm?usp=sharing', title: 'Project', desc: 'Travel/Calendar Management and Appointment Setting' },
        { img: 'images/portfolio/portfolio-7.png', href: 'https://drive.google.com/drive/folders/19x3cIw20fqqhX73ZV83eEMueysmgswBK?usp=sharing', title: 'Project', desc: 'Content Creation' },
        { img: 'images/portfolio/portfolio-8.png', href: 'https://drive.google.com/drive/folders/1vr3zsSHroynxjWyIkpqRSlt1raSJSFg-?usp=sharing', title: 'Project', desc: 'Apprenticeship Program' },
        { img: 'images/portfolio/portfolio-9.png', href: 'https://drive.google.com/drive/folders/10vyiRW-F4qs1tsydPxiHhHpWJbEHxfDH?usp=sharing', title: 'Project', desc: 'MVA Class Course' },
    ];

    // Randomize the portfolio items
    for (let i = portfolioData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [portfolioData[i], portfolioData[j]] = [portfolioData[j], portfolioData[i]];
    }

    const itemsPerPage = 6;
    let currentPage = 1;

    /**
     * Displays the portfolio items based on the current page
     * @param {number} page The current page number
     */
    function displayPortfolioItems(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToDisplay = portfolioData.slice(startIndex, endIndex);
        var portfolioTitleNum = (page - 1) * itemsPerPage + 1;
        const portfolioContainer = document.getElementById('portfolioItems');
        portfolioContainer.innerHTML = '';

        itemsToDisplay.forEach(item => {
            const portfolioItem = `
                <div class="portfolio-item padd-15">
                    <div class="portfolio-item-inner shadow-dark">
                        <div class="portfolio-img">
                            <a href="${item.href}" target="_blank">
                                <img src="${item.img}" alt="${item.desc}">
                                <div class="overlay" title="${item.desc}">
                                    <h4>${item.title} ${portfolioTitleNum++}</h4>
                                    <p>${item.desc}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>`;
            portfolioContainer.innerHTML += portfolioItem;
        });
    }

    /**
     * Sets up the pagination buttons
     */
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
// This script is responsible for displaying the certificates and setting up the pagination
(function () {
    const certificates = [
        { src: "images/certificate/Apprenticeship Certificate.png", title: "Executive Assistant Apprenticeship", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Gold Certificate Masterclass virtual assistant.png", title: "Masterclass in Virtual Assistant", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Best in Setting a Freelancing Brand.png", title: "Best in Setting a Freelancing Brand", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Best in Website Management.png", title: "Best in Website Management", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Getting Hired with these amazon virtual assistant task.png", title: "Amazon Virtual Assistant Tasks", description: "Surge Freelancing Marketplace, 2024" },
        { src: "images/certificate/Content Marketing Strategy in social media.png", title: "Content Marketing Strategy", description: "Surge Freelancing Marketplace, 2024" },
    ];
    const itemsPerPageCertificates = 6;
    let currentPageCertificates = 1;
    /**
     * Displays the certificates based on the current page
     * @param {number} page The current page number
     */
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
                                <div class="overlay" title="${cert.title}">
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

    /**
     * Sets up the pagination buttons
     */
    function setupCertificatePagination() {
        const pagination = document.getElementById('certificate-pagination');
        pagination.innerHTML = '';

        const totalPages = Math.ceil(certificates.length / itemsPerPageCertificates);

        if (totalPages > 1) {
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
        } else {
            pagination.style.display = 'none';
        }
    }


    displayCertificates(currentPageCertificates); // Ensure this matches the variable
    setupCertificatePagination();
})();


const navLinkss = document.querySelectorAll('.nav li a');

navLinkss.forEach(link => {
    link.addEventListener('click', () => {
        const icon = link.querySelector('i');
        icon.classList.add('spin');

        // Remove the 'spin' class after the animation completes
        setTimeout(() => {
            icon.classList.remove('spin');
        }, 500); // Adjust the timeout to match the animation duration
    });
});

/**
 * Calculates the age based on the birth date and displays it in the #age span.
 */
var ageSpan = document.getElementById("age");

/**
 * The birth date of the person.
 * @type {Date}
 */
var birthDate = new Date("1987-06-18");
/**
 * The current date and time.
 * @type {Date}
 */
var today = new Date();

/**
 * Calculates the age in years based on the difference between the current date and the birth date.
 * @returns {number} The age in years.
 */
var age = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 365.25));

/**
 * Sets the text content of the #age span to the calculated age.
 */
ageSpan.textContent = age;
document.querySelector('.info-item[itemprop="age"]').setAttribute('content', age);

/**
 * Hides the preloader element after the page has finished loading.
 *
 * Waits for 2 seconds after the page has finished loading before hiding the preloader.
 * This is done to ensure that the preloader is visible long enough to provide a good user experience.
 */
window.addEventListener('load', function () {
    /**
     * The preloader element.
     * @type {HTMLElement}
     */
    const preloader = document.getElementById('preloader');

    /**
     * The timeout for hiding the preloader.
     * @type {number}
     */
    const timeout = 2000;

    /**
     * Add a smooth transition for opacity and pointer-events.
     */
    preloader.style.transition = 'opacity 0.5s ease, pointer-events 0.5s ease';

    /**
     * Hides the preloader element after the timeout has expired.
     */
    setTimeout(function () {
        /**
         * Set the opacity of the preloader to 0, which makes it invisible.
         * Also set the pointer-events CSS property to 'none' to prevent any mouse events from being triggered.
         */
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';

        /**
         * Listen for the transitionend event on the preloader element.
         * When the event is triggered, set the display property of the preloader to 'none' to hide it completely.
         * Also set the pointer-events property to 'auto' to allow mouse events to be triggered again.
         */
        preloader.addEventListener('transitionend', function () {
            preloader.style.display = 'none';
            preloader.style.pointerEvents = 'auto';
        }, { once: true });
    }, timeout);
});

