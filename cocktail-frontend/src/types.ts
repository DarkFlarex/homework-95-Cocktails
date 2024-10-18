export interface Cocktail {
    _id: string;
    email: {
        _id: string;
    };
    name: string;
    recipe: string;
    image: string;
    ingredients: ingredient[];
    isPublished: boolean;
}

export interface ingredient{
    nameIngredient: string;
    amountIngredient: string;
}

export interface CocktailMutation {
    name:string;
    image:string;
    recipe:string;
    ingredients: ingredient[];
}

export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    avatar: string | null;
    googleID?: string;
}

export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    avatar: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}