import { StudentService } from "../src/Services/studentService";
import { Student } from "../src/models/types";
import { calculateGrade } from "../src/validation/validation";

const service = new StudentService();

let s1: Student = { id: "ST101", name: "Ravi", email: "ravi@test.com", age: 20, course: "TypeScript", marks: 95 };
let s2: Student = { id: "ST102", name: "Priya", email: "priya@test.com", age: 21, course: "JavaScript", marks: 82 };
let s3: Student = { id: "ST103", name: "Kiran", email: "kiran@test.com", age: 19, course: "Python", marks: 35 };
let s4: Student = { id: "ST104", name: "Sneha", email: "sneha@test.com", age: 22, course: "TypeScript", marks: 68 };
let s5: Student = { id: "ST105", name: "Arjun", email: "arjun@test.com", age: 20, course: "Python", marks: 45 };

try {
  service.addStudent(s1);
  service.addStudent(s2);
  service.addStudent(s3);
  service.addStudent(s4);
  service.addStudent(s5);
} catch (e: any) {
  console.log(e.message);
}

console.log("Total Students: ", service.getAllStudents().length);
console.log("Topper: ", service.getTopper()?.name);
console.log("Average: ", service.getAverageMarks());

let all = service.getAllStudents();
console.log("\nAll Students:");
all.map( s => {
  console.log(s.id + " - " + s.name + " - " + s.marks + " - Grade: " + calculateGrade(s.marks));
});

// example search
let found = all.find( s => s.name === "Priya");
console.log("\nSearch result:", found);

console.log("\nPassed: ", service.getPassed().length);
console.log("Failed: ", service.getFailed().length);