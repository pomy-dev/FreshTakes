document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector('nav .next');
    const prevButton = document.querySelector('nav .prev');
    const submitButton = document.querySelector('nav .submit');
    const indicatorSteps = document.querySelectorAll('.indicator');
    const formShow = document.querySelectorAll('.form-child');
    const buttonUpload = document.querySelector("button[type='submit']");
    let active = 1;

    nextButton.addEventListener('click', () => {
        active++;
        if (active > indicatorSteps.length) {
            active = indicatorSteps.length;
        }
        updateProgress();
    });

    prevButton.addEventListener('click', () => {
        active--;
        if (active < 1) {
            active = 1;
        }
        updateProgress();
    });

    const updateProgress = () => {
        if (indicatorSteps.length == active) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }

        // toggle .active class for list item
        indicatorSteps.forEach((step, i) => {
            if (i == (active - 1)) {
                step.classList.add('active');
                formShow[i].classList.add('active');
            } else {
                step.classList.remove('active');
                formShow[i].classList.remove('active');
            }
        });

        // faculty selected
        var selected_studies = document.querySelectorAll('input[type="radio"]'),
            selected_studies_html = '';
        for (var study of selected_studies) {
            if (study.checked) {
                let parent = study.closest('.faculty'),
                    study_name = study.value,
                    faculty = parent.querySelector('h3').innerHTML;
                icon = parent.querySelector('.icon').outerHTML;

                selected_studies_html += `
                    <div class="faculty">
                        ${icon}
                        <h3>${faculty}</h3>
                        <span>${study_name}</span>
                    </div> 
                `;
            }
        }
        document.querySelector('.field-selected').innerHTML = selected_studies_html;
    }


    // add menu preview
    const uploadedDishes = document.querySelector(".sales-analytics");
    const showOrLess = document.querySelector(".show-more")
    const showBtn = document.querySelector(".show-more a")

    let today_dishes = uploadedDishes.children;

    function updateUploads() {
        if (today_dishes.length >= 5) {
            showOrLess.style.display = 'block';
            uploadedDishes.style.overflowY = 'scroll';
            uploadedDishes.scrollTop = 0;
        } else {
            showOrLess.style.display = 'none';
        }

        // showBtn.addEventListener('click', function (e) {
        //     e.preventDefault();

        //     if (showBtn.textContent === 'Show All') {
        //         setTimeout(() => {
        //             uploadedDishes.scrollTop = uploadedDishes.scrollHeight
        //         }, 200);
        //         // showBtn.textContent = 'Show Less'
        //     } else {
        //         setTimeout(() => {
        //             uploadedDishes.scrollTop = 0;
        //         }, 200);
        //         // showBtn.textContent = 'Show All'
        //     }
        // });
    }

    // updateUploads();

    // photo preview
    document.querySelector('input[name="photo"]').addEventListener('change', function (e) {
        var output = document.querySelector('.photo');
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src); // free memory
        }
    })

    buttonUpload.addEventListener('submit', updateSelectedMeals);
    // buttonUpload.addEventListener('submit', pushToDB);

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

    function updateSelectedMeals() {

        pushToDB();

        active = 1;
        updateProgress();
    }

    async function pushToDB(event) {
        event.preventDefault();

        const csrfToken = getCSRFToken(); // Function to get CSRF token from cookies
        if (!csrfToken) {
            alert("CSRF token missing!");
            return;
        }

        let selectedCategory = document.querySelector("input[type='radio']:checked");
        if (!selectedCategory) {
            alert("Category not selected! Please select a meal category.");
            return;
        }
        let category = selectedCategory.value;

        // Create a FormData object for form-encoded submission
        let formData = new FormData();
        formData.append("csrfmiddlewaretoken", csrfToken);

        // Retrieve the file
        let fileInput = document.querySelector("input[name='photo']");
        if (fileInput.files.length > 0) {
            formData.append("photo", fileInput.files[0]); // Append image file
        } else {
            alert("Please select meal image!");
            return;
        }

        formData.append("faculty", category);
        formData.append("dish", document.querySelector("input[name='dish']").value);
        formData.append("price", document.querySelector("input[name='price']").value);
        formData.append("time", document.querySelector("input[name='time']").value);
        formData.append("story", document.querySelector("textarea[name='story']").value);

        try {
            // Send data to Django using Fetch API
            fetch("/addmenu/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
                body: formData
            }).then(response => response.json()).then(data => {
                console.log(`Response Data: ${data}`);
            }).catch(error => {
                console.log(`=======${error}=======`);
                console.log(option);
                alert(`Error submitting data: ${error}`);
            });

        } catch (error) {
            alert(`Failed to send request: ${error}`);
        }
    }

});