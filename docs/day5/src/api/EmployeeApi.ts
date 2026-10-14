// handles server calls, retry, Promise.all

let fakeDepartments = ["IT", "HR", "Finance", "Sales", "Marketing"]

function simulateNetworkError() {
  let shouldFail = Math.random() < 0.2 // 20% fail chance
  if(shouldFail){
    throw new Error("Network Error: Failed to fetch")
  }
}

function delay(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms)
  })
}

// fetch employees from server
export async function fetchEmployeesFromServer(): Promise<any[]> {
  console.log("Fetching employees from server...")
  await delay(300)
  simulateNetworkError() // may throw error

  return [
    { id: 101, name: "Praveen", email: "praveen@company.com", age: 26, department: "IT", salary: 75000, role: "admin", isActive: true },
    { id: 102, name: "Anil", email: "anil@company.com", age: 28, department: "HR", salary: 50000, role: "user", isActive: true },
  ]
}

export async function fetchDepartmentsFromServer(): Promise<string[]> {
  console.log("Fetching departments...")
  await delay(200)
  return fakeDepartments
}

// retry logic
export async function fetchWithRetry<T>(apiCall: () => Promise<T>, maxRetries: number = 3): Promise<T> {
  let lastError: Error | null = null

  for(let attempt=1; attempt<=maxRetries; attempt++){
    try{
      let result = await apiCall()
      console.log("Success on attempt " + attempt)
      return result
    } catch(error){
      lastError = error as Error
      console.log("Attempt " + attempt + " failed: " + lastError.message)

      if(attempt == maxRetries){
        break
      }

      let waitTime = 500 * attempt // increasing delay
      console.log("Retrying in " + waitTime + "ms...")
      await delay(waitTime)
    }
  }

  throw new Error("Failed after " + maxRetries + " retries: " + lastError?.message)
}

// Promise.all - fetch both together
export async function getEmployeesAndDepartments() {
  console.log("\n--- Starting Promise.all ---")

  try{
    let [employees, departments] = await Promise.all([
      fetchWithRetry(() => fetchEmployeesFromServer(), 3),
      fetchDepartmentsFromServer()
    ])

    console.log("Both APIs done")
    return { employees, departments }
  } catch(error){
    console.error("Promise.all failed:", (error as Error).message)
    throw error
  }
}

export async function fetchEmployeeByIdWithRetry(id: number) {
  return fetchWithRetry(async () => {
    await delay(150)
    simulateNetworkError()
    return { id: id, name: "Test Employee" }
  }, 2)
}