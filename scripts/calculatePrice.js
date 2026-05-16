const pricingForm = document.getElementById('pricing-form');
const priceResult = document.getElementById('price-result');

function resetTotal() {
    priceResult.textContent = "";
}

// Function to calculate total price based on form inputs
function calculateTotal() {
    const petWeightInput = document.getElementById('pet-weight').value.trim();
    const petWeight = parseInt(petWeightInput, 10);
    const petType = document.getElementById('pet-type').value;
    const petLocation = document.getElementById('pet-location').value;
    const petDisposition = document.getElementById('pet-disposition').value;
    let errorString = "";
    if (!petType) {
        errorString += "Please select a pet type.\n";
    }
    if (!petWeightInput || Number.isNaN(petWeight)) {
        errorString += "Please enter a valid pet weight in lbs.\n";
    }
    if (!petLocation) {
        errorString += "Please select a location.\n";
    }
    if (!petDisposition) {
        errorString += "Please select a final disposition.\n";
    }
    if (errorString !== "") {
        console.log("Error calculating price:", errorString);
        priceResult.textContent = errorString;
        return;
    }
    let cost = 0
    // Base price by pet type
    switch (petType) {
        case "cat":
            cost += 300;
            break;  
        case "dog":
            if (petWeight <= 20) {
                cost += 325;
            } else if (petWeight <= 50) {
                cost += 360;
            } else if (petWeight <= 100) {
                cost += 400;
            } else if (petWeight <= 200) {
                cost += 500;
            } else {
                cost += 550; // For dogs over 200 lbs or with aggressive behavior
            }
    }
    switch (petDisposition) {
        case "private_cremation":
            cost += 325;
            switch (petLocation) {
                case "Westchester":
                    cost += 50;
                    break;
                case "Putnam":
                    cost += 75;
                    break;
                case "Rockland":
                    cost += 105;
                    break;
                case "Orange":
                    cost += 110;
                    break;
                case "other":
                    priceResult.textContent = "Please contact us for a custom quote for locations outside of Westchester, Putnam, Rockland, and Orange counties.";
                    return
            }
            break;  
        case "communal_cremation":
            cost += 110;
            break;
        case "burial":
            cost += 0;
            break;
    }
    priceResult.textContent = `Estimated Price: $${cost.toFixed(2)}`;
}