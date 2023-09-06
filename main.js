const yearsOut = document.querySelector('span[data-type="yearsValue"]');
const monthsOut = document.querySelector('span[data-type="monthsValue"]');
const daysOut = document.querySelector('span[data-type="daysValue"]');

const form = document.querySelector('.age-form');
const inputs = {
  days: document.getElementById('days'),
  months: document.getElementById('months'),
  years: document.getElementById('years'),
};
const errors = {
  day: document.querySelector('.dayError'),
  month: document.querySelector('.monthError'),
  year: document.querySelector('.yearError'),
};

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

function getDaysOfMonth(year, month) {
  const nextMonth = new Date(year, month, 1);
  const monthToGetDays = new Date(nextMonth - 1);
  return monthToGetDays.getDate();
}

function isNumeric(value) {
  return !Number.isNaN(value) || value !== 0;
}

function showError(field, message) {
  errors[field].innerText = message;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const daysValue = +inputs.days.value;
  const monthsValue = +inputs.months.value;
  const yearsValue = +inputs.years.value;
  console.log(daysValue);
  console.log(monthsValue);
  console.log(yearsValue);

  if (!isNumeric(daysValue)) {
    showError('day', 'Fill it with number');
  } else if (!isNumeric(monthsValue)) {
    showError('month', 'Fill it with number');
  } else if (!isNumeric(yearsValue)) {
    showError('year', 'Fill it with number');
  } else if (yearsValue > currentYear) {
    showError('year', 'Must be in the past');
  } else if ((monthsValue > currentMonth && currentYear === yearsValue) || monthsValue > 12 || monthsValue < 1) {
    showError('month', 'Invalid month');
  } else if (daysValue > getDaysOfMonth(yearsValue, monthsValue) || daysValue < 1) {
    showError('day', 'Invalid number of daysValue');
  }
});

console.log(errors.day);
errors.day.innerHTML = 'Ahoj pepo';
