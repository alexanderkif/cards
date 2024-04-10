export interface Card {
  head: string
  tails: string[]
  examples: string[]
}

export enum Routes {
  card = 'card',
  about = 'about',
  new = 'new',
  edit = 'edit',
}

export enum SVGIcons {
  menu = 'menu',
  cards = 'cards',
  add = 'add',
  edit = 'edit',
  examples = 'examples',
  random = 'random',
  question = 'question',
  dowload = 'dowload',
  save = 'save',
  removeAll = 'removeAll',
}
