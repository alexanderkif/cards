export interface Card {
  head: string;
  tails: string[];
  examples: string[];
}

export enum Routes {
  card = 'card',
  about = 'about',
  new = 'new',
  edit = 'edit',
  search = 'search',
}

export enum SVGIcons {
  menu = 'menu',
  cards = 'cards',
  add = 'add',
  edit = 'edit',
  remove = 'remove',
  search = 'search',
  examples = 'examples',
  random = 'random',
  question = 'question',
  dowload = 'dowload',
  save = 'save',
  removeAll = 'removeAll',
  flip = 'flip',
  smile = 'smile',
  speaker = 'speaker',
  moon = 'moon',
  sun = 'sun',
}

export enum Direction {
  left = 'left',
  right = 'right',
}

export type Theme = 'dark' | 'light' | 'auto';
