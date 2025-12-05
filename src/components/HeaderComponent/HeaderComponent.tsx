import './HeaderComponent.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTheme, setTheme } from '@/store/menuSlice';
import { Theme } from '@/types/types';
import { iconMap } from '../Icons/iconMapping';
import ClayIcon from '../Icons/ClayIcon';
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
          <ClayIcon
            icon={iconMap.telegram}
            size={28}
            className="info"
            tooltip="Telegram group"
            tooltipPosition="bottom"
          />
        </a>
      </li>
      <li onClick={() => dispatch(toggleIsExamples())}>
        <ClayIcon
          icon={iconMap.examples}
          size={28}
          className={isExamples ? 'active' : ''}
          tooltip={isExamples ? 'Hide examples' : 'Show examples'}
          tooltipPosition="bottom"
        />
      </li>
      <li onClick={() => dispatch(shuffleCards())}>
        <ClayIcon
          icon={iconMap.random}
          size={28}
          className={isRandom ? 'active' : ''}
          tooltip={isRandom ? 'Sort cards "abc"' : 'Shuffle cards'}
          tooltipPosition="bottom"
        />
      </li>
      <li onClick={() => dispatch(flipAllCards())}>
        <ClayIcon
          icon={iconMap.flip}
          size={28}
          className={isAllCardsFlipped ? 'active' : ''}
          tooltip="Flip all cards"
          tooltipPosition="bottom"
        />
      </li>
      <li onClick={toggleTheme}>
        <ClayIcon
          icon={theme === 'light' ? iconMap.moon : iconMap.sun}
          size={28}
          className="warning"
          tooltip={theme === 'light' ? 'Dark mode' : 'Light mode'}
          tooltipPosition="bottom"
        />
      </li>
    </ul>
  );
}

export default HeaderComponent;
