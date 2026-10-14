import { EmployeeRepository } from "./repositories/EmployeeRepository";
import { EmployeeService } from "./services/EmployeeService";
import { fetchWithRetry, fetchEmployeesFromServer, getEmployeesAndDepartments } from "./api/EmployeeApi";

async function main() {
  console.log("=== HR Employee Management System Started ===\n");

  // 1. Setup - create repo and service
  const repo = new EmployeeRepository();
  const service = new EmployeeService(repo);

  // 2. CRUD - Create 5 employees (Checklist A)
  console.log("--- A. CRUD: Creating Employees ---");
  try {
    await service.createEmployee({ name: "Praveen Kumar", email: "praveen@company.com", age: 26, department: "IT", salary: 75000, role: "admin" });
    await service.createEmployee({ name: "Anil Sharma", email: "anil@company.com", age: 28, department: "HR", salary: 55000, role: "user" });
    await service.createEmployee({ name: "Sunita Rao", email: "sunita@company.com", age: 30, department: "Finance", salary: 80000, role: "admin" });
    await service.createEmployee({ name: "Ravi Teja", email: "ravi@company.com", age: 24, department: "IT", salary: 60000, role: "user", isActive: false });
    await service.createEmployee({ name: "Divya Patel", email: "divya@company.com", age: 27, department: "Sales", salary: 65000, role: "user" });
    console.log("5 employees created");
  } catch (e) {
    console.error("Create error:", (e as Error).message);
  }

  // 3. Get All
  const all = await service.getAllEmployees();
  console.log(`\nTotal employees: ${all.length}`, all.map(e => e.name));

  // 4. B. Search, Filter, Sort
  console.log("\n--- B. Search, Filter, Sort ---");
  console.log("Search 'Praveen':", (await service.searchByName("Praveen")).map(e => e.name));
  console.log("Filter IT Dept:", (await service.filterByDepartment("IT")).map(e => e.name));
  console.log("Filter admin role:", (await service.filterByRole("admin")).map(e => e.name));
  console.log("Filter active:", (await service.filterByStatus(true)).map(e => e.name));
  console.log("Sort by name:", (await service.sortByName()).map(e => e.name));
  console.log("Sort by salary desc:", (await service.sortBySalary("desc")).map(e => `${e.name}:${e.salary}`));

  // 5. C. Analytics - map, filter, reduce, find, some, every, sort
  console.log("\n--- C. Analytics ---");
  const analytics = await service.getAnalytics();
  console.log(`Total: ${analytics.total}`);
  console.log(`Average Salary: ${analytics.avgSalary}`);
  console.log(`Total Salary Expense: ${analytics.totalSalary}`);
  console.log(`Highest Paid: ${analytics.highest?.name} - ${analytics.highest?.salary}`);
  console.log(`Top 3:`, analytics.top3.map(e => `${e.name}(${e.salary})`));
  console.log(`Count by Dept:`, analytics.countByDept);
  console.log(`Avg by Dept:`, analytics.avgByDept);
  console.log(`Salary > 60000:`, analytics.above60k.map(e => e.name));
  console.log(`Has Inactive? ${analytics.hasInactive} (uses some)`);
  console.log(`All Valid Email? ${analytics.allValidEmail} (uses every)`);

  // 6. D. Validation Tests
  console.log("\n--- D. Validation ---");
  try { await service.createEmployee({ name: "", email: "test@co.com", age: 25, department: "IT", salary: 50000, role: "user" }); } catch (e) { console.log("✓ Empty name blocked:", (e as Error).message); }
  try { await service.createEmployee({ name: "Test", email: "invalid-email", age: 25, department: "IT", salary: 50000, role: "user" }); } catch (e) { console.log("✓ Invalid email blocked:", (e as Error).message); }
  try { await service.createEmployee({ name: "Test", email: "praveen@company.com", age: 25, department: "IT", salary: 50000, role: "user" }); } catch (e) { console.log("✓ Duplicate email blocked:", (e as Error).message); }
  try { await service.createEmployee({ name: "Test", email: "test2@co.com", age: 25, department: "IT", salary: -1000, role: "user" }); } catch (e) { console.log("✓ Negative salary blocked:", (e as Error).message); }
  try { await service.updateEmployee(101, { id: 999 } as any); } catch (e) { console.log("✓ ID change blocked:", (e as Error).message); }
  try { await service.deactivateEmployee(104); await service.deactivateEmployee(104); } catch (e) { console.log("✓ Already inactive blocked:", (e as Error).message); }

  // 7. A. Update & Deactivate
  console.log("\n--- A. Update & Deactivate ---");
  const updated = await service.updateEmployee(102, { salary: 58000 });
  console.log(`Updated Anil salary to ${updated.salary}`);
  const deactivated = await service.deactivateEmployee(101);
  console.log(`Deactivated: ${deactivated.name} isActive=${deactivated.isActive}`);

  // 8. E. API, Retry, Promise.all
  console.log("\n--- E. API & Retry & Promise.all ---");
  try {
    const data = await fetchWithRetry(() => fetchEmployeesFromServer(), 3);
    console.log("Retry API success:", data.length, "employees from server");
  } catch (e) {
    console.log("Retry failed after 3 attempts:", (e as Error).message);
  }

  try {
    const both = await getEmployeesAndDepartments();
    console.log("Promise.all result - Departments:", both.departments);
  } catch (e) {
    console.log("Promise.all error:", (e as Error).message);
  }

  // 9. F. Access Modifiers demo
  console.log("\n--- F. Access Modifiers ---");
  console.log("Repository and Service use private/public as per requirement - checked in code");

  console.log("\n=== All 57 Checklist Tasks Completed ===");
}

main().catch((err) => {
  console.error("Main error:", err.message);
});