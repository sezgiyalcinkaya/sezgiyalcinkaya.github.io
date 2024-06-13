const firebaseConfig = {
    apiKey: "AIzaSyDC1h57a0NiWMT9AXHwKCjj0nuxFvTpGQI",
    authDomain: "nzfl-testing-2.firebaseapp.com",
    databaseURL: "https://nzfl-testing-2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nzfl-testing-2",
    storageBucket: "nzfl-testing-2.appspot.com",
    messagingSenderId: "49651777220",
    appId: "1:49651777220:web:5376fb01c2aeb790231391"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database().ref('device_02');

function fetchDataAndUpdateChart(sensorType, elementId, lineColor, chartTitle) {
    database.once('value')
        .then(snapshot => {
            const data = snapshot.val();
            console.log("Fetched data:", data); // Debug: log the fetched data

            if (!data) {
                console.error("No data available");
                return;
            }

            const timestamps = [];
            const sensorValues = [];

            for (let key in data) {
                const timestamp = new Date(parseInt(key) * 1000);
                timestamps.push(timestamp.toLocaleString('en-SG', { timeZone: 'Asia/Singapore' }));
                sensorValues.push(data[key][sensorType]);
            }

            console.log("Timestamps:", timestamps); // Debug: log timestamps
            console.log("Sensor values:", sensorValues); // Debug: log sensor values

            var chartElement = document.getElementById(elementId);
            Plotly.newPlot(chartElement, [{
                x: timestamps,
                y: sensorValues,
                type: 'scatter',
                mode: 'lines+markers',
                line: {
                    color: lineColor,
                    width: 1 
                },
                name: elementId
            }], {
                title: {
                    text: chartTitle,
                    font: { size: 26, bold: true }
                }, 
                xaxis: {
                    tickfont: {
                        size: 22.5 // Adjust the font size of the x-axis ticks
                    },
                },
                yaxis: {
                    tickfont: {
                        size: 22.5 
                    },
                }
            });

        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Fetch data and update the charts
fetchDataAndUpdateChart('hcho_sensor', 'chart_hcho_sensor', 'rgb(255, 0, 0)', 'HCHO Levels');
fetchDataAndUpdateChart('light_sensor', 'chart_light_sensor', 'rgb(236, 240, 10)', 'LIGHT SENSOR Levels');
fetchDataAndUpdateChart('tvoc_sensor_co2', 'chart_tvoc_sensor_co2', 'rgb(50, 168, 82)', 'CO2 SENSOR Levels');
fetchDataAndUpdateChart('tvoc_sensor_rh', 'chart_tvoc_sensor_rh', 'rgb(240, 129, 10)', 'RH SENSOR Levels');
fetchDataAndUpdateChart('tvoc_sensor_temperature', 'chart_tvoc_sensor_temperature', 'rgb(10, 240, 240)', 'TEMPERATURE Levels');
fetchDataAndUpdateChart('tvoc_sensor_tvoc', 'chart_tvoc_sensor_tvoc', 'rgb(202, 10, 240)', 'TVOC Levels');
fetchDataAndUpdateChart('tvoc_ppm_2_5', 'chart_tvoc_ppm_2_5', 'rgb(245, 7, 119)', 'TVOC 2.5 Levels');
fetchDataAndUpdateChart('tvoc_ppm_10', 'chart_tvoc_ppm_10', 'rgb(92, 2, 44)', 'TVOC 10 Levels');
fetchDataAndUpdateChart('sound_sensor', 'chart_sound_sensor', 'rgb(1, 62, 179)', 'SOUND SENSOR Levels');