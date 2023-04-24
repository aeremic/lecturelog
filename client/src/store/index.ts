import { auth } from './auth/reducers'
// import { show } from 'store/show/reducers'
// import { tasks } from 'store/tasks/reducers'
// import { teams } from 'store/teams/reducers'
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
    auth: auth,
});

export type AppState = ReturnType<typeof reducer>

const store = () => {
    const store = configureStore({
        reducer
    });

    return store;
}

export default store;