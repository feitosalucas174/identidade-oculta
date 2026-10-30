import React, { useEffect, useState, useRef } from 'react';

export type TimelineAnimationType = 'vhs' | 'claquete' | 'revolver';

interface FlamingSkullEffectProps {
  triggerSignal: number;
  animationType?: TimelineAnimationType;
}

export const FlamingSkullEffect: React.FC<FlamingSkullEffectProps> = ({
  triggerSignal,
  animationType = 'vhs',
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentType, setCurrentType] = useState<TimelineAnimationType>('vhs');
  const [animKey, setAnimKey] = useState(0);
  const prevSignalRef = useRef(triggerSignal);

  useEffect(() => {
    if (triggerSignal > 0 && triggerSignal !== prevSignalRef.current) {
      prevSignalRef.current = triggerSignal;
      setCurrentType(animationType);
      setIsActive(true);
      setAnimKey(prev => prev + 1);

      const timer = setTimeout(() => {
        setIsActive(false);
      }, 2300);

      return () => clearTimeout(timer);
    }
  }, [triggerSignal, animationType]);

  if (!isActive) return null;

  const isVhs = currentType === 'vhs';
  const isClaquete = currentType === 'claquete';

  return (
    <div
      key={animKey}
      className="fixed inset-0 z-[2500] pointer-events-none flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="animate-skullPopup flex flex-col items-center">
        <div
          className={
            isVhs
              ? 'sprite-vhs'
              : isClaquete
              ? 'sprite-claquete'
              : 'sprite-revolver'
          }
        />

        <div
          className={`mt-2 font-mono-retro text-[11px] sm:text-[12px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md select-none transition-all ${
            isVhs
              ? 'text-[#00e5ff] bg-black/85 border border-[#00e5ff]/50 shadow-[0_0_20px_rgba(0,229,255,0.4)]'
              : isClaquete
              ? 'text-[#ffd700] bg-black/85 border border-[#ffd700]/50 shadow-[0_0_20px_rgba(255,215,0,0.45)]'
              : 'text-[#ff4455] bg-black/85 border border-[#ff2244]/50 shadow-[0_0_20px_rgba(255,34,68,0.5)]'
          }`}
        >
          {isVhs && '+ Fita sincronizada na sequência'}
          {isClaquete && '+ Claquete registrada na tomada'}
          {currentType === 'revolver' && '+ Arma de fogo apreendida na cena'}
        </div>
      </div>
    </div>
  );
};
