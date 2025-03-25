const mealCategoryCtx = document.getElementById('mealCategoryChart').getContext('2d');
new Chart(mealCategoryCtx, {
  type: 'bar',
  data: {
    labels: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
    datasets: [{
      label: 'People Count',
      data: [120, 230, 310, 150],
      backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1']
    }]
  }
});

const websiteVisitsCtx = document.getElementById('websiteVisitsChart').getContext('2d');
new Chart(websiteVisitsCtx, {
  type: 'line',
  data: {
    labels: ['06:59 am - 10:59 am', '11:01 am - 14:59 pm', '15:01 pm - 00:00 pm'],
    datasets: [{
      label: 'Website Visits',
      data: [200, 450, 300],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  }
});