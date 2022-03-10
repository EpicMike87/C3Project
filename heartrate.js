const userAge = 40;
const maxHeartRate = 220 - userAge;
const heartRates = [55, 65, 57, 58, 59, 62]
const weekdays = ["01/03/2022", "02/03/2022", "03/03/2022", "04/03/2022", "05/03/2022", "06/03/2022", "07/03/2022"
];
const hrModaltable = document.getElementById('hrModalData');
let i = 1;
heartRates.forEach(function(){
    const modalRow1 = hrModaltable.insertRow(i);
    const cell1 = modalRow1.insertCell(0);
    cell1.innerHTML = weekdays[i-1];
    const cell2 = modalRow1.insertCell(1);
    cell2.innerHTML = heartRates[i-1];
    i++;
})

//Setting messages for heart rate section
const maxRateMessage = document.getElementById('maxheartrate');
maxRateMessage.innerHTML = `${maxHeartRate}BPM`;

const heartratemessage = document.getElementById('heartratemessage');
const currentRate = heartRates[heartRates.length-1];

function getMessage(currentRate){
    if(currentRate >= 60 && currentRate <= 100)
    return `Your heart rate of <b>${currentRate}BPM</b> is within a healthy range`
    else{
        return `Your heart rate of <b>${currentRate}BPM</b> is outside of a health range`
    }
}

heartratemessage.innerHTML = getMessage(currentRate);

const heartChart = new Chart(
    document.getElementById('heartchart'),
    {
        type: 'line',
        data: {
            labels: weekdays,
            datasets: [{
                label: 'BMI',
                fill: false,
                backgroundColor: 'rgb(47, 168, 58)',
                borderColor: 'rgb(47, 168, 58)',
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