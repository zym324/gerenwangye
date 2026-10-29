import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  drift: number;
  twinkle: number;
  layer: number; // 0 远 1 中 2 近
}

const LAYER_DRIFT = [0.03, 0.06, 0.1];
const LAYER_RADIUS = [0.5, 1.0, 1.6];
/* 星点聚集带：顶部 0–15% 与底部 85–100%，中间阅读区保持纯净 */
const TOP_BAND = 0.15;
const BOTTOM_BAND = 0.15;
/* 视觉克制：星星最大亮度 0.55，防止光晕刺眼 */
const MAX_ALPHA = 0.55;

/** 生成"顶部或底部边缘"的 y 坐标（中间 70% 区域不放星点） */
function edgeY(height: number): number {
  const inTop = Math.random() < 0.6;
  const band = inTop
    ? Math.random() * (height * TOP_BAND)
    : height * (1 - BOTTOM_BAND) + Math.random() * (height * BOTTOM_BAND);
  return band;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 尊重 prefers-reduced-motion：直接静态绘制，不启动动画
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = media.matches;
    const onMotionPref = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      if (!reduced) start();
      else stop();
    };
    media.addEventListener('change', onMotionPref);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const isMobile = width < 768;
    const STAR_COUNT = isMobile ? 120 : 300;

    const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, i) => {
      const layer = i % 3;
      return {
        x: Math.random() * width,
        y: edgeY(height),
        radius: LAYER_RADIUS[layer] * (0.7 + Math.random() * 0.6),
        baseOpacity: 0.2 + Math.random() * 0.4,
        drift: LAYER_DRIFT[layer] * (0.8 + Math.random() * 0.4),
        twinkle: Math.random() * Math.PI * 2,
        layer,
      };
    });

    function render(alphaFn: (s: Star) => number) {
      ctx!.clearRect(0, 0, width, height);
      for (const s of stars) {
        const alpha = Math.min(alphaFn(s), MAX_ALPHA);
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx!.fill();
      }
    }

    let raf = 0;
    let running = false;
    let lastTs = 0;

    function draw(ts: number) {
      if (!running) return;
      const dt = Math.min((ts - lastTs) / 16.67, 3); // 帧间步进
      lastTs = ts;

      for (const s of stars) {
        s.twinkle += 0.012 * dt;
        s.y -= s.drift * dt;
        // 星点只在顶部带内缓慢上浮，出顶部后重生于边缘带
        if (s.y < -4) {
          s.y = edgeY(height);
          s.x = Math.random() * width;
        }
      }
      render((s) => s.baseOpacity * (0.45 + 0.55 * Math.sin(s.twinkle)));
      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      lastTs = performance.now();
      raf = requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') stop();
      else if (!reduced) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      resize();
      for (const s of stars) {
        if (s.x > width) s.x = Math.random() * width;
        s.y = edgeY(height);
      }
      if (reduced) render((s) => s.baseOpacity);
    };
    window.addEventListener('resize', onResize);

    if (reduced) {
      // 减动效：静态绘制一次
      render((s) => s.baseOpacity);
    } else {
      start();
    }

    return () => {
      stop();
      media.removeEventListener('change', onMotionPref);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
