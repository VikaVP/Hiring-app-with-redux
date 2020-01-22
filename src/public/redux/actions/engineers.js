
import axios from 'axios'

export const fetchEngineers = (search, page, limit, sort, sortBy) => ({
    type: "FETCH_ENGINEERS",
    payload: axios.get(`${process.env.REACT_APP_API_URL2}/engineers/?s=${search}&page=${page}&limit=${limit}&sort=${sort}&sortBy=${sortBy}`)
})

export const fetchDetailEngineers = id => ({
    type: "FETCH_ENGINEERS_DETAIL",
    payload: axios.get(`${process.env.REACT_APP_API_URL2}/engineers/${id}`)
})
export const fetchUpdateEngineers = (id, data, config) => ({
    type: "FETCH_ENGINEERS_UPDATE",
    payload: axios.put(`${process.env.REACT_APP_API_URL2}/engineers/${id}`, data, config)
})
export const fetchDeleteEngineers = id => ({
    type: "FETCH_ENGINEERS_DELETE",
    payload: axios.delete(`${process.env.REACT_APP_API_URL2}/engineers/${id}`)
})
