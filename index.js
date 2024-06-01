// let isDobOpen = false;
// let dateOfBirth;
// const settingIcon = document.getElementById("setting_icon");
// const settingContent = document.getElementById("setting_content");
// const initialText = document.getElementById('initial_text');
// const afterText = document.getElementById('after_text')
// const dobBtn = document.getElementById('dobBtn');
// const dobInput = document.getElementById('dobInput');
// const yearsEl = document.getElementById('years');
// const monthsEl = document.getElementById('months');
// const daysEl = document.getElementById('days');
// const hoursEl = document.getElementById('hours');
// const minutesEl = document.getElementById('minutes');
// const secondsEl = document.getElementById('seconds');

// const twoDigitNumber = (number) => {
//         return number > 9 ? number : `0${number}`
// };

// const toggleDataOfBirth = () => {


//         if (isDobOpen) {
//                 settingContent.classList.add('hide')
//         } else {
//                 settingContent.classList.remove('hide')
//         }

//         isDobOpen = !isDobOpen;
//         console.log('Toggle ', isDobOpen)
// };

// const updateTime = () => {

//         const currentDate = new Date;
//         const dateDifferent = currentDate - dateOfBirth;
//         const years = Math.floor(dateDifferent / (1000 * 60 * 60 * 24 * 365))
//         const months = Math.floor(dateDifferent / (1000 * 60 * 60 * 24 * 365)) % 12
//         const days = Math.floor(dateDifferent / (1000 * 60 * 60 * 24)) % 30
//         const hours = Math.floor(dateDifferent / (1000 * 60 * 60)) % 24
//         const minutes = Math.floor(dateDifferent / (1000 * 60)) % 60
//         const seconds = Math.floor(dateDifferent / (1000)) % 60
//         yearsEl.innerHTML = twoDigitNumber(years);
//         monthsEl.innerHTML = twoDigitNumber(months);
//         daysEl.innerHTML = twoDigitNumber(days);
//         hoursEl.innerHTML = twoDigitNumber(hours);
//         minutesEl.innerHTML = twoDigitNumber(minutes);
//         secondsEl.innerHTML = twoDigitNumber(seconds);

// };

// const setDobHandler = () => {
//         const dateString = dobInput.value;
//         dateOfBirth = dateString ? new Date(dateString) : null;

//         const year = localStorage.getItem('year');
//         const month = localStorage.getItem('month');
//         const day = localStorage.getItem('day');
//         const hour = localStorage.getItem('hour');
//         const minute = localStorage.getItem('minute');
//         const second = localStorage.getItem('second');
//         if (year & month & day & hour & minute & second) {
//                 dateOfBirth = new Date(year, month, day, hour, minute, second)
//         }

//         if (dateOfBirth) {
//                 localStorage.setItem('year', dateOfBirth.getFullYear);
//                 localStorage.setItem('month', dateOfBirth.getMonth());
//                 localStorage.setItem('day', dateOfBirth.getDay());
//                 localStorage.setItem('hour', dateOfBirth.getHours());
//                 localStorage.setItem('minute', dateOfBirth.getMinutes());
//                 localStorage.setItem('second', dateOfBirth.getSeconds());
//                 afterText.classList.remove('hide')

//                 setInterval(() => {
//                         updateTime();
//                 }, 1000);
//         } else {
//                 afterText.classList.add('hide');
//                 initialText.classList.remove('hide')
//         }
// };
// setDobHandler();

// settingIcon.addEventListener('click', toggleDataOfBirth);
// dobBtn.addEventListener('click', setDobHandler);

let isDobOpen = false;
let dateOfBirth;
const settingIcon = document.getElementById("setting_icon");
const settingContent = document.getElementById("setting_content");
const initialText = document.getElementById('initial_text');
const afterText = document.getElementById('after_text');
const dobBtn = document.getElementById('dobBtn');
const dobInput = document.getElementById('dobInput');
const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const twoDigitNumber = (number) => {
        return number > 9 ? number : `0${number}`;
};

const toggleDataOfBirth = () => {
        if (isDobOpen) {
                settingContent.classList.add('hide');
        } else {
                settingContent.classList.remove('hide');
        }
        isDobOpen = !isDobOpen;
        console.log('Toggle ', isDobOpen);
};

const calculateTimeDifference = () => {
        const now = new Date();
        const years = now.getFullYear() - dateOfBirth.getFullYear();
        const months = now.getMonth() - dateOfBirth.getMonth() + (years * 12);
        const days = Math.floor((now - dateOfBirth) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((now - dateOfBirth) / (1000 * 60 * 60));
        const minutes = Math.floor((now - dateOfBirth) / (1000 * 60));
        const seconds = Math.floor((now - dateOfBirth) / 1000);

        yearsEl.innerHTML = twoDigitNumber(Math.floor(days / 365));
        monthsEl.innerHTML = twoDigitNumber(Math.floor((days % 365) / 30));
        daysEl.innerHTML = twoDigitNumber(days % 30);
        hoursEl.innerHTML = twoDigitNumber(hours % 24);
        minutesEl.innerHTML = twoDigitNumber(minutes % 60);
        secondsEl.innerHTML = twoDigitNumber(seconds % 60);
};

const setDobHandler = () => {
        const dateString = dobInput.value;
        if (dateString) {
                dateOfBirth = new Date(dateString);
                localStorage.setItem('dob', dateOfBirth.toISOString());
                initialText.classList.add('hide');
                afterText.classList.remove('hide');
                setInterval(calculateTimeDifference, 1000);
        } else {
                afterText.classList.add('hide');
                initialText.classList.remove('hide');
        }
};

const loadDobFromLocalStorage = () => {
        const dobString = localStorage.getItem('dob');
        if (dobString) {
                dateOfBirth = new Date(dobString);
                initialText.classList.add('hide');
                afterText.classList.remove('hide');
                setInterval(calculateTimeDifference, 1000);
        } else {
                afterText.classList.add('hide');
                initialText.classList.remove('hide');
        }
};

loadDobFromLocalStorage();
settingIcon.addEventListener('click', toggleDataOfBirth);
dobBtn.addEventListener('click', setDobHandler);
