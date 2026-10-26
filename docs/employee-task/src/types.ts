export enum EmployeeRole{
    DEVELOPER = "DEVELOPER",
    TESTER = "TESTER",
    HR = "HR",
    MANAGER = "MANAGER"
}

export enum EmploymentStatus{
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ON_LEAVE = "ON_LEAVE"
}
export  type ContactInfo = {
    email:string;
    phone:number
}
export type BaseEmployee = {
    id:number;
    name:string;
    age:number;
    salary:number;
}

export type Employee = BaseEmployee & ContactInfo &{
    role:EmployeeRole;
    status:EmploymentStatus;
    skills: string[];
}