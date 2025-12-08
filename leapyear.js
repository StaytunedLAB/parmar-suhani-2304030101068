function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        console.log(year + " is a Leap Year");
    } else {
        console.log(year + " is NOT a Leap Year");
    }
}
isLeapYear(2024);
isLeapYear(2023);
