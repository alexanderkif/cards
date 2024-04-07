import './App.scss'
import cardsExample from './cards-example'
import AboutComponent from './components/AboutComponent/AboutComponent'
import AddComponent from './components/AddComponent/AddComponent'
import CardComponent from './components/CardComponent/CardComponent'
import MenuComponent from './components/MenuComponent/MenuComponent'
import Route from './components/Route/Route'
import { setCardIndex, setCards } from './store/cardsSlice'
import { useAppDispatch } from './store/hooks'
import { closeMenu } from './store/menuSlice'
import { Routes } from './types/types'

function App() {
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

  return (
    <div onClick={() => dispatch(closeMenu())}>
      <MenuComponent />
      <div className="page">
        <Route route={Routes.card} component={<CardComponent />} />
        <Route route={Routes.new} component={<AddComponent edit={false} />} />
        <Route route={Routes.edit} component={<AddComponent edit={true} />} />
        <Route route={Routes.about} component={<AboutComponent />} />
      </div>
    </div>
  )
}

export default App
