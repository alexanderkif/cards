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
  flipAllCards,
  selectIsExamples,
  selectIsAllFlipped,
  selectIsRandom,
  setCardIndex,
  setCards,
  toggleIsExamples,
  shuffleCards,
  selectCards,
  removeCurrentCard,
} from '@/store/cardsSlice';
import { Card, Routes, SVGIcons } from '@/types/types';
import SVGIcon from './SVGIcons';
import { useSwipeable } from 'react-swipeable';
import DonateButton from '../DonateButton/DonateButton';

function MenuComponent() {
  const fileInput = useRef<HTMLInputElement>(null);
  const clickFn = useRef<() => void>(() => {});
  const isOpen = useAppSelector(selectIsOpen);
  const isExamples = useAppSelector(selectIsExamples);
  const isRandom = useAppSelector(selectIsRandom);
  const isAllCardsFlipped = useAppSelector(selectIsAllFlipped);
  const page = useAppSelector(selectPage);
  const cards = useAppSelector(selectCards);
  const dispatch = useAppDispatch();
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(toggleMenu());
  };
  const removeCard = () => {
    const confirmation = confirm('Current card will be removed.');
    if (!confirmation) {
      return;
    }
    dispatch(removeCurrentCard());
    dispatch(setPage(Routes.card));
  };
  const removeAllCards = () => {
    const confirmation = confirm('All existing cards will be removed.');
    if (!confirmation) {
      return;
    }
    dispatch(setPage(Routes.new));
    dispatch(setCardIndex(0));
    dispatch(setCards([]));
  };

  function getMenuItem(
    svg: SVGIcons,
    iconClass = '',
    text: string,
    fn: () => void = () => {}
  ) {
    return (
      <li onClick={fn}>
        <SVGIcon name={svg} svgClass={`itemIcon ${iconClass}`} />
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

  function clickLoadFile() {
    const confirmation = confirm(
      'All existing cards will be overwritten with new cards.'
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
    const ws = workbook.getWorksheet('Cards');
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
    dispatch(setCards(cards));
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
    const cards = JSON.parse(localStorage.getItem('cards') || '') as Card[];
    const rows = cards.map((c) => ({
      head: c.head,
      tail0: c.tails[0],
      tail1: c.tails[1] || '',
      example0: c.examples[0] || '',
      example1: c.examples[1] || '',
    }));
    const workbook = new ExcelJS.Workbook();
    workbook.created = new Date();
    workbook.modified = new Date();
    const worksheet = workbook.addWorksheet('Cards');
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
    const buffer = await workbook.xlsx.writeBuffer();
    FileSaver.saveAs(new Blob([buffer]), fileName);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch(toggleMenu()),
  });

  return (
    <div className="menu">
      <button
        className={isOpen ? 'menuButton opened' : 'menuButton'}
        onClick={handleClick}
      >
        <SVGIcon
          name={SVGIcons.menu}
          svgClass={`menuIcon ${isOpen ? 'purple' : 'green'}`}
        />
      </button>
      <div className={`drawer ${isOpen ? 'opened' : ''}`} {...handlers}>
        <ul>
          {getMenuItem(
            SVGIcons.cards,
            getActiveRouteClass(Routes.card),
            'Cards',
            setRoute(cards.length === 0 ? Routes.new : Routes.card)
          )}
          {getMenuItem(
            SVGIcons.search,
            getActiveRouteClass(Routes.search),
            'Search',
            setRoute(Routes.search)
          )}
          {getMenuItem(
            SVGIcons.add,
            getActiveRouteClass(Routes.new),
            'Add new card',
            setRoute(Routes.new)
          )}
          {getMenuItem(
            SVGIcons.edit,
            getActiveRouteClass(Routes.edit),
            'Edit current card',
            setRoute(cards.length === 0 ? Routes.new : Routes.edit)
          )}
          {getMenuItem(
            SVGIcons.remove,
            'negative',
            'Remove current card!',
            removeCard
          )}
          {getMenuItem(
            SVGIcons.question,
            getActiveRouteClass(Routes.about),
            'About',
            setRoute(Routes.about)
          )}
          <li onClick={() => clickFn.current()}>
            <SVGIcon name={SVGIcons.smile} svgClass="itemIcon" />
            <span className="itemText">Buy me coffee</span>
            <DonateButton clickFn={clickFn} />
          </li>
          <hr />
          {getMenuItem(
            SVGIcons.examples,
            isExamples ? 'active' : '',
            'Show examples',
            () => dispatch(toggleIsExamples())
          )}
          {getMenuItem(
            SVGIcons.random,
            isRandom ? 'active' : '',
            'Shuffle cards / sort abc',
            () => dispatch(shuffleCards())
          )}
          {getMenuItem(
            SVGIcons.flip,
            isAllCardsFlipped ? 'active' : '',
            'Flip all cards',
            () => dispatch(flipAllCards())
          )}
          {getMenuItem(SVGIcons.save, '', 'Save to xsl file', saveToFile)}
          {getMenuItem(
            SVGIcons.dowload,
            'negative',
            'Download file',
            clickLoadFile
          )}
          {getMenuItem(
            SVGIcons.removeAll,
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
