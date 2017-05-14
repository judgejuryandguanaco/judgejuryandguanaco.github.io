google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawPaymentsChart)

function drawPaymentsChart() {
	var payTbl = new google.visualization.DataTable();
	var payCht = new google.visualization.LineChart(document.getElementById('payments'));
	var penTbl = new google.visualization.DataTable();
	var penCht = new google.visualization.LineChart(document.getElementById('lumpSum'));

	var startYear = document.getElementById("startYear").value;
	var startMonth = document.getElementById("startMonth").value;
	var endYear = document.getElementById("endYear").value;
	var endMonth = document.getElementById("endMonth").value;
	var payBand = document.getElementById("band").value;
	var payPoint = document.getElementById("point").value;

	var startDate = new Date(startYear, startMonth);
	var endDate = new Date(endYear, endMonth);

	console.log(isNaN(payPoint));
	console.log(payBand);
	console.log(startYear);
	
	var payChtOps = {
		title: "Personal Contributions",
		legend: { position: 'bottom' }
	};

	var penChtOps = {
		title: "Size of Pension Over Time",
		legend: { position: "bottom" }
	};

	console.log(payBand);
	console.log(payPoint);
	payTbl = calculatePayments(startDate, endDate, payPoint, 6);
	penTbl = calculatePension(payTbl);

	//console.log("Draw charts");

	payCht.draw(payTbl, payChtOps);  
	penCht.draw(penTbl, penChtOps);
}

function calculatePayments(startDate, endDate, startPoint, startBand) {
	var paymentsTable = new google.visualization.DataTable();
	var payment = 0;
	var salary = 0;
	var rate = 0;
	var year = startDate.getFullYear();
	var month = startDate.getMonth();
	var i = 0;
	var date = new Date(0);
	var payPoint = startPoint;
	var payBand = startBand;
	var startMonth = +startDate.getMonth();

	console.log("year: " + year);
	console.log("month: " + month);
	console.log("point: " + payPoint);
	console.log("band: " + startBand)

	paymentsTable.addColumn("date", "Time");
	paymentsTable.addColumn("number", "Contributions");

	do {
		salary = getSalary(year, month, payPoint);
		console.log("salary: " + salary);
		rate = getRate(year, month, salary);
		console.log("pay point: " + payPoint);
		payment = salary * rate / 12;
		payment = Math.round(payment * 100) / 100;
		date = new Date(year, month);
		paymentsTable.addRow([date, payment]);
		//console.log("Date = " + paymentsTable.getValue(i,0) +
		///           " Payment = " + paymentsTable.getValue(i++,1));
		month++;
		if (month === 13) {
			month = 1;
			year++;
		}
		if (month === startMonth - 1) {
			payPoint = incrementPoint(year, month, payBand, payPoint);
		}
	} while(!((year >= endDate.getFullYear()) && (month > endDate.getMonth())));

	console.log("return paymentsTable");
	return paymentsTable;
}

function getSalary(year, month, payPoint) {
	var salary = 0;
	var financialYears = calcFinancialYears(2015, year, month);

	console.log(isNaN(payPoint));
	console.log(payPoint * 10);

	switch(+payPoint) {
	case 1:
		salary = 14294;
		break;
	case 2:
		salary = 14653;
		break;
	case 3:
		salary = 15013;
		break;
	case 4:
		salary = 15432;
		break;
	case 5:
		salary = 15851;
		break;
	case 6:
		salary = 16271;
		break;
	case 7:
		salary = 16811;
		break;
	case 8:
		salary = 17425;
		break;
	case 9:
		salary = 17794;
		break;
	case 10:
		salary = 18285;
		break;
	case 11:
		salary = 18838;
		break;
	case 12:
		salary = 19268;
		break;
	case 13:
		salary = 19947;
		break;
	case 14:
		salary = 20683;
		break;
	case 15:
		salary = 21265;
		break;
	case 16:
		salary = 21478;
		break;
	case 17:
		salary = 22016;
		break;
	case 18:
		salary = 22903;
		break;
	case 19:
		salary = 23835;
		break;
	case 20:
		salary = 24799;
		break;
	case 21:
		salary = 25783;
		break;
	case 22:
		salary = 26822;
		break;
	case 23:
		salary = 27901
		break;
	case 24:
		salary = 28755;
		break;
	case 25:
		salary = 29759;
		break;
	case 26:
		salary = 30764;
		break;
	case 27:
		salary = 31768;
		break;
	case 28:
		salary = 32898;
		break;
	case 29:
		salary = 34530;
		break;
	case 30:
		salary = 35536;
		break;
	case 31:
		salary = 36666;
		break;
	case 32:
		salary = 37921;
		break;
	case 33:
		salary = 39239;
		break;
	case 34:
		salary = 40558;
		break;
	case 35:
		salary = 42190;
		break;
	case 36:
		salary = 43822;
		break;
	case 37:
		salary = 45707;
		break;
	case 38:
		salary = 47088;
		break;
	case 39:
		salary = 49473;
		break;
	case 40:
		salary = 52235;
		break;
	case 41:
		salary = 54998;
		break;
	case 42:
		salary = 56504;
		break;
	case 43:
		salary = 59016;
		break;
	case 44:
		salary = 61779;
		break;
	case 45:
		salary = 65922;
		break;
	case 46:
		salary = 67805;
		break;
	case 47:
		salary = 70631;
		break;
	case 48:
		salary = 74084;
		break;
	case 49:
		salary = 77850;
		break;
	case 50:
		salary = 81618;
		break;
	case 51:
		salary = 85535;
		break;
	case 52:
		salary = 89640;
		break;
	case 53:
		salary = 93944;
		break;
	case 54:
		salary = 98453;
		break;
	default:
		console.log("out ere");
		salary = 0;
		break;
	}
	console.log("Paypoint = " + payPoint + " Old salary = " + salary + " Financial years = " + financialYears);

	salary *= Math.pow(1.01, financialYears);

	console.log("New salary = " + salary);
	return salary;
}

