const newYears = '14 Nov 2021';

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secsEl = document.getElementById('seconds');

function countDown(){
    const newYearsDate = new Date(newYears);
    const currDate = new Date();
    const totalSeconds = (newYearsDate - currDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;
    console.log(days, hours, mins, seconds);

    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secsEl.innerHTML = formatTime(seconds);



}
function formatTime(time){
    return time < 10 ?  (`0${time}`): time;
}
countDown();
setInterval(countDown, 1000);
