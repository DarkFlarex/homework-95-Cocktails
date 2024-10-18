import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectMyCocktails, selectMyCocktailsFetching} from "../Cocktails/cocktailsSlice";
import { fetchMyCocktail} from "../Cocktails/cocktailsThunks";
import {Alert, CircularProgress, Grid, Typography} from "@mui/material";
import MyCocktailItem from "./components/MyCocktailItem";

const MyCocktails = () => {
    const dispatch = useAppDispatch();
    const myCocktails = useAppSelector(selectMyCocktails);
    const isFetching = useAppSelector(selectMyCocktailsFetching);

    useEffect(() => {
        dispatch(fetchMyCocktail());
    }, [dispatch]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no your cocktails here!</Alert>;
    if(isFetching) {
        content = <CircularProgress/>;
    } else if (myCocktails.length > 0) {
        content = myCocktails.map((myCocktail) => (
            <MyCocktailItem
                key={myCocktail._id}
                _id={myCocktail._id}
                name={myCocktail.name}
                image={myCocktail.image}
            />
        ));
    }

    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1">
                        My Cocktails
                    </Typography>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {content}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MyCocktails;