import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Card, Group } from '@/types/types';

interface CardsState {
  cardIndex: number;
  groups: Group[];
  currentGroup: string;
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
  groups: JSON.parse(localStorage.getItem('groups') || '[]'),
  currentGroup: JSON.parse(localStorage.getItem('currentGroup') || '""'),
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

function saveGroupsToLocalStorage(
  groups: Group[],
  groupName: string,
  cards: Card[]
) {
  const group = groups.find((g) => g.name === groupName);
  if (group) {
    group.cards = cards;
    localStorage.setItem('groups', JSON.stringify(groups));
  }
}

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
        : [
            ...state.cards.sort((c1, c2) =>
              ('' + c1.head).localeCompare(c2.head)
            ),
          ];
      saveGroupsToLocalStorage(state.groups, state.currentGroup, state.cards);
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
      saveGroupsToLocalStorage(state.groups, state.currentGroup, state.cards);
    },
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards = [...state.cards, action.payload];
      state.cardIndex = state.cards.indexOf(action.payload);
      saveGroupsToLocalStorage(state.groups, state.currentGroup, state.cards);
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = [...action.payload];
      saveGroupsToLocalStorage(state.groups, state.currentGroup, state.cards);
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
      saveGroupsToLocalStorage(state.groups, state.currentGroup, state.cards);
      if (state.cardIndex > state.cards.length - 1) state.cardIndex = 0;
    },
    setCurrentGroup: (state, action: PayloadAction<string>) => {
      state.currentGroup = action.payload;
      state.cards =
        state.groups.find((g) => g.name === action.payload)?.cards || [];
      localStorage.setItem('currentGroup', JSON.stringify(state.currentGroup));
    },
    editGroupName: (state, action: PayloadAction<string>) => {
      const group = state.groups.find((g) => g.name === state.currentGroup);
      if (group) {
        group.name = action.payload;
        localStorage.setItem('groups', JSON.stringify(state.groups));
      }
    },
    saveGroup: (state, action: PayloadAction<Group>) => {
      state.currentGroup = action.payload.name;
      state.cards = action.payload.cards;
      const group = state.groups.find((g) => g.name === action.payload.name);
      if (group) {
        group.cards = action.payload.cards;
      } else {
        state.groups.push(action.payload);
      }
      localStorage.setItem('currentGroup', JSON.stringify(state.currentGroup));
      localStorage.setItem('groups', JSON.stringify(state.groups));
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter((g) => g.name !== action.payload);
      localStorage.setItem('groups', JSON.stringify(state.groups));
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
  setCurrentGroup,
  editGroupName,
  saveGroup,
  removeGroup,
} = cardsSlice.actions;

export const selectIsExamples = (state: RootState) => state.cards.isExamples;
export const selectIsRandom = (state: RootState) => state.cards.isRandom;
export const selectIsAllFlipped = (state: RootState) => state.cards.isFlipCards;
export const selectCards = (state: RootState) => state.cards.cards;
export const selectCardIndex = (state: RootState) => state.cards.cardIndex;
export const selectCurrentGroup = (state: RootState) =>
  state.cards.currentGroup;
export const selectGroups = (state: RootState) => state.cards.groups;

export default cardsSlice.reducer;
