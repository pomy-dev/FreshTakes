const deleteBtns = document.querySelectorAll(".menu-outline .actions button[type='submit']");

document.getElementById('selectedMenu').addEventListener('change', function () {
  const selectedCategory = this.value;
  const categories = document.querySelectorAll('.menu-section');

  categories.forEach(section => {
    // Hide all sections first
    section.style.display = 'none';

    // Show the selected category
    if (section.id.toLowerCase() === selectedCategory.toLowerCase()) {
      section.style.display = 'block';
    }
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

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log('Clicked');

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
        // setTimeout(() => location.reload(), 2000);
      });
  });
});

// Show Toast
function showToast(message) {
  let toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // Toast disappears after 3 seconds
}
