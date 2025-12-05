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

export enum Direction {
  left = 'left',
  right = 'right',
}

export enum Theme {
  dark = 'dark',
  light = 'light',
  auto = 'auto',
}