function getRate(year, month, salary) {
  var rate = 0;
  var financialYears = calcFinancialYears(2015, year, month);
  //console.log("getRate()");
  //console.log(financialYears);
	if (salary <= 15431.99) {
		rate = 0.05;
	} else if (salary <= 21477.99) {
		rate = 0.056;
	} else if (salary <= 26823.99) {
		rate = 0.071;
	} else if (salary <= 47845.99) {
		rate = 0.093;
	} else if (salary <= 70630.99) {
		rate = 0.125;
	} else if (salary <= 111376.99) {
		rate = 0.135;
	} else if (salary > 111376.99) {
		rate = 0.145;
	}
  
  return rate;
}

function calcFinancialYears(start, end, month) {
	var financialYears = 0;

	financialYears = end - start;

	//console.log("month - 4 = " + (month - 4));
	if ((month - 4) < 0) {
	//console.log("hahaha");
	financialYears = financialYears - 1;
	}

	//console.log("calcFinancialYears(): start = " + start + " end = " + end + " month = " + month + " financialYears = " + financialYears);
	return financialYears;
}

function calculatePension(paymentsTable) {
	var pensionTable = new google.visualization.DataTable();
	var i = 0;
	var size = 0;
	var date = new Date(0);
	var interest = 1 + (0.05 / 12);

	pensionTable.addColumn("date", "Month");
	pensionTable.addColumn('number', 'Size');

	console.log("here!");
	for (i = 0; i < paymentsTable.getNumberOfRows(); i++) {
		date = paymentsTable.getValue(i, 0);
		size = (size * interest) + paymentsTable.getValue(i, 1);
		size = Math.round(size * 100) / 100;
		pensionTable.addRow([date, size]);
	}
	return pensionTable;
}

function incrementPoint(year, month, band, point) {
	var financialYears = calcFinancialYears(2015, year, month);  

	//console.log("year = " + year + " month = " + month + " band = " + band + " old point = " + point);
	switch(+band) {
	case 1:
		if (point < 3) {
			point++;
		}
		break;
	case 2:
		if (point < 8) {
			point++;
		}
		break;
	case 3:
		if (point < 12) {
			point++;
		}
		break;
	case 4:
		if (point < 17) {
			point++;
		}
		break;
	case 5:
		if (point < 23) {
			point++;
		}
		break;
	case 6:
		if(point < 29) {
			point++;
		}
		break;
	case 7:
		if (point < 34) {
			point++;
		}
		break;
	case 8: /* 8a */
		if (point < 38) {
			point++;
		}
		break;
	case 9: /* 8b */
		if (point < 42) {
			point++;
		}
		break;
	case 10: /* 8c */
		if (point < 46) {
			point++;
		}
		break;
	case 11: /* 8d */
		if (point < 83258) {
			point++;
		}
		break;
	case 12: /* 9 */
		if (point < 54) {
			point++;
		}
		break;
	}
	//console.log("new point = " + point);
	return point;
}