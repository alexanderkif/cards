import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface CardsState {
  isExamples: boolean
}

// Define the initial state using that type
const initialState: CardsState = {
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
  },
})

export const { toggleIsExamples } = cardsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsExamples = (state: RootState) => state.cards.isExamples;

export default cardsSlice.reducer
