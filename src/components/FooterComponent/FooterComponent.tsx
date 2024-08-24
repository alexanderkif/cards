import './FooterComponent.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPage, setPage } from '@/store/menuSlice';
import { Routes, SVGIcons } from '@/types/types';
import SVGIcon from '../Icons/SVGIcons';
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
          <SVGIcon
            name={SVGIcons.house}
            svgClass={page === Routes.card ? 'active' : ''}
            size="1.5rem"
            tooltip="Home"
            tooltipClass="svgTooltip-top"
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
          <SVGIcon
            name={SVGIcons.search}
            svgClass={page === Routes.search ? 'active' : ''}
            size="1.5rem"
            tooltip="Search"
            tooltipClass="svgTooltip-top"
          />
        </li>
        <li
          onClick={() =>
            dispatch(setPage(currentGroup ? Routes.new : Routes.groups))
          }
        >
          <SVGIcon
            name={SVGIcons.add}
            svgClass={page === Routes.new ? 'active' : ''}
            size="1.5rem"
            tooltip="Add card"
            tooltipClass="svgTooltip-top"
          />
        </li>
        <li onClick={() => dispatch(setPage(Routes.groups))}>
          <SVGIcon
            name={SVGIcons.cards}
            svgClass={page === Routes.groups ? 'active' : ''}
            size="1.5rem"
            tooltip="Groups"
            tooltipClass="svgTooltip-top"
          />
        </li>
      </ul>
    </div>
  );
}

export default FooterComponent;
