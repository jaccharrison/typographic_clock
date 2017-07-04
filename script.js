/* typographic clock */
var today = new Date();
var time = parseTime(today); // get time string
var date = parseDate(today); // get date string

document.querySelector('#time').textContent = ' ' + time;
document.querySelector('#date').textContent = ' ' + date + '.';

function parseDate(d) {
    var options = {weekday: 'long', month: 'long', day: 'numeric'};
    var date = d.toLocaleDateString('en-US', options);
    return date;
}

function parseTime(d) {
    const countingNumbers = {
	0: "o'clock", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
	6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven",
	12: "twelve", 13: "thirteen", 14: "fourteen", 15: "a quarter",
	16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen",
	30: "half"};
    const tens = { 2: "twenty", 3: "thirty" };

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var explicitMinutes = (minutes % 15) ? "minutes" : "";
    var joiner = (minutes < 40) ? "past" : "till";
    /* parse hours */
    if (hours === 12) {
	hours = "noon";
    } else if (hours === 0) {
	hours = "midnight";
    } else {
	hours = hours > 12 ? countingNumbers[hours-12] : countingNumbers[hours];
    }
    /* parse minutes */
    if (minutes < 20 || minutes === 30) {
	minutes = countingNumbers[minutes];
    } else if (60-minutes < 20) {
	minutes = countingNumbers[60 - minutes];
    } else {
	var tensDigit = tens[Math.floor(minutes/10)];
	minutes = tensDigit + "-" + countingNumbers[minutes%10];
    }
    if (explicitMinutes) {
	return minutes + " minutes " + joiner + " " + hours;
    } else {
	return minutes + " " + joiner + " " + hours;
    }
}
