// api/employeeApi.ts - handles server calls, retry, Promise.all

// Fake server data for Promise.all demo
const fakeDepartments = ["IT", "HR", "Finance", "Sales", "Marketing"];

// Simulate network - 20% chance to fail
function simulateNetworkError(): void {
  const shouldFail = Math.random() < 0.2; // 20% fail
  if (shouldFail) {
    throw new Error("Network Error: Failed to fetch");
  }
}

// Delay helper - like your delay in Repository
function delay(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

// 1. Fetch employees from server (fake API)
export async function fetchEmployeesFromServer(): Promise<any[]> {
  console.log("Fetching employees from server...");
  await delay(300); // server delay
  simulateNetworkError(); // may throw

  // fake data returned from server
  return [
    { id: 101, name: "Praveen", email: "praveen@company.com", age: 26, department: "IT", salary: 75000, role: "admin", isActive: true },
    { id: 102, name: "Anil", email: "anil@company.com", age: 28, department: "HR", salary: 50000, role: "user", isActive: true },
  ];
}

// 2. Fetch departments from server (second API for Promise.all)
export async function fetchDepartmentsFromServer(): Promise<string[]> {
  console.log("Fetching departments from server...");
  await delay(200);
  return fakeDepartments;
}

// 3. Retry logic - Checklist E - Retry with increasing delays
export async function fetchWithRetry<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // try to call API
      const result = await apiCall();
      console.log(`Success on attempt ${attempt}`);
      return result;
    } catch (error) {
      lastError = error as Error;
      console.log(`Attempt ${attempt} failed: ${lastError.message}`);

      // if last attempt, don't wait, throw error
      if (attempt === maxRetries) {
        break;
      }

      // wait with increasing delay: 500ms, 1000ms, 1500ms
      const waitTime = 500 * attempt;
      console.log(`Retrying in ${waitTime}ms...`);
      await delay(waitTime);
    }
  }

  // all retries failed
  throw new Error(`Failed after ${maxRetries} retries: ${lastError?.message}`);
}

// 4. Promise.all - Checklist E - Fetch multiple at same time
export async function getEmployeesAndDepartments() {
  console.log("\n--- Starting Promise.all ---");
  
  try {
    // Promise.all runs both APIs together - faster
    const [employees, departments] = await Promise.all([
      fetchWithRetry(() => fetchEmployeesFromServer(), 3),
      fetchDepartmentsFromServer(),
    ]);

    console.log("Both APIs completed");
    return { employees, departments };
  } catch (error) {
    console.error("Promise.all failed:", (error as Error).message);
    throw error;
  }
}

// 5. Fetch one employee by ID with retry
export async function fetchEmployeeByIdWithRetry(id: number) {
  return fetchWithRetry(async () => {
    await delay(150);
    simulateNetworkError();
    return { id, name: "Test Employee" };
  }, 2);
}