const days = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

export const getCurrentTime = () => {
  let today = new Date();
  let myYear = today.getFullYear();
  let myMonth = (today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1);
  let myDate = (today.getDate() < 10 ? "0" : "") + today.getDate();
  let myDay = today.getDay();
  let myTime = {
    year: myYear,
    month: myMonth,
    date: myDate,
    day: days[myDay],
  };
  return myTime;
};
