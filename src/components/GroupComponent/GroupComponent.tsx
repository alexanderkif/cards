import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import './GroupComponent.scss';
import { Group } from '@/types/types';
import {
  editGroupName,
  removeGroup,
  saveGroup,
  selectCurrentGroup,
  selectGroups,
  setCardIndex,
  setCurrentGroup,
} from '@/store/cardsSlice';
import ClayIcon from '../Icons/ClayIcon';
import { Check, Share2, Edit, Trash2 } from 'lucide-react';
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
    setGroupNameInput(value.toString().trim());
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
      const groupsFiltered = groups.filter((g) => g.name !== currentGroup);
      if (groupsFiltered.length) {
        dispatch(setCurrentGroup(groupsFiltered[0].name));
      } else {
        dispatch(setCurrentGroup(''));
      }
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
            placeholder="Group Name (min length is 5)"
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
                  <ClayIcon
                    icon={Check}
                    className="active"
                    tooltip="Active group"
                    tooltipPosition="right"
                  />
                </span>
                <span className="groupName" onClick={() => clickChooseGroup(g)}>
                  {g.name}
                </span>
                <span onClick={() => handleShareGroup(g.name)}>
                  <ClayIcon icon={Share2} tooltip="Share group" />
                </span>
                <span onClick={() => clickEditGroup(g)}>
                  <ClayIcon icon={Edit} tooltip="Rename group" />
                </span>
                <span onClick={() => deleteGroup(g)}>
                  <ClayIcon
                    icon={Trash2}
                    className="negative"
                    tooltip="Delete group"
                    tooltipPosition="left"
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
