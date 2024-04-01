import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Card } from '@/types/types'
import cardsExample from '@/cards-example'

// Define a type for the slice state
interface CardsState {
  cardIndex: number
  cards: Card[]
  isExamples: boolean
}

// Define the initial state using that type
const initialState: CardsState = {
  cardIndex: JSON.parse(localStorage.getItem('cardIndex') || '0'),
  cards:
    (JSON.parse(
      localStorage.getItem('cards') as string
    ) as unknown as Card[]) || cardsExample,
  isExamples: true,
}

export const cardsSlice = createSlice({
  name: 'cards',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleIsExamples: (state) => {
      state.isExamples = !state.isExamples
    },
    setCardIndex: (state, action: PayloadAction<number>) => {
      localStorage.setItem('cardIndex', JSON.stringify(action.payload))
      state.cardIndex = action.payload
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      localStorage.setItem('cards', JSON.stringify(action.payload))
      state.cards = action.payload
    },
  },
})

export const { toggleIsExamples, setCardIndex, setCards } = cardsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsExamples = (state: RootState) => state.cards.isExamples
export const selectCards = (state: RootState) => state.cards.cards
export const selectCardIndex = (state: RootState) => state.cards.cardIndex

export default cardsSlice.reducer
