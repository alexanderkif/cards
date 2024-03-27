import './App.scss'
import CardComponent from './components/CardComponent/CardComponent'
import MenuComponent from './components/MenuComponent/MenuComponent'
import { Card } from './types/types'
import { useAppDispatch } from './store/hooks'
import { closeMenu } from './store/menuSlice'

const card: Card = {
  head: 'book',
  tails: ['книга', 'бронировать'],
  examples: ['interesting book', 'book hotel']
}

function App() {
  const dispatch = useAppDispatch();

  return (
    <div onClick={() => dispatch(closeMenu())}>
      <MenuComponent />
      <div className='page'>
        <CardComponent card={card} />
      </div>
    </div>
  )
}

export default App
