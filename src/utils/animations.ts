/**
 * GSAP アニメーションユーティリティ
 * 小田井窯ウェブサイト - 和モダンデザイン
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// プラグイン登録（ブラウザ環境のみ）
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ユーザーが動きの軽減を希望しているかチェック
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * モバイルデバイスかどうかチェック
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * デフォルトのイージング設定
 */
export const easing = {
  smooth: 'power2.out',
  dramatic: 'power3.out',
  bounce: 'back.out(1.2)',
  linear: 'none',
  gentle: 'sine.inOut',
} as const;

/**
 * デフォルトの ScrollTrigger 設定
 */
export const defaultScrollTrigger = {
  start: 'top 85%',
  toggleActions: 'play none none reverse',
};

/**
 * モバイル向け ScrollTrigger 設定
 */
export const mobileScrollTrigger = {
  start: 'top 90%',
  toggleActions: 'play none none none',
};

/**
 * 適切な ScrollTrigger 設定を取得
 */
export const getScrollTriggerDefaults = () => {
  return isMobile() ? mobileScrollTrigger : defaultScrollTrigger;
};

// GSAP と ScrollTrigger をエクスポート
export { gsap, ScrollTrigger };
