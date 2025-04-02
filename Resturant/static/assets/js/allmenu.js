document.getElementById('selectedMenu').addEventListener('change', function () {
  const selectedCategory = this.value;
  const categories = document.querySelectorAll('.menu-section');
  const deleteBtn = document.querySelector(".menu-outline .actions button[type='delete']");

  categories.forEach(section => {
    // Hide all sections first
    section.style.display = 'none';

    // Show the selected category
    if (section.id.toLowerCase() === selectedCategory.toLowerCase()) {
      section.style.display = 'block';
    }
  });

  deleteBtn.forEach((btn) => {
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
});
