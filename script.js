/*
    Unit Converter Script
    - Supports conversions for Length, Weight, Temperature, Speed, and Volume.
    - Uses an object to store conversion rates.
    - Provides an option to switch between units dynamically.
*/

// Conversion factors for different unit categories
const units = {
    length: { meters: 1, kilometers: 0.001, miles: 0.000621371, feet: 3.28084, inches: 39.3701, yards: 1.09361 },
    weight: { kilograms: 1, grams: 1000, pounds: 2.20462, ounces: 35.274, stones: 0.157473 },
    temperature: {}, // Handled separately
    speed: { "meters per second": 1, "kilometers per hour": 3.6, "miles per hour": 2.23694, "knots": 1.94384 },
    volume: { liters: 1, milliliters: 1000, gallons: 0.264172, quarts: 1.05669 }
};

// Function to populate unit dropdowns based on selected category
function populateUnits() {
    let category = document.getElementById("category").value;
    let fromUnit = document.getElementById("fromUnit");
    let toUnit = document.getElementById("toUnit");
    
    // Clear previous options
    fromUnit.innerHTML = toUnit.innerHTML = "";

    if (category === "temperature") {
        // Special case: Temperature conversions
        fromUnit.innerHTML = toUnit.innerHTML = `
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>`;
    } else {
        // Populate units based on category
        for (let unit in units[category]) {
            fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        }
    }
}

// Function to perform the unit conversion
function convert() {
    let category = document.getElementById("category").value;
    let value = parseFloat(document.getElementById("inputValue").value);
    let from = document.getElementById("fromUnit").value;
    let to = document.getElementById("toUnit").value;
    let result = document.getElementById("result");

    if (isNaN(value)) {
        result.innerText = "Please enter a valid number.";
        return;
    }

    if (category === "temperature") {
        // Handle temperature conversions separately
        result.innerText = convertTemperature(value, from, to);
    } else {
        // Convert value to base unit and then to target unit
        let baseValue = value / units[category][from];  
        let convertedValue = baseValue * units[category][to];  
        result.innerText = `${value} ${from} = ${convertedValue.toFixed(2)} ${to}`;
    }
}

// Function to handle temperature conversions
function convertTemperature(value, from, to) {
    if (from === to) return `${value} ${to}`;
    
    if (from === "celsius" && to === "fahrenheit") return `${(value * 9/5 + 32).toFixed(2)} °F`;
    if (from === "celsius" && to === "kelvin") return `${(value + 273.15).toFixed(2)} K`;
    if (from === "fahrenheit" && to === "celsius") return `${((value - 32) * 5/9).toFixed(2)} °C`;
    if (from === "fahrenheit" && to === "kelvin") return `${((value - 32) * 5/9 + 273.15).toFixed(2)} K`;
    if (from === "kelvin" && to === "celsius") return `${(value - 273.15).toFixed(2)} °C`;
    if (from === "kelvin" && to === "fahrenheit") return `${((value - 273.15) * 9/5 + 32).toFixed(2)} °F`;
}

// Initialize unit options on page load
populateUnits();
