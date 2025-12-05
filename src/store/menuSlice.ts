import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Routes, Theme } from '@/types/types';

interface MenuState {
  isOpen: boolean;
  page: string;
  theme: Theme;
}

// Определяем системную тему устройства
const getSystemTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? Theme.dark
      : Theme.light;
  }
  return Theme.light;
};

const initialState: MenuState = {
  isOpen: false,
  page: Routes.card,
  theme: (localStorage.getItem('theme') as Theme) || getSystemTheme(),
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
    setPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, setPage, setTheme } = menuSlice.actions;

export const selectIsOpen = (state: RootState) => state.menu.isOpen;
export const selectPage = (state: RootState) => state.menu.page;
export const selectTheme = (state: RootState) => state.menu.theme;

export default menuSlice.reducer;
