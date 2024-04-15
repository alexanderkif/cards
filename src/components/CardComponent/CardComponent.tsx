import { useCallback, useEffect, useRef, useState } from 'react'
import './CardComponent.scss'
import {
  selectCardIndex,
  selectCards,
  selectIsExamples,
  selectIsFlipped,
  setNextCardIndex,
  setPrevCardIndex,
} from '@/store/cardsSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useSwipeable } from 'react-swipeable'

const ANIMATION_TIME = 400

function CardComponent() {
  const dispatch = useAppDispatch()
  const cardRef = useRef(null)
  const backRef = useRef(null)
  const cards = useAppSelector(selectCards)
  const cardIndex = useAppSelector(selectCardIndex)
  const isExamples = useAppSelector(selectIsExamples)
  const isFlipped = useAppSelector(selectIsFlipped)
  const [isFace, setIsFace] = useState(true)

  const hideNextCard = () => {
    const el: HTMLElement = backRef.current!
    el.classList.add('hideText')
    setTimeout(() => el.classList.remove('hideText'), ANIMATION_TIME)
  }

  useEffect(() => {
    hideNextCard()
    setIsFace(true)
  }, [cardIndex])

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch(setNextCardIndex()),
    onSwipedRight: () => {
      dispatch(setPrevCardIndex())
      const el: HTMLElement = cardRef.current!
      el.classList.add('out-right')
      setTimeout(() => el.classList.remove('out-right'), ANIMATION_TIME)
    },
    onSwipedUp: () => setIsFace(false),
    onSwipedDown: () => setIsFace(true),
  })

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent): void => {
      if (key === 'ArrowUp') setIsFace(false)
      if (key === 'ArrowDown') setIsFace(true)
      if (key === 'ArrowRight') dispatch(setNextCardIndex())
      if (key === 'ArrowLeft') dispatch(setPrevCardIndex())
    },
    [dispatch]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="cardComponent" {...handlers}>
      {cards[cardIndex] && (
        <div
          ref={cardRef}
          className={`card ${isFace ? '' : 'flipped'}`}
          onClick={() => setIsFace(!isFace)}
        >
          <div className={`content ${isFlipped ? 'back' : ''}`}>
            <div className="text">{cards[cardIndex].head}</div>
          </div>
          <div className={`content ${isFlipped ? '' : 'back'}`} ref={backRef}>
            <div className="text">
              <ul>
                {cards[cardIndex].tails.map((tail, index) => (
                  <li key={`${cards[cardIndex].head}_${tail}-${index}`}>
                    {tail}
                  </li>
                ))}
              </ul>
            </div>
            {isExamples && (
              <div className="examples">
                <ul>
                  {cards[cardIndex].examples.map(
                    (example, index) =>
                      example && (
                        <li
                          key={`${cards[cardIndex].head}_${example}-${index}`}
                        >
                          {example}
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CardComponent
