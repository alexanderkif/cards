import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Card } from '@/types/types'

interface CardsState {
  cardIndex: number
  cards: Card[]
  isExamples: boolean
  isRandom: boolean
  isFlipCards: boolean
}

export const emptyCard = {
  head: '',
  tails: ['', ''],
  examples: ['', ''],
}

const initialState: CardsState = {
  cardIndex: 0,
  cards: [],
  isExamples: JSON.parse(localStorage.getItem('isExamples') || 'true'),
  isRandom: JSON.parse(localStorage.getItem('isRandom') || 'true'),
  isFlipCards: JSON.parse(localStorage.getItem('isFlipCards') || 'false'),
}

const shuffle = (array: Card[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleIsExamples: (state) => {
      localStorage.setItem('isExamples', JSON.stringify(!state.isExamples))
      state.isExamples = !state.isExamples
    },
    shuffleCards: (state) => {
      state.isRandom = !state.isRandom
      localStorage.setItem('isRandom', JSON.stringify(!state.isRandom))
      state.cards = state.isRandom ? shuffle(state.cards) : [...state.cards.sort((c1, c2) => c1.head.localeCompare(c2.head))]
    },
    setCardIndex: (state, action: PayloadAction<number>) => {
      localStorage.setItem('cardIndex', JSON.stringify(action.payload))
      state.cardIndex = action.payload
    },
    editCard: (
      state,
      action: PayloadAction<{ card: Card; cardIndex: number }>
    ) => {
      const newCards = [...state.cards]
      newCards[action.payload.cardIndex] = action.payload.card
      localStorage.setItem('cards', JSON.stringify(newCards))
      state.cards = newCards
    },
    addCard: (state, action: PayloadAction<Card>) => {
      const newCards = [...state.cards, action.payload]
      localStorage.setItem('cards', JSON.stringify(newCards))
      state.cards = newCards
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      localStorage.setItem('cards', JSON.stringify(action.payload))
      state.cards = action.payload
    },
    flipAllCards: (state) => {
      localStorage.setItem('isFlipCards', JSON.stringify(!state.isFlipCards))
      state.isFlipCards = !state.isFlipCards
    },
    removeAllCards: (state) => {
      localStorage.removeItem('cardIndex')
      localStorage.removeItem('cards')
      state.cardIndex = 0
      state.cards = []
    },
  },
})

export const {
  toggleIsExamples,
  shuffleCards,
  setCardIndex,
  editCard,
  addCard,
  setCards,
  flipAllCards,
  removeAllCards,
} = cardsSlice.actions

export const selectIsExamples = (state: RootState) => state.cards.isExamples
export const selectIsRandom = (state: RootState) => state.cards.isRandom
export const selectIsFlipped = (state: RootState) => state.cards.isFlipCards
export const selectCards = (state: RootState) => state.cards.cards
export const selectCardIndex = (state: RootState) => state.cards.cardIndex

export default cardsSlice.reducer
