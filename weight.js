
//Labels for charts (prototype use only, to be replaced by record submission dates)
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const weekdays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"
];

const dates = ["01/03/2022", "02/03/2022", "03/03/2022", "04/03/2022", "05/03/2022", "06/03/2022", "07/03/2022", "08/03/2022", "09/03/2022", "10/03/2022", "11/03/2022", "12/03/2022"
];


//User data for charts
const userHeight = 1.76;
const userAge = 40;
const userBMI = [];
const weightData = [75, 75, 73, 74, 71, 69, 68, 66, 66, 67, 64, 63];
const calorieData = [1500, 2300, 2000, 2150, 1700, 2500];
const calorieTarget = 2000;
const targetWeight = 65;
const currentWeight = weightData[weightData.length - 1];
const weightDifference = Math.abs(targetWeight - currentWeight);

//Fills modal with submission data
const weightModaltable = document.getElementById('weightModalData');
let i = 1;
weightData.forEach(function(){
    const modalRow1 = weightModaltable.insertRow(i);
    const cell1 = modalRow1.insertCell(0);
    cell1.innerHTML = dates[i-1];
    const cell2 = modalRow1.insertCell(1);
    cell2.innerHTML = weightData[i-1];
    i++;
})

//Calculates BMI and fills array with data
function getBMI(item, index, arr) {
    userBMI.push((arr[index] / (userHeight * userHeight)).toFixed(2));
}
weightData.forEach(getBMI);
//Then get current BMI
const currentBMI = userBMI[userBMI.length - 1];

//Setting messages for weight section
document.getElementById('targetWeight').innerHTML = `${targetWeight}KG`;
document.getElementById('currentWeight').innerHTML = `${currentWeight}KG`;
const weightMessage = document.getElementById('weightMessage');



function getWeightMessage(targetWeight, currentWeight) {
    if (targetWeight > currentWeight) {
        return `You are <b>${weightDifference}KG</b> below your target`
    }
    else if (targetWeight < currentWeight) {
        return `You are <b>${weightDifference}KG</b> above your target`
    }
    else {
        return `Well done, you're on target!`
    }
}

//Chart.js charts settings and config
const weightChart = new Chart(
    document.getElementById('weightchart'),
    {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Weight (KG)',
                backgroundColor: 'rgb(47, 168, 58)',
                borderColor: 'rgb(47, 168, 58)',
                data: weightData,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            elements: {
                line: {
                    borderJoinStyle: 'round',
                    tension: 0.3,
                },
                // point: {
                //     radius: 1
                // }
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        }
    }
);

