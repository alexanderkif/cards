export interface Card {
  head: string
  tails: string[]
  examples: string[]
}

export enum Routes {
  card = 'card',
  about = 'about',
  new = 'new',
}
