import { Employee,EmployeeRole,EmploymentStatus} from "./types";

const testEmp:Employee ={
   id: 1,
  name: "Amit",
  age: 24,
  salary: 35000,
  email: "amit@gmail.com",
  phone: 9876543210,
  role: EmployeeRole.DEVELOPER,
  status: EmploymentStatus.ACTIVE,
  skills: ["JS", "TS"]
};

console.log("Types working:", testEmp.name);
console.log("age: ",testEmp.salary);