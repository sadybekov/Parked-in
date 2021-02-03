

const parkingLakeLouise = {
    id: 1,
    name: "Lake Louise",
    capacity: 15,
    stallsOccupied: 0,
    hours: {
        monday: "closed",
        tuesday: "8:00 - 22:00",
        wednesday: "8:00 - 22:00",
        thursday: "8:00 - 22:00",
        friday: "8:00 - 22:00",
        saturday: "8:00 - 22:00",
        sunday: "8:00 - 22:00",
    },
    responsible: "007",
    resetCapacity: 20
}

const parkingMoraineLake = {
    id: 2,
    name: "Moraine Lake",
    capacity: 15,
    stallsOccupied: 6,
    hours: {
        monday: "open",
        tuesday: "8:00 - 22:00",
        wednesday: "8:00 - 22:00",
        thursday: "8:00 - 22:00",
        friday: "8:00 - 22:00",
        saturday: "8:00 - 22:00",
        sunday: "8:00 - 22:00",
    },
    responsible: "001",
    resetCapacity: 30
}

const parkingOverflow = {
    id: 3,
    name: "Overflow",
    capacity: 15,
    stallsOccupied: 15,
    hours: {
        monday: "construction",
        tuesday: "8:00 - 22:00",
        wednesday: "8:00 - 22:00",
        thursday: "8:00 - 22:00",
        friday: "8:00 - 22:00",
        saturday: "8:00 - 22:00",
        sunday: "8:00 - 22:00",
    },
    responsible: "002",
    resetCapacity: 40
}

/**
 * Array of parking zones
 * [0] - Lake Louise
 * [1] - Moraine Lake
 * [2] - Overflow
 */
const parkingLots = [parkingLakeLouise, parkingMoraineLake, parkingOverflow]

const user1 = {
    id: 1,
    name: 'Bob Denver',
    email: 'islandguy@gmail.com',
    // password: 'iloveginger'
    password: '$2a$10$ebK131AnviWi2rohLKnDPOmuW3kzNLSwMTb4QjRBlLYv9odIsEAGW'
}

const user2 = {
    id: 2,
    name: 'Mary Astor',
    email: 'maltesesparrow@gmail.com',
    // password: 'dontrustmeever'
    password: '$2a$10$u1qJmHG53YTJksvc3CuseuB6JfnmJjgA7KyFHi0deqbFWaJaFLw8i'
}

const user3 = {
    id: 3,
    name: 'Denzel Washington',
    email: 'kingkongaintgot@gmail.com',
    // password: 'crookedcop'
    password: '$2a$10$/pq4olX76wv7hcifBUHwA.WpTF0FIsL6fBlwOBGXK4tX4K6H616N6'
}

const users = [user1,user2,user3]

const express = require('express')      // we're using request
const cors=require('cors')              // cors helps us call from other websites.. in particular if we want to run from 127.0.0.1 instead of localhost
const bcrypt = require('bcrypt-nodejs');

const database = require('./database.js');

const path = require('path');

const app = express()                   // create the express app

app.use(express.json());                // handles reading json, which we need for set posts
app.use(cors());                        // open cors policy... allows us to use either http://localhost or http://127.0.0.1

let port=process.env.PORT || 8082;

console.log(__dirname);

app.use("/parkingavailemployee", express.static(path.join(__dirname, "parkingavailemployee/build")));

app.get("parkingavailemployee/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/parkingavailemployee/build/index.html"));
});

app.use("/", express.static(path.join(__dirname, "ParkedIn")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/ParkedIn/index.html"));
});

var server = app.listen(port, function(){   // listen on port 8082
    // var port = server.address().port
    console.log(`Server started on ${port}`)  // open by showing the port in case I forgot
});


app.get('/parkinglots', (req, res) => { //Getting list of parkingLots endpoint
    res.send(parkingLots);
});

app.get('/parkinglotscouch', (req, res) => { //Getting list of parkingLots from database endpoint
    // Get parking lots from database, and send them in response to a front end fetch
    database.getParkingLots()
        .then(parkingLots => {
            res.send(parkingLots);
        });    
});

app.get('/parkinglot', (req, res) => { //Getting a particular parkingLot based on ID
    const parkingLotId = req.query.id;
    const parkingLot = parkingLots.find((parkingLot) => 
        parkingLot.id == parkingLotId);
    res.send(parkingLot);
});

app.get('/parkinglotcouch', (req, res) => { //Getting a particular parkingLot based on ID
    const parkingLotId = req.query._id;

    database.getParkingLotById(parkingLotId)
        .then(parkingLot => {
            res.send(parkingLot);
        })
});

app.put('/resetparkinglot', (req, res) => {
    const parkingLotId = req.query.id;
    const parkingLot = parkingLots.find((parkingLot) => 
        parkingLot.id == parkingLotId);
        
    parkingLot.capacity = parkingLot.resetCapacity;
    parkingLot.stallsOccupied = 0;

    res.send(parkingLot);
});

app.put('/resetparkinglotcouch', (req, res) => {
    const parkingLotId = req.query._id;
    database.getParkingLotById(parkingLotId)
    .then(parkingLot => {
        console.log(parkingLot);
        parkingLot.capacity = parkingLot.resetCapacity;
        parkingLot.stallsOccupied = 0;

        database.updateParkingLot(parkingLot)
        .then(() => {
            // Get parking lot again from the database to get the latest revision
            database.getParkingLotById(parkingLotId)
            .then(parkingLot => {
                res.send(parkingLot);
            });
        });
    });
});

