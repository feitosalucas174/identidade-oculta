import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { FieldOption } from '../types';

interface DossierDropdownProps {
  id: string;
  label: string;
  options: FieldOption[];
  value: string;
  status?: 'ok' | 'err' | 'amb';
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}

export const DossierDropdown: React.FC<DossierDropdownProps> = ({
  id,
  label,
  options,
  value,
  status,
  onChange,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((o) => o.v === value);
  const isFilled = Boolean(value && selectedOption && selectedOption.v !== '');

  // Status border & background styling
  let statusBorder = 'border-[#2d303a] hover:border-[#444958] bg-[#181920]';
  let badgeColor = '';
  let badgeText = '';

  if (status === 'ok') {
    statusBorder = 'border-[#4CAF50] bg-[#0c1810] shadow-[0_0_10px_rgba(76,175,80,0.15)]';
    badgeColor = 'text-[#4CAF50] bg-[#4CAF50]/10 border-[#4CAF50]/30';
    badgeText = '✓ Confirmado';
  } else if (status === 'err') {
    statusBorder = 'border-[#E57373] bg-[#1e0e0e] shadow-[0_0_10px_rgba(229,115,115,0.15)]';
    badgeColor = 'text-[#E57373] bg-[#E57373]/10 border-[#E57373]/30';
    badgeText = '✗ Incorreto';
  } else if (status === 'amb') {
    statusBorder = 'border-[#FFB74D] bg-[#1a140b] shadow-[0_0_10px_rgba(255,183,77,0.15)]';
    badgeColor = 'text-[#FFB74D] bg-[#FFB74D]/10 border-[#FFB74D]/30';
    badgeText = '? Ambíguo';
  } else if (isFilled) {
    statusBorder = 'border-[#3d4252] bg-[#1a1c24] text-[#F2EAE0]';
  }

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-1.5">
      {/* Field Label Header */}
      <div className="flex items-center justify-between text-[11px] font-mono-retro uppercase tracking-[0.12em] text-[#9A9590] px-0.5">
        <label htmlFor={id} className="flex items-center gap-1.5 cursor-pointer">
          {icon}
          <span className="font-semibold text-[#b5b0a6]">{label}</span>
        </label>

        {badgeText && (
          <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono-retro font-bold ${badgeColor}`}>
            {badgeText}
          </span>
        )}
      </div>

      {/* Custom Dropdown Trigger */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-[9px] border text-left flex items-center justify-between gap-2.5 cursor-pointer transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] ${statusBorder}`}
      >
        <span
          className={`font-mono-retro text-[13px] sm:text-[14px] leading-snug break-words flex-1 ${
            isFilled ? 'text-[#F2EAE0] font-medium' : 'text-[#686c78] italic'
          }`}
        >
          {isFilled ? selectedOption?.l : '— Selecionar dedução —'}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-[#9A9590] flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#7DD5D8]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Overlay */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={`Opções para ${label}`}
          className="absolute left-0 top-[calc(100%+6px)] w-full max-h-[280px] overflow-y-auto bg-[#14151c] border-2 border-[#333847] rounded-[11px] shadow-[0_16px_40px_rgba(0,0,0,0.95)] p-1.5 z-[120] flex flex-col gap-1 animate-fadeIn"
        >
          {options.map((option) => {
            const isSelected = option.v === value;
            const isDefault = option.v === '';

            return (
              <button
                key={option.v}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.v);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2.5 rounded-[7px] font-mono-retro text-[13px] leading-snug text-left flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#7DD5D8]/15 text-[#7DD5D8] font-bold border border-[#7DD5D8]/30'
                    : isDefault
                    ? 'text-[#686c78] italic hover:bg-[#1f222b] hover:text-[#9A9590]'
                    : 'text-[#d6d2c8] hover:bg-[#222530] hover:text-[#FFFFFF]'
                }`}
              >
                <span className="flex-1 break-words">{option.l}</span>
                {isSelected && <Check className="w-4 h-4 text-[#7DD5D8] flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
