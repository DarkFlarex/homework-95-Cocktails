import {Cocktail, GlobalError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {
    createCocktail,
    deleteCocktail,
    fetchCocktails,
    fetchMyCocktail,
    fetchOneCocktail,
    fetchOneMyCocktail
} from "./cocktailsThunks";

export interface CocktailsState {
    items: Cocktail[];
    itemsFetching: boolean;
    item: Cocktail | null;
    oneFetching: boolean;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
    deleteLoading: string | false;
}

const initialState: CocktailsState = {
    items: [],
    itemsFetching: false,
    item: null,
    oneFetching: false,
    isCreating: false,
    isCreatingError: null,
    deleteLoading:false,
}

export const cocktailsSlice = createSlice({
    name: "cocktails",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchCocktails.pending,(state) =>{
                state.itemsFetching = true;
            })
            .addCase(fetchCocktails.fulfilled,(state,{payload: cocktails}) =>{
                state.itemsFetching = false;
                state.items = cocktails;
            })
            .addCase(fetchCocktails.rejected, (state) => {
                state.itemsFetching = false;
            });
        builder
            .addCase(createCocktail.pending, (state) => {
                state.isCreating = true;
                state.isCreatingError = null;
            })
            .addCase(createCocktail.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(createCocktail.rejected, (state, { payload: error }) => {
                state.isCreating = false;
                state.isCreatingError = error || null;
            });
        builder
            .addCase(fetchOneCocktail.pending, (state) => {
                state.item = null;
                state.oneFetching = true;
            })
            .addCase(fetchOneCocktail.fulfilled, (state, { payload: cocktail }) => {
                state.item = cocktail;
                state.oneFetching = false;
            })
            .addCase(fetchOneCocktail.rejected, (state) => {
                state.oneFetching = false;
            });
        builder
            .addCase(fetchMyCocktail.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(fetchMyCocktail.fulfilled, (state, { payload: myCocktail }) => {
                state.itemsFetching = false;
                state.items = myCocktail;
            })
            .addCase(fetchMyCocktail.rejected, (state) => {
                state.itemsFetching = false;
            })
        builder
            .addCase(fetchOneMyCocktail.pending, (state) => {
                state.item = null;
                state.oneFetching = true;
            })
            .addCase(fetchOneMyCocktail.fulfilled, (state, { payload: cocktail }) => {
                state.item = cocktail;
                state.oneFetching = false;
            })
            .addCase(fetchOneMyCocktail.rejected, (state) => {
                state.oneFetching = false;
            });
        builder
            .addCase(deleteCocktail.pending, (state, { meta: { arg: itemId } }) => {
                state.deleteLoading = itemId;
            })
            .addCase(deleteCocktail.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteCocktail.rejected, (state) => {
                state.deleteLoading = false;
            });
    },
    selectors: {
        selectCocktails:(state)=>state.items,
        selectCocktailsFetching:(state) =>state.itemsFetching,
        selectCocktailCreate:(state) => state.isCreating,
        selectCocktailCreateError:(state) => state.isCreatingError,
        selectOneCocktail: (state) => state.item,
        selectOneCocktailFetching: (state) => state.oneFetching,
        selectMyCocktails:(state) => state.items,
        selectMyCocktailsFetching:(state) =>state.itemsFetching,
        selectOneMyCocktail: (state) => state.item,
        selectOneMyCocktailFetching: (state) => state.oneFetching,
        selectDeleteCocktailLoading: (state) => state.deleteLoading,
    },
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const {
    selectCocktails,
    selectCocktailsFetching,
    selectCocktailCreate,
    selectOneCocktail,
    selectOneCocktailFetching,
    selectMyCocktails,
    selectMyCocktailsFetching,
    selectOneMyCocktail,
    selectOneMyCocktailFetching,
} = cocktailsSlice.selectors;