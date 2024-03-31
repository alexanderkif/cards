import './App.scss'
import CardComponent from './components/CardComponent/CardComponent'
import MenuComponent from './components/MenuComponent/MenuComponent'
import { Card } from './types/types'
import { useAppDispatch } from './store/hooks'
import { closeMenu } from './store/menuSlice'

const card: Card = {
  head: 'book',
  tails: ['libro', 'reservar'],
  examples: ['book me a single room at my usual hotel', 'she felt every emotion in the book of love']
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
