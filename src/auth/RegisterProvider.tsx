import React, { useCallback, useEffect, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { RegisteredUser } from "../shared/Types";
import { registerAPI } from '../api/UserAPI';

type AddUserFn = (user: RegisteredUser) => Promise<any>;

interface UsersState {
    users?: RegisteredUser[];
    adding: boolean;
    addError?: Error | null;
    addUser?: AddUserFn;
}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialState: UsersState = {
    adding: false,
};


const ADD_USER_STARTED = 'ADD_USER_STARTED';
const ADD_USER_SUCCEDED = 'ADD_USER_SUCCEDED';
const ADD_USER_FAILED = 'ADD_USER_FAILED';

const reducer: (state: UsersState, action: ActionProps) => UsersState 
    = (state, { type, payload }) => {
    switch(type){
        case ADD_USER_STARTED:
            return { ...state, addError: null, adding: true };
        case ADD_USER_FAILED:
            return { ...state, addError: payload.error, adding: false };
        case ADD_USER_SUCCEDED:
            const users = [...(state.users || [])];
            const user = payload.user;
            console.log(user);
            users.push(user);
            return { ...state,  users: users, adding: false };
        default:
            return state;
    }
};


export const UsersContext = React.createContext(initialState);

interface UserProviderProps {
    children: PropTypes.ReactNodeLike,
}


export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { users, adding, addError } = state;
    const addUser = useCallback<AddUserFn>(addUserCallback, []);

    async function addUserCallback(user: RegisteredUser){
        try {
          dispatch({ type: ADD_USER_STARTED });
          console.log("adding " + user)
          const addedU = await registerAPI(user);
          console.log(addedU);
          console.log('saveUser succeeded');
          dispatch({ type: ADD_USER_SUCCEDED, payload: { user: addedU } });
        } catch (error: any) {
          console.log('addUser failed');
          console.log(error);
          dispatch({ type: ADD_USER_FAILED, payload: { user: user } });
        }
    }

    const value = { users, adding, addError, addUser };

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    );
}
