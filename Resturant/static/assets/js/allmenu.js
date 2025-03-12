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
