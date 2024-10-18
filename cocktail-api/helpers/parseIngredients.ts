import {Ingredient} from "../types";

const parseIngredients = (ingredients: string) => {
    try {
        return JSON.parse(ingredients) as Ingredient[];
    } catch (e) {
        return []
    }
}

export default parseIngredients;