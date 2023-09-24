const students = [
  {
    name: "Hendrick",
    dob: "1853-07-18T00:00:00.000Z",
    regNo: "041",
  },
  {
    name: "Albert",
    dob: "1879-03-14T00:00:00.000Z",
    regNo: "033",
  },
  {
    name: "Marie",
    dob: "1867-11-07T00:00:00.000Z",
    regNo: "024",
  },
  {
    name: "Neils",
    dob: "1885-10-07T00:00:00.000Z",
    regNo: "02",
  },
  {
    name: "Max",
    dob: "1858-04-23T00:00:00.000Z",
    regNo: "014",
  },
  {
    name: "Erwin",
    dob: "1887-08-12T00:00:00.000Z",
    regNo: "09",
  },
  {
    name: "Auguste",
    dob: "1884-01-28T00:00:00.000Z",
    regNo: "08",
  },
  {
    name: "Karl",
    dob: "1901-12-05T00:00:00.000Z",
    regNo: "120",
  },
  {
    name: "Louis",
    dob: "1892-08-15T00:00:00.000Z",
    regNo: "022",
  },
  {
    name: "Arthur",
    dob: "1892-09-10T00:00:00.000Z",
    regNo: "321",
  },
  {
    name: "Paul",
    dob: "1902-08-08T00:00:00.000Z",
    regNo: "055",
  },
  {
    name: "William",
    dob: "1890-03-31T00:00:00.000Z",
    regNo: "013",
  },
  {
    name: "Owen",
    dob: "1879-04-26T00:00:00.000Z",
    regNo: "052",
  },
  {
    name: "Martin",
    dob: "1871-02-15T00:00:00.000Z",
    regNo: "063",
  },
  {
    name: "Guye",
    dob: "1866-10-15T00:00:00.000Z",
    regNo: "084",
  },
  {
    name: "Charles",
    dob: "1868-02-14T00:00:00.000Z",
    regNo: "091",
  },
];

function classifier(input){




if(!Array.isArray(input)){
  throw new Error();
}

if(input.length === 0){
  return {noOfGroups: 0};
}

  const currentYear = 2019;

function getAge (dob) {
 return currentYear - new Date(dob).getFullYear();
  }

  let studentArr = [...input]




  let newArray = studentArr.map(item => {
  item.age = getAge(item.dob);

    return item;
  })
  //console.log(newArray);


newArray.sort((a,b)=> a.age - b.age);





function getGlobalArr(newArray){



  let global = [];
  while(newArray.length > 0){
    let newStudent = []


    newStudent.push(newArray[0]);
     newArray.splice(0,1);
       let counter = 1;
       for(let i=0; i<newArray.length;i++){

          if(newStudent.length < 3 && newArray[i].age - newStudent[newStudent.length - 1].age  <= 5){

            newStudent.push(newArray[i]);
               newArray.splice(i,1);
               i--;

          }

       }

       global.push(newStudent);

 }


  return global;
}

let results = getGlobalArr(newArray)

function groupies(global){




let obj = {};
obj["noOfGroups"] = global.length;

for (let i = 0; i < global.length; i++) {
  let individualGroup = "group" + (i + 1);
  obj[individualGroup] = {};

  obj[individualGroup]["members"] = [];
  global[i].forEach((item) => {
    obj[individualGroup]["members"].push(item);
  });

  let olds = Math.max(...global[i].map((x) => x.age));
  obj[individualGroup]["oldest"] = olds;

  let sum = global[i].reduce((a, b) => a + b.age, 0);
  obj[individualGroup]["sum"] = sum;

  let regNos = global[i].map((x) => +x.regNo);

  obj[individualGroup]["regNos"] = regNos.sort((a, b) => a - b);
}

return obj

}

return groupies(results)
}


console.log(classifier(students))
 export default classifier;
