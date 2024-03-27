import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './CardComponent.css'
import { Card } from '../../types/types'
import { selectIsExamples } from '../../store/cardsSlice';
import { useAppSelector } from '../../store/hooks';

function CardComponent({card}: {card: Card}) {
  const [isFaceSide, setFaceSide] = useState(true)
  const isExamples = useAppSelector(selectIsExamples);

  return (
    <>
      <div className="card">
        {isFaceSide ? card.head : card.tails}
      </div>
      <div className="cardExamples">
        {isExamples && card.examples}
      </div>
      <div>
        isExamples is {isExamples}
      </div>
      <div className="cardButtons">
        <button onClick={() => setFaceSide(!isFaceSide)}>
          isFaceSide = {isFaceSide}
        </button>
      </div>
    </>
  )
}

export default CardComponent
