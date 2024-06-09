const firebaseConfig = {
    apiKey: "AIzaSyB1eFoWhG7_fRxHMJ-Avjo_bhkwvb27D4Y",
    authDomain: "smarthome-f802f.firebaseapp.com",
    projectId: "smarthome-f802f",
    storageBucket: "smarthome-f802f.appspot.com",
    messagingSenderId: "290247897607",
    appId: "1:290247897607:web:e1a22bf3765eb825daf0a2",
    measurementId: "G-383MXL4K1R"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

database.ref("/auto/autoTemp").on("value", function(snapshot) {
    const arr = snapshot.val();
    console.log(arr);
    arr.shift();
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            datasets: [{
                data: arr,
                label: "TEMPERATURE",
                borderColor: "#5cc6fb",
                backgroundColor: "#5cc6fb",
            }],
        },
        options: {
            layout: {
                padding: 80
            }
        }
    });
});

database.ref("/auto").get().then((snapshot) => {
    if (snapshot.exists()) {
        var auto = snapshot.val();
        var autoTemp = auto['autoTemp'];

        database.ref("/data/nhiet do").on("value", function(snapshot) {
            var nd = snapshot.val();
            var template = autoTemp ? autoTemp : [];
            template.push(nd);
            console.log(template);

            database.ref("/auto").update({
                autoTemp: template
            });

            let count = 0;
            autoTemp.forEach((val) => {
                count++;
            });

            if (count > 11) {
                autoTemp.shift();
                database.ref("/auto").update({
                    autoTemp: autoTemp
                });
                console.log(autoTemp);
            }
        });
    } else {
        console.log("No data available!");
    }
});
//độ ẩm
database.ref("/auto/autohiud").on("value", function(snapshot) {
    const arr = snapshot.val();
    console.log(arr);
    arr.shift();
    var ctx = document.getElementById("lineChart").getContext("2d");
    var lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            datasets: [{
                data: arr,
                label: "HUMIDITY",
                borderColor: "#ffcb0f",
                backgroundColor: "#ffcb0f",
            }],
        },
        options: {
            layout: {
                padding: 80
            }
        }
    });
});

database.ref("/auto").get().then((snapshot) => {
    if (snapshot.exists()) {
        var auto = snapshot.val();
        var autohiud = auto['autohiud'];

        database.ref("/data/do am").on("value", function(snapshot) {
            var nd = snapshot.val();
            var template = autohiud ? autohiud : [];
            template.push(nd);
            console.log(template);

            database.ref("/auto").update({
                autohiud: template
            });

            let count = 0;
            autohiud.forEach((val) => {
                count++;
            });

            if (count > 11) {
                autohiud.shift();
                database.ref("/auto").update({
                    autohiud: autohiud
                });
                console.log(autohiud);
            }
        });
    } else {
        console.log("No data available!");
    }
});