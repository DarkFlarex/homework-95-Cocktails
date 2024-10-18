import mongoose from 'mongoose';
import config from './config';

import User from "./models/User";
import Cocktail from "./models/Cocktail";

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
  } catch (e) {
    console.log('Skipping drop...');
  }
  const user1 = new User({
    email: 'admin@mail.ru',
    password: '123',
    role: 'admin',
    displayName: 'Admin',
    avatar: 'fixtures/admin.png',
  });
  user1.generateToken();

  const user2 = new User({
    email: 'user@mail.ru',
    password: '123',
    role: 'user',
    displayName: 'User',
    avatar: 'fixtures/user.png',
  });
  user2.generateToken();

  await user1.save();

  await user2.save();

  const cocktails = await Cocktail.create([
    {
      email: user1._id,
      name: 'White Russian',
      ingredients: [
        {
          nameIngredient: 'Vodka',
          amountIngredient: '30 ml',
        },
        {
          nameIngredient: 'Coffee Liqueur',
          amountIngredient: '30 ml',
        },
        {
          nameIngredient: 'Cream',
          amountIngredient: '30 ml',
        },
      ],
      image: 'fixtures/WhiteRu.jpg',
      recipe: 'Combine vodka, coffee liqueur, and cream.',
      isPublished: true,
    },
    {
      email: user1._id,
      name: 'Mojito',
      ingredients: [
        {
          nameIngredient: 'White Rum',
          amountIngredient: '50 ml',
        },
        {
          nameIngredient: 'Fresh Mint Leaves',
          amountIngredient: '10 leaves',
        },
        {
          nameIngredient: 'Sugar',
          amountIngredient: '2 teaspoons',
        },
        {
          nameIngredient: 'Lime Juice',
          amountIngredient: '30 ml',
        },
        {
          nameIngredient: 'Soda Water',
          amountIngredient: 'to top',
        },
      ],
      image: 'fixtures/mojito.jpg',
      recipe: 'Muddle mint leaves with sugar and lime juice, add rum, and top with soda.',
      isPublished: true,
    },
    {
      email: user1._id,
      name: 'Bellini',
      ingredients: [
        {
          nameIngredient: 'Peach Puree',
          amountIngredient: '50 ml',
        },
        {
          nameIngredient: 'Prosecco',
          amountIngredient: '150 ml',
        },
      ],
      image: 'fixtures/Bellini.jpg',
      recipe: 'Mix peach puree with Prosecco.',
      isPublished: false,
    },
    {
      email: user2,
      name: 'Daiquiri',
      ingredients: [
        {
          nameIngredient: 'White Rum',
          amountIngredient: '50 ml',
        },
        {
          nameIngredient: 'Fresh Lime Juice',
          amountIngredient: '25 ml',
        },
        {
          nameIngredient: 'Sugar',
          amountIngredient: '1 tsp',
        },
      ],
      image: 'fixtures/Daiquiri.jpg',
      recipe: 'Shake rum, lime juice, and sugar with ice.',
      isPublished: true,
    },
    {
      email: user2,
      name: 'Gin tonic',
      ingredients: [
        {
          nameIngredient: 'London Dry Gin',
          amountIngredient: '50 ml',
        },
        {
          nameIngredient: 'Tonic',
          amountIngredient: '150 ml',
        },
        {
          nameIngredient: 'Lime',
          amountIngredient: '20 g',
        },
        {
          nameIngredient: 'Ice in cubes',
          amountIngredient: '180 g',
        },
      ],
      image: 'fixtures/jin-ton.jpg',
      recipe: 'London Dry Gin, Tonic, Lime, Ice in cubes.',
      isPublished: true,
    },
    {
      email: user2,
      name: 'Blue Lagoon',
      ingredients: [
        {
          nameIngredient: 'Vodka Tsarskaya',
          amountIngredient: '50 ml',
        },
        {
          nameIngredient: 'Blue Curacao liqueur',
          amountIngredient: '20 ml',
        },
        {
          nameIngredient: 'Sprite',
          amountIngredient: '150 ml',
        },
        {
          nameIngredient: 'Pineapple',
          amountIngredient: '30 g',
        },
      ],
      image: 'fixtures/blue-lag.jpg',
      recipe: 'Vodka Tsarskaya, Blue Curacao liqueur, Sprite, Pineapple.',
      isPublished: false,
    },
  ]);


  await db.close();
};

run().catch(console.log);