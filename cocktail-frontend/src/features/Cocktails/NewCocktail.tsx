import {Typography} from "@mui/material";
import CocktailForm from "./components/CocktailForm";
import {useAppSelector} from "../../app/hooks";
import {selectCocktailCreate} from "./cocktailsSlice";

const NewCocktail = () => {
    const isCreating = useAppSelector(selectCocktailCreate);
    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                New Cocktail
            </Typography>
            <CocktailForm isLoading={isCreating}/>
        </>
    );
};

export default NewCocktail;