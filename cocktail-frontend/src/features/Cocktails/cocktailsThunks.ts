import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail, GlobalError} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const fetchCocktails = createAsyncThunk(
    'cocktails/fetchAll', async () => {
        const { data: cocktails } = await axiosApi.get<Cocktail[]>('/cocktails');
        return cocktails;
});

export const fetchOneCocktail = createAsyncThunk<Cocktail, string>(
    'cocktails/fetchOne',
    async (id) => {

        const { data: cocktail } = await axiosApi.get<Cocktail>(`/cocktails/${id}`);
        return cocktail;
});

export const fetchOneMyCocktail = createAsyncThunk<Cocktail, string>(
    'my_cocktails/fetchOne',
    async (id) => {

        const { data: cocktail } = await axiosApi.get<Cocktail>(`/my_cocktails/${id}`);
        return cocktail;
});

export const fetchMyCocktail = createAsyncThunk<Cocktail[], void, { rejectValue: GlobalError, state: RootState }>(
    'my_cocktails/fetchAll',
    async (_, {getState, rejectWithValue }) => {
        const token = getState().users.user?.token;
        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }
        try {
            const { data: trackHistories } = await axiosApi.get<Cocktail[]>('/my_cocktails', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return trackHistories;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);