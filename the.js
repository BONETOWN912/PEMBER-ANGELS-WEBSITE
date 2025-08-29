// Function to switch between visible sections on the page
function showSection(id) {
  // Hide all sections
  document.querySelectorAll('section').forEach(sec =>
    sec.classList.remove('active')
  );
  // Show the selected section by adding the "active" class
  document.getElementById(id).classList.add('active');
}

// Run this code only after the DOM (HTML content) is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Price calculator function (attached to the window object so it can be used from HTML)
  window.calculateTotal = function () {
    // Get pet details from form inputs
    const weight = parseInt(document.getElementById('petWeight').value);
    const cremation = document.getElementById('cremationPref').value;
    const petType = document.getElementById('petType').value;

    // Check optional checkboxes (use "?.checked" in case the element doesn't exist)
    const rush = document.getElementById('rush')?.checked || false;
    const weekend = document.getElementById('weekend')?.checked || false;
    const holiday = document.getElementById('holiday')?.checked || false;
    const aggressive = document.getElementById('aggressivePet')?.checked || false;

    // Validate weight input
    if (isNaN(weight) || weight <= 0) {
      alert("Please enter a valid pet weight.");
      return;
    }

    // Euthanasia base prices by pet type
    const euthanasiaPrices = {
      cat: 300,
      small: 325,
      medium: 360,
      large: 400,
      xlarge: 500,
      behavioral: 550
    };

    // Get base price for selected pet type
    let base = euthanasiaPrices[petType];

    // Cremation cost calculation based on type and weight
    let cremationCost = 0;
    if (cremation === "Communal") {
      if (weight <= 25) cremationCost = 100;
      else if (weight <= 50) cremationCost = 150;
      else if (weight <= 100) cremationCost = 200;
      else cremationCost = 250;
    } else if (cremation === "Private") {
      if (weight <= 10) cremationCost = 175;
      else if (weight <= 50) cremationCost = 200;
      else if (weight <= 80) cremationCost = 250;
      else if (weight <= 100) cremationCost = 300;
      else if (weight <= 150) cremationCost = 355;
      else cremationCost = 425;
    }

    // Calculate extra fees based on selected options
    let extra = 0;
    if (rush) extra += 200;       // Rush appointment fee
    if (weekend) extra += 50;     // Weekend appointment fee
    if (holiday) extra += 120;    // Holiday appointment fee
    if (aggressive) extra += 100; // Aggressive pet handling fee

    // Calculate subtotal, surcharge (3% card fee), and final total
    const subtotal = base + cremationCost + extra;
    const surcharge = subtotal * 0.03; // 3% of subtotal
    const total = subtotal + surcharge;

    // Show the total to the user
    alert(`Estimated Total Cost (with 3% card fee): $${total.toFixed(2)}`);
  };

  // Euthanasia application form submission handler
  const appForm = document.getElementById("applicationForm");
  if (appForm) {
    appForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent page reload
      alert("Thank you for your application. A member of our team will review this and reach out to you within 48 hours.");
      appForm.reset(); // Clear form inputs
    });
  }
});

// Simple mobile navigation toggle (show/hide menu)
document.querySelector('.nav-toggle').onclick = function() {
  document.querySelector('.nav-links').classList.toggle('active');
};