// app.patch('/saveparkinglot', (req,res) => {
//     const parkingLotId = req.query.id;
//     const parkingLot = parkingLots.find((parkingLot) => 
//         parkingLot.id == parkingLotId);
        
//     const bodyParkingLot = req.body;
//     const saveFieldName = Object.keys(bodyParkingLot)[0];
//     bodyParkingLot[saveFieldName] = parseInt(bodyParkingLot[saveFieldName], 10);   
//     Object.assign(parkingLot,bodyParkingLot);            
//     res.send(parkingLot);
    
// })

app.patch('/saveparkinglotcouch', (req,res) => {
    const parkingLotId = req.query._id;
    database.getParkingLotById(parkingLotId)
    .then(parkingLot => {
        console.log(parkingLot);

        const bodyParkingLot = req.body;
        const saveFieldName = Object.keys(bodyParkingLot)[0];
        bodyParkingLot[saveFieldName] = parseInt(bodyParkingLot[saveFieldName], 10);   
        Object.assign(parkingLot,bodyParkingLot); 

        database.updateParkingLot(parkingLot)
        .then(() => {
            // Get parking lot again from the database to get the latest revision
            database.getParkingLotById(parkingLotId)
            .then(parkingLot => {
                res.send(parkingLot);
            });
        });
    });   
})

app.post('/signin',(req, res) => {
    let bodyEmail = req.body.email;
    let bodyPassword = req.body.password;
    let foundUser = users.find(user => user.email=== bodyEmail);
    
    if (foundUser) {
        
        let isPasswordCorrect = false;
        const passwordComparePromise = new Promise((resolve, reject) => {
            bcrypt.compare(bodyPassword, foundUser.password,function(err,res){
            resolve(res);
        })});
        passwordComparePromise.then(result=>{
            //console.log to check password compare result
            console.log(result);
            isPasswordCorrect = result;
            if (isPasswordCorrect) { 
                let sendUser = {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email
                }
                res.send(sendUser);
            }
            else {
                res.status(400).send('error logging in');
            }
        });        
    }
    else {
        res.status(400).send('error logging in');  
    }

});

app.post('/signincouch',(req, res) => {
    let bodyEmail = req.body.email;
    let bodyPassword = req.body.password;

    database.getUserByEmail(bodyEmail)
    .then(foundUser => {
        if (foundUser) {
            
            let isPasswordCorrect = false;
            const passwordComparePromise = new Promise((resolve, reject) => {
                bcrypt.compare(bodyPassword, foundUser.password,function(err,res){
                resolve(res);
            })});
            passwordComparePromise.then(result=>{
                //console.log to check password compare result
                console.log(result);
                isPasswordCorrect = result;
                if (isPasswordCorrect) { 
                    let sendUser = {
                        _id: foundUser._id,
                        name: foundUser.name,
                        email: foundUser.email
                    }
                    res.send(sendUser);
                }
                else {
                    res.status(400).send('error logging in');
                }
            });        
        }
        else {
            res.status(400).send('error logging in');  
        }
    });
});

    bcrypt.hash('iloveginger', null, null, function(err, hash) {
        console.log(hash);        
    }); 

    bcrypt.hash('dontrustmeever', null, null, function(err, hash) {
        console.log(hash);        
    }); 

    bcrypt.hash('crookedcop', null, null, function(err, hash) {
        console.log(hash);        
    }); 

    app.patch('/incrementstallsoccupiedcouch',function (req,res) {
        const parkingLotId = req.query._id;
        database.getParkingLotById(parkingLotId)
        .then(parkingLot => {
            console.log(parkingLot);

            if (parkingLot.stallsOccupied != parkingLot.capacity) {
                parkingLot.stallsOccupied = parkingLot.stallsOccupied + 1;
    
            }
    
            database.updateParkingLot(parkingLot)
            .then(() => {
                // Get parking lot again from the database to get the latest revision
                database.getParkingLotById(parkingLotId)
                .then(parkingLot => {
                    res.send(parkingLot);
                });
            });
        });
    });

    // app.patch('/incrementstallsoccupied',function (req,res) {
    //     const parkingLotId = req.query.id;
    //     const parkingLot = parkingLots.find(parkingLot => parkingLot.id == parkingLotId);
    //     if (parkingLot.stallsOccupied != parkingLot.capacity) {
    //         parkingLot.stallsOccupied = parkingLot.stallsOccupied + 1;

    //     }
    //     res.send(parkingLot);        
    // })

    // app.patch('/decrementstallsoccupied',function (req,res) {
    //     const parkingLotId = req.query.id;
    //     const parkingLot = parkingLots.find(parkingLot => parkingLot.id == parkingLotId);
    //     if (parkingLot.stallsOccupied > 0) {
    //         parkingLot.stallsOccupied = parkingLot.stallsOccupied - 1;

    //     }
    //     res.send(parkingLot);        
    // })

    app.patch('/decrementstallsoccupiedcouch',function (req,res) {
        const parkingLotId = req.query._id;
        database.getParkingLotById(parkingLotId)
        .then(parkingLot => {
            console.log(parkingLot);

            if (parkingLot.stallsOccupied > 0) {
                parkingLot.stallsOccupied = parkingLot.stallsOccupied - 1;
    
            }
    
            database.updateParkingLot(parkingLot)
            .then(() => {
                // Get parking lot again from the database to get the latest revision
                database.getParkingLotById(parkingLotId)
                .then(parkingLot => {
                    res.send(parkingLot);
                });
            });
        });
    });

