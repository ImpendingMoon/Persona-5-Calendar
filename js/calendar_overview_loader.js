const weekday = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
};

const month = [
	{
		name: "April",
		number: 4,
		days: 30,
		starts_on: weekday.friday,
		active_start: 8,
		active_end: 30,
	},
	{
		name: "May",
		number: 5,
		days: 31,
		starts_on: weekday.sunday,
		active_start: 0,
		active_end: 31,
	},
	{
		name: "June",
		number: 6,
		days: 30,
		starts_on: weekday.wednesday,
		active_start: 0,
		active_end: 30,
	},
	{
		name: "July",
		number: 7,
		days: 31,
		starts_on: weekday.friday,
		active_start: 0,
		active_end: 31,
	},
	{
		name: "August",
		number: 8,
		days: 31,
		starts_on: weekday.monday,
		active_start: 0,
		active_end: 31,
	},
	{
		name: "September",
		number: 9,
		days: 30,
		starts_on: weekday.thursday,
		active_start: 0,
		active_end: 30,
	},
	{
		name: "October",
		number: 10,
		days: 31,
		starts_on: weekday.saturday,
		active_start: 0,
		active_end: 31,
	},
	{
		name: "November",
		number: 11,
		days: 30,
		starts_on: weekday.tuesday,
		active_start: 0,
		active_end: 30,
	},
	{
		name: "December",
		number: 12,
		days: 31,
		starts_on: weekday.thursday,
		active_start: 0,
		active_end: 25,
	},
	{
		name: "January",
		number: 1,
		days: 31,
		starts_on: weekday.sunday,
		active_start: 12,
		active_end: 31,
	},
	{
		name: "February",
		number: 2,
		days: 28,
		starts_on: weekday.wednesday,
		active_start: 0,
		active_end: 3,
	},
];

loadCalendarOverview().catch(console.error);

async function loadCalendarOverview() {
	let response = await fetch("/templates/calendar_month.html");
	const templateHTML = await response.text();

	const year20XXContainer = document.getElementById("20XXContainer");
	const year20XYContainer = document.getElementById("20XYContainer");

	month.forEach((monthObj) => {
		const monthDiv = createCalendarMonth(templateHTML, monthObj.name, monthObj);

		if (monthObj.number >= 4 && monthObj.number <= 12) {
			year20XXContainer.appendChild(monthDiv);
		} else {
			year20XYContainer.appendChild(monthDiv);
		}
	});
}

function createCalendarMonth(templateHTML, name, month) {
	let monthDiv = createMonthDiv(templateHTML);

	setMonthName(monthDiv, name);

	let currentWeek = createWeekRow();

	const monthContainer = monthDiv.querySelector("#monthContainer");
	monthContainer.appendChild(currentWeek);

	let currentWeekDay = weekday.sunday;

	while (currentWeekDay < month.starts_on) {
		currentWeek.appendChild(createEmptyCol());
		currentWeekDay++;
	}

	for (day = 1; day <= month.days; day++) {
		if (currentWeekDay > weekday.saturday) {
			currentWeek = createWeekRow();
			monthContainer.appendChild(currentWeek);
			currentWeekDay = weekday.sunday;
		}

		if (isDayActive(month, day)) {
			currentWeek.appendChild(createActiveDayCol(month, day));
		} else {
			currentWeek.appendChild(createInactiveDayCol(month, day));
		}

		currentWeekDay++;
	}

	while (currentWeekDay <= weekday.saturday) {
		currentWeek.appendChild(createEmptyCol());
		currentWeekDay++;
	}

	return monthDiv;
}

function createMonthDiv(templateHTML) {
	let monthDiv = document.createElement("div");
	monthDiv.innerHTML = templateHTML;

	monthDiv.classList.add("col");
	monthDiv.classList.add("col-12");
	monthDiv.classList.add("col-lg-6");
	monthDiv.classList.add("col-xl-4");

	return monthDiv;
}

function setMonthName(calendarDiv, name) {
	let titleHeader = calendarDiv.querySelector("#monthTitleHeader");
	titleHeader.textContent = name;
}

function createWeekRow(monthDiv) {
	let currentWeek = document.createElement("div");
	currentWeek.classList.add("row");

	return currentWeek;
}

function isDayActive(month, day) {
	return day >= month.active_start && day <= month.active_end;
}

function createEmptyCol() {
	let dayDiv = document.createElement("div");
	dayDiv.classList.add("col");
	dayDiv.classList.add("fs-3");
	dayDiv.classList.add("text-center");

	return dayDiv;
}

function createInactiveDayCol(month, day) {
	let dayDiv = createEmptyCol(month, day);
	let dayAnchor = document.createElement("a");

	dayAnchor.innerHTML = day;
	dayAnchor.classList.add("btn-link");
	dayAnchor.classList.add("text-secondary");
	dayAnchor.classList.add("text-decoration-none");

	dayDiv.appendChild(dayAnchor);

	return dayDiv;
}

function createActiveDayCol(month, day) {
	let dayDiv = createEmptyCol(month, day);
	let dayAnchor = document.createElement("a");

	dayAnchor.innerHTML = day;
	dayAnchor.classList.add("btn-link");
	dayAnchor.href = "/calendar/day.html?day=" + month.number + "-" + day;

	dayDiv.appendChild(dayAnchor);

	return dayDiv;
}
