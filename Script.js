const form = document.getElementById('booking-form');
const bookingsList = document.getElementById('bookings-list');

let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

function renderBookings() {
  if (bookings.length === 0) {
    bookingsList.innerHTML = '<p>No bookings yet.</p>';
    return;
  }

  bookingsList.innerHTML = '';
  bookings.forEach((booking, index) => {
    const div = document.createElement('div');
    div.className = 'booking-item';
    div.innerHTML = `
      <strong>${booking.name}</strong> booked <em>${booking.venue}</em> on <strong>${booking.date}</strong> for <strong>${booking.attendees}</strong> attendees.
    `;
    bookingsList.appendChild(div);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const venue = form.venue.value;
  const date = form.date.value;
  const attendees = form.attendees.value;

  if (!name || !venue || !date || !attendees) {
    alert('Please fill in all required fields.');
    return;
  }

  // Optional: check for duplicate booking by same user on same date and venue
  const duplicate = bookings.find(b => b.name === name && b.venue === venue && b.date === date);
  if (duplicate) {
    alert('You have already booked this venue on the selected date.');
    return;
  }

  const newBooking = { name, venue, date, attendees };
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));

  renderBookings();
  form.reset();
  alert('Venue booked successfully!');
});

// Initial render
renderBookings();
