document.addEventListener("DOMContentLoaded", function () {

    const sideMenu = document.querySelector('aside');
    const menuBtn = document.querySelector('#menu_bar');
    const closeBtn = document.querySelector('.top-head #close_btn');
    const sideBarLinks = document.querySelectorAll('.sidebar a');
    const themeToggler = document.querySelector('.theme-toggler');

    // time format variables
    let currentDate = new Date();
    let formattedDate = currentDate.toDateString();

    // get current date
    document.querySelector(".date #time-display").textContent = formattedDate;

    menuBtn.addEventListener('click', () => {
        sideMenu.style.display = "block"
    })
    closeBtn.addEventListener('click', () => {
        sideMenu.style.display = "none"
    })
    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme-variables')
        themeToggler.querySelector('span:nth-child(1').classList.toggle('active')
        themeToggler.querySelector('span:nth-child(2').classList.toggle('active')
    })

    // tooggle sidebar links
    sideBarLinks.forEach(link => {
        link.addEventListener('click', function () {
            // remove all active links
            sideBarLinks.forEach(link => link.classList.remove('active'));

            // add active class to a link clicked
            this.classList.add('active');
        });
    });

    // Get the modal
    var modal = document.getElementById("myModal");

    var triggerBtns = document.querySelectorAll("#edit");

    var deleteBtns = document.querySelectorAll("#delete");

    // Get the <span> element that closes the modal
    document.querySelector(".modal .close").addEventListener("click", closeModal);
    document.querySelector(".modal .cancel").addEventListener("click", closeModal);

    // Open modal when any trigger button is clicked
    triggerBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            console.log('one')
            modal.style.display = "block";
        });
    });

    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            confirm("Are you sure you want Delete Item");
        });
    });

    // Close the modal when the close button is clicked
    function closeModal() {
        modal.style.display = "none";
    }

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});