import './DonateButton.scss'
import { MutableRefObject, useEffect, useRef } from 'react'

const donateBtnID = '#donate-button'

export default function DonateButton({
  clickFn,
}: {
  clickFn: MutableRefObject<() => void>
}) {
  const donateElement = useRef(null)

  useEffect(() => {
    clickFn.current = () => {
      const el = donateElement.current as unknown as HTMLElement
      const buttonEl = el.querySelector('img')
      if (buttonEl) buttonEl.click()
    }
  }, [clickFn.current])

  useEffect(() => {
    PayPal.Donation.Button({
      env: 'production',
      hosted_button_id: 'CR3J4TSGQ8GFG',
      image: {
        src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
        alt: 'Donate with PayPal button',
        title: 'PayPal - The safer, easier way to pay online!',
      },
    }).render(donateBtnID)
    return () => {
      const el = donateElement.current as unknown as HTMLElement
      if (el) el.innerHTML = ''
    }
  }, [])

  return (
    <div id="donate-button-container" className="donateButton">
      <div id="donate-button" ref={donateElement}></div>
    </div>
  )
}
