
import axios from 'axios'

export const fetchSignup = (role, data, config) => ({
    type: "FETCH_SIGNUP",
    payload: axios.post(`${process.env.REACT_APP_API_URL2}/${role}`, data, config)
})
