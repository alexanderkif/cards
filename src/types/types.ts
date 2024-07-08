export interface Card {
  head: string;
  tails: string[];
  examples: string[];
}

export interface Group {
  name: string;
  cards: Card[];
}

export enum Routes {
  card = 'card',
  about = 'about',
  new = 'new',
  edit = 'edit',
  search = 'search',
  groups = 'groups',
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
  trash = 'trash',
  share = 'share',
  house = 'house',
  check = 'check',
  linkedin = 'linkedin',
  github = 'github',
  close = 'close',
  left = 'left',
  right = 'right',
}

export enum Direction {
  left = 'left',
  right = 'right',
}

export enum Theme {
  dark = 'dark',
  light = 'light',
  auto = 'auto',
}
