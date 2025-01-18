$(document).ready(function() {
    $(".background-carousel").owlCarousel({
        items: 1, // Number of items to display
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000, // Time between slides
        autoplayHoverPause: false,
        animateOut: 'fadeOut', // Fade out effect
        animateIn: 'fadeIn' // Fade in effect
    });
});