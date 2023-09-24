const { getTrips, getDriver, getVehicle } = require('api');

/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
  // Your code goes here
  const data = await getTrips();
  //console.log(getTrips());

  //duplicating resources
  let tripData = [...data];
  //console.log(tripData);
  //getting the data for getDriver()
  let driverID = [];
  driverID = tripData.map((item) => {
    return item.driverID;
  });
 
  let uniqueDrivers = [...new Set(driverID)];

  //console.log(uniqueDrivers);

  let driverParticulars = [];
  for (let index = 0; index < uniqueDrivers.length; index++) {
    const driver = uniqueDrivers[index];

    driverParticulars.push(getDriver(driver));
  }
  //console.log(driverParticulars);
  const settledParticulars = await Promise.allSettled(driverParticulars);
  //console.log(settledParticulars);

  let fulfilledParticulars = settledParticulars.filter((item) => {
    return item.status === "fulfilled";
  });
  //console.log(fulfilledParticulars);

  let driverData = [];
  driverData = fulfilledParticulars.map((item) => {
    return item.value;
  });
  //console.log(driverData);

  //getting the data for getVehicle()
  let _vehicleID = driverData.map((item) => {
    return item.vehicleID;
  });
  //console.log(_vehicleID);
  //vehicleID = _vehicleID.flat();
  //console.log(vehicleID);
  let vehicleParticulars = [];

  for (let index = 0; index < _vehicleID.length; index++) {
    const vehicleArr = _vehicleID[index];
    //console.log(vehicleArr);
    let v = [];
    for (let i = 0; i < vehicleArr.length; i++) {
      let vehicle = vehicleArr[i];
      let singleVehicle = await getVehicle(vehicle);
      //console.log(singleVehicle);
      // let _v = await Promise.allSettled(v);
      v.push(singleVehicle);
    }
    //console.log(v);
    vehicleParticulars.push(v);
  }
  //console.log(vehicleParticulars);
  //const settledVehicles = await Promise.allSettled(vehicleParticulars)

  //console.log(settledVehicles);

  // let fulfilledVehicles = settledVehicles.filter((item)=>{
  //   return (item.status === 'fulfilled')
  // })
  // let vehicleData = fulfilledVehicles.map((item)=>{
  //   return item.value
  // })
  // console.log(vehicleData);

  //getting the number of trips per driver
  let driverObj = {};
  for (let index = 0; index < driverID.length; index++) {
    const driver = driverID[index];
    if (driverObj[driver]) {
      driverObj[driver] += 1;
    } else {
      driverObj[driver] = 1;
    }
  }
  //console.log(driverObj);
  let noOfTripsPerDriver = Object.values(driverObj);
  //console.log(noOfTripsPerDriver);

  //getting number of vehicles for one driver
  let noOfVehicles = [];
  noOfVehicles = driverData.map((item) => {
    return item.vehicleID.length;
  });
  //console.log(noOfVehicles);

  //getting vehicles owned by individual drivers
  //console.log(vehicleParticulars);

  let manufacturerAndPlate = vehicleParticulars.map((vehicleArr) => {
    return vehicleArr.map((vehObj) => {
      return {
        plate: vehObj.plate,
        manufacturer: vehObj.manufacturer,
      };
    });
  });
  //console.log(manufacturerAndPlate);

  //number of cash trips per driver
  //console.log(tripData);

  let cashTrip = [];
  let nonCashTrip = [];
  for (let index = 0; index < tripData.length; index++) {
    const paid = tripData[index];
    if (paid.isCash) {
      cashTrip.push(paid.driverID);
    } else {
      nonCashTrip.push(paid.driverID);
    }
  }
  //for cashTrip
  let cashCountObj = {};
  for (let i = 0; i < cashTrip.length; i++) {
    const cash = cashTrip[i];
    if (cashCountObj[cash]) {
      cashCountObj[cash] += 1;
    } else {
      cashCountObj[cash] = 1;
    }
  }
  //console.log(cashCountObj);
  //let noOfCashTripsArr = Object.values(cashCountObj);
  

  //for nonCashTrip
  let nonCashCountObj = {};
  for (let i = 0; i < nonCashTrip.length; i++) {
    const nonCash = nonCashTrip[i];
    if (nonCashCountObj[nonCash]) {
      nonCashCountObj[nonCash] += 1;
    } else {
      nonCashCountObj[nonCash] = 1;
    }
  }
  let noOfNonCashTripsArr = Object.values(nonCashCountObj);
  

  //total amount earned per driver
  for (let i = 0; i < tripData.length; i++) {
    const trip = tripData[i];
    trip.billedAmount = parseFloat(
      trip.billedAmount.toString().replace(",", "")
    );
  }
 //console.log(tripData);
  let objEarning = {};
  for (let i = 0; i < tripData.length; i++) {
    const earn = tripData[i];
    if (objEarning[earn.driverID]) {
      objEarning[earn.driverID] += earn.billedAmount;
    } else {
      objEarning[earn.driverID] = earn.billedAmount;
    }
  }
  let totalAmountEarnedArr = Object.values(objEarning);
  //console.log(totalAmountEarnedArr);
  totalAmountEarnedArr = totalAmountEarnedArr.map((item) => {
    return parseFloat(item.toFixed(2));
  });
  //console.log(totalAmountEarnedArr);

  //total Cash billed per driver
  let driverCash = tripData.filter((item) => {
    return item.isCash;
  });
  //console.log(driverCash);
  let objCash = {};
  for (let i = 0; i < driverCash.length; i++) {
    const e = driverCash[i];
    if (objCash[e.driverID]) {
      objCash[e.driverID] += e.billedAmount;
    } else {
      objCash[e.driverID] = e.billedAmount;
    }
  }
  let totalCashAmountArr = Object.values(objCash);

  totalCashAmountArr = totalCashAmountArr.map((item) => {
    return parseFloat(item.toFixed(2));
  });

  //total non cash billed per driver
  let driverNonCash = tripData.filter((item) => {
    return !item.isCash;
  });
  let objNonCash = {};
  for (let i = 0; i < driverNonCash.length; i++) {
    const e = driverNonCash[i];
    if (objNonCash[e.driverID]) {
      objNonCash[e.driverID] += e.billedAmount;
    } else {
      objNonCash[e.driverID] = e.billedAmount;
    }
  }
  let totalNonCashAmountArr = Object.values(objNonCash);
  totalNonCashAmountArr = totalNonCashAmountArr.map((item) => {
    return parseFloat(item.toFixed(2));
  });
  //console.log(totalNonCashAmountArr);


  
