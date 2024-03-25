import { createSlice } from '@reduxjs/toolkit'
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
// import { useAppDispatch } from './hooks'

// Define a type for the slice state
interface MenuState {
  isOpen: boolean
}

// Define the initial state using that type
const initialState: MenuState = {
  isOpen: false,
}

export const menuSlice = createSlice({
  name: 'menu',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen
    },
    closeMenu: (state) => {
      state.isOpen = false
    },
  },
})

export const { toggleMenu, closeMenu } = menuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsOpen = (state: RootState) => state.menu.isOpen

export default menuSlice.reducer
