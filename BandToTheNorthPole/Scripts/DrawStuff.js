
//dataSet will label the X axis with dates in the format DD-MM once we know them.
var dataSet = []
for (i = 1; i <= 31; i++) {
    dataSet.push(i.toString())
}

var distance = []
var calories = []


$(function () {
    getData1(calories, distance, setData);
});

function getData1(calories1, distance1, callback) {


    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?",
        function (json) {
            calories1 = json.items.map(function (item) {
                return item.title.length;
            });
            distance1 = json.items.map(function (item) {
                return item.description.length;
            });
            console.log(calories1);
            callback(calories1,distance1, drawChart);

        });
}



function setData(calories1, distance1, callback) {

    function chartType(data, purpose) {
         var returnedThing = {
            type: 'line',
            data: {
                labels: dataSet,
                datasets: [
                    {
                        label: purpose,
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: calories1,
                        spanGaps: false,
                    }
                ]
            },
            options:
            {
                scales:
                {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        }
        return returnedThing
    }
    var caloriesChartData = chartType(calories1, "Calories burnt");

    var distanceChartData = chartType(distance1, "Kilometers travelled");

    console.log(caloriesChartData);
    callback(caloriesChartData, distanceChartData);

}

function drawChart(calData, distData) {
    var ctxCalories = document.getElementById("calorieChart")
    console.log(calData);
    var caloriesLine = new Chart(ctxCalories,calData, {
        responsive: true,
        
    });
    console.log(caloriesLine);

    var ctxDistance = document.getElementById("distanceChart")
    var distanceBar = new Chart(ctxDistance,distData, {
        responsive: true
    });

 

}