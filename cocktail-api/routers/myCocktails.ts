import auth, {RequestWithUser} from "../middleware/auth";
import Cocktail from "../models/Cocktail";
import express from "express";

const MyCocktailsRouter = express.Router();

MyCocktailsRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }
        const filter: Record<string, unknown> = {
            email: req.user._id,
        };

        const cocktails = await Cocktail.find(filter).sort({ datetime: -1 });
        return res.send(cocktails);
    } catch (error) {
        next(error);
    }
});

MyCocktailsRouter.get('/:id', auth, async (req, res,next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id).populate('name');

        if (cocktail === null) {
            return res.status(404).send({error: 'cocktail not found'});
        }

        return res.send(cocktail)
    } catch (error){
        next(error);
    }
});

export default MyCocktailsRouter;