import { Student, StudentId } from "../models/types";
import { Repository } from "../Repositories/studentRepository";
import { validateStudent, checkEmail } from "../validation/validation";

export class StudentService {
  private repo: Repository<Student, StudentId>;

  constructor() {
    this.repo = new Repository<Student, StudentId>((student) => student.id);
  }

  addStudent(student: Student): void {
    validateStudent(student);

    let existing = this.repo.getById(student.id);
    if (existing) {
      throw new Error("Duplicate ID: " + student.id);
    }

    let allStudents = this.repo.getAll();
    let emailFound = allStudents.find(s => s.email == student.email);
    if (emailFound) {
      throw new Error("Duplicate email: " + student.email);
    }

    this.repo.add(student);
  }

  getStudent(id: StudentId): Student | undefined {
    return this.repo.getById(id);
  }

  getAllStudents(): Student[] {
    return this.repo.getAll();
  }

  updateStudent(id: StudentId, updates: Partial<Student>): boolean {
    let oldStudent = this.repo.getById(id);
    if (!oldStudent) {
      return false;
    }

    if (updates.id && updates.id != id) {
      throw new Error("You cannot change ID");
    }

    if (updates.email) {
      if (!checkEmail(updates.email)) {
        throw new Error("Invalid email");
      }
    }

    let newStudent = { ...oldStudent, ...updates };
    validateStudent(newStudent);

    return this.repo.update(id, newStudent);
  }

  deleteStudent(id: StudentId): boolean {
    return this.repo.delete(id);
  }

  // FIXED TOPPER - NO ERROR NOW
  getTopper(): Student | undefined {
    let students = this.repo.getAll();
    if (students.length == 0) {
      return undefined;
    }

    let topper: Student = students[0] as Student;

    for (let s of students) {
      if (s.marks > topper.marks) {
        topper = s;
      }
    }
    return topper;
  }

  getAverageMarks(): number {
    let students = this.repo.getAll();
    if (students.length == 0) {
      return 0;
    }

    let total = 0;
    students.forEach(s => total = total + s.marks);
    return Math.round(total / students.length);
  }

  getPassed(): Student[] {
    return this.repo.getAll().filter(s => s.marks >= 40);
  }

  getFailed(): Student[] {
    return this.repo.getAll().filter(s => s.marks < 40);
  }

  async saveToDB(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Saved to DB...");
        resolve();
      }, 500);
    });
  }
}