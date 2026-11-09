import { useEffect } from 'react';

let activeLockCount = 0;
let originalScrollY = 0;
let originalBodyStyles: {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
} | null = null;
let originalHtmlOverflow = '';

export function useScrollLock(isLocked: boolean = true) {
  useEffect(() => {
    if (!isLocked) return;

    if (activeLockCount === 0) {
      originalScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const body = document.body;
      const html = document.documentElement;

      originalBodyStyles = {
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        right: body.style.right,
        width: body.style.width,
        overflow: body.style.overflow,
      };
      originalHtmlOverflow = html.style.overflow;

      body.style.position = 'fixed';
      body.style.top = `-${originalScrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';

      html.style.overflow = 'hidden';
    }

    activeLockCount++;

    return () => {
      activeLockCount--;
      if (activeLockCount <= 0) {
        activeLockCount = 0;
        const body = document.body;
        const html = document.documentElement;

        if (originalBodyStyles) {
          body.style.position = originalBodyStyles.position;
          body.style.top = originalBodyStyles.top;
          body.style.left = originalBodyStyles.left;
          body.style.right = originalBodyStyles.right;
          body.style.width = originalBodyStyles.width;
          body.style.overflow = originalBodyStyles.overflow;
          originalBodyStyles = null;
        } else {
          body.style.position = '';
          body.style.top = '';
          body.style.left = '';
          body.style.right = '';
          body.style.width = '';
          body.style.overflow = '';
        }

        html.style.overflow = originalHtmlOverflow;
        window.scrollTo(0, originalScrollY);
      }
    };
  }, [isLocked]);
}
