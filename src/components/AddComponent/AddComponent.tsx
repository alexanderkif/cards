import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import './AddComponent.scss';
import { Card, Routes } from '@/types/types';
import {
  addCard,
  editCard,
  emptyCard,
  selectCardIndex,
  selectCards,
  selectCurrentGroup,
} from '@/store/cardsSlice';
import { setPage } from '@/store/menuSlice';

enum Fields {
  head = 'head',
  tail1 = 'tail1',
  tail2 = 'tail2',
  example1 = 'example1',
  example2 = 'example2',
}

const WORD_LENGTH = 60;
const EXAMPLE_LENGTH = 120;

function AddComponent({ edit = false }: { edit: boolean }) {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const cardIndex = useAppSelector(selectCardIndex);
  const currentGroup = useAppSelector(selectCurrentGroup);

  const [card, setCard] = useState(emptyCard);

  useEffect(() => {
    if (cards.length > 0) {
      setCard(
        JSON.parse(
          JSON.stringify(
            edit && cardIndex > -1 ? cards[cardIndex || 0] : emptyCard
          )
        )
      );
    }
  }, [cardIndex, cards, edit]);

  const changeInput = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedCard: Card = JSON.parse(JSON.stringify(card));

    switch (name) {
      case Fields.head:
        updatedCard.head = value;
        break;
      case Fields.tail1:
        updatedCard.tails[0] = value;
        break;
      case Fields.tail2:
        updatedCard.tails[1] = value;
        break;
      case Fields.example1:
        updatedCard.examples[0] = value;
        break;
      case Fields.example2:
        updatedCard.examples[1] = value;
        break;

      default:
        break;
    }

    setCard(updatedCard);
  };

  const submitInputs = () => {
    const newCard: Card = {
      head: card.head.trim(),
      tails: card.tails.map((t) => t && t.trim()).filter((t) => !!t),
      examples: card.examples.map((e) => e && e.trim()).filter((e) => !!e),
    };
    if (edit) {
      dispatch(editCard({ card: newCard, cardIndex }));
      dispatch(setPage(Routes.card));
    } else {
      dispatch(addCard(newCard));
      setCard(emptyCard);
    }
  };

  return (
    <div className="addComponent">
      <div className="fields">
        <div className="groupName">{currentGroup}</div>
        <input
          type="text"
          name={Fields.head}
          value={card.head || ''}
          onInput={changeInput}
          placeholder="Expression"
          required
          maxLength={WORD_LENGTH}
        />
        <input
          type="text"
          name={Fields.tail1}
          value={card.tails[0] || ''}
          onInput={changeInput}
          placeholder="Explanation 1"
          required
          maxLength={WORD_LENGTH}
        />
        <input
          type="text"
          name={Fields.tail2}
          value={card.tails[1] || ''}
          onInput={changeInput}
          placeholder="Explanation 2"
          maxLength={WORD_LENGTH}
        />
        <input
          type="text"
          className="example"
          name={Fields.example1}
          value={card.examples[0] || ''}
          onInput={changeInput}
          placeholder="Example 1"
          maxLength={EXAMPLE_LENGTH}
        />
        <input
          type="text"
          className="example"
          name={Fields.example2}
          value={card.examples[1] || ''}
          onInput={changeInput}
          placeholder="Example 2"
          maxLength={EXAMPLE_LENGTH}
        />
        <div className="buttons">
          <button
            disabled={!card.head || !card.tails[0]}
            onClick={submitInputs}
          >
            {edit ? 'Save card' : 'Add card'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddComponent;
