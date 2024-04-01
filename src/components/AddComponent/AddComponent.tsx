// import { useCallback, useEffect, useRef, useState } from 'react'
import './AddComponent.scss'

function AddComponent() {
  // const dispatch = useAppDispatch()
  // const backRef = useRef(null)
  // const cards = useAppSelector(selectCards)
  // const cardIndex = useAppSelector(selectCardIndex)
  // const isExamples = useAppSelector(selectIsExamples)
  // const [isFace, setIsFace] = useState(true)

  // const hideNextCard = () => {
  //   const el: HTMLElement = backRef.current!
  //   el.classList.add('hideText')
  //   setTimeout(() => el.classList.remove('hideText'), ANIMATION_TIME)
  // }

  // const arrowRight = useCallback(() => {
  //   hideNextCard()
  //   setIsFace(true)
  //   dispatch(setCardIndex(cardIndex < cards.length - 1 ? cardIndex + 1 : 0))
  // }, [cardIndex, cards.length, dispatch])

  // const arrowLeft = useCallback(() => {
  //   hideNextCard()
  //   setIsFace(true)
  //   dispatch(setCardIndex(cardIndex > 0 ? cardIndex - 1 : cards.length - 1))
  // }, [cardIndex, cards.length, dispatch])

  // const handlers = useSwipeable({
  //   onSwipedLeft: () => arrowRight(),
  //   onSwipedRight: () => arrowLeft(),
  //   onSwipedUp: () => setIsFace(false),
  //   onSwipedDown: () => setIsFace(true),
  // })

  // const handleKeyDown = useCallback(
  //   ({ key }: KeyboardEvent): void => {
  //     if (key === 'ArrowUp') setIsFace(false)
  //     if (key === 'ArrowDown') setIsFace(true)
  //     if (key === 'ArrowRight') arrowRight()
  //     if (key === 'ArrowLeft') arrowLeft()
  //   },
  //   [arrowLeft, arrowRight]
  // )

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown)
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [handleKeyDown])

  return <div className="addComponent">AddComponent</div>
}

export default AddComponent
