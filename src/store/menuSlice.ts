import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Routes } from '@/types/types'

interface MenuState {
  isOpen: boolean
  page: string
}

const initialState: MenuState = {
  isOpen: false,
  page: Routes.card,
}

export const menuSlice = createSlice({
  name: 'menu',
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

export const selectIsOpen = (state: RootState) => state.menu.isOpen
export const selectPage = (state: RootState) => state.menu.page

export default menuSlice.reducer
