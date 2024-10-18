import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import { CocktailMutation } from "../../../types";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import { createCocktail } from "../cocktailsThunks";
import FileInput from "../../../UI/FileInput/FileInput";
import {selectRegisterError} from "../../users/usersSlice";

interface Props {
    isLoading: boolean;
}

const CocktailForm: React.FC<Props> = ({ isLoading }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const [cocktail, setCocktail] = useState<CocktailMutation>({
        name: '',
        image: '',
        recipe: '',
        ingredients: [{ nameIngredient: '', amountIngredient: '' }],
    });
    const [showError, setShowError] = useState(false);

    const getFieldError = (fieldName: string) => {
        return error?.errors[fieldName]?.message;
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setShowError(true);
        if (!cocktail.image) {
            return;
        }
        try {
            await dispatch(createCocktail(cocktail)).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Create cocktail error:', err);
        }
    };

    const addIngredient = () => {
        setCocktail((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, { nameIngredient: '', amountIngredient: '' }]
        }));
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCocktail((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : '';
        setCocktail((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onIngredientChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = event.target;
        setCocktail((prev) => {
            const ingredientsCopy = [...prev.ingredients];
            ingredientsCopy[index] = { ...ingredientsCopy[index], [name]: value };
            return {
                ...prev,
                ingredients: ingredientsCopy,
            };
        });
    };

    const onIngredientDelete = (index: number) => {
        setCocktail((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index),
        }));
    };

    return (
        <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
            <Grid item>
                <TextField
                    required
                    label="Name"
                    id="name"
                    name="name"
                    value={cocktail.name}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <Typography variant="h6">Ingredients</Typography>
                <Box mt={2}>
                    {cocktail.ingredients.map((ingredient, index) => (
                        <Box display="flex" gap={2} alignItems="center" key={`ingredient_${index}`}>
                            <TextField
                                required
                                placeholder="Ingredient name"
                                value={ingredient.nameIngredient}
                                name="nameIngredient"
                                onChange={(event) => onIngredientChange(event, index)}
                            />
                            <TextField
                                required
                                placeholder="Amount ingredient"
                                value={ingredient.amountIngredient}
                                name="amountIngredient"
                                onChange={(event) => onIngredientChange(event, index)}
                            />
                            {index > 0 && (
                                <Button type="button" onClick={() => onIngredientDelete(index)} color="error">
                                    Delete
                                </Button>
                            )}
                        </Box>
                    ))}
                    <Button variant="outlined" onClick={addIngredient}>
                        Add Ingredients
                    </Button>
                </Box>
                <Grid item>
                    <TextField
                        multiline
                        minRows={3}
                        required
                        label="Recipe"
                        id="recipe"
                        name="recipe"
                        value={cocktail.recipe}
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileInputChangeHandler}
                        errorText={
                        showError && (getFieldError('image')
                            || (cocktail.image ? '' : 'image is required'))
                            || undefined
                    }
                    />
                </Grid>
            </Grid>
            <Grid item>
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    <span>Save</span>
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

export default CocktailForm;