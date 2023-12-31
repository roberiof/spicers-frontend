// PATTERNS 
export const formatToCurrency = (item) =>{
  return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(item)
}

export const errorMessageAnimation = (refButton , message) => {
  refButton.current.style.animation = 'vibrate 0.3s infinite'
  setTimeout( () => {
    refButton.current.style.animation = ''
    alert(message) 
  }, 50)
}

// API 
const api = 'http://localhost:3000'

// API PRODUCTS
export const getProductsApi = async() =>{
  try{
    const resp = await fetch( api + '/products' ).then(data => data.json())
    console.log(resp)
    return resp
  } catch(error){
    console.log(error)
    return 'error'
  }
}

export const updateProductApi = async(product) => {
  await fetch(`${api}/products/${product._id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
    headers:{
      "Content-Type": "application/json"
    },
  })
}

// API USERS 
export const postUserApi= async(user) => {
  await fetch(`${api}/users`, {
    method: "POST", 
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const getUserByIdApi = async(id) => {
  try{
    const response = await fetch(`${api}/users/id/${id}`).then(data => data.json())
    return response
  } catch(error){
    console.log(error)
    return 'error'
  }
  
}

export const getUserByEmailApi = async(email) => {
  try{
    const response = await fetch(`${api}/users/email/${email}`).then(data => data.json())
    return response 
  } catch(error){
    console.log(error)
    return 'error'
  }
}

export const updateUserApi = async(user) => {
  await fetch(`${api}/users/id/${user._id}` , {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
  // this 'user' can be just a part of user
}

// LOCAL STORAGE 
export const ProductsCartLSKey = 'productsCartSpicers'
export const UserIdLSKey = 'loggedUserId'
export const UserImageLSKey = 'imageUser'

export const setLocalStorage = (item, localStorageKey) =>{
  localStorage.setItem(localStorageKey, JSON.stringify(item))
}

export const getLocalStorage = (localStorageKey) =>{
  return JSON.parse(localStorage.getItem(localStorageKey)) ?? null
}

export const clearLocalStorage = (localStorageKey) =>{
  localStorage.removeItem(localStorageKey)
}


// ALERT USER ABOUT UNC
export const unavailableFeature = (e) =>{
  e.preventDefault()
  alert("I'm sorry. This feature is still in progress!")
}