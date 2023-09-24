const { getTrips, getDriver } = require("api");
// import { getTrips, getDriver } from "api";

/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */

async function analysis() {
  // Your code goes here

  const trips = await getTrips();

  //console.log(trips);
  let tripArr = [...trips];
  //console.log(tripArr);
  let globalObj = {};
  /**
   * Getting numbers of both cash and non-cash trips
   */
  let countTrue = 0;
  let countFalse = 0;

  for (let index = 0; index < tripArr.length; index++) {
    const singleTrip = tripArr[index];

    if (singleTrip.isCash) {
      countTrue++;
    } else if (!singleTrip.isCash) {
      countFalse++;
    }
  }
  //console.log(countFalse);
  globalObj["noOfCashTrips"] = countTrue;
  globalObj["noOfNonCashTrips"] = countFalse;

  //Getting the billed amount

  //let sum = 0
  //   for (let index = 0; index < tripArr.length; index++) {
  //     let element = tripArr[index];

  //     //console.log(typeof element.billedAmount);
  //     let num = +((element.billedAmount.toString()).replace(/,/g, ""));
  //     //console.log(num);
  //     //console.log(typeof num);
  //     sum += num
  //     }
  //     //console.log(sum);
  //console.log(tripArr);
  //   //console.log(typeof tripArr[2].billedAmount);

  //   //console.log(parseFloat(tripArr[2].billedAmount.replace(/\,/g, '')) );

  //   //console.log( typeof parseInt(tripArr[2].billedAmount.replace(/\,/g, '')) );

  ////console.log(tripArr);

  //total billed amount
  let mappedTripArr = tripArr.map((item) => {
    let num = item.billedAmount;
    return +num.toString().replace(/\,/g, "");
  });

  let totalBilledAmount = mappedTripArr.reduce((accumulator, items) => {
    return accumulator + items;
  }, 0);
  //console.log(tripArr);
  //console.log(totalBilledAmount);
  globalObj["billedTotal"] = parseFloat(totalBilledAmount.toFixed(2));

  //total cash billed
  let cash = [];
  let nonCash = [];
  for (let index = 0; index < tripArr.length; index++) {
    const cashTrip = tripArr[index];
    if (cashTrip.isCash) {
      cash.push(cashTrip.billedAmount);
    } else if (!cashTrip.isCash) {
      nonCash.push(cashTrip.billedAmount);
    }
  }
  // for the ones where isCash is true

  // cash = cash.map((money) => {
  //   return +money.toString().replace(/\,/g, "");
  // });
  totalCash = cash.map((money) => {
    return +money.toString().replace(/\,/g, "");
  }).reduce((sum, money) => {
      return sum + money;
    }, 0)
  // let totalCash = cash.reduce((sum, money) => {
  //   return sum + money;
  // }, 0);

  //ones where isCash is false meaning they paid online or used POS

  nonCash = nonCash.map((card) => {
    return +card.toString().replace(/\,/g, "");
  });

  let totalCard = nonCash.reduce((sum, card) => {
    return sum + card;
  }, 0);

  globalObj["cashBilledTotal"] = parseFloat(totalCash.toFixed(2));
  globalObj["nonCashBilledTotal"] = parseFloat(totalCard.toFixed(2));

  //getting the driver Particulars is herculous because one mumu driver didnt type his/her
  //ID correctly mtcheew
  // i selected the driver IDs into an array driverID[]
  //console.log(tripArr);
  let driverID = [];
  tripArr.forEach((item) => {
    return driverID.push(item.driverID);
  });
  //console.log(driverID[0].length);

  //just so i improve the time & space complexity, i had to select unique driverIDs from the pool of driver IDs since it is possible for
  //one or two drivers to have multiple trips
  let uniqueDriverID = [...new Set(driverID)];
  ////console.log(uniqueDriverID);

  // i looped through the uniqueDriverIDs to make sure that the .length of all of them are the same, since this driver didnt type their
  //id correctly and hence extracting the real ones from the fake or mistake to make the real driver IDs
  let realDriverID = [];
  for (let index = 0; index < uniqueDriverID.length; index++) {
    let uniqueDriver = uniqueDriverID[index];

    if (uniqueDriver.length === 36) {
      realDriverID.push(uniqueDriver);
    }
  }
  //console.log(realDriverID);

  // loop through to parse the driver IDs through the getDriver function to be able to get the driver particulars
  let driverParticulars = [];
  for (let index = 0; index < realDriverID.length; index++) {
    const realDriver = realDriverID[index];

    const drivers = await getDriver(realDriver);
    driverParticulars.push(drivers);
  }
  //console.log(driverParticulars);

  // to get the driver with the most vehicles, loop through the driverParticulars and anyone that driverParticulars[i].vehicleID.length > 1

  let moreThanOne = driverParticulars.filter((item) => {
    return item.vehicleID.length > 1;
  });
  //console.log(moreThanOne);
  let noOfDriversWithMoreThanOneVehicle = moreThanOne.length;
  //console.log(moreThanOne.length);
  globalObj["noOfDriversWithMoreThanOneVehicle"] =
    noOfDriversWithMoreThanOneVehicle;

  //Most trips by a driver
  //console.log(driverID.length === tripArr.length);
  let objID = {};

  for (let index = 0; index < driverID.length; index++) {
    const element = driverID[index];

    if (objID[element]) {
      objID[element] += 1;
    } else {
      objID[element] = 1;
    }
  }
  //console.log(Object.entries(objID));
  let valueArr = Object.values(objID);
  //console.log(value);
  let highestNumTrip = Math.max(...valueArr);
  let highestDriverIndex = valueArr.indexOf(highestNumTrip);
  let highestDriverID = driverID[highestDriverIndex];
  //console.log(value);

  // highest earning driver
  let objEarnings = {};
  for (let index = 0; index < tripArr.length; index++) {
    const element = tripArr[index];

    element.billedAmount = parseFloat(
      element.billedAmount.toString().replace(",", "")
    );
    if (objEarnings[element.driverID]) {
      objEarnings[element.driverID] += element.billedAmount;
    } else {
      objEarnings[element.driverID] = element.billedAmount;
    }
  }
  //console.log(tripArr);
  //console.log(objEarnings);
  //console.log(Object.entries(objEarnings));
  let earnValue = Object.values(objEarnings);
  let highestEarningDriver = Math.max(...earnValue);
  let highestEarningIndex = earnValue.indexOf(highestEarningDriver);
  //console.log(earnValue);

  //console.log(driverParticulars);
  //console.log(globalObj);
  //console.log(tripArr);
  let driverPath = driverParticulars[highestDriverIndex];
  let driverPath2 = driverParticulars[highestEarningIndex];
  let key = "mostTripsByDriver";
  globalObj[key] = {};
  globalObj[key]["name"] = driverPath.name;
  globalObj[key]["email"] = driverPath.email;
  globalObj[key]["phone"] = driverPath.phone;
  globalObj[key]["noOfTrips"] = highestNumTrip;
  globalObj[key]["totalAmountEarned"] = parseFloat(
    earnValue[highestDriverIndex].toFixed(2)
  );

  let key2 = "highestEarningDriver";
  globalObj[key2] = {};
  globalObj[key2]["name"] = driverPath2.name;
  globalObj[key2]["email"] = driverPath2.email;
  globalObj[key2]["phone"] = driverPath2.phone;
  globalObj[key2]["noOfTrips"] = valueArr[highestEarningIndex];
  globalObj[key2]["totalAmountEarned"] = highestEarningDriver;
  ////console.log(globalObj);
  return globalObj;
}

//console.log(await analysis());
module.exports = analysis;
// export default analysis;
