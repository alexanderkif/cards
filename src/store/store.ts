import { configureStore } from '@reduxjs/toolkit'
import menuSlice from './menuSlice'
import counterReducer from './counterSlice'
import cardsSlice from './cardsSlice'

const store = configureStore({
  reducer: {
    menu: menuSlice,
    cards: cardsSlice,
    counter: counterReducer,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
