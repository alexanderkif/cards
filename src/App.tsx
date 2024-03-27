import './App.css'
import CardComponent from './components/CardComponent/CardComponent'
import MenuComponent from './components/MenuComponent/MenuComponent'
import { Card } from './types/types'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './store/counterSlice';
import { useAppSelector, useAppDispatch } from './store/hooks'
import { closeMenu } from './store/menuSlice'

const card: Card = {
  head: 'book',
  tails: ['книга', 'бронировать'],
  examples: ['interesting book', 'book hotel']
}

function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <div onClick={() => dispatch(closeMenu())}>
      <MenuComponent />
      <div>
        <CardComponent card={card} />
      </div>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>count is {count}</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>
          increment
        </button>
        <button onClick={() => dispatch(decrement())}>
          decrement
        </button>
        <button onClick={() => dispatch(incrementByAmount(3))}>
          incrementByAmount 3
        </button>
        <button onClick={() => {incrementAsync(2)(dispatch); console.log('incrementAsync 2');}}>
          incrementAsync 2
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
