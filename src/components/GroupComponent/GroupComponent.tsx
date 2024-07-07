import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import './GroupComponent.scss';
import { Group, SVGIcons } from '@/types/types';
import {
  editGroupName,
  removeGroup,
  saveGroup,
  selectCurrentGroup,
  selectGroups,
  setCardIndex,
  setCurrentGroup,
} from '@/store/cardsSlice';
import SVGIcon from '../Icons/SVGIcons';
import { createCompressedURL } from '@/utils/compress';
import { useDialog } from '@/hooks/hooks';

const NAME_LENGTH = 60;
const MIN_LENGTH = 5;

function GroupComponent() {
  const inputElement = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const currentGroup = useAppSelector(selectCurrentGroup);
  const groups = useAppSelector(selectGroups);
  const { confirm } = useDialog();

  const [groupNameInput, setGroupNameInput] = useState('');
  const [isEditGroup, setIsEditGroup] = useState(false);

  const changeInput = (e: FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    setGroupNameInput(value.trim());
  };

  const submitInputs = () => {
    if (isEditGroup) {
      dispatch(editGroupName(groupNameInput));
      dispatch(setCurrentGroup(groupNameInput));
    } else {
      const newGroup: Group = { name: groupNameInput, cards: [] };
      dispatch(saveGroup(newGroup));
    }
    handleCancel();
  };

  const clickChooseGroup = (group: Group) => {
    dispatch(setCardIndex(0));
    dispatch(setCurrentGroup(group.name));
  };

  const clickEditGroup = (group: Group) => {
    dispatch(setCurrentGroup(group.name));
    setIsEditGroup(true);
    setGroupNameInput(group.name);
  };

  const handleCancel = () => {
    setIsEditGroup(false);
    setGroupNameInput('');
  };

  const deleteGroup = async (group: Group) => {
    const confirmation = await confirm('Current group will be removed.');
    if (!confirmation) {
      return;
    }
    handleCancel();
    if (group.name === currentGroup) {
      dispatch(setCurrentGroup(groups[0].name));
    }
    dispatch(removeGroup(group.name));
  };

  const handleShareGroup = async (groupName: string) => {
    const groupToSend = groups.find((g) => g.name === groupName);
    if (groupToSend) {
      const message = await createCompressedURL(groupToSend);
      await confirm(message, false);
    }
  };

  return (
    <div className="groupComponent">
      <div className="fields">
        <div className="groupRow">
          <input
            ref={inputElement}
            type="text"
            value={groupNameInput}
            onChange={changeInput}
            placeholder="Group Name (min length 5)"
            required
            minLength={MIN_LENGTH}
            maxLength={NAME_LENGTH}
          />
        </div>
        <div className="groupRow">
          <button
            disabled={
              !groupNameInput ||
              groupNameInput.length < MIN_LENGTH ||
              groups
                .map((g) => g.name.toLowerCase())
                .indexOf(groupNameInput.toLowerCase()) > -1
            }
            onClick={submitInputs}
          >
            {isEditGroup ? 'Rename' : 'Add group'}
          </button>
          {isEditGroup && <button onClick={handleCancel}>Cancel</button>}
        </div>
        <div className="groups">
          <ul>
            {groups.map((g) => (
              <li
                key={g.name}
                className={g.name === currentGroup ? 'active' : ''}
              >
                <span className={g.name === currentGroup ? '' : 'hidden'}>
                  <SVGIcon
                    name={SVGIcons.check}
                    svgClass="active"
                    size="5vmin"
                    tooltip="Active group"
                    tooltipClass="svgTooltip-right"
                  />
                </span>
                <span className="groupName" onClick={() => clickChooseGroup(g)}>
                  {g.name}
                </span>
                <span onClick={() => handleShareGroup(g.name)}>
                  <SVGIcon
                    name={SVGIcons.share}
                    size="5vmin"
                    tooltip="Share group"
                  />
                </span>
                <span onClick={() => clickEditGroup(g)}>
                  <SVGIcon
                    name={SVGIcons.edit}
                    size="5vmin"
                    tooltip="Rename group"
                  />
                </span>
                <span onClick={() => deleteGroup(g)}>
                  <SVGIcon
                    name={SVGIcons.trash}
                    svgClass="negative"
                    size="5vmin"
                    tooltip="Delete group"
                    tooltipClass="svgTooltip-left"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GroupComponent;
