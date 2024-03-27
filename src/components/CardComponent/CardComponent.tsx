import { useState } from 'react'
import './CardComponent.scss'
import { Card } from '../../types/types'
import { selectIsExamples } from '../../store/cardsSlice';
import { useAppSelector } from '../../store/hooks';

function CardComponent({ card }: { card: Card }) {
  const [isFaceSide, setFaceSide] = useState(true)
  const isExamples = useAppSelector(selectIsExamples);

  return (
    <div className="card" onClick={() => setFaceSide(!isFaceSide)}>
      <div className='cardContent'>
        {isFaceSide ?
          card.head :
          <ul>{card.tails.map(tail => <li key={tail}>{tail}</li>)}</ul>
        }
      </div>
      {isExamples &&
        <div className="cardExamples">
          <ul>{card.examples.map(example => <li key={example}>{example}</li>)}</ul>
        </div>
      }
    </div>
  )
}

export default CardComponent
