import { UserRepository } from "./repositories/user.repository.js";
import { UserService } from "./services/user.service.js";

const repo = new UserRepository();
const service = new UserService(repo);



// 1. CREATE
const u1 = service.create({ name: "Sravani", email: "sravani@gmail.com", role: "admin" });
const u2 = service.create({ name: "Aman", email: "aman@gmail.com", role: "user" });
console.log("Created:", u1, u2);

// 2. DUPLICATE CHECK
try {
  service.create({ name: "Test", email: "aman@gmail.com", role: "user" });
} catch (e:any) {
  console.log("Duplicate caught:", e.message);
}

// 3. GET ALL
console.log("All users:", service.getAll());
console.log("Only ADMIN:", service.getAll({ role: "admin" }));
console.log("Sorted by name:", service.getAll({ sortByName: true }));

// 4. SEARCH & UPDATE & DEACTIVATE
console.log("Search 'srav':", service.search("srav"));
const updated = service.update(u2.id, { name: "Aman Kumar" });
console.log("Updated:", updated);

const deactivated = service.deactivate(u1.id);
console.log("Deactivated:", deactivated);

console.log("Active only:", service.getAll({ active: true }));