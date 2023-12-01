import React, { useCallback, useEffect, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { Cause } from "./Types";
import { addCauseAPI, getAllCauseAPI, savePicturesForCause, getPicturesForCause, updateCauseAPI } from '../api/CauseAPI';

type AddCauseFn = (userID: number, cause: Cause) => Promise<any>;
type GetCausesFn = () => Promise<any>;
type GetPictureFn = (url: String) => Promise<any>;

interface CausesState {
    causes?: Cause[];
    fetching: boolean;
    fetchingError?: Error | null;
    updating: boolean;
    updateError?: Error | null;
    addCause?: AddCauseFn;
    getCauses?: GetCausesFn;
    getPicture?: GetPictureFn;
}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialState: CausesState = {
    fetching: false,
    updating: false,
};

const FETCH_CAUSES_STARTED = 'FETCH_CAUSES_STARTED';
const FETCH_CAUSES_SUCCEEDED = 'FETCH_CAUSES_SUCCEEDED';
const FETCH_CAUSES_FAILED = 'FETCH_CAUSES_FAILED';
const ADD_CAUSE_STARTED = 'ADD_CAUSE_STARTED';
const ADD_CAUSE_SUCCEDED = 'ADD_CAUSE_SUCCEDED';
const ADD_CAUSE_FAILED = 'ADD_CAUSE_FAILED';

const reducer: (state: CausesState, action: ActionProps) => CausesState 
    = (state, { type, payload }) => {
    switch(type){
        case FETCH_CAUSES_STARTED:
            return { ...state, fetching: true, fetchingError: null };
        case FETCH_CAUSES_SUCCEEDED:
            return {...state, causes: payload.causes, fetching: false };
        case FETCH_CAUSES_FAILED:
            return { ...state, fetchingError: payload.error, fetching: false };
        case ADD_CAUSE_STARTED:
            return { ...state, updateError: null, updating: true };
        case ADD_CAUSE_FAILED:
            return { ...state, updateError: payload.error, updating: false };
        case ADD_CAUSE_SUCCEDED:
            const causes = [...(state.causes || [])];
            const cause = payload.cause;
            console.log(cause);
            causes.push(cause);
            return { ...state,  causes: causes, updating: false };
        default:
            return state;
    }
};

export const CausesContext = React.createContext(initialState);

interface CauseProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const CauseProvider: React.FC<CauseProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { causes, fetching, fetchingError, updating, updateError } = state;

    const addCause = useCallback<AddCauseFn>(addCauseCallback, []);
    const getCauses = useCallback<GetCausesFn>(getCausesCallback, []);
    const getPicture = useCallback<GetPictureFn>(getPictureCallBack, []);

    async function getCausesCallback() {
        let canceled = false;

        try{
            dispatch({ type: FETCH_CAUSES_STARTED });
            const causes = await getAllCauseAPI();
            console.log('fetchCauses succeeded');
            if (!canceled) {
            dispatch({ type: FETCH_CAUSES_SUCCEEDED, payload: { causes } });
            }
        } catch (error) {
            console.log('fetchItems failed');
            if (!canceled) {
                dispatch({ type: FETCH_CAUSES_FAILED, payload: { error } });
            }
        }

        return () => {
            canceled = true;
        }
    }

    async function addCauseCallback(userId: number, cause: Cause){
        try {
          dispatch({ type: ADD_CAUSE_STARTED });
          const addedC = await addCauseAPI(userId, cause);
          console.log(addedC);
          console.log('saveCause succeeded');
          console.log('saving pictures:', cause.poze);
          await savePicturesForCause(addedC.id!, cause.poze!);
          console.log('saved images', addedC.id, cause.poze);
          addedC.poze = cause.poze;
          dispatch({ type: ADD_CAUSE_SUCCEDED, payload: { cause: addedC } });
        } catch (error: any) {
          console.log('addCause failed');
          console.log(error);
          dispatch({ type: ADD_CAUSE_FAILED, payload: { cause: cause } });
        }
    }

    async function getPictureCallBack(url: String){
        console.log("URL: ", url);
        const responseData = await getPicturesForCause(url);
        return responseData;
    }

    const value = { causes, fetching, fetchingError, updating, updateError, addCause, getCauses, getPicture };

    return (
        <CausesContext.Provider value={value}>
            {children}
        </CausesContext.Provider>
    );
}
