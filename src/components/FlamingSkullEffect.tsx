import React, { useEffect, useState, useRef } from 'react';

export type TimelineAnimationType = 'skull' | 'vhs' | 'claquete';

interface FlamingSkullEffectProps {
  triggerSignal: number;
  animationType?: TimelineAnimationType;
}

export const FlamingSkullEffect: React.FC<FlamingSkullEffectProps> = ({
  triggerSignal,
  animationType = 'skull',
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentType, setCurrentType] = useState<TimelineAnimationType>('skull');
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

  const isSkull = currentType === 'skull';
  const isVhs = currentType === 'vhs';

  return (
    <div
      key={animKey}
      className="fixed inset-0 z-[2500] pointer-events-none flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="animate-skullPopup flex flex-col items-center">
        <div
          className={
            isSkull
              ? 'sprite-skull'
              : isVhs
              ? 'sprite-vhs'
              : 'sprite-claquete'
          }
        />

        <div
          className={`mt-2 font-mono-retro text-[11px] sm:text-[12px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md select-none transition-all ${
            isSkull
              ? 'text-[#ff8833] bg-black/85 border border-[#ff5500]/50 shadow-[0_0_20px_rgba(255,85,0,0.4)]'
              : isVhs
              ? 'text-[#00e5ff] bg-black/85 border border-[#00e5ff]/50 shadow-[0_0_20px_rgba(0,229,255,0.4)]'
              : 'text-[#ffd700] bg-black/85 border border-[#ffd700]/50 shadow-[0_0_20px_rgba(255,215,0,0.45)]'
          }`}
        >
          {isSkull && '+ Pista adicionada à linha do tempo'}
          {isVhs && '+ Fita sincronizada na sequência'}
          {currentType === 'claquete' && '+ Claquete registrada na tomada'}
        </div>
      </div>
    </div>
  );
};
