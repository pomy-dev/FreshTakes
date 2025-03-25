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

    var updateBtns = document.querySelectorAll("#edit");

    var deleteBtns = document.querySelectorAll("#delete");

    // Get the <span> element that closes the modal
    document.querySelector(".modal .close").addEventListener("click", closeModal);
    document.querySelector(".modal .cancel").addEventListener("click", closeModal);

    // Open modal when any trigger button is clicked
    updateBtns.forEach(btn => {

        // Get data attributes from the clicked button
        const menuId = btn.getAttribute("data-id");
        const menuName = btn.getAttribute("data-name");
        const menuPrice = btn.getAttribute("data-price");
        const menuTime = btn.getAttribute("data-time");
        const menuCategory = btn.getAttribute("data-category");
        const menuDesc = btn.getAttribute("data-description");

        btn.addEventListener("click", function () {

            // Set modal fields with the row data
            document.getElementById("menuId").value = menuId;
            document.getElementById("menuName").value = menuName;
            document.getElementById("menuPrice").value = menuPrice;
            document.getElementById("menuTime").value = menuTime;
            document.getElementById("menuCategory").value = menuCategory;
            document.getElementById("menuDesc").value = menuDesc;

            console.log(`===fetched meal===:${menuId}======`);

            modal.style.display = "block";
        });
    });

    function getCSRFToken() {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith('csrftoken=')) {
                    cookieValue = cookie.substring('csrftoken='.length, cookie.length);
                    break;
                }
            }
        }
        return cookieValue;
    }


    const csrfToken = getCSRFToken();

    // save changes made from and on the modal
    async function saveMenuChanges() {
        const formData = new FormData();

        let id = document.getElementById("menuId").value;
        let dish = document.getElementById("menuName").value;
        let price = document.getElementById("menuPrice").value;
        let time = document.getElementById("menuTime").value;
        let category = document.getElementById("menuCategory").value;
        let desc = document.getElementById("menuDesc").value;

        formData.append("csrfToken", csrfToken)
        formData.append("id", id)
        formData.append("dish", dish)
        formData.append("price", price)
        formData.append("time", time)
        formData.append("category", category)
        formData.append("description", desc)

        fetch('/updatemenu/', {
            method: "POST",
            headers: {
                "X-CSRFToken": csrfToken
            },
            body: formData
        }).then(response => response.json()).then(data => {
            showToast(data.message)
            setTimeout(() => location.reload(), 2000);
        }).catch(error => {
            showToast(error)
            setTimeout(() => location.reload(), 2000);
        })

    }

    document.querySelector("#myModal form button[type='submit']").addEventListener('click', function () {
        saveMenuChanges();
    });

    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            if (!confirm("Are you sure you want to delete this meal?")) {
                return;
            }

            let mealId = btn.getAttribute('data-id');

            const formData = new FormData();
            formData.append("id", mealId);

            fetch('/deletemenu/', {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
                body: formData
            }).then(response => response.json())
                .then(data => {
                    showToast(data.message);
                    setTimeout(() => location.reload(), 2000);
                })
                .catch(error => {
                    showToast(error);
                    setTimeout(() => location.reload(), 2000);
                });
        });
    });

    // Close the modal when the close button is clicked
    function closeModal() {
        modal.style.display = "none";
    }

    // Show Toast
    function showToast(message) {
        let toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000); // Toast disappears after 3 seconds
    }

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});