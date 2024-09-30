import { createSelector } from "@reduxjs/toolkit";
const getAppState = (state) => state;
export const selectMainData = createSelector(getAppState, (state) => state.main.data)