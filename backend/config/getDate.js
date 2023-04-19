const getDate = () => {
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getUTCDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getUTCMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getUTCFullYear();

  // current hours
  let hours = ("0" + date_ob.getUTCHours()).slice(-2);

  // current minutes
  let minutes = ("0" + date_ob.getUTCMinutes()).slice(-2);

  // current seconds
  let seconds = ("0" + date_ob.getUTCSeconds()).slice(-2);

  // prints date in YYYY-MM-DD format
  // console.log(year + "-" + month + "-" + date);
  let curr =
    year +
    "-" +
    month +
    "-" +
    date +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return curr;
};

module.exports = getDate;
