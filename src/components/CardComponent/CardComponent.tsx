import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './CardComponent.scss';
import {
  selectCardIndex,
  selectCards,
  selectIsExamples,
  selectIsAllFlipped,
  setNextCardIndex,
  setPrevCardIndex,
} from '@/store/cardsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useSwipeable } from 'react-swipeable';
import { HandledEvents } from 'react-swipeable/es/types';
import { Direction, Routes } from '@/types/types';
import { setPage } from '@/store/menuSlice';

const ANIMATION_TIME = 300;

function CardComponent({
  swipeFn,
}: {
  swipeFn: MutableRefObject<(direction: Direction) => void>;
}) {
  const dispatch = useAppDispatch();
  const cardRef = useRef(null);
  const backRef = useRef(null);
  const cards = useAppSelector(selectCards);
  const cardIndex = useAppSelector(selectCardIndex);
  const isExamples = useAppSelector(selectIsExamples);
  const isAllCardsFlipped = useAppSelector(selectIsAllFlipped);
  const [isFace, setIsFace] = useState(true);

  useEffect(() => {
    if (cards.length === 0) dispatch(setPage(Routes.new));
  }, [cards, dispatch]);

  const slideCard = useCallback(
    (direction: Direction) => {
      if (!cardRef.current) {
        return;
      }
      const cardEl: HTMLElement = cardRef.current;
      if (cardEl.classList.contains('flipped')) {
        setIsFace(true);
        setTimeout(slide, ANIMATION_TIME);
      } else {
        slide();
      }
      function slide() {
        cardEl.classList.add(`slide-${direction}`);
        setTimeout(
          () =>
            direction === Direction.right
              ? dispatch(setNextCardIndex())
              : dispatch(setPrevCardIndex()),
          ANIMATION_TIME / 2
        );
        setTimeout(
          () => cardEl.classList.remove(`slide-${direction}`),
          ANIMATION_TIME
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    swipeFn.current = slideCard;
  }, [slideCard, swipeFn]);

  const handlers = useSwipeable({
    onSwipedLeft: ({ event }: { event: HandledEvents }) => {
      event.stopPropagation();
      slideCard(Direction.right);
    },
    onSwipedRight: ({ event }: { event: HandledEvents }) => {
      event.stopPropagation();
      slideCard(Direction.left);
    },
    onSwipedUp: () => setIsFace(false),
    onSwipedDown: () => setIsFace(true),
  });

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent): void => {
      if (key === 'ArrowUp') setIsFace(false);
      if (key === 'ArrowDown') setIsFace(true);
      if (key === 'ArrowRight') slideCard(Direction.left);
      if (key === 'ArrowLeft') slideCard(Direction.right);
    },
    [slideCard]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="cardComponent" {...handlers}>
      {cards[cardIndex] && (
        <div
          ref={cardRef}
          className={`card ${isFace ? '' : 'flipped'}`}
          onClick={() => setIsFace(!isFace)}
        >
          <div className={`content ${isAllCardsFlipped ? 'back' : ''}`}>
            <div className="text">{cards[cardIndex].head}</div>
          </div>
          <div
            className={`content ${isAllCardsFlipped ? '' : 'back'}`}
            ref={backRef}
          >
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
  );
}

export default CardComponent;
