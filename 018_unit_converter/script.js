const categorySelect = document.getElementById('category');
const inputValue = document.getElementById('input-value');
const inputUnitSelect = document.getElementById('input-unit');
const outputValue = document.getElementById('output-value');
const outputUnitSelect = document.getElementById('output-unit');

const units = {
    length: {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        micrometer: 0.000001,
        nanometer: 0.000000001,
        mile: 1609.34,
        yard: 0.9144,
        foot: 0.3048,
        inch: 0.0254
    },
    weight: {
        kilogram: 1,
        gram: 0.001,
        milligram: 0.000001,
        pound: 0.453592,
        ounce: 0.0283495
    },
    temperature: {
        celsius: { toBase: (c) => c, fromBase: (c) => c },
        fahrenheit: { toBase: (f) => (f - 32) * 5/9, fromBase: (c) => (c * 9/5) + 32 },
        kelvin: { toBase: (k) => k - 273.15, fromBase: (c) => c + 273.15 }
    }
};

function populateUnits() {
    const selectedCategory = categorySelect.value;
    const categoryUnits = units[selectedCategory];

    inputUnitSelect.innerHTML = '';
    outputUnitSelect.innerHTML = '';

    for (const unit in categoryUnits) {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit;
        inputUnitSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit;
        outputUnitSelect.appendChild(option2);
    }
    // Set default selections
    if (selectedCategory === 'length') {
        inputUnitSelect.value = 'meter';
        outputUnitSelect.value = 'kilometer';
    } else if (selectedCategory === 'weight') {
        inputUnitSelect.value = 'kilogram';
        outputUnitSelect.value = 'gram';
    } else if (selectedCategory === 'temperature') {
        inputUnitSelect.value = 'celsius';
        outputUnitSelect.value = 'fahrenheit';
    }
    convertUnit();
}

function convertUnit() {
    const selectedCategory = categorySelect.value;
    const inputVal = parseFloat(inputValue.value);
    const inputUnit = inputUnitSelect.value;
    const outputUnit = outputUnitSelect.value;

    if (isNaN(inputVal)) {
        outputValue.value = '';
        return;
    }

    let result;
    if (selectedCategory === 'temperature') {
        // Convert input to base (Celsius)
        const baseValue = units[selectedCategory][inputUnit].toBase(inputVal);
        // Convert base (Celsius) to output unit
        result = units[selectedCategory][outputUnit].fromBase(baseValue);
    } else {
        // Convert input to base (meter or kilogram)
        const baseValue = inputVal * units[selectedCategory][inputUnit];
        // Convert base to output unit
        result = baseValue / units[selectedCategory][outputUnit];
    }

    outputValue.value = result.toFixed(4); // 4 decimal places
}

categorySelect.addEventListener('change', populateUnits);
inputValue.addEventListener('input', convertUnit);
inputUnitSelect.addEventListener('change', convertUnit);
outputUnitSelect.addEventListener('change', convertUnit);

// Initial population and conversion
populateUnits();