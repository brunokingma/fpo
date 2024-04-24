
function initializeCarousel() {
    var items = document.querySelectorAll('.carousel .carousel-item')

    items.forEach((el) => {
        const minPerSlide = 4
        let next = el.nextElementSibling
        for (var i = 1; i < minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = items[0]
            }
            let cloneChild = next.cloneNode(true);
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    })


}

function initializeScrollSpy() {
    const mainNav = document.body.querySelector('#mainNav');

    if (mainNav) {
        mainNav.setAttribute('data-bs-spy', 'scroll');
        mainNav.setAttribute('data-bs-target', '#mainNav');
        mainNav.setAttribute('data-bs-offset', '74');

        // Activate ScrollSpy
        new bootstrap.ScrollSpy(mainNav);
    }
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
}



function popPolitica() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "block";
    }
}

function enviar() {
    // Get a reference to the form element
    var mailForm = document.getElementById("formularioContato");

    // Check if the form is valid
    if (mailForm.checkValidity()) {
        // Create a new FormData object to serialize the form data
        var formData = new FormData(mailForm);

        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Define the request method and URL
        xhr.open("POST", "mail.php", true);

        // Set up the onload event handler to handle the response
        xhr.onload = function () {
            // Check if the request was successful (status code 200)
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                // Check if the response indicates success
                if (response.success) {
                    document.getElementById("message_error").innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show" role="alert" id="success">
                        <strong>Atenção!</strong>  ${response.message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
                    mailForm.reset();
                } else {
                    document.getElementById("message_error").innerHTML =
                        `<div class="alert alert-danger alert-dismissible fade show" role="alert" id="error">
                        <strong>Atenção!</strong> ${response.message}-${response.details}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
                }
            } else {
                console.error("An error occurred during the request.");
                document.getElementById("message_error").innerHTML =
                    `<div class="alert alert-danger alert-dismissible fade show" role="alert" id="error">
                    <strong>Atenção!</strong> An error occurred during the request.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
            }
        };

        // Set up the onerror event handler to handle errors
        xhr.onerror = function () {
            console.error("An error occurred during the request.");
            document.getElementById("message_error").innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show" role="alert" id="error">
                <strong>Atenção!</strong> An error occurred during the request.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
        };

        // Send the request with the form data
        xhr.send(formData);
    } else {
        // Get all required elements
        var requiredElements = mailForm.querySelectorAll("[required]");

        // Loop through required elements and show error message if not valid
        for (var i = 0; i < requiredElements.length; i++) {
            var element = requiredElements[i];
            if (!element.checkValidity()) {
                var errorElement = document.getElementById("error_" + element.id);
                if (errorElement) {
                    errorElement.style.display = "block";
                }
            }
        }
    }
}
function setupResponsiveNavToggler() {
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = document.querySelectorAll('#navbarResponsive .nav-link');

    responsiveNavItems.forEach((responsiveNavItem) => {
        responsiveNavItem.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
}


initializeCarousel();
setupResponsiveNavToggler();
initializeScrollSpy();
popPolitica();
closeModal();