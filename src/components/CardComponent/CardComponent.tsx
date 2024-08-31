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
import { Direction, Routes, SVGIcons } from '@/types/types';
import { setPage } from '@/store/menuSlice';
import SpeakerComponent from '../SpeakerComponent/SpeakerComponent';
import SVGIcon from '../Icons/SVGIcons';
import { useDialog, useMediaQuery } from '@/hooks/hooks';

const ANIMATION_TIME = 300;
const BIG_SPEAKER = '5vmin';

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
      cards[cardIndex].tails.reduce(
        (acc, t) => acc + (t?.toString().length || 0),
        0
      ) > 50,
    [cardIndex, cards]
  );

  return (
    <div className="cardComponent" {...handlers}>
      {cards[cardIndex] && (
        <div
          ref={cardRef}
          className={`card ${isFace ? '' : 'flipped'}`}
          onClick={() => setIsFace(!isFace)}
        >
          <div className={`content ${isAllCardsFlipped ? 'back' : 'front'}`}>
            <div
              className={
                cards[cardIndex].head.length > 50 ? 'text smallText' : 'text'
              }
            >
              <div>
                {formatHTML(cards[cardIndex].head)}
                <SpeakerComponent
                  text={cards[cardIndex].head}
                  size={BIG_SPEAKER}
                />
              </div>
            </div>
            <span className="position-absolute d-flex top-0 end-0 fs-6">
              <span onClick={clickEditCard} className="actionButton">
                <SVGIcon
                  name={SVGIcons.edit}
                  size="6vmin"
                  tooltip="Edit card"
                  tooltipClass="svgTooltip-bottom"
                />
              </span>
              <span onClick={removeCard} className="actionButton">
                <SVGIcon
                  name={SVGIcons.trash}
                  svgClass="negative"
                  size="6vmin"
                  tooltip="Delete card"
                  tooltipClass="svgTooltip-bottom"
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
                        <SpeakerComponent text={tail} size={BIG_SPEAKER} />
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
                          <SpeakerComponent text={example} />
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
        <div className="arrow-left" onClick={() => slideCard(Direction.right)}>
          <SVGIcon name={SVGIcons.left} svgClass="itemIcon" />
        </div>
      )}
      {!isMobile && (
        <div className="arrow-right" onClick={() => slideCard(Direction.left)}>
          <SVGIcon name={SVGIcons.right} svgClass="itemIcon" />
        </div>
      )}
    </div>
  );
}

export default CardComponent;
