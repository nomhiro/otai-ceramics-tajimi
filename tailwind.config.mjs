/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // 和モダンカラーパレット
        'ai': '#1e3a5f',           // 藍色（メイン）
        'kinari': '#f5f1eb',       // 生成り（背景）
        'sumi': '#2d2d2d',         // 墨色（テキスト）
        'shu': '#c53d43',          // 朱色（アクセント）
        'hakuji': '#fafafa',       // 白磁（カード背景）
        // 旧カラー（後方互換性のため一時保持）
        'gosu-blue': '#1e3a5f',    // ai にマッピング
        'akae-red': '#c53d43',     // shu にマッピング
        'yuu-green': '#5D7E5D',    // 釉薬の緑
      },
      fontFamily: {
        serif: ['Noto Serif JP', 'serif'],
        sans: ['Noto Sans JP', 'sans-serif'],
      },
      // 余白スケール（余白の美）
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      // アニメーション timing
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
};
