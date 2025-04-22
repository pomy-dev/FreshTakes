// Sample booking data
const bookings = [
  { id: 1, name: "John Doe", details: "Hello, Would like to have your cooking service offer at my wedding, on the 15th of March 2024. And please let me know how much you charge for such events. Thank you.", status: "confirmed", contact: "76123456", bookingDate: "2025-03-15" },
  { id: 2, name: "Jane Smith", details: "Standard Room", status: "pending", contact: "76123456", bookingDate: "2025-03-16" },
  { id: 3, name: "Chris Johnson", details: "Executive Room", status: "cancelled", contact: "76123456", bookingDate: "2025-03-17" },
  { id: 4, name: "Emily Davis", details: "Presidential Suite", status: "confirmed", contact: "76123456", bookingDate: "2025-03-18" },
  { id: 5, name: "Michael Brown", details: "Standard Room", status: "pending", contact: "76123456", bookingDate: "2025-03-19" }
];

// Function to display bookings in the table
function displayBookings(filterStatus = "all") {
  const tableBody = document.getElementById("booking-table-body");
  tableBody.innerHTML = ""; // Clear previous rows

  // Filter bookings by status
  const filteredBookings = bookings.filter(booking => filterStatus === "all" || booking.status.toLowerCase() === filterStatus.toLowerCase());

  // Populate table rows
  filteredBookings.forEach(booking => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${booking.id}</td>
      <td>${booking.name}</td>
      <td class="ellipses">${booking.details}</td>
      <td>${booking.status}</td>
      <td>${booking.contact}</td>
      <td>${booking.bookingDate}</td>
      <td><input type="radio" name="booking" value='${booking.id}' onclick="showBooking(${booking.id})"/></td>
    `;

    tableBody.appendChild(row);
  });
}

// Event listener for the filter dropdown
document.getElementById("status-filter").addEventListener("change", (event) => {
  const selectedStatus = event.target.value;
  displayBookings(selectedStatus);
});

// Initial load of all bookings
displayBookings();

let selectedBooking = document.querySelector("td input[type='radio']:checked");
selectedBooking.addEventListener()

function showBooking(bookingId) {
  const booking = bookings.find(detail => detail.id === bookingId);
  if (!booking) return;

  // Clear the previous chat
  const decideBoard = document.querySelector(".sales-analytics");
  decideBoard.innerHTML = "<h2>Accept OR Decline</h2>";

  // Populate the chart with the selected message
  let board = document.createElement('div');
  board.classList.add('board');

  board.innerHTML = `
    <div class="recieved-booking">
      <div class="booking-ref">
        <div class="icon">
          <span class="material-symbols-sharp" style="color:#111e88;">book_online</span>
        </div>&nbsp;&nbsp;
        <span>Booking Number: ${booking.id}</span>
      </div>
      <p>${booking.details}</p>
    </div>
    
    <div class="action-Btns">
      <button class="accept" type="submit" onclick="acceptMsg()">Accept</button>
      <button class="decline" type="submit" onclick="declineMsg()">Decline</button>
    </div>
  `;

  decideBoard.appendChild(board);
}

function declineMsg() {
  // send message to user that his request is declined
  window.location.reload();
}

function acceptMsg() {
  // send message to user that his request is declined
} 