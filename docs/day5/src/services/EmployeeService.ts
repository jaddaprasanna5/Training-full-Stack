import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { Employee, CreateEmployeeInput, UpdateEmployeeInput, Department, Role } from "../models/Employee";
import { ValidationError } from "../errors/EmployeeErrors";

export class EmployeeService {
  constructor(private repo: EmployeeRepository) {}

  private validateEmail(email: string): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) throw new ValidationError(`Invalid email: ${email}`);
  }

  private validateCreate(input: CreateEmployeeInput): void {
    if (!input.name ||!input.name.trim()) throw new ValidationError("Name required");
    if (input.age < 18 || input.age > 70) throw new ValidationError(`Invalid age ${input.age}`);
    if (input.salary < 0) throw new ValidationError("Negative salary");
    this.validateEmail(input.email);
  }

  async createEmployee(input: CreateEmployeeInput): Promise<Employee> {
    this.validateCreate(input);
    const existing = await this.repo.searchByEmail(input.email);
    if (existing.length > 0) throw new ValidationError(`Duplicate email: ${input.email}`);
    const all = await this.repo.getAll();
    const ids = all.map((e) => e.id);
    const newId = ids.length > 0? Math.max(...ids) + 1 : 101;
    const employee: Employee = {
      id: newId,
      name: input.name,
      email: input.email,
      age: input.age,
      department: input.department,
      salary: input.salary,
      role: input.role,
      isActive: input.isActive?? true,
    };
    return this.repo.create(employee);
  }

  async getAllEmployees(): Promise<Employee[]> { return this.repo.getAll(); }
  async getEmployeeById(id: number): Promise<Employee> { return this.repo.getById(id); }

  async updateEmployee(id: number, updates: UpdateEmployeeInput): Promise<Employee> {
    if (Object.prototype.hasOwnProperty.call(updates, "id")) throw new ValidationError("Cannot change ID");
    if (updates.email!== undefined) this.validateEmail(updates.email);
    if (updates.salary!== undefined && updates.salary < 0) throw new ValidationError("Negative salary");
    if (updates.age!== undefined && (updates.age < 18 || updates.age > 70)) throw new ValidationError("Invalid age");
    if (updates.name!== undefined &&!updates.name.trim()) throw new ValidationError("Name empty");
    const before = (await this.repo.getAll()).length;
    const updated = await this.repo.update(id, updates);
    const after = (await this.repo.getAll()).length;
    if (before!== after) throw new ValidationError("Records changed");
    return updated;
  }

  async deactivateEmployee(id: number): Promise<Employee> {
    const emp = await this.repo.getById(id);
    if (!emp.isActive) throw new ValidationError(`Already inactive ${id}`);
    return this.repo.update(id, { isActive: false });
  }

  async deleteEmployee(id: number): Promise<boolean> { return this.repo.delete(id); }
  async searchByName(q: string): Promise<Employee[]> { return this.repo.searchByName(q); }
  async filterByDepartment(d: Department): Promise<Employee[]> { return this.repo.filterByDepartment(d); }
  async filterByRole(r: Role): Promise<Employee[]> { return this.repo.filterByRole(r); }
  async filterByStatus(s: boolean): Promise<Employee[]> { return this.repo.filterByStatus(s); }
  async sortByName(): Promise<Employee[]> { return this.repo.sortByName(); }
  async sortBySalary(o: "asc" | "desc" = "asc"): Promise<Employee[]> { return this.repo.sortBySalary(o); }

  async getAnalytics() {
    const all = await this.repo.getAll();
    if (all.length === 0) {
      return { total: 0, avgSalary: 0, highest: null, top3: [] as Employee[], totalSalary: 0, countByDept: {} as Record<string, number>, avgByDept: {} as Record<string, number>, above60k: [] as Employee[], hasInactive: false, allValidEmail: true };
    }
    const total = all.length;
    const totalSalary = all.reduce((sum, e) => sum + e.salary, 0);
    const avgSalary = totalSalary / total;
    const sorted = [...all].sort((a, b) => b.salary - a.salary);
    const highest = sorted[0];
    const top3 = sorted.slice(0, 3);
    const countByDept = all.reduce((acc, e) => { acc[e.department] = (acc[e.department] || 0) + 1; return acc; }, {} as Record<string, number>);
    const avgByDept = Object.keys(countByDept).reduce((acc, dept) => {
      const list = all.filter((e) => e.department === dept);
      acc[dept] = list.reduce((s, e) => s + e.salary, 0) / list.length;
      return acc;
    }, {} as Record<string, number>);
    return {
      total, avgSalary, highest, top3, totalSalary, countByDept, avgByDept,
      above60k: all.filter((e) => e.salary > 60000),
      hasInactive: all.some((e) =>!e.isActive),
      allValidEmail: all.every((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)),
    };
  }
}