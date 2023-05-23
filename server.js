// Change to 80 or 150 whatever and see what happens
require("events").EventEmitter.prototype._maxListeners = 700;
require("events").defaultMaxListeners = 700;
const fs = require('fs');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3002; //PORT was 4000 but caused error on local machine
var cors = require('cors')
server.use(cors()) // Use this after the variable declaration
server.use(middlewares)
server.use(router)
server.listen(port, () => {
    console.log('JSON Server is running on port: http://localhost:' + port)
})
process.on("warning", function (err) {
	if ("MaxListenersExceededWarning" == err.name) {
		console.log("o kurwa");
		// write to log function
		process.exit(1); // its up to you what then in my case script was hang
	}
});

const filePath = "./db.json";
const file = require(filePath);

function ResetDB() {
    setInterval(function(){
        let data = JSON.parse(fs.readFileSync(filePath));
        ResetDay(data)
        data = JSON.parse(fs.readFileSync(filePath));
        ResetWeek(data)
        data = JSON.parse(fs.readFileSync(filePath));
        ResetMonth(data)
        data = JSON.parse(fs.readFileSync(filePath));
        ResetYear(data)
    }, 3600000);
}

ResetDB()

//if date has changed, reset all data to 0
function ResetDay(data) {
    let serverDate = data.day[0].date;
    let date =
    new Date().getMonth() + 1 
    + "-" +
    new Date().getDate() +
    "-" +
    new Date().getFullYear();

    if (date !== serverDate) {
        data.day[0] = {
            id: 1,
            total: 0, 
            date: date, 
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
            20: 0,
            21: 0,
            22: 0,
            23: 0
        }

        fs.writeFile(filePath, JSON.stringify(data, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            console.log("Reset Day Data");
        });
    }
}
// if today's date is 7 days after the server's date, reset the week data
function ResetWeek(data) {
    let serverDate = data.week[0].date;
    var currentDate = new Date();
    let date =
    new Date().getMonth() + 1 
    + "-" +
    new Date().getDate() +
    "-" +
    new Date().getFullYear();
    
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    
    const firstDate = new Date(serverDate); // save to server
    const secondDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    if (diffDays >= 7) {
        data.week[0] = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            total: 0,
            date: secondDate,
            id: 1
        }

        fs.writeFile(filePath, JSON.stringify(data, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            console.log("Reset Week Data");
        });
    }
}
// if today's date is 7 days after the server's date, reset the week data
function ResetMonth(data) {
    //get current month and put into server
    // if server is different than current month, reset data
    let currentMonth = new Date().getMonth()
    
    if(currentMonth !== data.month[0].currentMonth) {
        data.month[0] = {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0,
            "12": 0,
            "13": 0,
            "14": 0,
            "15": 0,
            "16": 0,
            "17": 0,
            "18": 0,
            "19": 0,
            "20": 0,
            "21": 0,
            "22": 0,
            "23": 0,
            "24": 0,
            "25": 0,
            "26": 0,
            "27": 0,
            "28": 0,
            "29": 0,
            "30": 0,
            "31": 0,
            "total": 0,
            "currentMonth": currentMonth,
            "id": 1
        }

        fs.writeFile(filePath, JSON.stringify(data, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            console.log("Reset Month Data");
        });
    }
}

function ResetYear(data) {
    let currentYear = new Date().getFullYear();
    console.log(currentYear)
    if(currentYear !== data.year[0].currentYear) {
        data.year[0] = {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0,
            "total": 0,
            "currentYear": currentYear,
            "id": 1
        }

        fs.writeFile(filePath, JSON.stringify(data, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            console.log("Reset Year Data");
        });
    }
}