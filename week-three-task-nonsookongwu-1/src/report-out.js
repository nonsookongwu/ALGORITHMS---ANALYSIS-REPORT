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
  const data = await getTrips()
  //console.log(getTrips());

 //duplicating resources
  let tripData = [...data]
  console.log(tripData);
 //getting the data for getDriver()
  let driverID = []
  driverID = tripData.map((item)=>{
    return item.driverID
  })
  let uniqueDrivers = [...new Set(driverID)]
 
  //console.log(uniqueDrivers);
  let driverParticulars = []
  for (let index = 0; index < uniqueDrivers.length; index++) {
    const driver = uniqueDrivers[index];
    driverParticulars.push(getDriver(driver))
  }
//console.log(driverParticulars);
const settledParticulars = await Promise.allSettled(driverParticulars)
//console.log(settledParticulars);

let fulfilledParticulars = settledParticulars.filter((item)=>{
  return (item.status === 'fulfilled')
})
//console.log(fulfilledParticulars);

let driverData = []
 driverData = fulfilledParticulars.map((item)=>{
  return item.value
 })
 console.log(driverData);
 
 //getting the data for getVehicle()
let _vehicleID = driverData.map((item)=>{
  return item.vehicleID
})
console.log(_vehicleID);
vehicleID = _vehicleID.flat();
//console.log(vehicleID);
let vehicleParticulars = []
for (let index = 0; index < vehicleID.length; index++) {
  const vehicle = vehicleID[index];
  vehicleParticulars.push(getVehicle(vehicle))
  
}
//console.log(vehicleParticulars);
const settledVehicles = await Promise.allSettled(vehicleParticulars)
//console.log(settledVehicles);

let fulfilledVehicles = settledVehicles.filter((item)=>{
  return (item.status === 'fulfilled')
})
let vehicleData = fulfilledVehicles.map((item)=>{
  return item.value
})
console.log(vehicleData);

//getting the number of trips per driver
let driverObj = {}
for (let index = 0; index < driverID.length; index++) {
  const driver = driverID[index];
  if (driverObj[driver]){
    driverObj[driver] += 1
  } else {
    driverObj[driver] = 1
  }
}
let noOfTripsPerDriver = Object.values(driverObj)

//getting number of vehicles for one driver
let noOfVehicles = []
noOfVehicles = driverData.map((item)=>{
  return item.vehicleID.length
})
console.log(noOfVehicles);

//getting vehicles owned by individual drivers

let vehicles = []
for (let index = 0; index < vehicleData.length; index++) {
  const element = vehicleData[index];
  let vehicleObj = {}
  vehicleObj["plate"] = element.plate
  vehicleObj["manufacturer"] = element.manufacturer
  // console.log(vehicleObj);
  vehicles.push(vehicleObj)
}
console.log(vehicles);

//number of cash trips per driver
let tripObj = {}
for (let index = 0; index < tripData.length; index++) {
  const element = tripData[index];
  // if ()
}






}

driverReport()

module.exports = driverReport;
