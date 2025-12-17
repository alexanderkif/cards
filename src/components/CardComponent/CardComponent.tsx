import {
  MutableRefObject,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
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
  removeCurrentCard,
  selectCurrentGroup,
} from '@/store/cardsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useSwipeable } from 'react-swipeable';
import { HandledEvents } from 'react-swipeable/es/types';
import { Direction, Routes } from '@/types/types';
import { setPage } from '@/store/menuSlice';
import SpeakerComponent from '../SpeakerComponent/SpeakerComponent';
import { iconMap } from '../Icons/iconMapping';
import ClayIcon from '../Icons/ClayIcon';
import { useDialog, useMediaQuery } from '@/hooks/hooks';

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
  const { confirm } = useDialog();
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const currentGroup = useAppSelector(selectCurrentGroup);

  useEffect(() => {
    if (cards.length === 0 && currentGroup) dispatch(setPage(Routes.new));
  }, [cards, currentGroup, dispatch]);

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
    onSwiping: ({ event, dir }: { event: HandledEvents; dir: string }) => {
      // Предотвращаем pull-to-refresh во время свайпа вниз
      if (
        dir === 'Down' &&
        !(event.target as HTMLElement).closest('.speakerComponent')
      ) {
        event.preventDefault();
      }
    },
    onSwipedLeft: ({ event }: { event: HandledEvents }) => {
      // Игнорируем свайп, если он начался внутри диалога голоса
      if ((event.target as HTMLElement).closest('.speakerComponent')) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      slideCard(Direction.right);
    },
    onSwipedRight: ({ event }: { event: HandledEvents }) => {
      // Игнорируем свайп, если он начался внутри диалога голоса
      if ((event.target as HTMLElement).closest('.speakerComponent')) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      slideCard(Direction.left);
    },
    onSwipedUp: ({ event }: { event: HandledEvents }) => {
      // Игнорируем свайп, если он начался внутри диалога голоса
      if ((event.target as HTMLElement).closest('.speakerComponent')) {
        return;
      }
      event.preventDefault();
      setIsFace(false);
    },
    onSwipedDown: ({ event }: { event: HandledEvents }) => {
      // Игнорируем свайп, если он начался внутри диалога голоса
      if ((event.target as HTMLElement).closest('.speakerComponent')) {
        return;
      }
      event.preventDefault(); // Предотвращаем pull-to-refresh браузера
      setIsFace(true);
    },
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

  const clickEditCard = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(setPage(Routes.edit));
  };

  const removeCard = async (e: SyntheticEvent) => {
    e.stopPropagation();
    const confirmation = await confirm('Current card will be removed.');
    if (!confirmation) {
      return;
    }
    dispatch(removeCurrentCard());
    dispatch(setPage(Routes.card));
  };

  const formatHTML = (str: string): ReactNode => {
    return <span dangerouslySetInnerHTML={{ __html: str }} />;
  };

  const isTailsLong = useMemo(
    (): boolean =>
      (cards[cardIndex]?.tails?.reduce(
        (acc, t) => acc + (t?.toString().length || 0),
        0
      ) || 0) > 50,
    [cardIndex, cards]
  );

  return (
    <div className="cardComponent" {...handlers}>
      {cards[cardIndex] && (
        <div
          ref={cardRef}
          className={`card ${isFace ? '' : 'flipped'}`}
          onClick={(e) => {
            // Не переворачиваем карточку, если клик на диалоге голоса
            if ((e.target as HTMLElement).closest('.speakerComponent')) {
              return;
            }
            setIsFace(!isFace);
          }}
        >
          <div className={`content ${isAllCardsFlipped ? 'back' : 'front'}`}>
            <div
              className={
                'p-3 text' +
                (cards[cardIndex].head.length > 50 ? ' smallText' : '')
              }
            >
              <div>
                {formatHTML(cards[cardIndex].head)}
                <SpeakerComponent
                  className="ms-2"
                  text={cards[cardIndex].head}
                  voiceId="front"
                />
              </div>
            </div>
            <span className="position-absolute d-flex gap-2 p-2 top-0 end-0 fs-6">
              <span
                onClick={clickEditCard}
                className="actionButton"
                role="button"
                aria-label="Edit card"
                tabIndex={0}
              >
                <ClayIcon
                  icon={iconMap.edit}
                  size={28}
                  className="warning"
                  tooltip="Edit card"
                  tooltipPosition="bottom"
                />
              </span>
              <span
                onClick={removeCard}
                className="actionButton"
                role="button"
                aria-label="Delete card"
                tabIndex={0}
              >
                <ClayIcon
                  icon={iconMap.trash}
                  size={28}
                  className="danger"
                  tooltip="Delete card"
                  tooltipPosition="bottom-right"
                />
              </span>
            </span>
          </div>
          <div
            className={`content ${isAllCardsFlipped ? 'front' : 'back'}`}
            ref={backRef}
          >
            <div className="text">
              <ul>
                {cards[cardIndex].tails.map(
                  (tail, index) =>
                    tail && (
                      <li
                        key={`${cards[cardIndex].head}_${tail}-${index}`}
                        className={isTailsLong ? 'smallTail' : ''}
                      >
                        {formatHTML(tail)}
                        <SpeakerComponent
                          text={tail}
                          className="ms-2"
                          voiceId="back"
                        />
                      </li>
                    )
                )}
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
                          {formatHTML(example)}
                          <SpeakerComponent
                            text={example}
                            className="ms-2"
                            voiceId="examples"
                          />
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="arrow-left" onClick={() => slideCard(Direction.left)}>
          <ClayIcon icon={iconMap.left} size={28} />
        </div>
      )}
      {!isMobile && (
        <div className="arrow-right" onClick={() => slideCard(Direction.right)}>
          <ClayIcon icon={iconMap.right} size={28} />
        </div>
      )}
    </div>
  );
}

export default CardComponent;
