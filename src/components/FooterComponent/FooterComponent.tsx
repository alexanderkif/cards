import './FooterComponent.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPage, setPage } from '@/store/menuSlice';
import { Routes } from '@/types/types';
import { iconMap } from '../Icons/iconMapping';
import ClayIcon from '../Icons/ClayIcon';
import { selectCards, selectCurrentGroup } from '@/store/cardsSlice';

function FooterComponent() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const currentGroup = useAppSelector(selectCurrentGroup);
  const cards = useAppSelector(selectCards);

  return (
    <div className="footer d-flex justify-content-center">
      <ul
        className="d-flex justify-content-evenly column-gap-3"
        style={{ width: '360px' }}
      >
        <li
          onClick={() =>
            dispatch(
              setPage(
                currentGroup
                  ? cards.length > 0
                    ? Routes.card
                    : Routes.new
                  : Routes.groups
              )
            )
          }
        >
          <ClayIcon
            icon={iconMap.house}
            size={28}
            className={page === Routes.card ? 'active' : ''}
            tooltip="Home"
            tooltipPosition="top"
          />
        </li>
        <li
          onClick={() =>
            dispatch(
              setPage(
                currentGroup
                  ? cards.length > 0
                    ? Routes.search
                    : Routes.new
                  : Routes.groups
              )
            )
          }
        >
          <ClayIcon
            icon={iconMap.search}
            size={28}
            className={page === Routes.search ? 'active' : ''}
            tooltip="Search"
            tooltipPosition="top"
          />
        </li>
        <li
          onClick={() =>
            dispatch(setPage(currentGroup ? Routes.new : Routes.groups))
          }
        >
          <ClayIcon
            icon={iconMap.add}
            size={28}
            className={page === Routes.new ? 'active' : ''}
            tooltip="Add card"
            tooltipPosition="top"
          />
        </li>
        <li onClick={() => dispatch(setPage(Routes.groups))}>
          <ClayIcon
            icon={iconMap.cards}
            size={28}
            className={page === Routes.groups ? 'active' : ''}
            tooltip="Groups"
            tooltipPosition="top"
          />
        </li>
      </ul>
    </div>
  );
}

export default FooterComponent;
