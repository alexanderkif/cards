import { SyntheticEvent, useRef } from 'react'
import './MenuComponent.scss'
import ExcelJS from 'exceljs'
import FileSaver from 'file-saver'
import menuIcon from '@/assets/line-3-svgrepo-com.svg'
import cardsIcon from '@/assets/layers-3-svgrepo-com.svg'
import examplesIcon from '@/assets/paper-clip-svgrepo-com.svg'
import questionIcon from '@/assets/question-circle-svgrepo-com.svg'
import addIcon from '@/assets/plus-circle-svgrepo-com.svg'
import editIcon from '@/assets/pencil-svgrepo-com.svg'
import downloadIcon from '@/assets/cloud-download-svgrepo-com.svg'
import saveToFileIcon from '@/assets/cloud-arrow-up-svgrepo-com.svg'
import removeAllIcon from '@/assets/xmark-circle-svgrepo-com.svg'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectIsOpen,
  selectPage,
  setPage,
  toggleMenu,
} from '@/store/menuSlice'
import {
  selectIsExamples,
  setCardIndex,
  setCards,
  toggleIsExamples,
} from '@/store/cardsSlice'
import { Card, Routes } from '@/types/types'

function MenuComponent() {
  const fileInput = useRef<HTMLInputElement>(null)
  const isOpen = useAppSelector(selectIsOpen)
  const isExamples = useAppSelector(selectIsExamples)
  const page = useAppSelector(selectPage)
  const dispatch = useAppDispatch()
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    dispatch(toggleMenu())
  }
  const removeAllCards = () => {
    dispatch(setPage(Routes.new))
    dispatch(setCardIndex(0))
    dispatch(setCards([]))
  }

  function getMenuItem(
    icon: string,
    iconClass = '',
    text: string,
    fn: () => void = () => {}
  ) {
    return (
      <li onClick={fn}>
        <img src={icon} className={`itemIcon ${iconClass}`} alt={text} />
        <span className="itemText">{text}</span>
      </li>
    )
  }

  function getActiveRouteClass(route: Routes) {
    return page === route ? 'active' : ''
  }

  function setRoute(route: Routes) {
    return () => dispatch(setPage(route))
  }

  function clickLoadFile() {
    if (fileInput.current) fileInput.current.click()
  }

  async function loadFile(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement
    if (!target.files) return
    const blob = new Blob([target.files[0]], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    })
    const buffer = await blob.arrayBuffer()
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer)
    const ws = workbook.getWorksheet('Cards')
    const cards = []
    if (ws?.rowCount) {
      for (let rowIndex = 2; rowIndex < ws.rowCount + 1; rowIndex++) {
        const row = ws.getRow(rowIndex).values as Array<string>
        const card: Card = {
          head: row[1],
          tails: [row[2], row[3]],
          examples: [row[4], row[5]],
        }
        cards.push(card)
      }
    }
    dispatch(setCards(cards))
    dispatch(setCardIndex(0))
    dispatch(setPage(Routes.card))
  }

  async function saveToFile() {
    const cards = JSON.parse(localStorage.getItem('cards') || '') as Card[]
    const rows = cards.map((c) => ({
      head: c.head,
      tail0: c.tails[0],
      tail1: c.tails[1] || '',
      example0: c.examples[0] || '',
      example1: c.examples[1] || '',
    }))
    const workbook = new ExcelJS.Workbook()
    workbook.created = new Date()
    workbook.modified = new Date()
    const worksheet = workbook.addWorksheet('Cards')
    worksheet.columns = [
      { header: 'Head (require)', key: 'head', width: 20 },
      { header: 'Tail (require)', key: 'tail0', width: 20 },
      { header: 'Tail 2 (optional)', key: 'tail1', width: 20 },
      { header: 'Example 1 (optional)', key: 'example0', width: 50 },
      { header: 'Example 2 (optional)', key: 'example1', width: 50 },
    ]
    worksheet.addRows(rows)
    worksheet.getRow(1).alignment = { horizontal: 'center' }
    worksheet.getRow(1).font = { bold: true }
    const buffer = await workbook.xlsx.writeBuffer()
    FileSaver.saveAs(
      new Blob([buffer]),
      `Cards ${new Date().toLocaleDateString()}.xlsx`
    )
  }

  return (
    <div className="menu">
      <button
        className={isOpen ? 'menuButton opened' : 'menuButton'}
        onClick={handleClick}
      >
        <img src={menuIcon} className="menuIcon" alt="Menu" />
      </button>
      <div className={isOpen ? 'drawer opened' : 'drawer'}>
        <ul>
          {getMenuItem(
            cardsIcon,
            getActiveRouteClass(Routes.card),
            'Cards',
            setRoute(Routes.card)
          )}
          {getMenuItem(
            addIcon,
            getActiveRouteClass(Routes.new),
            'Add new card',
            setRoute(Routes.new)
          )}
          {getMenuItem(
            editIcon,
            getActiveRouteClass(Routes.edit),
            'Edit current card',
            setRoute(Routes.edit)
          )}
          {getMenuItem(
            questionIcon,
            getActiveRouteClass(Routes.about),
            'About',
            setRoute(Routes.about)
          )}
          {getMenuItem(
            examplesIcon,
            isExamples ? 'active' : '',
            'Show examples',
            () => dispatch(toggleIsExamples())
          )}
          {getMenuItem(downloadIcon, '', 'Download file', clickLoadFile)}
          {getMenuItem(saveToFileIcon, '', 'Save to xsl file', saveToFile)}
          {getMenuItem(
            removeAllIcon,
            'red',
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
  )
}

export default MenuComponent
