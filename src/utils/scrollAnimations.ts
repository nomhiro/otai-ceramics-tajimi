/**
 * スクロールアニメーションユーティリティ
 * 小田井窯ウェブサイト - 和モダンデザイン
 */
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  easing,
  getScrollTriggerDefaults,
} from './animations';

/**
 * フェードアップアニメーション（スクロール時）
 * セクションコンテンツの表示に使用
 */
export function fadeInOnScroll(
  selector: string | Element,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  } = {}
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  const { y = 40, duration = 0.8, delay = 0, start } = options;
  const defaults = getScrollTriggerDefaults();

  return gsap.from(selector, {
    y,
    opacity: 0,
    duration,
    delay,
    ease: easing.smooth,
    scrollTrigger: {
      trigger: selector,
      start: start || defaults.start,
      toggleActions: defaults.toggleActions,
    },
  });
}

/**
 * スタッガードグリッドアニメーション
 * 商品カードなどのグリッド表示に使用
 */
export function staggerGridReveal(
  containerSelector: string,
  itemSelector: string,
  options: {
    stagger?: number;
    y?: number;
    duration?: number;
    start?: string;
  } = {}
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  const { stagger = 0.1, y = 60, duration = 0.6, start } = options;
  const defaults = getScrollTriggerDefaults();

  const container = document.querySelector(containerSelector);
  if (!container) return null;

  const items = container.querySelectorAll(itemSelector);
  if (items.length === 0) return null;

  return gsap.from(items, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: easing.smooth,
    scrollTrigger: {
      trigger: container,
      start: start || defaults.start,
      toggleActions: defaults.toggleActions,
    },
  });
}

/**
 * パララックス背景効果
 * 背景要素に深みを与える
 */
export function parallaxBackground(
  selector: string | Element,
  options: {
    yPercent?: number;
    scrub?: number | boolean;
    start?: string;
    end?: string;
  } = {}
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  const {
    yPercent = 30,
    scrub = true,
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  return gsap.to(selector, {
    yPercent,
    ease: easing.linear,
    scrollTrigger: {
      trigger: selector,
      start,
      end,
      scrub,
    },
  });
}

/**
 * ヒーローセクションアニメーション
 * タイトル → サブタイトル → CTA の順次表示
 */
export function heroAnimation(
  titleSelector: string,
  subtitleSelector?: string,
  ctaSelector?: string
): gsap.core.Timeline | null {
  if (prefersReducedMotion()) return null;

  const tl = gsap.timeline({ defaults: { ease: easing.dramatic } });

  tl.from(titleSelector, {
    y: 60,
    opacity: 0,
    duration: 1,
  });

  if (subtitleSelector) {
    tl.from(
      subtitleSelector,
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.6'
    );
  }

  if (ctaSelector) {
    tl.from(
      ctaSelector,
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      },
      '-=0.4'
    );
  }

  return tl;
}

/**
 * セクションタイムラインアニメーション
 * スクロールトリガー付きの複数要素アニメーション
 */
export function sectionTimeline(
  triggerSelector: string,
  animations: Array<{
    selector: string;
    from: gsap.TweenVars;
    position?: string;
  }>,
  options: {
    start?: string;
  } = {}
): gsap.core.Timeline | null {
  if (prefersReducedMotion()) return null;

  const defaults = getScrollTriggerDefaults();
  const { start } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerSelector,
      start: start || defaults.start,
      toggleActions: defaults.toggleActions,
    },
  });

  animations.forEach(({ selector, from, position }) => {
    tl.from(selector, { ...from, ease: easing.smooth }, position);
  });

  return tl;
}

/**
 * 4要素セクション特殊アニメーション（About ページ用）
 * バウンスエフェクト付きで各要素を表示
 */
export function elementsReveal(
  containerSelector: string,
  itemSelector: string
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  const container = document.querySelector(containerSelector);
  if (!container) return null;

  const items = container.querySelectorAll(itemSelector);
  if (items.length === 0) return null;

  return gsap.from(items, {
    y: 80,
    opacity: 0,
    scale: 0.9,
    duration: 0.7,
    stagger: 0.15,
    ease: easing.bounce,
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
}

/**
 * フォームフィールドスタッガーアニメーション
 */
export function formFieldsReveal(
  formSelector: string,
  fieldSelector: string = '> div'
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  const form = document.querySelector(formSelector);
  if (!form) return null;

  const fields = form.querySelectorAll(fieldSelector);
  if (fields.length === 0) return null;

  return gsap.from(fields, {
    y: 40,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: easing.smooth,
    scrollTrigger: {
      trigger: form,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

/**
 * 画像切り替えアニメーション
 */
export function imageTransition(
  imageElement: HTMLElement,
  newSrc: string,
  callback?: () => void
): void {
  if (prefersReducedMotion()) {
    (imageElement as HTMLImageElement).src = newSrc;
    callback?.();
    return;
  }

  gsap.to(imageElement, {
    opacity: 0,
    scale: 0.98,
    duration: 0.15,
    onComplete: () => {
      (imageElement as HTMLImageElement).src = newSrc;
      gsap.to(imageElement, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: easing.smooth,
        onComplete: callback,
      });
    },
  });
}

/**
 * ホバーアニメーション（カード用）
 */
export function setupCardHover(cardSelector: string): void {
  if (prefersReducedMotion()) return;

  const cards = document.querySelectorAll(cardSelector);

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, duration: 0.3, ease: easing.smooth });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: easing.smooth });
    });
  });
}
