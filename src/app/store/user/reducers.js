import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const slice = createSlice({
    name: 'main',
    initialState: { data: [] },
    reducers: {
        getMainData(state, action) {
            console.log('payload', action.payload)
            state.data = action.payload
        }
    }
})

export const MainActions = slice.actions;
export const MainReducer = slice.reducer;

export const reducers = combineReducers({ main: MainReducer })