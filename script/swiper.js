const swiper = new Swiper('.MySwiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // breakpoints: {

    //     1280: {

    //     },

    //     1023: {
    //         slidesPerView: 2,
    //     },

    //     767: {
    //         slidesPerView: 1,
    //     },

    //     480: {
    //         slidesPerView: 1,
    //     },

    //     320: {
    //         slidesPerView: 1,
    //     }
    // }
});

// =======================

// Функция для инициализации слайдера
function initSlider(modal) {
    const slider = modal.querySelector('.modal__card-slider');
    const prevButton = modal.querySelector('.prev-button');
    const nextButton = modal.querySelector('.next-button');
    const slides = Array.from(slider.querySelectorAll('img'));
    const slideCount = slides.length;
    let slideIndex = 0;

    // Устанавливаем обработчики событий для кнопок
    prevButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);

    // Функция для показа предыдущего слайда
    function showPreviousSlide() {
        slideIndex = (slideIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }

    // Функция для показа следующего слайда
    function showNextSlide() {
        slideIndex = (slideIndex + 1) % slideCount;
        updateSlider();
    }

    // Функция для обновления отображения слайдера
    function updateSlider() {
        slides.forEach((slide, index) => {
            if (index === slideIndex) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    // Инициализация слайдера
    updateSlider();
}

// Получаем все модальные окна и инициализируем слайдеры для каждого
document.querySelectorAll('.modal').forEach(modal => {
    initSlider(modal);
});