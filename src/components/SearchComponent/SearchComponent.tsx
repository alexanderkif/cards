import { FormEvent, useState } from 'react'
import './SearchComponent.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectCards, setCardIndex } from '@/store/cardsSlice'
import { Card, Routes } from '@/types/types'
import { setPage } from '@/store/menuSlice'

const SEARCH_LENGTH = 30
const SEARCH_LENGTH_MIN = 2

function SearchComponent() {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(selectCards)
  const [searchString, setSearchString] = useState('')
  const searchValue = (e: FormEvent) => {
    const { value } = e.target as HTMLInputElement
    setSearchString(value)
  }
  const setCurrentCard = (card: Card) => {
    dispatch(setCardIndex(cards.indexOf(card)))
    dispatch(setPage(Routes.card))
  }
  const getResults = () => {
    if (searchString.length < SEARCH_LENGTH_MIN) {
      return <></>
    }
    return cards
      .filter((card) =>
        String(card.head + card.tails)
          .toLowerCase()
          .includes(searchString.toLowerCase())
      )
      .map((card) => (
        <li key={card.head + card.tails} onClick={() => setCurrentCard(card)}>
          {card.head + ' * ' + card.tails.join(' * ')}
        </li>
      ))
  }

  return (
    <div className="searchComponent">
      <div className="fields">
        <input
          type="text"
          value={searchString || ''}
          onInput={searchValue}
          placeholder="Start type here"
          maxLength={SEARCH_LENGTH}
          minLength={SEARCH_LENGTH_MIN}
        />
        <div className="results">
          <ul>{getResults()}</ul>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent
