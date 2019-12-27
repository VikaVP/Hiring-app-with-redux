import axios from 'axios'

export const fetchLogin = (data) => ({
    type: "FETCH_LOGIN",
    payload: axios.post(`${process.env.REACT_APP_API_URL2}/login`, data)
})