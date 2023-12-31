import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    allDoctors: [],

    allRequireDoctorInfo:[]
    
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
            state.isLoadingGender = true; 
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            state.genders = action.data;
            state.isLoadingGender = false; 
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            state.isLoadingGender = false; 
            state.genders = [];
            return {
                ...state
            }
        
        case actionTypes.FETCH_POSITION_SUCCESS: 
            state.positions = action.data; 
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAILED: 
            state.positions = []; 
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS: 
            state.roles = action.data; 
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAILED: 
            state.roles = []; 
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS: 
            state.users = action.users; 
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_FAILED: 
            state.users = []; 
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS: 
            state.topDoctor = action.dataDoctors; 
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTOR_FAILED: 
            state.topDoctor = []; 
            return {
                ...state
            }

        case actionTypes.FETCH_All_DOCTOR_SUCCESS: 
            state.allDoctors = action.dataAllDoctors;
            return {
                ...state,
            }

        case actionTypes.FETCH_All_DOCTOR_FAILED: 
            state.allDoctor = []; 
            return {
                ...state
            }

        case actionTypes.FETCH_All_SCHEDULE_TIME_SUCCESS: 
            state.allTimes = action.dataAllTimes;
            return {
                ...state,
            }

        case actionTypes.FETCH_All_SCHEDULE_TIME_FAILED: 
            state.allTimes = []; 
            return {
                ...state
            }
        
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS: 
        state.allRequireDoctorInfo = action.data;
        return {
            ...state
        }

        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILED: 
        state.allRequireDoctorInfo = []; 
        return {
            ...state
        }

            
    
        default:
                return state;
        }
}

export default adminReducer;