let tripObj = {}
  for (let index = 0; index < data.length; index++) {
    const e = data[index];
    //console.log(e);
    if (tripObj[e.driverID]){
      tripObj[e.driverID] += 1
    }else {
      tripObj[e.driverID] = 1
    }
    
  }
  let tripValues = Object.values(tripObj)

  
  let bigDriverArr = []
  let bigDriverObj = {}
  for (let index = 0; index < driverData.length; index++) {
    const driver = driverData[index];

    //getting the tips per individual driver
    let arrOfTrips = tripData.filter((item)=>{
      return item.driverID === uniqueDrivers[index]
      })
      arrOfTrips = arrOfTrips.map((obj)=>{
        return {
        user: obj.user.name,
        created: obj.created,
        pickup: obj.pickup.address,
        destination: obj.destination.address,
        billed: obj.billedAmount,
        isCash: obj.isCash
        }
      })
      
     


    let driverDetails = {
      fullName: driver.name,
      id: uniqueDrivers[index],
      phone: driver.phone,
      noOfTrips: tripObj[uniqueDrivers[index]],
      //noOfTrips2: tripValues[index],
      noOfVehicles: driver.vehicleID.length,
      vehicles: manufacturerAndPlate[index],
      noOfCashTrips: cashCountObj[uniqueDrivers[index]] ? cashCountObj[uniqueDrivers[index]] : 0,
      noOfNonCashTrips: nonCashCountObj[uniqueDrivers[index]],
      totalAmountEarned: totalAmountEarnedArr[index],
      totalCashAmount: totalCashAmountArr[index],
      totalNonCashAmount: totalNonCashAmountArr[index],
      trips: arrOfTrips
    }
    
    bigDriverArr.push(driverDetails)
  }
  //console.log(bigDriverArr);

return  bigDriverArr

}

driverReport()

module.exports = driverReport;
