// const actualDate=(Datetime)=>{
//     let date_ob = new Date(Datetime);
//     // const options = { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
//     const options = {
//         timeZone: 'Asia/Tokyo',
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour12: false,
//         hour: 'numeric',
//         minute: 'numeric',
//       };
// // const options = {
// //   timeZone: 'America/Chicago'
// // //   timeZone: 'Asia/Calcutta'
// // };

//     const ctTime = date_ob.toLocaleString('en-US', options)
//     // current date
//     // console.log(ctOffset)
//     // adjust 0 before single digit date
//     // date_ob.setMinutes(date_ob.getMinutes()+ctOffset)
//     const [month, day, year, time] = ctTime.split(/[/, ]+/); // Split the date string into its component parts
// const [hours, minutes] = time.split(':');
//     // let date = ("0" + date_ob.getDate()).slice(-2);
  
//     // // current month
//     // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
//     // // current year
//     // let year = date_ob.getFullYear();
  
//     // // current hours
//     // let hours = ("0" + date_ob.getHours()).slice(-2);
  
//     // // current minutes
//     // let minutes = ("0" + date_ob.getMinutes()).slice(-2);
  
//     // // current seconds
    
  
//     // DD/MM/YYYY HH:MM
//     let curr = day+'/'+month+'/'+year+' '+hours+':'+minutes;
//     // console.log(date_ob)
//     return curr;
//   };
//   const getDate = () => {
//     let date_ob = new Date();
  
//     // current date
//     // adjust 0 before single digit date
//     let date = ("0" + date_ob.getUTCDate()).slice(-2);
  
//     // current month
//     let month = ("0" + (date_ob.getUTCMonth() + 1)).slice(-2);
  
//     // current year
//     let year = date_ob.getUTCFullYear();
  
//     // current hours
//     let hours = ("0" + date_ob.getUTCHours()).slice(-2);
  
//     // current minutes
//     let minutes = ("0" + date_ob.getUTCMinutes()).slice(-2);
  
//     // current seconds
//     let seconds = ("0" + date_ob.getUTCSeconds()).slice(-2);
  
//     // prints date in YYYY-MM-DD format
//     // console.log(year + "-" + month + "-" + date);
//     let curr =
//       year +
//       "-" +
//       month +
//       "-" +
//       date +
//       "T" +
//       hours +
//       ":" +
//       minutes +
//       ":" +
//       seconds;
//     return curr;
//   };
// console.log(actualDate(getDate()))
const moment = require('moment-timezone');

const timeZones = moment.tz.name()
// const offsets = {};

// for (const timeZone of timeZones) {
//   const date = new Date();
//   const offset = -moment.tz(date, timeZone).utcOffset();
//   offsets[timeZone] = offset;
// }

console.log(offsets[Intl.DateTimeFormat().resolvedOptions().timeZone]);