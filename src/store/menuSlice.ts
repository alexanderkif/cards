import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Routes } from '@/types/types'
// import { useAppDispatch } from './hooks'

// Define a type for the slice state
interface MenuState {
  isOpen: boolean
  page: string
}

// Define the initial state using that type
const initialState: MenuState = {
  isOpen: false,
  page: Routes.card,
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
    setPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload
    },
  },
})

export const { toggleMenu, closeMenu, setPage } = menuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsOpen = (state: RootState) => state.menu.isOpen
export const selectPage = (state: RootState) => state.menu.page

export default menuSlice.reducer
