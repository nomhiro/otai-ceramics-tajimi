/**
 * GSAP グローバル型定義
 * ScrollTrigger を含む GSAP の Window 拡張
 */
import type { gsap as GSAPType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    gsap: typeof GSAPType;
    ScrollTrigger: typeof ScrollTriggerType;
  }
}

export {};
