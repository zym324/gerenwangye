import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  drift: number;
  twinkle: number;
  layer: number; // 视差层：0 远 1 中 2 近
}

const LAYER_DRIFT = [0.03, 0.06, 0.1];
const LAYER_RADIUS = [0.5, 1.0, 1.6];

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
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const isMobile = width < 768;
    const STAR_COUNT = isMobile ? 120 : 300;

    const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, i) => {
      const layer = i % 3;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: LAYER_RADIUS[layer] * (0.7 + Math.random() * 0.6),
        baseOpacity: 0.25 + Math.random() * 0.6,
        drift: LAYER_DRIFT[layer] * (0.8 + Math.random() * 0.4),
        twinkle: Math.random() * Math.PI * 2,
        layer,
      };
    });

    let raf = 0;
    let running = false;
    let lastTs = 0;

    function draw(ts: number) {
      if (!running) return;
      const dt = Math.min((ts - lastTs) / 16.67, 3); // 帧间步进
      lastTs = ts;

      ctx!.clearRect(0, 0, width, height);
      for (const s of stars) {
        s.twinkle += 0.012 * dt;
        s.y -= s.drift * dt;
        if (s.y < -4) {
          s.y = height + 4;
          s.x = Math.random() * width;
        }
        const alpha =
          s.baseOpacity * (0.45 + 0.55 * Math.sin(s.twinkle));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx!.fill();
      }
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

    // 视差：滚动 / 鼠标移动时按层偏移
    let scrollY = 0;
    function onScroll() {
      scrollY = window.scrollY;
      if (reduced) return; // 减动效时不重绘
      // 单帧偏移绘制
      ctx!.clearRect(0, 0, width, height);
      for (const s of stars) {
        const py = s.y + scrollY * LAYER_DRIFT[s.layer] * 0.4;
        const pyMod = py % (height + 4);
        const yy = pyMod < 0 ? pyMod + height + 4 : pyMod;
        ctx!.beginPath();
        ctx!.arc(s.x, yy, s.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${s.baseOpacity.toFixed(3)})`;
        ctx!.fill();
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') stop();
      else if (!reduced) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      resize();
      // 重分布星星到新尺寸
      for (const s of stars) {
        if (s.x > width) s.x = Math.random() * width;
        if (s.y > height) s.y = Math.random() * height;
      }
    };
    window.addEventListener('resize', onResize);

    if (reduced) {
      // 减动效：静态绘制一次
      ctx!.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${s.baseOpacity.toFixed(3)})`;
        ctx!.fill();
      }
    } else {
      start();
    }

    return () => {
      stop();
      media.removeEventListener('change', onMotionPref);
      window.removeEventListener('scroll', onScroll);
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
