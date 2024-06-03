// Get all the links that open modals
const modalLinks = document.querySelectorAll('.service-card__link');

// Get all the close buttons
const closeButtons = document.querySelectorAll('.close');
const closeButtons2 = document.querySelectorAll('.close-btn');

// Add event listener to each link to open the modal
modalLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const modalId = this.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
});

// Add event listener to each close button to close the modal
closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});

closeButtons2.forEach(button => {
    button.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});

// Add event listener to window to close the modal when clicking outside of it
window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});


const modalButtons = document.querySelectorAll('.modal__button modal__button-close');
modalButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        const modal = this.closest('.modal');
        modal.style.display = 'none';

        const anchor = document.querySelector(this.getAttribute('href'));
        if (anchor) {
            window.scrollTo({
                top: anchor.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});