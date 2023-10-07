// Your code here
function createEmployeeRecord(employeeData) {
    const employee = {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
    return employee;
  }
  function createEmployeeRecords(employeeData) {
    return employeeData.map((row)=> {
      return createEmployeeRecord(row);
    });
  }

  function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });

    return employeeRecord;
  }

  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });

    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    let inEvent = employeeRecord.timeInEvents.find(function(e) {
      return e.date === date;
    });

    let outEvent = employeeRecord.timeOutEvents.find(function(e) {
      return e.date === date;
    });

    return (outEvent.hour - inEvent.hour) / 100;
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    let wage = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return parseFloat(wage.toString());
  }

  function allWagesFor(employeeRecord) {
    let eligibleDates = employeeRecord.timeInEvents.map(function(e) {
      return e.date;
    });

    let payable = eligibleDates.reduce(function(memo, d) {
      return memo + wagesEarnedOnDate(employeeRecord, d);
    }, 0);

    return payable;
  }

  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(e) {
      return e.firstName === firstName;
    });
  }

  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(memo, rec){
      return memo + allWagesFor(rec);
    }, 0);
  }