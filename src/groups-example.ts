import { Card, Group } from './types/types';

const verbs: Card[] = [
  {
    head: 'Be',
    tails: ['was, were', 'been'],
    examples: ['When were you born?', 'They have been married 10 years'],
  },
  {
    head: 'Have, has',
    tails: ['had', 'had'],
    examples: ['She has a cat.', 'We had dinner at 7 pm.'],
  },
  {
    head: 'Make',
    tails: ['made', 'made'],
    examples: ['She made a cake for her birthday.', 'I made a mistake.'],
  },
  {
    head: 'Take',
    tails: ['took', 'taken'],
    examples: [
      'She took the book from the shelf.',
      'I took a taxi to the airport.',
    ],
  },
  {
    head: 'See',
    tails: ['saw', 'seen'],
    examples: ['I saw him yesterday.', 'Have you seen the movie?'],
  },
];

const spanish: Card[] = [
  {
    head: 'book',
    tails: ['libro', ''],
    examples: ['Me gusta leer libros.', 'Compré un nuevo libro ayer.'],
  },
  {
    head: 'Time',
    tails: ['Tiempo', ''],
    examples: ['No tengo tiempo para hacer eso.', 'El tiempo es dinero.'],
  },
  {
    head: 'Money',
    tails: ['Dinero', ''],
    examples: [
      'No tengo dinero para comprar eso.',
      'El dinero no compra la felicidad.',
    ],
  },
  {
    head: 'Friend',
    tails: ['Amigo', ''],
    examples: [
      'Tengo muchos amigos.',
      'Mi mejor amigo es muy importante para mí.',
    ],
  },
  {
    head: 'School',
    tails: ['Escuela', ''],
    examples: [
      'Voy a la escuela todos los días.',
      'La escuela es muy importante para los niños.',
    ],
  },
];

const maths: Card[] = [
  {
    head: '(a + b)<sup>2</sup>',
    tails: ['a<sup>2</sup> + 2ab + b<sup>2</sup>'],
    examples: ['(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>'],
  },
  {
    head: 'A<sub>n</sub><sup>k</sup>',
    tails: ['n! / (n - k)!'],
    examples: ['A<sub>n</sub><sup>k</sup> = n! / (n - k)!'],
  },
  {
    head: 'E = mc<sup>2</sup>',
    tails: ['Energy equals mass times the speed of light squared.'],
    examples: [],
  },
];

const groupsExample: Group[] = [
  { name: 'IrregularVerbs', cards: verbs },
  { name: 'Spanish', cards: spanish },
  { name: 'Maths', cards: maths },
];

export default groupsExample;
