const initialState = {
    companies: [],
    isLoading: false,
    isError: false,
    page: []
}
const companies = (state = initialState, action) => {
    switch (action.type) {
        // loading
        case "FETCH_COMPANIES_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }

        case "FETCH_COMPANIES_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                companies: action.payload.data.data,
                page: action.payload.data.pageDetail
            }

        case "FETCH_COMPANIES_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state
    }
}

export default companies