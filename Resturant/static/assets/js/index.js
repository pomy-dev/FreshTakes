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

    // Sidebar Toggle Events
    menuBtn.addEventListener('click', () => {
        sideMenu.style.display = "block"
    })
    closeBtn.addEventListener('click', () => {
        sideMenu.style.display = "none"
    })

    // Theme Toggle
    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme-variables')
        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
    })

    // Sidebar Link Activation
    sideBarLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all links
            sideBarLinks.forEach(link => link.classList.remove('active'));
            // Add active class to the clicked link
            this.classList.add('active');
        });
    });

    // Modal Handling
    var modal = document.getElementById("myModal");
    var updateBtns = document.querySelectorAll("#edit");
    var deleteBtns = document.querySelectorAll("#delete");

    // Modal close actions
    document.querySelector(".modal .close").addEventListener("click", closeModal);
    document.querySelector(".modal .cancel").addEventListener("click", closeModal);

    // Open modal when any edit button is clicked
    updateBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const menuId = btn.getAttribute("data-id");
            const menuName = btn.getAttribute("data-name");
            const menuPrice = btn.getAttribute("data-price");
            const menuTime = btn.getAttribute("data-time");
            const menuCategory = btn.getAttribute("data-category");
            const menuDesc = btn.getAttribute("data-description");

            document.getElementById("menuId").value = menuId;
            document.getElementById("menuName").value = menuName;
            document.getElementById("menuPrice").value = menuPrice;
            document.getElementById("menuTime").value = menuTime;
            document.getElementById("menuCategory").value = menuCategory;
            document.getElementById("menuDesc").value = menuDesc;

            modal.style.display = "block";
        });
    });

    // Fetch CSRF token from cookies
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

    // Save Menu Changes
    async function saveMenuChanges() {
        const formData = new FormData();

        formData.append("csrfToken", csrfToken);
        formData.append("id", document.getElementById("menuId").value);
        formData.append("dish", document.getElementById("menuName").value);
        formData.append("price", document.getElementById("menuPrice").value);
        formData.append("time", document.getElementById("menuTime").value);
        formData.append("category", document.getElementById("menuCategory").value);
        formData.append("description", document.getElementById("menuDesc").value);

        fetch('/updatemeal/', {
            method: "POST",
            headers: {
                "X-CSRFToken": csrfToken
            },
            body: formData
        }).then(response => response.json()).then(data => {
            showToast(data.message);
            setTimeout(() => location.reload(), 2000);
        }).catch(error => {
            showToast(error);
            setTimeout(() => location.reload(), 2000);
        });
    }

    document.querySelector("#myModal form button[type='submit']").addEventListener('click', function (e) {
        e.preventDefault();
        saveMenuChanges();
    });

    // Delete Menu
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

    // Close Modal
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
