const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const deadline = document.querySelector(".deadline");
const giveaway = document.querySelector(".giveaway");
const timeUnits = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
//let endDate = new Date(2022,5,19,11,30,0);
const endDate = new Date(tempYear, tempMonth, tempDay + 10, 20, 30, 0)
const year = endDate.getFullYear();
const hours = endDate.getHours();
const mins = endDate.getMinutes();
let month = endDate.getMonth();
month = months[month]; 
const date = endDate.getDate();
const weekday = weekdays[endDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year}, ${hours}:${mins}hrs`

// future time in ms
const futureTime = endDate.getTime()

function getRemainingTime() {
  const today = new Date().getTime();
  const t = (futureTime - today);
  // values in ms
  const oneDay = (24 *60 *60 * 1000);
  const oneHour = (60 * 60 * 1000);
  const oneMinute = (60 * 1000);
  // calculate time differences
  const days = Math.floor(t / oneDay);
  const hours = Math.floor((t % oneDay) / oneHour);
  const minutes = Math.floor((t % oneHour) / oneMinute);
  const seconds = Math.floor((t % oneMinute) / 1000);

  //set values array
  const values = [days, hours, minutes, seconds];

  function formatNumbers(item) {
    if (item < 10) {
      return (item = `0${item}`)
    }
    return item;
  }

  timeUnits.forEach(function(item, index){
    item.innerHTML = formatNumbers(values[index]);
  })

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();