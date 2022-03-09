//Side nav bar JS
const sideNav = document.getElementById('sideNav');
const burger = document.getElementById('burger');

function openSideNav() {
    burger.setAttribute('onclick', 'closeSideNav()')
    sideNav.style.visibility = 'visible';
    burger.textContent = "X";

}

function closeSideNav() {
    burger.setAttribute('onclick', 'openSideNav()')
    sideNav.style.visibility = 'hidden'
    burger.textContent = "☰";
}

//Labels for charts (prototype use only, to be replaced by record submission dates)
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const weekdays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"
];

//User data for charts
const userHeight = 1.76;
const userAge = 40;
const maxHeartRate = 220 - userAge;
const userBMI = [];
const weightData = [75, 75, 73, 74, 71, 69, 68, 66, 66, 67, 64, 63];
const heartRates = [55, 65, 57, 58, 59, 62]
const calorieData = [1500, 2300, 2000, 2150, 1700, 2500];
const calorieTarget = 2000;
const targetWeight = 65;
const currentWeight = weightData[weightData.length - 1];
const weightDifference = Math.abs(targetWeight - currentWeight);

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

weightMessage.innerHTML = getWeightMessage(targetWeight, currentWeight);

//Setting messages for BMI section
document.getElementById('currentBMI').innerHTML = currentBMI;

function getBMIMessage(currentbmi) {
    if (currentBMI <= 18.5) { return `You are currently <span style="color:blue"><b>underweight</b></span>`; }
    if (currentBMI <= 24.9) { return `You are within a <span style="color:green"><b>healthy range</b></span>`; }
    return `You are currently <span style="color:red"><b>overweight</b></span>`;
}

document.getElementById('bmiMessage').innerHTML = getBMIMessage(currentBMI);

//Setting messages for heart rate section
const maxRateMessage = document.getElementById('maxheartrate');
maxRateMessage.innerHTML = `${maxHeartRate}BPM`;

// function getRateMessage(heartRate){
//     if(heartRate >) 
//     }
// }

//Setting messages for calorie section
document.getElementById('dailyCalTarget').innerHTML = `<b>${calorieTarget}</b>`;

//Gets average of array values
const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

const avgFig = arrAvg(calorieData);
const calorieAvg = document.getElementById("dailyCalorieAvg").innerHTML = Math.round(avgFig);
const caloriesDeficit = calorieAvg - calorieTarget;
const calorieMessage = document.getElementById('calorieMessage')
calorieMessage.innerHTML = calorieAvg >= calorieTarget ? `You are above your target by <b>${caloriesDeficit}</b> calories` : `You are below your target by <b>${Math.abs(caloriesDeficit)}</b> calories`

//Chart.js charts settings and config
const weightChart = new Chart(
    document.getElementById('weightchart'),
    {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Weight (KG)',
                backgroundColor: 'rgb(2, 123, 255)',
                borderColor: 'rgb(2, 123, 255)',
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
                point: {
                    radius: 0
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        }
    }
);
const calorieChart = new Chart(
    document.getElementById('caloriechart'),
    {
        type: 'bar',
        data: {
            labels: weekdays,
            datasets: [{
                label: 'Calories',
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(225, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderWidth: 2,
                borderColor: '#777',
                data: calorieData,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            elements: {
                line: {
                    borderJoinStyle: 'round',
                    tension: 0.3,
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        }
    }
);

const bmiChart = new Chart(
    document.getElementById('bmichart'),
    {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'BMI',
                fill: false,
                backgroundColor: 'rgb(2, 123, 255)',
                borderColor: 'rgb(2, 123, 255)',
                data: userBMI,
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
                point: {
                    radius: 0
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        }
    }
);

const heartChart = new Chart(
    document.getElementById('heartchart'),
    {
        type: 'line',
        data: {
            labels: weekdays,
            datasets: [{
                label: 'BMI',
                fill: false,
                backgroundColor: 'rgb(2, 123, 255)',
                borderColor: 'rgb(2, 123, 255)',
                data: heartRates,
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
                point: {
                    radius: 0
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        }
    }
);



