class ApiError extends Error{
  constructor(msg){
    super(msg)
    this.name = "ApiError"
    this.statusCode = 500
  }
}

class NotFoundError extends Error{
  constructor(msg){
    super(msg)
    this.name = "NotFoundError"
    this.statusCode = 404
  }
}

let usersDB = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Aman" }
]

let ordersDB = [
  { id: 101, userId: 1, product: "Laptop", amount: 50000 },
  { id: 102, userId: 2, product: "Mouse", amount: 800 }
]

let projectsDB = [
  { id: 201, name: "Task Management App" },
  { id: 202, name: "E-commerce Site" }
]

// fake api call with delay
function fakeApiCall(data, apiName){
  return new Promise((resolve, reject) => {
    let delay = Math.floor(Math.random() * 1500) + 500
    let shouldFail = Math.random() < 0.3

    setTimeout(() => {
      if(shouldFail == true){
        reject(new ApiError(apiName + " failed due to network"))
      } else {
        resolve(data)
      }
    }, delay)
  })
}

function getUsers(){
  console.log("getting users......")
  return fakeApiCall(usersDB, "getUsers")
}

function getOrders(){
  console.log("getting orders......")
  return fakeApiCall(ordersDB, "getOrders")
}

function getProjects(){
  console.log("getting projects......")
  return fakeApiCall(projectsDB, "getProjects")
}

// find user by id
function getUserById(id){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user = null
      for(let u of usersDB){
        if(u.id == id){
          user = u
        }
      }
      if(!user){
        reject(new NotFoundError("user with id " + id + " not found"))
      } else {
        resolve(user)
      }
    }, 800)
  })
}

// retry logic
async function withRetry(fn, retries){
  if(retries == undefined) retries = 3
  
  for(let i=1; i<=retries; i++){
    try{
      console.log("Attempt " + i + " for " + fn.name)
      let data = await fn()
      return data
    } catch(err){
      console.log("Attempt " + i + " failed: " + err.message)
      if(i == retries){
        throw err
      }
      // wait a bit before next try
      await new Promise(r => setTimeout(r, 500))
    }
  }
}

async function main(){
  try{
    let users = await withRetry(getUsers, 3)
    console.log(users)
  } catch(e){
    console.log("users fetch failed: " + e.message)
  }

  try{
    let orders = await withRetry(getOrders, 3)
    console.log(orders)
  } catch(e){
    console.log("orders fetch failed: " + e.message)
  }

  try{
    let projects = await withRetry(getProjects, 3)
    console.log(projects)
  } catch(e){
    console.log("projects failed: " + e.message)
  }

  try{
    let singleUser = await getUserById(1)
    console.log("single user -", singleUser)
  } catch(e){
    console.log(e.message)
  }

  try{
    await getUserById(99)
  } catch(e){
    console.log(e.name + " : " + e.message)
  }
}

main()