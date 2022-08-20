import { datatype, lorem, image, internet, name } from 'faker';
import { MovieType } from '../types/types';

const { number, float } = datatype;
const { paragraph, word } = lorem;
const { imageUrl } = image;
const { color, url } = internet;
const { firstName, lastName } = name;

const person = `${firstName()} ${lastName()}`;

export const makeFakeMovie = (): MovieType => ({
  id: number(),
  name: word(),
  posterImage: imageUrl(),
  previewImage: imageUrl(),
  backgroundImage: imageUrl(),
  backgroundColor: color(),
  videoLink: internet.url(),
  previewVideoLink: url(),
  description: paragraph(),
  rating: float(),
  scoresCount: number(),
  director: person,
  starring: new Array(number({'min': 1, 'max': 5})).fill(null).map(() => person),
  runTime: number(),
  genre: word(),
  released: number(),
  isFavorite: false,
});

//     'id': 1,
//     'name': 'The Grand Budapest Hotel',
//     'posterImage': 'img/the-grand-budapest-hotel-poster.jpg',
//     'previewImage': 'img/pulp-fiction.jpg',
//     'backgroundImage': 'img/bg-the-grand-budapest-hotel.jpg',
//     'backgroundColor': '#ffffff',
//     'videoLink': PREVIEW_URL,
//     'previewVideoLink': PREVIEW_URL,
//     'description': 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
//     'rating': 8.9,
//     'scoresCount': 240,
//     'director': 'Wes Andreson',
//     'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
//     'runTime': 99,
//     'genre': 'Comedy',
//     'released': 2014,
//     'isFavorite': false
