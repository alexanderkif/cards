import { SyntheticEvent } from 'react';
import './MenuComponent.scss'
import menuIcon from '../../assets/menu-svgrepo-com.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsOpen, toggleMenu } from '../../store/menuSlice';

function MenuComponent() {
  // const [open, setOpen] = useState(false)
  const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(toggleMenu());
  };

  return (
    <>
      <div className="menu">
        <button className={isOpen ? "menuButton opened" : "menuButton"} onClick={handleClick}>
          <img src={menuIcon} className="menuIcon" alt="Menu" />
        </button>
        <div className={isOpen ? "drawer opened" : "drawer"}>
          <ul>
            <li>show examples</li>
            <li>add item</li>
            <li>export items</li>
            <li>import items</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default MenuComponent
