import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import parseIngredients from "../helpers/parseIngredients";
import Cocktail from "../models/Cocktail";
import mongoose from "mongoose";
import isPublished from "../middleware/isPublished";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/',isPublished, async (req: RequestWithUser, res, next) => {
    try {
        const filter: Record<string, unknown> = {};

        if (!req.user || req.user.role !== 'admin') {
            filter.isPublished = true;
        }

        const cocktails = await Cocktail.find(filter).sort({ datetime: -1 });
        return res.send(cocktails);
    } catch (error) {
        next(error);
    }
});

cocktailsRouter.get('/:id', async (req, res,next) => {
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

cocktailsRouter.post('/', auth, imagesUpload.single("image"), async (req: RequestWithUser, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not authenticated' });
        }

        const ingredients = parseIngredients(req.body.ingredients);
        const cocktail = await Cocktail.create({
            email: req.user._id,
            name: req.body.name,
            image: req.file?.filename,
            recipe: req.body.recipe,
            ingredients,
        });
        return res.send(cocktail);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({ error: 'Cocktail not found' });
        }

        cocktail.isPublished = !cocktail.isPublished;

        await cocktail.save();

        return res.send(cocktail);
    } catch (error) {
        next(error);
    }
});

cocktailsRouter.delete('/:id', auth,permit('admin'),async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({ error: 'Cocktail not found' });
        }
        await Cocktail.deleteOne({_id: req.params.id});

        return res.send(cocktail);
    } catch (error) {
        next(error);
    }
});

export default cocktailsRouter;