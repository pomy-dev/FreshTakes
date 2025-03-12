const nextButton = document.querySelector('nav .next');
const prevButton = document.querySelector('nav .prev');
const submitButton = document.querySelector('nav .submit');
const indicatorSteps = document.querySelectorAll('.indicator');
const formShow = document.querySelectorAll('.form-child');
let active = 1;
let currentDate = new Date();
let formattedDate = currentDate.toDateString();

// get current date
document.getElementById("month").textContent = formattedDate;

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

// input value transfer
document.querySelector('.fname').addEventListener('keyup', function () {
    document.querySelector('.firstname').innerHTML = this.value;
})
document.querySelector('.lname').addEventListener('keyup', function () {
    document.querySelector('.lastname').innerHTML = this.value;
})
document.querySelector('select[name="country"]').addEventListener('change', function () {
    document.querySelector('.nationality').innerHTML = this.value;
})
document.querySelector('input[name="birth_date"]').addEventListener('keyup', function () {
    document.querySelector('.date').innerHTML = this.value;
})
document.querySelector('input[name="birth_month"]').addEventListener('keyup', function () {
    const date = new Date();
    date.setMonth(this.value - 1);
    month_name = date.toLocaleDateString('en-US', {
        month: 'long',
    });
    if (!this.value) month_name = '';
    document.querySelector('.month').innerHTML = month_name;
})
document.querySelector('input[name="birth_year"]').addEventListener('keyup', function () {
    document.querySelector('.year').innerHTML = this.value;
})