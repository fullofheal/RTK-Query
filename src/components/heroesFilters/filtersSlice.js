import {useHttp} from '../../hooks/http.hook';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
}

export const fetchFilters = createAsyncThunk(
	'filters/fetchHeroes',
	() => {
		const {request} = useHttp();
		return request("http://localhost:3001/filters")
	}
)

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		activeFilterChanged: (state, action) => {
			state.activeFilter = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = "loading"})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filtersLoadingStatus = 'idle';
				state.filters = action.payload;
			})
			.addCase(fetchFilters.rejected, state => {
				state.filtersLoadingStatus = 'error';
			})
			.addDefaultCase(() => {})
	}
});

const {actions, reducer} = filtersSlice;
export default reducer;


export const {
	filtersFetching,
	filtersFetched,
	filtersFetchingError,
	activeFilterChanged
} = actions;