// Get elements

//Todo: Hide Button and Display Table
const newPayrollBtn = document.getElementById("NewPayroll");
newPayrollBtn.addEventListener("click", () => {
  const payrollTable = document.getElementById("PayrollTable");
  // console.log(payrollTable);

  payrollTable.style.display = "table";
  newPayrollBtn.style.display = "none";
});

//Todo: Get Data from JSON file
//* Employee First & Last Name
//* Hourly Wage
let personalList = [];

const loadEmployees = async () => {
  try {
    const res = await fetch("data/employees.json");
    personalList = await res.json();

    // console.log(personalList);

    displayEmployees(personalList);
  } catch (err) {
    console.error(err);
  }
};

// todo:
const displayEmployees = (employee) => {
  const employeesTable = employee
    .map((employee) => {
      return `
<tr>

<th scope="row" >${employee.id}</th>
<td>${employee.firstName}</td>
<td>${employee.lastName}</td>
<td>$${employee.hw}</td>
<td><input type="number" class="hours-worked" style="width:60px"  min="0"/> h</td>
<td class='monthly-pay fw-bold' > </td>

</tr>
        

      `;
    })
    .join("");

  document.getElementById("Employees-table").innerHTML = employeesTable;

  //! -----------------------------------------------------

  monthlyPay();

  // console.log(employee);

  //todo: 5+6 Outputs Max, Min & Avg
  //* Get Hourly Wage
  const getEmployeesHW = employee.map((employee) => employee.hw);

  // console.log(getEmployeesHW);

  //* Maximum Wage
  let maxHW = calcMaxWage(getEmployeesHW);
  document.getElementById("Max-wage").innerText = "$" + maxHW;

  //* Minimum Wage
  let minHW = calcMinWage(getEmployeesHW);
  document.getElementById("Min-wage").innerText = "$" + minHW;

  //* Average Wage
  // get total amount of hourly wages
  const getTotalHW = (total, hw) => total + hw;

  const getAvgHW = (arr) => arr.reduce(getTotalHW, 0) / arr.length;

  // console.log(getAvgHW(getEmployeesHW));

  let avgHW = getAvgHW(getEmployeesHW).toFixed(2);
  document.getElementById("Avg-wage").innerText = "$" + avgHW;
};

loadEmployees();

function monthlyPay() {
  const hoursWorked = document.querySelectorAll(".hours-worked");
  // console.log(hoursWorked);

  hoursWorked.forEach((workHour) => {
    workHour.addEventListener("keyup", (e) => {
      // console.log(e.target.value);
      //! Condition Action
      if (e.target.value === "" || e.target.value <= 0) {
        return;
      } else {
        // console.log("moths pay");
        if (e.key === "Enter") {
          // console.log(e.target.value);
          // console.log(e.target.parentElement.parentElement.children[3].innerText);
          const hour = e.target.value;
          const hourlyWage = Number(
            e.target.parentElement.parentElement.children[3].innerText.substring(
              1
            )
          );

          // console.log(e.target.parentElement.parentElement.children[5]);

          let monthlyPay = e.target.parentElement.parentElement.children[5];

          const calcMonthlyPay = (hour * hourlyWage).toFixed(2);

          monthlyPay.innerText = "$" + calcMonthlyPay;

          //todo: Set to Local / Session  storage

          saveData(hour);

          //* Get Total Payouts

          getTotalPayouts();
        }
      }
    });
  });
}

// Todo: Input
//* Hours Worked

//todo: Output
//* Monthly Pay = Hourly Wage * Hours Worked

//* Maximum Wage
function calcMaxWage(arr) {
  return Math.max(...arr);
}
//* Minimum Wage

function calcMinWage(arr) {
  return Math.min(...arr);
}

//* Total

//todo: Set to Local / Session  storage

function saveData(hour) {
  let hours;

  if (sessionStorage.getItem("hours") === null) {
    hours = [];
  } else {
    hours = JSON.parse(sessionStorage.getItem("hours"));
  }

  hours.push(hour);

  sessionStorage.setItem("hours", JSON.stringify(hours));

  // console.log(hours);

  const newHours = hours.map((hour) => parseInt(hour));
  // console.log(newHours);

  let totalHours = newHours.reduce(calcTotal, 0);

  // console.log(totalHours);
  document.getElementById("Total-WH").innerText = totalHours + " h";
}

// ? uFunc for calculating  total amount!

const calcTotal = (total, num) => {
  return total + num;
};

function getTotalPayouts() {
  const allMonthlyPays = document.querySelectorAll(".monthly-pay");

  let arrayOfPayouts = Array.from(allMonthlyPays);
  // console.log(arrayOfPayouts);

  let newPayout = arrayOfPayouts.map((payout) =>
    parseFloat(payout.innerHTML.substring(1))
  );

  // console.log(newPayout);

  // * Return array elements with values
  newPayout = newPayout.filter((payout) => payout);

  // console.log(newPayout);

  let calculateTotalPay = newPayout.reduce(calcTotal, 0);

  document.getElementById("Total-pay").innerText =
    "$" + calculateTotalPay.toFixed(2);
}