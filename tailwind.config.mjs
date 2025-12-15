/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // メインカラー
        'gosu-blue': '#2C4A6B',    // 藍色（呉須の色）
        'kinari': '#F5F2EB',        // 生成り（和紙の色）
        'sumi': '#333333',          // 墨色
        // アクセントカラー
        'akae-red': '#B54A32',      // 赤絵の赤
        'yuu-green': '#5D7E5D',     // 釉薬の緑
      },
      fontFamily: {
        serif: ['Noto Serif JP', 'serif'],
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
