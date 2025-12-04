import { SyntheticEvent, useRef } from 'react';
import './MenuComponent.scss';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectIsOpen,
  selectPage,
  setPage,
  toggleMenu,
} from '@/store/menuSlice';
import {
  setCardIndex,
  selectCards,
  saveGroup,
  removeGroup,
  selectGroups,
  selectCurrentGroup,
} from '@/store/cardsSlice';
import { Card, Group, Routes } from '@/types/types';
import { iconMap, IconName } from '../Icons/iconMapping';
import ClayIcon from '../Icons/ClayIcon';
import { useSwipeable } from 'react-swipeable';
import DonateButton from '../DonateButton/DonateButton';
import { createCompressedURL } from '@/utils/compress';
import { useDialog } from '@/hooks/hooks';

function MenuComponent() {
  const fileInput = useRef<HTMLInputElement>(null);
  const clickFn = useRef<() => void>(() => {});
  const isOpen = useAppSelector(selectIsOpen);
  const page = useAppSelector(selectPage);
  const cards = useAppSelector(selectCards);
  const groups = useAppSelector(selectGroups);
  const currentGroup = useAppSelector(selectCurrentGroup);
  const dispatch = useAppDispatch();
  const { confirm } = useDialog();
  const handleMenuClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(toggleMenu());
  };
  const removeAllCards = async () => {
    const confirmation = await confirm('All existing cards will be removed.');
    if (!confirmation) {
      return;
    }
    groups.forEach((group) => {
      dispatch(removeGroup(group.name));
    });
  };

  function getMenuItem(
    iconName: IconName,
    iconClass = '',
    text: string,
    fn: () => void = () => {}
  ) {
    return (
      <li onClick={fn}>
        <ClayIcon
          icon={iconMap[iconName]}
          size={28}
          className={`itemIcon ${iconClass}`}
        />
        <span className={`itemText ${iconClass}`}>{text}</span>
      </li>
    );
  }

  function getActiveRouteClass(route: Routes) {
    return page === route ? 'active' : '';
  }

  function setRoute(route: Routes) {
    return () => dispatch(setPage(route));
  }

  async function clickLoadFile() {
    const confirmation = await confirm(
      'All existing cards with the same group names will be overwritten with new cards.'
    );
    if (!confirmation) {
      return;
    }
    if (fileInput.current) fileInput.current.click();
  }

  async function loadFile(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    const blob = new Blob([target.files[0]], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    });
    const buffer = await blob.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    workbook.worksheets.forEach((ws) => {
      const cards = [];
      if (ws?.rowCount) {
        for (let rowIndex = 2; rowIndex < ws.rowCount + 1; rowIndex++) {
          const row = ws.getRow(rowIndex).values as Array<string>;
          const card: Card = {
            head: row[1],
            tails: [row[2], row[3]],
            examples: [row[4], row[5]],
          };
          cards.push(card);
        }
      }
      dispatch(saveGroup({ name: ws.name, cards }));
    });
    dispatch(setCardIndex(0));
    dispatch(setPage(Routes.card));
  }

  async function saveToFile() {
    const fileName = prompt(
      'Please enter file name',
      `Cards ${new Date().toLocaleDateString()}.xlsx`
    );
    if (fileName === null) {
      return;
    }
    const groups = JSON.parse(localStorage.getItem('groups') || '') as Group[];
    const workbook = new ExcelJS.Workbook();
    workbook.created = new Date();
    workbook.modified = new Date();
    groups.forEach(({ name, cards }) => {
      const rows = cards.map((c) => ({
        head: c.head,
        tail0: c.tails[0],
        tail1: c.tails[1] || '',
        example0: c.examples[0] || '',
        example1: c.examples[1] || '',
      }));
      const worksheet = workbook.addWorksheet(name);
      worksheet.columns = [
        { header: 'Head (require)', key: 'head', width: 20 },
        { header: 'Tail (require)', key: 'tail0', width: 20 },
        { header: 'Tail 2 (optional)', key: 'tail1', width: 20 },
        { header: 'Example 1 (optional)', key: 'example0', width: 50 },
        { header: 'Example 2 (optional)', key: 'example1', width: 50 },
      ];
      worksheet.addRows(rows);
      worksheet.getRow(1).alignment = { horizontal: 'center' };
      worksheet.getRow(1).font = { bold: true };
    });
    const buffer = await workbook.xlsx.writeBuffer();
    FileSaver.saveAs(new Blob([buffer]), fileName);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch(toggleMenu()),
  });

  const handleShareGroup = async () => {
    const groupToSend = groups.find((g) => g.name === currentGroup);
    if (groupToSend) {
      const message = await createCompressedURL(groupToSend);
      await confirm(message, false);
    }
  };

  return (
    <div className="menu">
      <ClayIcon
        icon={iconMap.menu}
        size={28}
        className={`menuButton position-fixed z-3 ${isOpen ? 'active' : ''}`}
        onClick={handleMenuClick}
      />
      <div className={`drawer ${isOpen ? 'opened' : ''}`} {...handlers}>
        <ul>
          {getMenuItem(
            'house',
            getActiveRouteClass(Routes.card),
            'Home',
            setRoute(
              currentGroup
                ? cards.length > 0
                  ? Routes.card
                  : Routes.new
                : Routes.groups
            )
          )}
          {getMenuItem(
            'search',
            getActiveRouteClass(Routes.search),
            'Search',
            setRoute(
              currentGroup
                ? cards.length > 0
                  ? Routes.search
                  : Routes.new
                : Routes.groups
            )
          )}
          {getMenuItem(
            'cards',
            getActiveRouteClass(Routes.groups),
            'Manage groups of cards',
            setRoute(Routes.groups)
          )}
          {getMenuItem(
            'question',
            getActiveRouteClass(Routes.about),
            'About',
            setRoute(Routes.about)
          )}
          {window.PayPal && (
            <li onClick={() => clickFn.current()}>
              <ClayIcon icon={iconMap.smile} size={28} className="itemIcon" />
              <span className="itemText">Buy me a coffee</span>
              <DonateButton clickFn={clickFn} />
            </li>
          )}
          {getMenuItem('close', '', 'Exit', () => window.close())}
          <hr />
          {getMenuItem('share', '', 'Share active group', handleShareGroup)}
          {getMenuItem('save', '', 'Save to xlsx file', saveToFile)}
          {getMenuItem('dowload', 'negative', 'Download file', clickLoadFile)}
          {getMenuItem(
            'removeAll',
            'negative',
            'Remove all cards!!!',
            removeAllCards
          )}
        </ul>
      </div>
      <input
        ref={fileInput}
        type="file"
        accept=".xlsx"
        style={{ display: 'none' }}
        onChange={loadFile}
      />
    </div>
  );
}

export default MenuComponent;
