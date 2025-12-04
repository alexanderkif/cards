import './SpeakerComponent.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { iconMap } from '../Icons/iconMapping';
import ClayIcon from '../Icons/ClayIcon';

const UTTER_SLOW_RATE = 0.7;
const UTTER_HI_RATE = 1;
const DELAY_DOUBLE_CLICK = 300;

function SpeakerComponent({
  text,
  className: className = '',
}: {
  text: string;
  className?: string;
}) {
  const timePassed = useRef(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const synth = speechSynthesis;
  const utter = new SpeechSynthesisUtterance();
  let isUtterRateHi = true;

  useEffect(() => {
    if (voices?.length === 0) {
      setVoices(synth.getVoices());
      return;
    }
  }, [synth, voices]);

  const say = (): void => {
    utter.rate = isUtterRateHi ? UTTER_HI_RATE : UTTER_SLOW_RATE;
    isUtterRateHi = !isUtterRateHi;
    const voice = getVoiceByLocalStorageVoiceName();
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
      const pattern = /<sup>|<\/sup>|<sub>|<\/sub>|<b>|<\/b>|<i>|<\/i>|<br>/gi;
      utter.text = text.replaceAll(pattern, '');
      synth.speak(utter);
    }
  };

  const myDoubleClickCallback = (e: SyntheticEvent & { detail: number }) => {
    e.stopPropagation();
    if (e.detail === 1) {
      const voice = getVoiceByLocalStorageVoiceName();
      setTimeout(() => {
        if (Date.now() - timePassed.current >= DELAY_DOUBLE_CLICK) {
          if (voice) {
            say();
          } else {
            setIsDialogOpen(true);
          }
        }
      }, DELAY_DOUBLE_CLICK);
    }

    if (e.detail === 2) {
      timePassed.current = Date.now();
      setIsDialogOpen(true);
    }
  };

  const saveVoiceToLocalStorage = (name: string) => {
    const voice = voices.find((v) => v.name === name);
    if (voice) {
      localStorage.setItem('voiceName', name);
    }
    setIsDialogOpen(false);
  };

  const getVoicesOptions = () => {
    if (voices.length === 0) {
      setVoices(synth.getVoices());
    }
    const currentVoice = getVoiceByLocalStorageVoiceName();
    return voices.map((voice) => (
      <div
        key={voice.lang + voice.name}
        className={`voice-option ${currentVoice?.name === voice.name ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          saveVoiceToLocalStorage(voice.name);
        }}
      >
        {voice.name}
      </div>
    ));
  };

  function getVoiceByLocalStorageVoiceName() {
    return (
      voices.find((v) => v.name === localStorage.getItem('voiceName')) || null
    );
  }

  function clickWrapper(e: SyntheticEvent) {
    setIsDialogOpen(false);
    e.stopPropagation();
  }

  return (
    <div className={'speakerComponent' + (className ? ` ${className}` : '')}>
      <span onClick={(e) => myDoubleClickCallback(e)} className="actionButton">
        <ClayIcon icon={iconMap.speaker} />
      </span>
      {isDialogOpen && (
        <div className="dialogWrapper z-2" onClick={clickWrapper}>
          <div
            className="dialog"
            onTouchMove={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <div className="dialogLabel">
              Select language. Double click on the speaker icon to choose
              another language.
            </div>
            <div className="voices-list">{getVoicesOptions()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpeakerComponent;
