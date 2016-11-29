const Promise = require('bluebird');

const scheduleController = {
	getData: (req, res, next) => {
    let busSchedule = [];
    let route1Starts = [];
    // var routeObj = {};
    // routeObj.route1 = [];
    // routeObj.route2 = [];
    // routeObj.route3 = [];

    
    //builds route1start array
    function createRoute1Starts(){
      for (let i = 0; i < 10; i++){
        route1Starts.push(i*2);
      }
    }

    //creates an object for each stop, containing 3 routes per stop with the bus times for each route. stores each object for each stop in an busSchedule array
    function createSchedule(){


      for (let i = 0; i < 10; i++){
        var stopObj = {};
        var y = i + 1;
        stopObj[`stop${y}`] = routeObj;
        // busSchedule.push('stop' + (i+1).toString()) = {};
        busSchedule.push(stopObj);
        // route1start.push(i*2);
        getStop((i+1),route1start[i]);
        //TODO: run getStop for each stop. need to populate an array of route1starts
      }
      // return busSchedule;
      // console.log('NEW SECTION!!');
      // console.log('route1start:', route1start);
    }
    
    //get route times for 1 route for this 1 stop
    //add key of this route with value of [] to routeObj
    function getRoute(route, stop){
      var routeTimes = [];
      var route1Start = route1Starts[stop-1];
      var start;

      //since each route is 2 minutes apart, this determines what the first start time for that route is
      if (route === 1){
        start = route1Start;
      } else if (route === 2){
        start = route1Start + 2;
      } else {
        start = route1Start + 4;
      }

      // console.log('HELLO. route:', route, 'stop:', stop, 'route1start:', route1start, 'other:', busSchedule[stop-1][`stop${stop}`][`route${route}`]);
      // busSchedule[`stop${stop}`][`route${route}`] = [];

      //1440 minutes in a day. increment i by 15 because a bus for that route arrives every 15 minutes
      for (let i = start; i < 1440; i+=15){
        let hour = Math.floor(i / 60);
        if (hour < 1){
          hour = '00';
        } else if (hour < 10){
          hour = '0' + hour.toString();
        } else {
          hour = hour.toString();
        }
        let min = i % 60;
        if (min < 10){
          min = '0' + min.toString();
        } else {
          min = min.toString();
        }

        routeTimes.push(`${hour}:${min}`);
          // busSchedule[`stop${stop}`][`route${route}`].push(`${hour}:${min}`);
          // busSchedule[stop-1][`stop${stop}`][`route${route}`].push(`00:${j}`); //to use
      }
      routeObj[`route${route}`] = routeTimes;
    }

    //get bus times for all 3 routes for this stop
    //after all 3 route arrays are populated with bus times, add the routeObj as the value to that stop
    function getStop(stop){
      //populate times for stop 1 route 1
      // console.log('bus schedule in getstop before for loop:', busSchedule);
      
      var routeObj = {};
      for (let i = 1; i < 4; i++){
        console.log('need to run getRoute(i)');
        getRoute(1, stop);
      }
      // console.log('BUS SCHEDULE after for loop in getStop:', busSchedule[0].stop1);
      // return res.end(JSON.stringify(busSchedule));
    } //end getStop

    createSchedule();
    // var result = createSchedule();
    // console.log('RESULT:', result);
    // result.then(function(data){
    //   return res.end(JSON.stringify(busSchedule));
    // });
  }
}

module.exports = scheduleController;

//look into moment.js for times

//revised busSchedule
// busSchedule = [
//   {stop1: 
//     {
//       route1: [00:00, 00:15, 00:30, 00:45, 01:00],
//       route2: [],
//       route3: []
//     }
//   },
//   {stop2: 
//     {
//       route1: [00:00, 00:15, 00:30, 00:45, 01:00],
//       route2: [],
//       route3: []
//     }
//   }
// ];

// busSchedule = {
//   stop1 : {
//     route1: [00:00, 00:15, 00:30, 00:45, 01:00],
//     route2: [],
//     route3: []
//   },
//   stop2: {}
// }

//get times for route 1 first
  //calculate times based on minutes
  //convert minutes to military time
  //push military times to each route array
//for route 2, add two minutes to each route 1 time
//for route 3, add two minutes to each route 2 time

//use airbnb styleguide
//is time format a string??

////just in case
// const Promise = require('bluebird');

// const scheduleController = {
//   getData: (req, res, next) => {
//     let busSchedule = {};
//     let route1start = [];
//     function createSchedule(){


//       for (let i = 0; i < 10; i++){
//         busSchedule['stop' + (i+1).toString()] = {};
//         route1start.push(i*2);
//         getStop((i+1),route1start[i]);
//         //TODO: run getStop for each stop. need to populate an array of route1starts
//       }
//       return busSchedule;
//       console.log('NEW SECTION!!');
//       console.log('route1start:', route1start);
//     }
    

//     function getStop(stop, route1start){
//       //populate times for stop 1 route 1
//       function getRoute(route){
//         var start;
//         if (route === 1){
//           start = route1start;
//         } else if (route === 2){
//           start = route1start + 2;
//         } else {
//           start = route1start + 4;
//         }

//         busSchedule[`stop${stop}`][`route${route}`] = [];

//         for (let i = start; i < 1440; i+=15){
//           var j;
//           if (i < 60) {
//             if (i < 10){
//               j = '0' + i.toString();
//             } else {
//               j = i.toString();
//             }
//             busSchedule[`stop${stop}`][`route${route}`].push(`00:${j}`);
//           } else {
//             let hour = Math.floor(i / 60);
//             if (hour < 10){
//               hour = '0' + hour.toString();
//             } else {
//               hour = hour.toString();
//             }
//             let min = i % 60;
//             if (min < 10){
//               min = '0' + min.toString();
//             } else {
//               min = min.toString();
//             }
//             busSchedule[`stop${stop}`][`route${route}`].push(`${hour}:${min}`);
//           }
//         }
//       }
//       //get bus times for all 3 routes for this stop
//       for (let i = 1; i < 4; i++){
//         getRoute(i);
//       }
//       console.log('BUS SCHEDULE:', busSchedule);
//       // return res.end(JSON.stringify(busSchedule));
//     } //end getStop
//     var result = createSchedule();
//     console.log('RESULT:', result);
//     result.then(function(data){
//       return res.end(JSON.stringify(busSchedule));
//     });
//   }
// }
