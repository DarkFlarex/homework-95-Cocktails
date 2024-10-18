import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail, CocktailMutation, GlobalError} from "../../types";
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

export const createCocktail = createAsyncThunk<void, CocktailMutation, { rejectValue: GlobalError; state: RootState }>(
    'cocktails/create',
    async (cocktailMutation, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }
        const formData = new FormData();
        formData.append('name', cocktailMutation.name);

        if (cocktailMutation.image !== null) {
            formData.append('image', cocktailMutation.image);
        }
        formData.append('recipe', cocktailMutation.recipe);
        formData.append('ingredients', JSON.stringify(cocktailMutation.ingredients));

        try {
            await axiosApi.post('/cocktails', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const fetchTogglePublishedCocktails = createAsyncThunk<Cocktail, string, { rejectValue: GlobalError; state: RootState }>(
    'cocktails/fetchTogglePublished',
    async (id, { rejectWithValue }) => {
        try {
            const { data: cocktail } = await axiosApi.patch<Cocktail>(`/cocktails/${id}/togglePublished`);
            return cocktail;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const deleteCocktail = createAsyncThunk<void, string, { rejectValue: GlobalError; state: RootState }>(
    'cocktails/fetchDelete',
    async (id, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;
        const userRole = getState().users.user?.role;
        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }

        if (userRole !== 'admin') {
            return rejectWithValue({ error: 'admins can delete cocktails' });
        }

        try {
            await axiosApi.delete(`/cocktails/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);