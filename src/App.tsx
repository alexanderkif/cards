import './App.scss'
import CardComponent from './components/CardComponent/CardComponent'
import MenuComponent from './components/MenuComponent/MenuComponent'
import { useAppDispatch } from './store/hooks'
import { closeMenu } from './store/menuSlice'

function App() {
  const dispatch = useAppDispatch()

  return (
    <div onClick={() => dispatch(closeMenu())}>
      <MenuComponent />
      <div className="page">
        <CardComponent />
      </div>
    </div>
  )
}

export default App
