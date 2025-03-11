(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
			576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("callbackForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default redirection

        let isValid = true;
        const email = document.getElementById("mail").value.trim();
        const mobile = document.getElementById("mobile").value.trim();

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert("❌ Please enter a valid email address.");
            isValid = false;
        }

        const mobilePattern = /^[6789]\d{9}$/;
        if (!mobilePattern.test(mobile)) {
            alert("❌ Please enter a valid 10-digit Indian mobile number.");
            isValid = false;
        }

        if (isValid) {
            // Send form data via AJAX to FormSubmit
            fetch("https://formsubmit.co/fb3f20343b627cd37749d3bd4acb36ba", {
                method: "POST",
                body: new FormData(form),
            })
            .then(response => response.ok ? showSuccessMessage() : alert("❌ Error submitting form."))
            .catch(error => alert("❌ Something went wrong!"));
        }
    });

    function showSuccessMessage() {
        document.getElementById("callbackForm").innerHTML = `
            <div class="alert alert-success text-center">
                ✅ Thank you! Your request has been submitted.
            </div>`;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Newsletter Subscription Function
    window.subscribeNewsletter = function (event) {
        event.preventDefault(); // Prevent page reload

        const emailInput = document.getElementById("newsletter-email");
        const messageDiv = document.getElementById("newsletter-message");

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            messageDiv.innerHTML = `<div class="alert alert-danger">❌ Please enter a valid email.</div>`;
            return false;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("email", emailInput.value.trim());

        // Send data to FormSubmit (or your backend)
        fetch("https://formsubmit.co/fb3f20343b627cd37749d3bd4acb36ba", {
            method: "POST",
            body: formData,
        })
        .then(response => response.ok ? showSuccessMessage() : showErrorMessage())
        .catch(() => showErrorMessage());

        return false; // Prevent default form submission
    };

    function showSuccessMessage() {
        document.getElementById("newsletter-message").innerHTML = 
            `<div class="alert alert-success">✅ Subscribed successfully!</div>`;
        document.getElementById("newsletter-form").reset();
    }

    function showErrorMessage() {
        document.getElementById("newsletter-message").innerHTML = 
            `<div class="alert alert-danger">❌ Subscription failed. Try again later.</div>`;
    }
});


