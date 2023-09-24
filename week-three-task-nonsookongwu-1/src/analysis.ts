// const { getTrips } = require('api');
import {getTrips} from 'api'

/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */

interface Trip  {
  tripID: string;
    driverID: string;
    isCash: boolean,
    billedAmount: string;
    user: 
     { name: string;
       gender: string;
       company: string;
       email: string;
       phone: string; },
    created: string;
    pickup: 
     { address: string;
       latitude: number,
       longitude: number },
    destination: 
     { address: string;
       latitude: number;
       longitude: number; } }


interface Analysisresult {
  
    "noOfCashTrips": number;    
    "noOfNonCashTrips": number;
    "billedTotal": number;
    "cashBilledTotal": number;
    "nonCashBilledTotal": number;
    "noOfDriversWithMoreThanOneVehicle": number;
    "mostTripsByDriver": {
      "name": string;
      "email": string;
      "phone": string;
      "noOfTrips": number;
      "totalAmountEarned": number;
    },
    "highestEarningDriver": {
      "name": string;
      "email": string;
      "phone": string;
      "noOfTrips": number;
      "totalAmountEarned": number;
    }
  }




async function analysis(): Promise<Analysisresult> {
  // Your code goes here

  const trips: Trip[] = await getTrips();

  //console.log(trips);
  let tripArr = [...trips]
  console.log(tripArr);
  let globalObj = {};
/**
 * Getting numbers of both cash and non-cash trips
 */
  let countTrue = 0;
  let countFalse = 0;

  for (let index = 0; index < tripArr.length; index++) {
    const singleTrip = tripArr[index];
    if (singleTrip.isCash){
      countTrue++
    } else if (!singleTrip.isCash){
      countFalse++
    }
    }
  //console.log(countFalse);
  globalObj["noOfCashTrips"] = countTrue.toString()
  globalObj["noOfNonCashTrips"] = countFalse
  
  //billed amount

  tripArr = tripArr.map((item)=>{
    return parseInt(item.billedAmount)
  })
  let totalBilledAmount = tripArr.reduce()
}

analysis()


// module.exports = analysis;
export default analysis 