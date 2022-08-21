export const TimeConverter = (startTimeInt, time) => {
  if (startTimeInt > 12) {
    startTimeInt -= 12;
    let str = startTimeInt.toString();
    return str.concat(time.substr(2), " PM");
  } else if (startTimeInt < 12) {
    return time.concat(" AM");
  } else return time.concat(" PM");
};
//Sat Aug 20 2022 12:30:00 GMT+0600 (Bangladesh Standard Time)
export const MomentTimeConverter = (momentTime) => {
  console.log(typeof momentTime);
};
