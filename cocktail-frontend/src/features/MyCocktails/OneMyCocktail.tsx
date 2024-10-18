import {useEffect} from 'react';
import {Button, CardMedia, CircularProgress, Grid, styled, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectOneMyCocktail, selectOneMyCocktailFetching} from "../Cocktails/cocktailsSlice";
import {API_URL} from "../../constants";
import {fetchOneMyCocktail} from "../Cocktails/cocktailsThunks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ImageCardMedia = styled(CardMedia)({
    height: 500,
    paddingTop: '56.25%',
});

const OneMyCocktail = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const myCocktail = useAppSelector(selectOneMyCocktail);
    const isFetching = useAppSelector(selectOneMyCocktailFetching);

    const cardImage = `${API_URL}/${myCocktail?.image}`;

    useEffect(() => {
        dispatch(fetchOneMyCocktail(id));
    }, [dispatch, id]);

    return (
        <div>
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
                {myCocktail && (
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} md={6} container spacing={2}>
                            <Grid item xs={6}>
                                <ImageCardMedia image={cardImage} title={myCocktail.name} />
                            </Grid>
                            <Grid item xs={6} container alignItems="start" direction="column">
                                <Typography variant="h4">{myCocktail.name}</Typography>
                                <Typography variant="h6">Ingredients:</Typography>
                                <ul>
                                    {myCocktail.ingredients.map((ingredient, index) => (
                                        <li key={index}>
                                            {ingredient.nameIngredient} - {ingredient.amountIngredient}
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Recipe: {myCocktail.recipe}</Typography>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default OneMyCocktail;