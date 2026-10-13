import './SpeakerComponent.scss';
import { useEffect, useRef, useState } from 'react';
import { iconMap } from '../Icons/iconMapping';
import ClayIcon from '../Icons/ClayIcon';

const UTTER_SLOW_RATE = 0.6;
const UTTER_HI_RATE = 1;
const DELAY_DOUBLE_CLICK = 300;

function SpeakerComponent({
  text,
  className: className = '',
  voiceId = 'default',
}: {
  text: string;
  className?: string;
  voiceId?: string;
}) {
  const isRateHi = useRef(true);
  const clickTimer = useRef<number | null>(null);
  const currentUtterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textRef = useRef(text);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const selectedVoiceNameRef = useRef<string | null>(
    localStorage.getItem(`voiceName_${voiceId}`)
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string | null>(
    localStorage.getItem(`voiceName_${voiceId}`)
  );

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    voicesRef.current = voices;
  }, [voices]);

  useEffect(() => {
    selectedVoiceNameRef.current = selectedVoiceName;
  }, [selectedVoiceName]);

  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') return;
    const updateVoices = () => setVoices(speechSynthesis.getVoices());
    updateVoices();
    speechSynthesis.addEventListener('voiceschanged', updateVoices);
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDialogOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Останавливаем речь при размонтировании.
  useEffect(() => {
    return () => {
      if (currentUtterRef.current && typeof speechSynthesis !== 'undefined') {
        speechSynthesis.cancel();
      }
      if (clickTimer.current !== null) window.clearTimeout(clickTimer.current);
    };
  }, []);

  const clearClickTimer = () => {
    if (clickTimer.current !== null) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
  };

  const stopSpeaking = () => {
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
    currentUtterRef.current = null;
    setIsSpeaking(false);
  };

  const startSpeaking = () => {
    if (typeof speechSynthesis === 'undefined') return;
    const voice = voicesRef.current.find(
      (v) => v.name === selectedVoiceNameRef.current
    );
    if (!voice) {
      setIsDialogOpen(true);
      return;
    }
    // На всякий случай сбрасываем предыдущее.
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance();
    currentUtterRef.current = utter;
    utter.rate = isRateHi.current ? UTTER_HI_RATE : UTTER_SLOW_RATE;
    isRateHi.current = !isRateHi.current;
    utter.voice = voice;
    utter.lang = voice.lang;
    const pattern = /<sup>|<\/sup>|<sub>|<\/sub>|<b>|<\/b>|<i>|<\/i>|<br>/gi;
    utter.text = textRef.current.replaceAll(pattern, '');
    const handleEnd = () => {
      if (currentUtterRef.current === utter) {
        currentUtterRef.current = null;
        setIsSpeaking(false);
      }
    };
    utter.onend = handleEnd;
    utter.onerror = handleEnd;
    setIsSpeaking(true);
    speechSynthesis.speak(utter);
  };

  const currentVoice = voices.find((v) => v.name === selectedVoiceName) || null;

  const onSpeakerClick = () => {
    // Если что-то играет — останавливаем немедленно и сбрасываем таймер.
    if (isSpeaking || currentUtterRef.current) {
      clearClickTimer();
      stopSpeaking();
      return;
    }

    // Если уже стоит таймер ожидания (первый клик из возможного двойного) —
    // значит это второй клик: отменяем запуск и открываем диалог.
    if (clickTimer.current !== null) {
      clearClickTimer();
      setIsDialogOpen(true);
      return;
    }

    // Первый клик — ждём, не будет ли второго.
    clickTimer.current = window.setTimeout(() => {
      clickTimer.current = null;
      startSpeaking();
    }, DELAY_DOUBLE_CLICK);
  };

  const saveVoiceToLocalStorage = (name: string) => {
    localStorage.setItem(`voiceName_${voiceId}`, name);
    setSelectedVoiceName(name);
    setIsDialogOpen(false);
  };

  return (
    <div className={'speakerComponent' + (className ? ` ${className}` : '')}>
      <span
        onClick={onSpeakerClick}
        className="actionButton"
        role="button"
        aria-label={isSpeaking ? 'Stop' : 'Text to speech'}
        tabIndex={0}
      >
        <ClayIcon
          icon={isSpeaking ? iconMap.stop : iconMap.play}
          className={isSpeaking ? 'danger' : 'success'}
        />
      </span>
      {isDialogOpen && (
        <div
          className="dialogWrapper z-2"
          onClick={() => setIsDialogOpen(false)}
        >
          <div className="dialog">
            <div className="dialogLabel">
              Select language. Double click on the speaker icon to choose
              another language.
            </div>
            <div
              className="voices-list"
              role="listbox"
              aria-label="Select voice"
            >
              {voices.map((voice) => (
                <div
                  key={voice.lang + voice.name}
                  className={`voice-option ${
                    currentVoice?.name === voice.name ? 'active' : ''
                  }`}
                  onClick={() => saveVoiceToLocalStorage(voice.name)}
                  role="option"
                  aria-selected={currentVoice?.name === voice.name}
                  tabIndex={0}
                >
                  {voice.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpeakerComponent;
