import React from 'react';

const getUnitLabel = (unit) => {
    if (unit === 'per sqr-ft') {
        return "Area (Square Feet)";
    }
    else if (unit === "per meter") {
        return "Length (Meter)";
    }
    else if (unit === "per floor") {
        return "Number of Floors";
    }
    else if (unit === "per hour") {
        return "Hours";
    }
    else if (unit === "per day") {
        return "Day";
    }
    else {
        return "Quantity"
    }

};

export default getUnitLabel;
