const yearsOut = document.querySelector('span[data-type="years"]');
const monthsOut = document.querySelector('span[data-type="months"]');
const daysOut = document.querySelector('span[data-type="days"]');

const daysInput = document.getElementById('days');
const monthsInput = document.getElementById('months');
const yearsInput = document.getElementById('years');

const dayError = document.querySelector('.dayError');
const monthError = document.querySelector('.monthError');
const yearError = document.querySelector('.yearError');

function validateDays() {
  let error = '';
  let days = daysInput.value;

  dayError.innerText = error;
}

function validateMonths() {
  let error = '';
  let months = monthsInput.value;

  monthError.innerText = error;
}

function validateYears() {
  let error = '';
  let years = yearsInput.value;

  yearError.innerText = error;
}

daysInput.addEventListener('blur', validateDays);
monthsInput.addEventListener('blur', validateMonths);
yearsInput.addEventListener('blur', validateYears);
