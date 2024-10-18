import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCocktails, selectCocktailsFetching} from "./cocktailsSlice";
import {fetchCocktails} from "./cocktailsThunks";
import {Alert, CircularProgress, Grid, Typography} from "@mui/material";
import CocktailItem from "./components/CocktailItem";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const isFetching = useAppSelector(selectCocktailsFetching);

    useEffect(() => {
        dispatch(fetchCocktails());
    }, [dispatch]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no Cocktails here!</Alert>;
    if(isFetching) {
        content = <CircularProgress/>;
    } else if (cocktails.length > 0) {
        content = cocktails.map((cocktail) => (
            <CocktailItem
                key={cocktail._id}
                _id={cocktail._id}
                name={cocktail.name}
                image={cocktail.image}
                isPublished={cocktail.isPublished}
            />
        ));
    }
    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1">
                        Cocktails
                    </Typography>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {content}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Cocktails;