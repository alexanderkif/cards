import { SyntheticEvent } from 'react';
import './MenuComponent.scss'
import menuIcon from '../../assets/line-3-svgrepo-com.svg'
import questionIcon from '../../assets/question-circle-svgrepo-com.svg'
import addIcon from '../../assets/plus-circle-svgrepo-com.svg'
import downloadIcon from '../../assets/cloud-download-svgrepo-com.svg'
import saveToFileIcon from '../../assets/cloud-arrow-up-svgrepo-com.svg'
import removeAllIcon from '../../assets/xmark-circle-svgrepo-com.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsOpen, toggleMenu } from '../../store/menuSlice';
import { selectIsExamples, toggleIsExamples } from '../../store/cardsSlice';

function MenuComponent() {
  const isOpen = useAppSelector(selectIsOpen);
  const isExamples = useAppSelector(selectIsExamples);
  const dispatch = useAppDispatch();
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(toggleMenu());
  };

  return (
    <div className="menu">
      <button className={isOpen ? "menuButton opened" : "menuButton"} onClick={handleClick}>
        <img src={menuIcon} className="menuIcon" alt="Menu" />
      </button>
      <div className={isOpen ? "drawer opened" : "drawer"}>
        <ul>
          <li onClick={() => dispatch(toggleIsExamples())}>
            <img src={questionIcon} className={isExamples ? "itemIcon green" :  "itemIcon"} alt="Show examples" />
            <span className="itemText">Show examples</span>
          </li>
          <li>
            <img src={addIcon} className="itemIcon" alt="Add new card" />
            <span className="itemText">Add new card</span>
          </li>
          <li>
            <img src={downloadIcon} className="itemIcon" alt="Download from file" />
            <span className="itemText">Download from file</span>
          </li>
          <li>
            <img src={saveToFileIcon} className="itemIcon" alt="Save to file" />
            <span className="itemText">Save to file</span>
          </li>
          <li>
            <img src={removeAllIcon} className="itemIcon" alt="Remove all cards" />
            <span className="itemText">Remove all cards</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MenuComponent
