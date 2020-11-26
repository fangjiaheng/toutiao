
export const getLocalStorage = (name) => {
  try {
    return JSON.parse(window.localStorage.getItem(name))
  } catch (err) {
    return window.localStorage.getItem(name)
  }
}

export const setLocalStorage = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeLocalStorage = (name) => {
  window.localStorage.removeItem(name)
}
