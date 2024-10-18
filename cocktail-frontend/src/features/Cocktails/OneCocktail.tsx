import {useEffect} from 'react';
import {Button, CardMedia, CircularProgress, Grid, styled, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectOneCocktail, selectOneCocktailFetching} from "./cocktailsSlice";
import {API_URL} from "../../constants";
import {fetchOneCocktail} from "./cocktailsThunks";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ImageCardMedia = styled(CardMedia)({
    height: 500,
    paddingTop: '56.25%',
});

const OneCocktail = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const cocktail = useAppSelector(selectOneCocktail);
    const isFetching = useAppSelector(selectOneCocktailFetching);

    const cardImage = `${API_URL}/${cocktail?.image}`;

    useEffect(() => {
        dispatch(fetchOneCocktail(id));
    }, [dispatch, id]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Button variant="text" startIcon={<ArrowBackIcon/>} component={Link} to={'/'}>
                    Back to products
                </Button>
            </Grid>
            {isFetching && (
                <Grid item>
                    <CircularProgress />
                </Grid>
            )}
            {cocktail && (
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} md={6} container spacing={2}>
                    <Grid item xs={6}>
                        <ImageCardMedia image={cardImage} title={cocktail.name} />
                    </Grid>
                    <Grid item xs={6} container alignItems="start" direction="column">
                        <Typography variant="h4">{cocktail.name}</Typography>
                        <Typography variant="h6">Ingredients:</Typography>
                        <ul>
                            {cocktail.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.nameIngredient} - {ingredient.amountIngredient}
                                </li>
                            ))}
                        </ul>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Recipe: {cocktail.recipe}</Typography>
                </Grid>
            </Grid>
            )}
        </Grid>
    );
};

export default OneCocktail;