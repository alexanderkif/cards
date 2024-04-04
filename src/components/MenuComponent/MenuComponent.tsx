import { SyntheticEvent } from 'react'
import './MenuComponent.scss'
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
import { Routes } from '@/types/types'

function MenuComponent() {
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
          {getMenuItem(downloadIcon, '', 'Download from file')}
          {getMenuItem(saveToFileIcon, '', 'Save to xsl file')}
          {getMenuItem(
            removeAllIcon,
            'red',
            'Remove all cards!!!',
            removeAllCards
          )}
        </ul>
      </div>
    </div>
  )
}

export default MenuComponent
