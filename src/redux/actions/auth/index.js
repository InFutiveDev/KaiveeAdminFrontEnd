// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import { MakeProtectedApiCall } from '../../../utility/api'

const config = useJwt.jwtConfig
const baseUrl = process.env.REACT_APP_BASE_URL

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "application/json"
  }
}

// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify({
      role: "admin",
      ability: [
        {
          action: "manage",
          subject: "all"
        }
      ],
      accessToken: data[config.storageTokenKeyName],
      refreshToken: data[config.storageRefreshTokenKeyName]
    }))
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
    localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return async dispatch => {
    try {
      dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)
    } catch (error) {
      console.log((error.response.data).replace(/\\/g, ""))
    }
  }
}
