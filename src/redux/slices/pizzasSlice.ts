

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';


export type SearchPizzaParams = {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: string;
}


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
	const { order, sortBy, category, search, currentPage } = params
	const { data } = await axios.get<Pizza[]>(
		`https://6322105afd698dfa29065926.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
	);

	return data;

});
type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: Pizza[];
	status: Status;

}


const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING, //loading | success| error
}

const pizzasSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		})
	}

	// extraReducers: {
	// 	[fetchPizzas.pending]: (state) => {

	// 		state.status = 'loading';
	// 		state.items = [];
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload;
	// 		state.status = 'success';

	// 	},
	// 	[fetchPizzas.rejected]: (state, action) => {

	// 		state.status = "error";
	// 		state.items = [];

	// 	},

	// }
});

export const selectorPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
