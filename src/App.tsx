import './App.scss'
import AboutComponent from './components/AboutComponent/AboutComponent'
import AddComponent from './components/AddComponent/AddComponent'
import CardComponent from './components/CardComponent/CardComponent'
import MenuComponent from './components/MenuComponent/MenuComponent'
import Route from './components/Route/Route'
import { useAppDispatch } from './store/hooks'
import { closeMenu } from './store/menuSlice'
import { Routes } from './types/types'

function App() {
  const dispatch = useAppDispatch()

  return (
    <div onClick={() => dispatch(closeMenu())}>
      <MenuComponent />
      <div className="page">
        <Route route={Routes.card} component={<CardComponent />} />
        <Route route={Routes.new} component={<AddComponent />} />
        <Route route={Routes.about} component={<AboutComponent />} />
      </div>
    </div>
  )
}

export default App
