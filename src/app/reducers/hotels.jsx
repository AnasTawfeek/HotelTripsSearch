import {
    SET_SEARCH_DATES,
    GET_HOTELS_LOADING, GET_HOTELS_SUCCESS, GET_HOTELS_FAILURE
} from 'actions/hotels';

const INITIAL_STATE = {
    hotels: [],
    loading: false,
    error: null,

    startDate: null,
    endDate: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_SEARCH_DATES:
            const {dates} = action;
            return { ...state, startDate: dates[0], endDate: dates[1] }

        case GET_HOTELS_LOADING:
            return { ...state, loading: true }

        case GET_HOTELS_SUCCESS:
            const {data: {hotels}} = action;
            return { ...state, loading: false, hotels }

        case GET_HOTELS_FAILURE:
            const {error} = action;
            return { ...state, loading: false, error }

        default:
            return state;
    }
}
