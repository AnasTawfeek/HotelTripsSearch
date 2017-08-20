import axios from 'axios';
import { GetHotelsApi } from '../ApiConfig';

/**
 * Action Types
 */
// Set hotels search duration date
export const SET_SEARCH_DATES = 'SET_SEARCH_DATES';

// Get hotels
export const GET_HOTELS_LOADING = 'GET_HOTELS_LOADING';
export const GET_HOTELS = 'GET_HOTELS';
export const GET_HOTELS_SUCCESS = 'GET_HOTELS_SUCCESS';
export const GET_HOTELS_FAILURE = 'GET_HOTELS_FAILURE';

/**
 * Action Creators
 */
// Set hotels search duration date
 export const setSearchDates = (dates) => {
     return {
         type: SET_SEARCH_DATES,
         dates
     }
 }

// Get hotels
export const getHotelsLoading = () => {
    return {
        type: GET_HOTELS_LOADING
    }
}

export const getHotels = () => {
    const payload = axios({
        url: GetHotelsApi
    });
    return {
        type: GET_HOTELS,
        payload
    }
}

export const getHotelsSuccess = (data) => {
    return {
        type: GET_HOTELS_SUCCESS,
        data
    }
}

export const getHotelsFailure = (error) => {
    return {
        type: GET_HOTELS_FAILURE,
        error
    }
}
