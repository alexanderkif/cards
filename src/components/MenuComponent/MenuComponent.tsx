import { SyntheticEvent, useRef } from 'react';
import './MenuComponent.scss';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectIsOpen,
  selectPage,
  selectTheme,
  setPage,
  setTheme,
  toggleMenu,
} from '@/store/menuSlice';
import {
  flipAllCards,
  selectIsExamples,
  selectIsAllFlipped,
  selectIsRandom,
  setCardIndex,
  toggleIsExamples,
  shuffleCards,
  selectCards,
  saveGroup,
  removeGroup,
  selectGroups,
  selectCurrentGroup,
} from '@/store/cardsSlice';
import { Card, Group, Routes, SVGIcons, Theme } from '@/types/types';
import SVGIcon from '../Icons/SVGIcons';
import { useSwipeable } from 'react-swipeable';
import DonateButton from '../DonateButton/DonateButton';
import { createCompressedURL } from '@/utils/compress';

function MenuComponent() {
  const fileInput = useRef<HTMLInputElement>(null);
  const clickFn = useRef<() => void>(() => {});
  const isOpen = useAppSelector(selectIsOpen);
  const isExamples = useAppSelector(selectIsExamples);
  const isRandom = useAppSelector(selectIsRandom);
  const isAllCardsFlipped = useAppSelector(selectIsAllFlipped);
  const page = useAppSelector(selectPage);
  const cards = useAppSelector(selectCards);
  const theme = useAppSelector(selectTheme);
  const groups = useAppSelector(selectGroups);
  const currentGroup = useAppSelector(selectCurrentGroup);
  const dispatch = useAppDispatch();
  const handleMenuClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(toggleMenu());
  };
  const removeAllCards = () => {
    const confirmation = confirm('All existing cards will be removed.');
    if (!confirmation) {
      return;
    }
    groups.forEach((group) => {
      dispatch(removeGroup(group.name));
    });
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

  const toggleTheme = (e: SyntheticEvent) => {
    e.stopPropagation();
    const newTheme = theme === Theme.light ? Theme.dark : Theme.light;
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    dispatch(setTheme(newTheme));
  };

  const handleShareGroup = () => {
    const groupToSend = groups.find((g) => g.name === currentGroup);
    if (groupToSend) {
      createCompressedURL(groupToSend);
    }
  };

  return (
    <div className="menu">
      <span className="position-absolute top-0 end-0 m-3 z-2 d-flex flex-row-reverse">
        <span onClick={toggleTheme}>
          <SVGIcon
            name={theme === 'light' ? SVGIcons.moon : SVGIcons.sun}
            size="1.5rem"
            tooltip="Light / dark theme"
          />
        </span>
        <span onClick={setRoute(Routes.new)} className="me-3">
          <SVGIcon name={SVGIcons.add} size="1.5rem" tooltip="Add new card" />
        </span>
        <span onClick={() => dispatch(flipAllCards())} className="me-3">
          <SVGIcon
            name={SVGIcons.flip}
            svgClass={isAllCardsFlipped ? 'active' : ''}
            size="1.5rem"
            tooltip="Flip all cards"
          />
        </span>
        <span onClick={() => dispatch(shuffleCards())} className="me-3">
          <SVGIcon
            name={SVGIcons.random}
            svgClass={isRandom ? 'active' : ''}
            size="1.5rem"
            tooltip="Shuffle cards / sort abc"
          />
        </span>
        <span onClick={() => dispatch(toggleIsExamples())} className="me-3">
          <SVGIcon
            name={SVGIcons.examples}
            svgClass={isExamples ? 'active' : ''}
            size="1.5rem"
            tooltip="Show examples"
          />
        </span>
        <span onClick={() => dispatch(setPage(Routes.groups))} className="me-3">
          <SVGIcon
            name={SVGIcons.cards}
            size="1.5rem"
            tooltip="Manage groups"
          />
        </span>
        <span onClick={() => dispatch(setPage(Routes.card))} className="me-3">
          <SVGIcon name={SVGIcons.house} size="1.5rem" tooltip="Home page" />
        </span>
      </span>
      <span onClick={handleMenuClick}>
        <SVGIcon
          name={SVGIcons.menu}
          svgClass={`menuButton position-absolute top-0 m-3 z-3 ${isOpen ? 'opened' : ''}`}
          size="2rem"
        />
      </span>
      <div className={`drawer ${isOpen ? 'opened' : ''}`} {...handlers}>
        <ul>
          {getMenuItem(
            SVGIcons.house,
            getActiveRouteClass(Routes.card),
            'Home',
            setRoute(cards.length === 0 ? Routes.new : Routes.card)
          )}
          {getMenuItem(
            SVGIcons.search,
            getActiveRouteClass(Routes.search),
            'Search',
            setRoute(Routes.search)
          )}
          {getMenuItem(
            SVGIcons.cards,
            getActiveRouteClass(Routes.groups),
            'Manage groups of cards',
            setRoute(Routes.groups)
          )}
          {getMenuItem(
            SVGIcons.question,
            getActiveRouteClass(Routes.about),
            'About',
            setRoute(Routes.about)
          )}
          {window.PayPal && (
            <li onClick={() => clickFn.current()}>
              <SVGIcon name={SVGIcons.smile} svgClass="itemIcon" />
              <span className="itemText">Buy me a coffee</span>
              <DonateButton clickFn={clickFn} />
            </li>
          )}
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
          {getMenuItem(
            SVGIcons.share,
            '',
            'Share active group',
            handleShareGroup
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
