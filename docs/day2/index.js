const employees = require('./employees.json')

// first group all emps by dept
let groupByDept = {}

employees.forEach((emp) => {
  let dept = emp.department
  if(!groupByDept[dept]){
    groupByDept[dept] = []
  }
  groupByDept[dept].push(emp)
})

console.log(groupByDept)

// find average salary
let avgSalary = {}
let allDepts = Object.keys(groupByDept)

for(let i=0; i<allDepts.length; i++){
  let deptName = allDepts[i]
  let emps = groupByDept[deptName]
  let sum = 0
  for(let j=0; j<emps.length; j++){
    sum = sum + emps[j].salary
  }
  avgSalary[deptName] = Math.round(sum / emps.length)
}

console.log("Average salary dept wise: ", avgSalary)

// highest salary in each dept
let highestPaid = {}

for(let dept in groupByDept){
  let list = groupByDept[dept]
  let max = list[0]
  list.forEach((e) => {
    if(e.salary > max.salary){
      max = e
    }
  })
  highestPaid[dept] = max
}

console.log("Highest paid per dept -", highestPaid)

// top 5 highest paid from all
// sorting descending
let copyEmps = [...employees] // copy to avoid changing original

copyEmps.sort(function(a,b){
  return b.salary - a.salary
})

let top5Paid = []
for(let k=0; k<5; k++){
  let e = copyEmps[k]
  top5Paid.push({ name: e.name, department: e.department, salary: e.salary })
}

console.log("Top 5 paid employees:")
console.log(top5Paid)