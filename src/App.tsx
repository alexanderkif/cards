import { useSwipeable } from 'react-swipeable';
import './App.scss';
import groupsExample from './groups-example';
import AboutComponent from './components/AboutComponent/AboutComponent';
import SearchComponent from './components/SearchComponent/SearchComponent';
import AddComponent from './components/AddComponent/AddComponent';
import CardComponent from './components/CardComponent/CardComponent';
import MenuComponent from './components/MenuComponent/MenuComponent';
import Route from './components/Route/Route';
import {
  saveGroup,
  setCardIndex,
  setCards,
  setCurrentGroup,
} from './store/cardsSlice';
import { useAppDispatch } from './store/hooks';
import { closeMenu, toggleMenu } from './store/menuSlice';
import { Group, Direction, Routes } from './types/types';
import { useRef } from 'react';
import GroupComponent from './components/GroupComponent/GroupComponent';

function App() {
  const swipeFn = useRef<(direction: Direction) => void>(() => {});
  const dispatch = useAppDispatch();
  const groups: Group[] = JSON.parse(localStorage.getItem('groups') || '[]');
  const currentGroup = JSON.parse(localStorage.getItem('currentGroup') || '""');
  const cardIndexInStore = +(localStorage.getItem('cardIndex') || 0);
  const cardsInStore = localStorage.getItem('cards');

  if (groups.length === 0) {
    dispatch(setCurrentGroup(''));
    groupsExample.forEach((group) => {
      dispatch(saveGroup(group));
    });
    if (cardsInStore) {
      dispatch(saveGroup({ name: 'Cards', cards: JSON.parse(cardsInStore) }));
      localStorage.removeItem('cards');
    }
  }
  if (groups.length > 0 && !currentGroup) {
    dispatch(setCurrentGroup(groups[0].name));
  }
  if (groups.length > 0 && !!currentGroup) {
    const currentGroupCards = groups.find((g) => g.name === currentGroup);
    if (
      currentGroupCards &&
      currentGroupCards.cards.length < cardIndexInStore
    ) {
      dispatch(setCardIndex(0));
    }
    if (currentGroupCards) {
      dispatch(setCards(currentGroupCards.cards));
    }
  }

  const handlers = useSwipeable({
    onSwipedRight: (e) => {
      if (e.initial[0] < 50) {
        dispatch(toggleMenu());
        return;
      }
      if (!(e.event.target as HTMLElement).classList.contains('page')) return;
      else swipeFn.current(Direction.left);
    },
    onSwipedLeft: (e) => {
      if (!(e.event.target as HTMLElement).classList.contains('page')) return;
      swipeFn.current(Direction.right);
    },
  });

  return (
    <div className="" onClick={() => dispatch(closeMenu())}>
      <MenuComponent />
      <div className="page" {...handlers}>
        <Route
          route={Routes.card}
          component={<CardComponent swipeFn={swipeFn} />}
        />
        <Route route={Routes.search} component={<SearchComponent />} />
        <Route route={Routes.groups} component={<GroupComponent />} />
        <Route route={Routes.new} component={<AddComponent edit={false} />} />
        <Route route={Routes.edit} component={<AddComponent edit={true} />} />
        <Route route={Routes.about} component={<AboutComponent />} />
      </div>
    </div>
  );
}

export default App;
