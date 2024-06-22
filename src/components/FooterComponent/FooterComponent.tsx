import './FooterComponent.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPage, setPage } from '@/store/menuSlice';
import { Routes, SVGIcons } from '@/types/types';
import SVGIcon from '../Icons/SVGIcons';

function FooterComponent() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);

  return (
    <div className="footer d-flex justify-content-center">
      <ul
        className="d-flex justify-content-evenly column-gap-3"
        style={{ width: '360px' }}
      >
        <li onClick={() => dispatch(setPage(Routes.card))}>
          <SVGIcon
            name={SVGIcons.house}
            svgClass={page === Routes.card ? 'active' : ''}
            size="1.5rem"
            tooltip="Home page"
            tooltipClass="svgTooltip-top"
          />
        </li>
        <li onClick={() => dispatch(setPage(Routes.search))}>
          <SVGIcon
            name={SVGIcons.search}
            svgClass={page === Routes.search ? 'active' : ''}
            size="1.5rem"
            tooltip="Home page"
            tooltipClass="svgTooltip-top"
          />
        </li>
        <li onClick={() => dispatch(setPage(Routes.new))}>
          <SVGIcon
            name={SVGIcons.add}
            svgClass={page === Routes.new ? 'active' : ''}
            size="1.5rem"
            tooltip="Add new card"
            tooltipClass="svgTooltip-top"
          />
        </li>
        <li onClick={() => dispatch(setPage(Routes.groups))}>
          <SVGIcon
            name={SVGIcons.cards}
            svgClass={page === Routes.groups ? 'active' : ''}
            size="1.5rem"
            tooltip="Manage groups"
            tooltipClass="svgTooltip-top"
          />
        </li>
      </ul>
    </div>
  );
}

export default FooterComponent;
