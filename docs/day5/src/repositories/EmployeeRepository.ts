import { Repository } from "./Repository";
import { Employee,Role,Department } from "../models/Employee";
export class EmployeeRepository extends Repository<Employee>{
    async searchByName (query:string):Promise<Employee[]>{
        const q = query.trim().toLowerCase();
        if(!q)return [];
        return this.find((emp) => emp.name.toLowerCase().includes(q));
    }

    async searchByEmail(email:string):Promise<Employee[]>{
        const target = email.trim().toLowerCase();
        return this.find((emp) => emp.email.toLowerCase() === target);
    }
    async filterByDepartment(department:Department):Promise<Employee[]>{
        return this.find((emp) => emp.department === department);
    }
    async filterByRole(role:Role):Promise<Employee []>{
        return  this.find((emp) => emp.role === role);
    }
    async filterByStatus(isActive:boolean):Promise<Employee[]>{
        return this.find((emp)=> emp.isActive === isActive);
    }
    async sortByName():Promise<Employee []>{
        const all = await this.getAll();
        return [...all].sort((a,b)=> a.name.localeCompare(b.name));
    }
    async sortBySalary(order:"asc"|"desc" = "asc"):Promise<Employee []>{
        const all = await this.getAll();
        return [...all].sort((a,b) => {
            return order === "asc"?a.salary-b.salary :b.salary - a.salary;
        });
    }
    async filterBySalaryAbove(amount: number): Promise<Employee[]> {
    return this.find((emp) => emp.salary > amount);
  }
}