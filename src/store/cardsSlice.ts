import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Card } from '@/types/types';

interface CardsState {
  cardIndex: number;
  cards: Card[];
  isExamples: boolean;
  isRandom: boolean;
  isFlipCards: boolean;
}

export const emptyCard = {
  head: '',
  tails: ['', ''],
  examples: ['', ''],
};

const initialState: CardsState = {
  cardIndex: 0,
  cards: [],
  isExamples: JSON.parse(localStorage.getItem('isExamples') || 'true'),
  isRandom: JSON.parse(localStorage.getItem('isRandom') || 'true'),
  isFlipCards: JSON.parse(localStorage.getItem('isFlipCards') || 'false'),
};

const shuffle = (array: Card[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleIsExamples: (state) => {
      state.isExamples = !state.isExamples;
      localStorage.setItem('isExamples', JSON.stringify(state.isExamples));
    },
    shuffleCards: (state) => {
      state.isRandom = !state.isRandom;
      localStorage.setItem('isRandom', JSON.stringify(state.isRandom));
      state.cards = state.isRandom
        ? [...shuffle(state.cards)]
        : [...state.cards.sort((c1, c2) => c1.head.localeCompare(c2.head))];
      localStorage.setItem('cards', JSON.stringify(state.cards));
    },
    setCardIndex: (state, action: PayloadAction<number>) => {
      state.cardIndex = action.payload;
      localStorage.setItem('cardIndex', JSON.stringify(state.cardIndex));
    },
    setNextCardIndex: (state) => {
      state.cardIndex =
        state.cardIndex < state.cards.length - 1 ? state.cardIndex + 1 : 0;
      localStorage.setItem('cardIndex', JSON.stringify(state.cardIndex));
    },
    setPrevCardIndex: (state) => {
      state.cardIndex =
        state.cardIndex > 0 ? state.cardIndex - 1 : state.cards.length - 1;
      localStorage.setItem('cardIndex', JSON.stringify(state.cardIndex));
    },
    editCard: (
      state,
      action: PayloadAction<{ card: Card; cardIndex: number }>
    ) => {
      state.cards[action.payload.cardIndex] = action.payload.card;
      state.cards = [...state.cards];
      state.cardIndex = action.payload.cardIndex;
      localStorage.setItem('cards', JSON.stringify(state.cards));
    },
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards = [...state.cards, action.payload];
      state.cardIndex = state.cards.indexOf(action.payload);
      localStorage.setItem('cards', JSON.stringify(state.cards));
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = [...action.payload];
      localStorage.setItem('cards', JSON.stringify(state.cards));
    },
    flipAllCards: (state) => {
      state.isFlipCards = !state.isFlipCards;
      localStorage.setItem('isFlipCards', JSON.stringify(state.isFlipCards));
    },
    removeAllCards: (state) => {
      localStorage.removeItem('cardIndex');
      localStorage.removeItem('cards');
      state.cardIndex = 0;
      state.cards = [];
    },
    removeCurrentCard: (state) => {
      state.cards = state.cards.filter(
        (card) => card !== state.cards[state.cardIndex]
      );
      localStorage.setItem('cards', JSON.stringify(state.cards));
      if (state.cardIndex > state.cards.length - 1) state.cardIndex = 0;
    },
  },
});

export const {
  toggleIsExamples,
  shuffleCards,
  setCardIndex,
  setNextCardIndex,
  setPrevCardIndex,
  editCard,
  addCard,
  setCards,
  flipAllCards,
  removeAllCards,
  removeCurrentCard,
} = cardsSlice.actions;

export const selectIsExamples = (state: RootState) => state.cards.isExamples;
export const selectIsRandom = (state: RootState) => state.cards.isRandom;
export const selectIsAllFlipped = (state: RootState) => state.cards.isFlipCards;
export const selectCards = (state: RootState) => state.cards.cards;
export const selectCardIndex = (state: RootState) => state.cards.cardIndex;

export default cardsSlice.reducer;
