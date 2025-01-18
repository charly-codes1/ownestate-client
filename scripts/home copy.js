
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    document.addEventListener('DOMContentLoaded', () => {
        const observerOptions = {
            root: null, // Use the viewport as the container
            rootMargin: '0px',
            threshold: 0.1 // Trigger animation when 10% of the section is visible
        };
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('floating');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);
    
        // Select all sections to be animated
        const sections = document.querySelectorAll('header, section, footer');
        sections.forEach(section => observer.observe(section));
    });
    