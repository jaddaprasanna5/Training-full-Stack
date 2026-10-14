import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { Employee, CreateEmployeeInput, UpdateEmployeeInput, Department, Role } from "../models/Employee";
import { ValidationError } from "../errors/EmployeeErrors";

export class EmployeeService {
  constructor(private repo: EmployeeRepository) {} // repo injection

  private validateEmail(email: string) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // simple email check
    if(!regex.test(email)){
      throw new ValidationError("Invalid email: " + email)
    }
  }

  private validateCreate(input: CreateEmployeeInput) {
    // basic checks before creating
    if(!input.name ||!input.name.trim()){
      throw new ValidationError("Name required")
    }
    if(input.age < 18 || input.age > 70){
      throw new ValidationError("Invalid age " + input.age) // age limit
    }
    if(input.salary < 0){
      throw new ValidationError("Negative salary")
    }
    this.validateEmail(input.email)
  }

  async createEmployee(input: CreateEmployeeInput): Promise<Employee> {
    this.validateCreate(input)

    // check if email already exists
    let existing = await this.repo.searchByEmail(input.email)
    if(existing.length > 0){
      throw new ValidationError("Duplicate email: " + input.email)
    }

    // find max id for new id
    let all = await this.repo.getAll()
    let maxId = 100
    for(let e of all){
      if(e.id > maxId) maxId = e.id
    }

    let employee: Employee = {
      id: maxId + 1,
      name: input.name,
      email: input.email,
      age: input.age,
      department: input.department,
      salary: input.salary,
      role: input.role,
      isActive: input.isActive?? true // default active
    }

    return this.repo.create(employee)
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.repo.getAll() // get all emps
  }

  async getEmployeeById(id: number): Promise<Employee> {
    return this.repo.getById(id)
  }

  async updateEmployee(id: number, updates: UpdateEmployeeInput): Promise<Employee> {
    // id should not be changed
    if((updates as any).id!= undefined){
      throw new ValidationError("Cannot change ID")
    }
    if(updates.email!= undefined){
      this.validateEmail(updates.email)
    }
    if(updates.salary!= undefined && updates.salary < 0){
      throw new ValidationError("Negative salary")
    }
    if(updates.age!= undefined && (updates.age < 18 || updates.age > 70)){
      throw new ValidationError("Invalid age")
    }
    if(updates.name!= undefined &&!updates.name.trim()){
      throw new ValidationError("Name empty")
    }
    return this.repo.update(id, updates)
  }

  async deactivateEmployee(id: number): Promise<Employee> {
    let emp = await this.repo.getById(id)
    if(emp.isActive == false){
      throw new ValidationError("Already inactive " + id) // already inactive
    }
    return this.repo.update(id, { isActive: false })
  }

  async deleteEmployee(id: number): Promise<boolean> {
    return this.repo.delete(id)
  }

  async searchByName(q: string): Promise<Employee[]> {
    return this.repo.searchByName(q)
  }

  async filterByDepartment(d: Department): Promise<Employee[]> {
    return this.repo.filterByDepartment(d)
  }

  async filterByRole(r: Role): Promise<Employee[]> {
    return this.repo.filterByRole(r)
  }

  async filterByStatus(s: boolean): Promise<Employee[]> {
    return this.repo.filterByStatus(s)
  }

  async sortByName(): Promise<Employee[]> {
    return this.repo.sortByName()
  }

  async sortBySalary(o: "asc" | "desc" = "asc"): Promise<Employee[]> {
    return this.repo.sortBySalary(o)
  }

  async getAnalytics() {
    let all = await this.repo.getAll()
    if(all.length == 0){
      // no data case
      return { total: 0, avgSalary: 0, highest: null, top3: [] as Employee[], totalSalary: 0, countByDept: {} as any, avgByDept: {} as any, above60k: [] as Employee[], hasInactive: false, allValidEmail: true }
    }

    let total = all.length
    let totalSalary = 0
    for(let e of all){
      totalSalary = totalSalary + e.salary // sum salary
    }
    let avgSalary = totalSalary / total

    // sort high to low for highest and top3
    let sorted = [...all].sort((a,b) => b.salary - a.salary)
    let highest = sorted[0] // first is highest

    // top 3 emps - fixed the undefined error
    let top3: Employee[] = []
    for(let i=0; i<3 && i<sorted.length; i++){
      let emp = sorted[i] // emp can be undefined so check
      if(emp){
        top3.push(emp)
      }
    }

    // count by dept - how many in each dept
    let countByDept: any = {}
    for(let e of all){
      if(countByDept[e.department] == undefined){
        countByDept[e.department] = 0
      }
      countByDept[e.department]++
    }

    // avg salary dept wise
    let avgByDept: any = {}
    for(let dept in countByDept){
      let list = all.filter(e => e.department == dept)
      let sum = 0
      for(let l of list) sum = sum + l.salary
      avgByDept[dept] = sum / list.length
    }

    let above60k: Employee[] = [] // salary > 60k
    let hasInactive = false
    let allValidEmail = true
    for(let e of all){
      if(e.salary > 60000) above60k.push(e)
      if(e.isActive == false) hasInactive = true
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)){
        allValidEmail = false // invalid email found
      }
    }

    return { total, avgSalary, highest, top3, totalSalary, countByDept, avgByDept, above60k, hasInactive, allValidEmail }
  }
}