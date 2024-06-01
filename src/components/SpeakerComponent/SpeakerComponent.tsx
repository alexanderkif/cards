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
  size = '3vmin',
}: {
  text: string;
  size?: string;
}) {
  const timePassed = useRef(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const synth = speechSynthesis;
  const utter = new SpeechSynthesisUtterance();
  let isUtterRateHi = true;

  useEffect(() => {
    setVoices(synth.getVoices());
  }, [synth]);

  const say = (): void => {
    utter.rate = isUtterRateHi ? UTTER_HI_RATE : UTTER_SLOW_RATE;
    isUtterRateHi = !isUtterRateHi;
    getDefaultVoice();
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    }
    const pattern = /<sup>|<\/sup>|<sub>|<\/sub>|<b>|<\/b>|<i>|<\/i>|<br>/gi;
    utter.text = text.replaceAll(pattern, '');
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
      localStorage.setItem('voiceName', name);
    }
    setIsDialogOpen(false);
  };

  const getVoicesOptions = () => {
    if (voices.length === 0) {
      setVoices(synth.getVoices());
    }
    return voices.map((voice) => (
      <option value={voice.name} key={voice.lang + voice.name}>
        {voice.name}
      </option>
    ));
  };

  function getDefaultVoice() {
    if (voices?.length === 0) {
      return;
    }
    setVoice(
      voices.find((v) => v.name === localStorage.getItem('voiceName')) ||
        voices.filter((v) => v.lang === UTTER_DEFAULT_LANG)[0]
    );
  }

  setTimeout(() => {
    getDefaultVoice();
  });

  function clickWrapper(e: SyntheticEvent) {
    setIsDialogOpen(false);
    e.stopPropagation();
  }

  return (
    <div className="speakerComponent" onClick={(e) => myDoubleClickCallback(e)}>
      <SVGIcon
        name={SVGIcons.speaker}
        svgClass={`itemIcon active speakerIcon`}
        size={size}
        tooltip="Double click to select language"
      />
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
