import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Card } from '@/types/types'

interface CardsState {
  cardIndex: number
  cards: Card[]
  isExamples: boolean
}

export const emptyCard = {
  head: '',
  tails: ['', ''],
  examples: ['', ''],
}

const initialState: CardsState = {
  cardIndex: 0,
  cards: [],
  isExamples: true,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleIsExamples: (state) => {
      state.isExamples = !state.isExamples
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
  setCardIndex,
  editCard,
  addCard,
  setCards,
  removeAllCards,
} = cardsSlice.actions

export const selectIsExamples = (state: RootState) => state.cards.isExamples
export const selectCards = (state: RootState) => state.cards.cards
export const selectCardIndex = (state: RootState) => state.cards.cardIndex

export default cardsSlice.reducer
