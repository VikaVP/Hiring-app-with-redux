const initialState = {
    detailCompanies: [],
    isLoading: false,
    isError: false
}
const detailCompanies = (state = initialState, action) => {
    switch (action.type) {
        // loading
        case "FETCH_COMPANIES_DETAIL_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }
        case "FETCH_COMPANIES_UPDATE_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }

        case "FETCH_COMPANIES_DETAIL_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                detailCompanies: [...action.payload.data]
            }
        case "FETCH_COMPANIES_UPDATE_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                detailCompanies: [...state.detailCompanies, action.payload.data]
            }

        case "FETCH_COMPANIES_DETAIL_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case "FETCH_COMPANIES_UPDATE_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state
    }
}

export default detailCompanies