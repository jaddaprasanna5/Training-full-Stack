import { Repository } from "./Repository";
import { Employee, Role, Department } from "../models/Employee";

export class EmployeeRepository extends Repository<Employee> {

  async searchByName(query: string): Promise<Employee[]> {
    let q = query.trim().toLowerCase()
    if(!q) return []
    let result: Employee[] = []
    let all = await this.getAll()
    for(let emp of all){
      if(emp.name.toLowerCase().includes(q)){
        result.push(emp)
      }
    }
    return result
  }

  async searchByEmail(email: string): Promise<Employee[]> {
    let target = email.trim().toLowerCase()
    let all = await this.getAll()
    return all.filter(e => e.email.toLowerCase() == target)
  }

  async filterByDepartment(department: Department): Promise<Employee[]> {
    let all = await this.getAll()
    let res: Employee[] = []
    for(let e of all){
      if(e.department == department) res.push(e)
    }
    return res
  }

  async filterByRole(role: Role): Promise<Employee[]> {
    let all = await this.getAll()
    return all.filter(e => e.role == role)
  }

  async filterByStatus(isActive: boolean): Promise<Employee[]> {
    return this.find((emp) => emp.isActive == isActive)
  }

  async sortByName(): Promise<Employee[]> {
    let all = await this.getAll()
    let copy = [...all]
    copy.sort((a,b) => {
      return a.name.localeCompare(b.name)
    })
    return copy
  }

  async sortBySalary(order: "asc" | "desc" = "asc"): Promise<Employee[]> {
    let all = await this.getAll()
    let copy = [...all]
    if(order == "asc"){
      copy.sort((a,b) => a.salary - b.salary)
    } else {
      copy.sort((a,b) => b.salary - a.salary)
    }
    return copy
  }

  async filterBySalaryAbove(amount: number): Promise<Employee[]> {
    return this.find((emp) => emp.salary > amount)
  }
}