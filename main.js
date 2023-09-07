let yearsOld = 0;
let monthsOld = 0;
let daysOld = 0;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

const form = document.querySelector('.age-form');

const inputs = {
  days: document.getElementById('days'),
  months: document.getElementById('months'),
  years: document.getElementById('years'),
};

const outputs = {
  days: document.querySelector('span[data-type="days"]'),
  months: document.querySelector('span[data-type="months"]'),
  years: document.querySelector('span[data-type="years"]'),
};

const errors = {
  days: document.querySelector('.dayError'),
  months: document.querySelector('.monthError'),
  years: document.querySelector('.yearError'),
};

function getDaysOfMonth(year, month) {
  const nextMonth = new Date(year, month, 1);
  const monthToGetDays = new Date(nextMonth - 1);
  return monthToGetDays.getDate();
}

function isNumeric(value) {
  return !Number.isNaN(value);
}

function markInvalid(element) {
  element.closest('.form-group').classList.add('invalid');
}

function removeInvalid(element) {
  element.closest('.form-group').classList.remove('invalid');
}

function clearOutput(output) {
  output.textContent = '--';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const daysInputValue = +inputs.days.value;
  const monthsInputValue = +inputs.months.value;
  const yearsInputValue = +inputs.years.value;
  let daysError = '';
  let monthsError = '';
  let yearsError = '';

  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      removeInvalid(errors[key]);
    }
  }

  clearOutput(outputs.days);
  clearOutput(outputs.months);
  clearOutput(outputs.years);

  if (!isNumeric(daysInputValue)) {
    daysError = 'Fill it with number';
    markInvalid(errors.days);
  } else if (daysInputValue > getDaysOfMonth(yearsInputValue, monthsInputValue) || daysInputValue < 1) {
    daysError = 'Invalid number of days';
    markInvalid(errors.days);
  }

  if (!isNumeric(monthsInputValue)) {
    monthsError = 'Fill it with number';
    markInvalid(errors.months);
  } else if ((monthsInputValue > currentMonth && currentYear === yearsInputValue) || monthsInputValue > 12 || monthsInputValue < 1) {
    monthsError = 'Invalid month';
    markInvalid(errors.months);
  }

  if (!isNumeric(yearsInputValue)) {
    yearsError = 'Fill it with number';
    markInvalid(errors.years);
  } else if (yearsInputValue > currentYear) {
    yearsError = 'Must be in the past';
    markInvalid(errors.years);
  }

  if (!daysError && !monthsError && !yearsError) {
    yearsOld = currentYear - yearsInputValue;

    if (monthsInputValue > currentMonth || (monthsInputValue === currentMonth && daysInputValue > currentDay)) {
      yearsOld -= 1;
      monthsOld = 12 + (currentMonth - monthsInputValue);
    } else {
      monthsOld = currentMonth - monthsInputValue;
    }

    if (daysInputValue > currentDay) {
      monthsOld -= 1;
      daysOld = getDaysOfMonth(currentYear, monthsInputValue - 1) + (currentDay - daysInputValue);
    } else {
      daysOld = currentDay - daysInputValue;
    }

    outputs.days.textContent = daysOld;
    outputs.months.textContent = monthsOld;
    outputs.years.textContent = yearsOld;
  }

  errors.days.textContent = daysError;
  errors.months.textContent = monthsError;
  errors.years.textContent = yearsError;
});
