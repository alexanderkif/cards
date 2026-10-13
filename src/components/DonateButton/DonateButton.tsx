import './DonateButton.scss';
import { RefObject, useEffect, useRef } from 'react';
import { loadPayPalSdk } from '@/utils/paypal';

const donateBtnID = '#donate-button';

export default function DonateButton({
  clickFnRef,
}: {
  clickFnRef: RefObject<() => void>;
}) {
  const donateElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    clickFnRef.current = () => {
      const buttonEl = donateElement.current?.querySelector('img');
      if (buttonEl) buttonEl.click();
    };
  }, [clickFnRef]);

  useEffect(() => {
    const el = donateElement.current;
    let cancelled = false;
    loadPayPalSdk()
      .then(() => {
        if (cancelled || !window.PayPal?.Donation) return;
        window.PayPal.Donation.Button({
          env: 'production',
          hosted_button_id: 'CR3J4TSGQ8GFG',
          image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
            alt: 'Donate with PayPal button',
            title: 'PayPal - The safer, easier way to pay online!',
          },
        }).render(donateBtnID);
      })
      .catch(() => {
        // SDK unavailable (blocked/offline); the donate item stays empty.
      });
    return () => {
      cancelled = true;
      if (el) el.innerHTML = '';
    };
  }, []);

  return (
    <div id="donate-button-container" className="donateButton">
      <div id="donate-button" ref={donateElement}></div>
    </div>
  );
}
