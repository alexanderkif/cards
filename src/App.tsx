import { useSwipeable } from 'react-swipeable'
import './App.scss'
import cardsExample from './cards-example'
import AboutComponent from './components/AboutComponent/AboutComponent'
import AddComponent from './components/AddComponent/AddComponent'
import CardComponent from './components/CardComponent/CardComponent'
import MenuComponent from './components/MenuComponent/MenuComponent'
import Route from './components/Route/Route'
import { setCardIndex, setCards } from './store/cardsSlice'
import { useAppDispatch } from './store/hooks'
import { closeMenu, toggleMenu } from './store/menuSlice'
import { Direction, Routes } from './types/types'
import { useRef } from 'react'

function App() {
  const swipeFn = useRef<(direction: Direction) => void>(() => {})
  const dispatch = useAppDispatch()
  const cardIndexInStore = localStorage.getItem('cardIndex')
  const cardsInStore = localStorage.getItem('cards')
  if (cardIndexInStore) {
    dispatch(setCardIndex(JSON.parse(cardIndexInStore)))
  } else {
    dispatch(setCardIndex(0))
  }
  if (cardsInStore) {
    dispatch(setCards(JSON.parse(cardsInStore)))
  } else {
    dispatch(setCards(cardsExample))
  }

  const handlers = useSwipeable({
    onSwipedRight: (e) => {
      if (e.initial[0] < 50) dispatch(toggleMenu())
      else swipeFn.current(Direction.left)
    },
    onSwipedLeft: () => swipeFn.current(Direction.right),
  })

  return (
    <div onClick={() => dispatch(closeMenu())}>
      <MenuComponent />
      <div className="page" {...handlers}>
        <Route
          route={Routes.card}
          component={<CardComponent swipeFn={swipeFn} />}
        />
        <Route route={Routes.new} component={<AddComponent edit={false} />} />
        <Route route={Routes.edit} component={<AddComponent edit={true} />} />
        <Route route={Routes.about} component={<AboutComponent />} />
      </div>
    </div>
  )
}

export default App
