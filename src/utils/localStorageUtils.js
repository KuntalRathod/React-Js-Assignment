const USERS_KEY = "users" // Key for storing users in local storage
const LOGGED_IN_USER_KEY = "loggedInUser" // Key for storing logged-in user in local storage

// Retrieve users from local storage, return an empty array if none found
export const getUsersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || []
}

// Save the given users array to local storage
export const saveUsersToLocalStorage = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Retrieve the logged-in user from local storage
export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY))
}

// Save the logged-in user to local storage
export const saveLoggedInUser = (user) => {
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user))
}

// Clear the logged-in user data from local storage
export const clearLoggedInUser = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY)
}
