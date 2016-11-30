//use airbnb styleguide

const Promise = require('bluebird');

const scheduleController = {
  getData: (req, res, next) => {
    
      let busSchedule = {};
      let route1start = [];

      function getStop(stop, route1start){
        //populate times in array for 1 route of current stop
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

            busSchedule[`stop${stop}`][`route${route}`].push(`${hour}:${min}`);
          }
        }
        //get bus times for all 3 routes for this stop
        for (let i = 1; i < 4; i++){
          getRoute(i);
        }
      } //end getStop

    //populates route1start with first start time for route 1 for each stop
    //creates an empty object for each stop, and sets the stop as the key and object as value in busSchedule
    //runs getStop for each of the 10 stops
    function createSchedule(){
      return new Promise(function(resolve, reject){
        for (let i = 0; i < 10; i++){
          busSchedule['stop' + (i+1).toString()] = {};
          route1start.push(i*2);
          getStop((i+1),route1start[i]); 
        }
        resolve(busSchedule);
      });
    }
    
    var result = createSchedule();
    
    result.then(function(data){  
      return res.end(JSON.stringify(data));
    });  
  }
};

module.exports = scheduleController;