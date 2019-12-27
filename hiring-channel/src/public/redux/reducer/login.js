const initialState = {
    loginData: [],
    isLoading: false,
    isError: false,
    token: ""
}
const login = (state = initialState, action) => {
    switch (action.type) {
        // loading
        case "FETCH_LOGIN_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }

        // berhasil
        case "FETCH_LOGIN_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                // engineers: action.payload.data
                loginData: action.payload.data.id,
                token: action.payload.data.token
            }

        // gagal
        case "FETCH_LOGIN_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state
    }
}

export default login