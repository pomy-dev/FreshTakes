document.addEventListener("DOMContentLoaded", () => {
  console.log("User movement tracking started...");

  // Array to store individual events
  let userActivity = [];

  // Helper function to log events
  function logEvent(type, detail) {
    const timestamp = new Date(); // Create a new Date object
    userActivity.push({ type, timestamp, detail });
    console.log(`Event Logged: Type - ${type}, Detail - ${detail}`); // Log the event to the console
  }

  // Track clicks on buttons, links, and divs
  document.addEventListener("click", (event) => {
    console.log("Clicked element:", event.target);

    // Check if the clicked element is a button
    if (event.target.tagName === "BUTTON") {
      logEvent("buttonClick", event.target.innerText.trim());
    }
    // Check if the clicked element is a link
    else if (event.target.tagName === "A") {
      logEvent("linkClick", event.target.innerText.trim());
    }
    // Check if the clicked element is a div
    else if (event.target.tagName === "DIV") {
      logEvent("divClick", event.target.innerText.trim());
    } else {
      console.log("Clicked: Not a button, link, or div. Ignored.");
    }
  });

  // Track dropdown (select) changes and log the selected text
  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", (event) => {
      const selectedText = event.target.options[event.target.selectedIndex].text;
      logEvent("selectChange", selectedText);
    });
  });

  // Function to process events into a single detail string and capture the last event's timestamp
  function processUserActivity() {
    if (userActivity.length === 0) return { detail: "", timestamp: null };

    // Combine details into a single path
    const finalDetail = userActivity.map(e => e.detail).join(" -> ");
    // Get the timestamp of the last event and format it
    const lastTimestamp = formatTimestamp(userActivity[userActivity.length - 1].timestamp);

    return { detail: finalDetail, timestamp: lastTimestamp };
  }

  // Function to format timestamp in local time zone
  function formatTimestamp(date) {
    // Create a new Date object from the UTC timestamp
    const localTime = new Date(date); // This converts the UTC date to the local timezone based on the environment

    // Format to South African locale with 24-hour format
    return localTime.toLocaleString('en-ZA', {
      hour12: false, // 24-hour format
      timeZone: 'Africa/Johannesburg' // South Africa Time Zone
    });
  }

  // Function to post final activity to a URL
  function postUserActivity(activity) {
    const url = "http://localhost:5000/api/activities"; // Replace with actual endpoint URL
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activity),
      keepalive: true
    })
      .then(response => {
        console.log("Activity posted successfully:", response.status);
      })
      .catch(error => {
        console.error("Error posting activity:", error);
      });
  }

  // Save and post the final user activity object before refresh or unload
  window.addEventListener("beforeunload", () => {
    const finalActivity = processUserActivity();
    finalActivity.pageName = window.location.pathname.split('/').pop() || window.location.pathname;
    console.log("Final user activity:", JSON.stringify(finalActivity, null, 2));

    // Post the final activity to the server
    postUserActivity(finalActivity);
  });

  // Load and log previous activity for reference
  const storedActivity = localStorage.getItem("userActivity");
  if (storedActivity) {
    const previousActivity = JSON.parse(storedActivity);
    console.log("Previous session final activity:", JSON.stringify(previousActivity, null, 2));
  }
});