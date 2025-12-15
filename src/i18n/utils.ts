/**
 * i18nユーティリティ関数
 * 言語切り替え、翻訳取得などのヘルパー関数
 */

import { ui, defaultLang, type UIKey } from './ui';

type Lang = keyof typeof ui;

/**
 * URLから現在の言語を取得
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

/**
 * 翻訳関数を取得
 * @param lang - 言語コード
 * @returns 翻訳関数
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey, params?: Record<string, string | number>): string {
    let text = ui[lang][key] || ui[defaultLang][key] || key;

    // パラメータ置換（例: {year} → 2024）
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }

    return text;
  };
}

/**
 * 言語切り替え用のパスを取得
 * @param url - 現在のURL
 * @param lang - 切り替え先の言語
 * @returns 新しいパス
 */
export function getLocalizedPath(url: URL, lang: Lang): string {
  const currentLang = getLangFromUrl(url);
  let path = url.pathname;

  // 現在の言語プレフィックスを削除
  if (currentLang !== defaultLang) {
    path = path.replace(`/${currentLang}`, '') || '/';
  }

  // 新しい言語プレフィックスを追加（デフォルト言語の場合は追加しない）
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

/**
 * hreflang用の代替言語パスを取得
 * @param url - 現在のURL
 * @returns 各言語のパスオブジェクト
 */
export function getAlternateLanguages(url: URL): Record<Lang, string> {
  const base = url.origin;
  let path = url.pathname;

  // 現在の言語プレフィックスを削除してベースパスを取得
  const currentLang = getLangFromUrl(url);
  if (currentLang !== defaultLang) {
    path = path.replace(`/${currentLang}`, '') || '/';
  }

  return {
    ja: `${base}${path}`,
    en: `${base}/en${path}`,
  };
}

/**
 * 現在の言語がデフォルト言語かどうか
 */
export function isDefaultLang(lang: Lang): boolean {
  return lang === defaultLang;
}

/**
 * 言語名を取得
 */
export function getLanguageName(lang: Lang): string {
  const names: Record<Lang, string> = {
    ja: '日本語',
    en: 'English',
  };
  return names[lang];
}
