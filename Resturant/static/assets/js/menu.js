document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector('nav .next');
    const prevButton = document.querySelector('nav .prev');
    const submitButton = document.querySelector('nav .submit');
    const indicatorSteps = document.querySelectorAll('.indicator');
    const formShow = document.querySelectorAll('.form-child');
    const buttonUpload = document.querySelector("button[type='submit']");
    let active = 1;
    let categoryItem = '';

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
        var selected_studies = document.querySelectorAll('input[type="radio"]:checked'),
            selected_studies_html = '';
        for (var study of selected_studies) {
            if (study.checked) {
                categoryItem = study.value

                let parent = study.closest('.faculty'),
                    study_name = study.value,
                    faculty = parent.querySelector('h3').innerHTML;
                icon = parent.querySelector('.icon').outerHTML;

                selected_studies_html += `
            <div class="faculty">
                ${icon}
                <h3>${faculty}</h3>
                <span>${study_name}</span>
            </div> `;
            }
        }
        document.querySelector('.field-selected').innerHTML = selected_studies_html;
    }

    // photo preview
    document.querySelector('input[name="photo"]').addEventListener('change', function (e) {
        var output = document.querySelector('.photo');
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src); // free memory
        }
    })

    // buttonUpload.addEventListener('click', () => updateSelectedMeals());
    buttonUpload.addEventListener('click', () => {
        let isIt = confirm(`Are you checking: ${categoryItem}`)
        pushToDB()
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

    // add menu
    const selectedContainer = document.querySelector(".sales-analytics");

    function updateSelectedMeals() {

        pushToDB();

        let mealName = document.querySelector("input[name='dish']").value;
        let price = document.querySelector("input[name='price']").value;
        let time = document.querySelector("input[name='time']").value;
        let descr = document.querySelector("textarea[name='story']").value;

        // Get all checked radio buttons
        const selectedRadios = document.querySelectorAll("input[type='radio']:checked");

        selectedRadios.forEach((radio) => {
            const category = radio.name.match(/\[(.*?)\]/)[1]; // Extract category from name attribute
            const categoryKind = radio.value;

            // Create a new div for the selected category
            const mealPrev = document.createElement("div");
            mealPrev.classList.add("item");
            mealPrev.classList.add("onlion");

            // Assign appropriate icons (You can modify the icons based on category)
            let img = "cook.png"; // Default icon
            if (category === "salads") img = "salad";
            else if (category === "meat") img = "meat";
            else if (category === "starch") img = "starch";
            else if (category === "relishes") img = "relish";
            else if (category === "consumables") img = "consumables";

            // Construct the HTML for the sidebar preview
            mealPrev.innerHTML = `
                <div class="icon">
                    <span class="material-symbols-sharp">done_all</span>
                </div>
                <div class="right_text">
                    <div class="info">
                        <h3>${mealName}</h3>
                        <small class="text-muted">${descr}</small>
                    </div>
                    <h5 class="primary">E${price}</h5>
                    <h3>${categoryKind.charAt(0).toUpperCase() + categoryKind.slice(1)} Category</h3>
                </div>
            `;

            selectedContainer.appendChild(mealPrev);

            document.querySelector("input[name='dish']").value = "";
            document.querySelector("input[name='price']").value = "";
            document.querySelector("input[name='time']").value = "";
            document.querySelector("input[name='photo']").value = "";
            document.querySelector("textarea[name='story']").value = "";
        });

        document.querySelectorAll("input[type='radio']").forEach(radio => {
            radio.checked = false;
            document.querySelector('.field-selected').innerHTML = ""
        });

        active = 1;
        updateProgress();
    }

    async function pushToDB() {

        const formData = new FormData(document.querySelector("form"));

        // Append form values to FormData
        formData.append("category", categoryItem); // Store categories as JSON
        formData.append("dish", document.querySelector("input[name='dish']").value);
        formData.append("price", document.querySelector("input[name='price']").value);
        formData.append("time", document.querySelector("input[name='time']").value); // Get uploaded file
        formData.append("story", document.querySelector("textarea[name='story']").value);


        const csrfToken = getCSRFToken(); // Function to get CSRF token from cookies
        if (!csrfToken) {
            alert("CSRF token missing!");
            return;
        }

        try {
            // Send data to Django using Fetch API
            const response = await fetch("/addmenu", {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRFToken": csrfToken
                }
            });
            const data = await response.json();

            if (response.ok) {
                console.log("Success:", data);
                updateSelectedMeals();
            } else {
                alert("Error uploading menu. Please try again.");
            }

        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to send request.");
        }
    }


});