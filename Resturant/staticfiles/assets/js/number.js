// Variables for counting activities
let lunch = 0;
let breakfast = 0;
let beverages = 0;
let standAlone = 0;
let desserts = 0;

async function fetchActivities() {
  document.getElementById('loader').classList.remove('hidden');  // Show loader
  try {
    let response = await fetch('http://localhost:5000/api/activities');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    let activities = await response.json();
    document.getElementById('loader').classList.add('hidden');  // Hide loader

    // Process the activities data to update the variables
    processActivitiesData(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    document.getElementById('loader').innerText = 'Failed to load data';
  }
}

// Process the activities data to update the counts
function processActivitiesData(activities) {
  // Reset counts before processing
  lunch = 0;
  breakfast = 0;
  beverages = 0;
  standAlone = 0;
  desserts = 0;

  activities.forEach(activity => {
    const detail = activity.detail ? activity.detail.toLowerCase() : '';  // Safe check for detail

    if (detail.includes("menu") || detail.includes("lunch")) {
      lunch++;
    }
    if (detail.includes("desse")) {  // Fixed typo from 'Desse' to 'dessert'
      desserts++;
    }
    if (detail.includes("breakfast")) {
      breakfast++;
    }
    if (detail.includes("beverage")) {
      beverages++;
    }
    if (detail.includes("stand")) {  // Fixed typo from 'Stand-Alone' to 'stand alone'
      standAlone++;
    }
  });

  // Update the displayed counts in the HTML
  document.getElementById('lunch-count').textContent = lunch;
  document.getElementById('breakfast-count').textContent = breakfast;
  document.getElementById('stand').textContent = standAlone;
  document.getElementById('beverages-count').textContent = beverages;
  document.getElementById('desserts-count').textContent = desserts;

  // Optionally log the counts for debugging purposes
  console.log(`Lunch: ${lunch}`);
  console.log(`Breakfast: ${breakfast}`);
  console.log(`Beverages: ${beverages}`);
  console.log(`Stand Alone: ${standAlone}`);
  console.log(`Desserts: ${desserts}`);
}

// Ensure fetchActivities runs when the page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchActivities();
});
