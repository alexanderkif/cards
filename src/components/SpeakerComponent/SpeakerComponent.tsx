import './SpeakerComponent.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import SVGIcon from '../Icons/SVGIcons';
import { SVGIcons } from '@/types/types';

const UTTER_DEFAULT_LANG = 'en-US';
const UTTER_SLOW_RATE = 0.5;
const UTTER_HI_RATE = 1;
const DELAY_DOUBLE_CLICK = 300;

function SpeakerComponent({
  text,
  size = '4vmin',
}: {
  text: string;
  size?: string;
}) {
  const timePassed = useRef(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const synth = speechSynthesis;
  let voices = synth.getVoices();
  const utter = new SpeechSynthesisUtterance();
  let isUtterRateHi = true;

  useEffect(() => {
    if (voices.length === 0) {
      initVoice();
    }
  }, []);

  function initVoice() {
    voices = synth.getVoices();
    setVoice(getDefaultVoice());
  }

  const say = (): void => {
    utter.rate = isUtterRateHi ? UTTER_HI_RATE : UTTER_SLOW_RATE;
    isUtterRateHi = !isUtterRateHi;
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    }
    utter.text = text;
    synth.speak(utter);
  };

  const myDoubleClickCallback = (e: SyntheticEvent & { detail: number }) => {
    e.stopPropagation();
    if (e.detail === 1) {
      setTimeout(() => {
        if (Date.now() - timePassed.current >= DELAY_DOUBLE_CLICK) {
          say();
        }
      }, DELAY_DOUBLE_CLICK);
    }

    if (e.detail === 2) {
      timePassed.current = Date.now();
      setIsDialogOpen(true);
    }
  };

  const setDefaultVoice = (name: string) => {
    const voice = voices.find((v) => v.name === name);
    if (voice) {
      setVoice(voice);
      localStorage.setItem('voiceName', name);
    }
    setIsDialogOpen(false);
  };

  const getVoicesOptions = () => {
    return voices.map((voice) => (
      <option value={voice.name} key={voice.lang + voice.name}>
        {voice.name}
      </option>
    ));
  };

  function getDefaultVoice(): SpeechSynthesisVoice | null {
    return (
      voices.find((v) => v.name === localStorage.getItem('voiceName')) ||
      voices.filter((v) => v.lang === UTTER_DEFAULT_LANG)[0] ||
      null
    );
  }

  function clickWrapper(e: SyntheticEvent) {
    setIsDialogOpen(false);
    e.stopPropagation();
  }

  return (
    <div className="speakerComponent" onClick={(e) => myDoubleClickCallback(e)}>
      <SVGIcon name={SVGIcons.speaker} svgClass={`itemIcon`} size={size} />
      {isDialogOpen && (
        <div className="dialogWrapper z-2" onClick={clickWrapper}>
          <div className="dialog">
            <select
              name="lang"
              id="lang"
              value={voice?.name}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setDefaultVoice(e.target.value)}
            >
              {getVoicesOptions()}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpeakerComponent;
