import mongoose, {Types} from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const ingredientSchema = new Schema ({
    nameIngredient: {
        type: String,
        required: true
    },
    amountIngredient: {
        type: String,
        required: true,
    },
})

const CocktailSchema = new Schema({
    email:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        validate:{
            validator: async (value: Types.ObjectId) =>{
                const createUser = await User.findById(value);
                return Boolean(createUser);
            },
            message: 'User does not exist',
        }
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    ingredients: [ingredientSchema],
})

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export default Cocktail;