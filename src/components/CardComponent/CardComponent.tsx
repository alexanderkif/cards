import { useState } from 'react'
import './CardComponent.scss'
import { Card } from '@/types/types'
import { selectIsExamples } from '@/store/cardsSlice';
import { useAppSelector } from '@/store/hooks';

function CardComponent({ card }: { card: Card }) {
  const [isFaceSide, setFaceSide] = useState(true)
  const isExamples = useAppSelector(selectIsExamples);

  return (
    <div className="cardComponent">
      <div className={isFaceSide ? "card" : "card flipped"} onClick={() => setFaceSide(!isFaceSide)}>
        <div className="content">
          <div className='text'>
            {card.head}
          </div>
        </div>
        <div className="content back">
          <div className='text'>
            <ul>{card.tails.map(tail => <li key={tail}>{tail}</li>)}</ul>
          </div>
          {isExamples &&
            <div className="examples">
              <ul>{card.examples.map(example => <li key={example}>{example}</li>)}</ul>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default CardComponent
