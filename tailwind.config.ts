import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 强调色通过 CSS Variable 管理（RGB 三元组），支持透明度修饰符
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        dark: {
          bg: '#0F172A',        // 深灰蓝主背景（拒绝纯黑）
          card: '#1E293B',       // 卡片底色（与背景微弱明度差）
          border: 'rgba(255, 255, 255, 0.08)', // 极细透白边框
          text: '#E2E8F0',       // 柔和灰白主文字（拒绝纯白）
          muted: '#94A3B8',      // 次要文字
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sc)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: {
        content: '75rem', // 1200px
      },
      borderRadius: {
        card: '16px', // 卡片 16px（rounded-2xl 区间）；按钮用 rounded-xl (12px)
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
