let usersList = []
let currId = 1

function createUser(name,email,activeStatus){
  // check if name email present
  if(!name ||!email){
    throw new Error("Name and email is required")
  }

  let userObj = {
    id : currId,
    name : name,
    email : email,
    isActive : activeStatus
  }

  if(activeStatus == undefined){
    userObj.isActive = true
  }

  currId = currId + 1
  usersList.push(userObj)
  return userObj
}

function getAllUsers(){
  return usersList
}

function searchUser(emailId){
  for(let i=0;i<usersList.length;i++){
    if(usersList[i].email == emailId){
      return usersList[i]
    }
  }
  throw new Error("User with email " + emailId + " not found")
}

function getActiveUsers(){
  let result = usersList.filter(u => u.isActive == true)
  return result
}

// main code
try{
  console.log(createUser("Prasanna","prasu@test.com",true))
  console.log(createUser("Jadda","jadda@test.com",false))
  let third = createUser("Manian","manian@test.com") // default active
  console.log(third)

  console.log("all - ", getAllUsers())
  console.log("search ", searchUser("prasu@test.com"))
  console.log("active ", getActiveUsers())

  searchUser("wrong@test.com") // error will come here
}catch(error){
  console.log("got error -", error.message)
}