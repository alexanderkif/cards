import './HeaderComponent.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTheme, setTheme } from '@/store/menuSlice';
import { SVGIcons, Theme } from '@/types/types';
import SVGIcon from '../Icons/SVGIcons';
import { SyntheticEvent } from 'react';
import {
  flipAllCards,
  selectIsAllFlipped,
  selectIsExamples,
  selectIsRandom,
  shuffleCards,
  toggleIsExamples,
} from '@/store/cardsSlice';

function HeaderComponent() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const isExamples = useAppSelector(selectIsExamples);
  const isRandom = useAppSelector(selectIsRandom);
  const isAllCardsFlipped = useAppSelector(selectIsAllFlipped);

  const toggleTheme = (e: SyntheticEvent) => {
    e.stopPropagation();
    const newTheme = theme === Theme.light ? Theme.dark : Theme.light;
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    dispatch(setTheme(newTheme));
  };

  return (
    <ul className="header d-flex justify-content-end column-gap-2">
      <li>
        <a href="https://t.me/cardspwa" target="blank">
          <SVGIcon
            name={SVGIcons.telegram}
            size="1.5rem"
            tooltip="Telegram group"
            tooltipClass="svgTooltip-bottom"
          />
        </a>
      </li>
      <li onClick={() => dispatch(toggleIsExamples())}>
        <SVGIcon
          name={SVGIcons.examples}
          svgClass={isExamples ? 'active' : ''}
          size="1.5rem"
          tooltip={isExamples ? 'Hide examples' : 'Show examples'}
          tooltipClass="svgTooltip-bottom"
        />
      </li>
      <li onClick={() => dispatch(shuffleCards())}>
        <SVGIcon
          name={SVGIcons.random}
          svgClass={isRandom ? 'active' : ''}
          size="1.5rem"
          tooltip={isRandom ? 'Sort cards "abc"' : 'Shuffle cards'}
          tooltipClass="svgTooltip-bottom"
        />
      </li>
      <li onClick={() => dispatch(flipAllCards())}>
        <SVGIcon
          name={SVGIcons.flip}
          svgClass={isAllCardsFlipped ? 'active' : ''}
          size="1.5rem"
          tooltip="Flip all cards"
          tooltipClass="svgTooltip-bottom"
        />
      </li>
      <li onClick={toggleTheme}>
        <SVGIcon
          name={theme === 'light' ? SVGIcons.moon : SVGIcons.sun}
          size="1.5rem"
          tooltip={theme === 'light' ? 'Dark mode' : 'Light mode'}
          tooltipClass="svgTooltip-bottom svgTooltip-left"
        />
      </li>
    </ul>
  );
}

export default HeaderComponent;
