import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './CardComponent.css'
import { Card } from '../../types/types'

function CardComponent({card, isExamples = false}: {card: Card, isExamples: boolean}) {
  const [isFaceSide, setFaceSide] = useState(true)

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
