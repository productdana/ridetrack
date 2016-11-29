const scheduleController = {
	getData: (req, res, next) => {
    let busSchedule = {};
    let route1start = [];
    for (let i = 0; i < 10; i++){
      busSchedule['stop' + (i+1).toString()] = {};
      route1start.push(i*2);
      getStop((i+1),route1start[i]);
      //TODO: run getStop for each stop. need to populate an array of route1starts
    }
    console.log('NEW SECTION!!');
    console.log('route1start:', route1start);

    

    function getStop(stop, route1start){
      //populate times for stop 1 route 1
      function getRoute(route){
        var start;
        if (route === 1){
          start = route1start;
        } else if (route === 2){
          start = route1start + 2;
        } else {
          start = route1start + 4;
        }

        busSchedule[`stop${stop}`][`route${route}`] = [];

        for (let i = start; i < 1440; i+=15){
          var j;
          if (i < 60) {
            if (i < 10){
              j = '0' + i.toString();
            } else {
              j = i.toString();
            }
            busSchedule[`stop${stop}`][`route${route}`].push(`00:${j}`);
          } else {
            let hour = Math.floor(i / 60);
            if (hour < 10){
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
            busSchedule[`stop${stop}`][`route${route}`].push(`${hour}:${min}`);
          }
        }
      }
      //get bus times for all 3 routes for this stop
      for (let i = 1; i < 4; i++){
        getRoute(i);
      }
    } //end getStop

    
    // function getStopOne(){
    //   //populate times for stop 1 route 1
    //   for (let i = 0; i < 1440; i+=15){
    //     if (i < 60) {
    //       busSchedule.stop1.route1.push('00:' + i.toString());
    //     } else {
    //       let hour = Math.floor(i / 60);
    //       let min = i % 60;
    //       busSchedule.stop1.route1.push(`${hour}.toString():${min}.toString()`);
    //     }
    //   }

    //   //populate times for stop 1 route 2
    //   for (let i = 2; i < 1440; i+=15){
    //     if (i < 60) {
    //       busSchedule.stop1.route1.push('00:' + i.toString());
    //     } else {
    //       let hour = Math.floor(i / 60);
    //       let min = i % 60;
    //       busSchedule.stop1.route1.push(`${hour}.toString():${min}.toString()`);
    //     }
    //   }

    //   //populate times for stop 1 route 3
    //   for (let i = 4; i < 1440; i+=15){
    //     if (i < 60) {
    //       busSchedule.stop1.route1.push('00:' + i.toString());
    //     } else {
    //       let hour = Math.floor(i / 60);
    //       let min = i % 60;
    //       busSchedule.stop1.route1.push(`${hour}.toString():${min}.toString()`);
    //     }
    //   }
    // } //end getStopOne

  }
}

module.exports = scheduleController;

//look into moment.js for times

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

