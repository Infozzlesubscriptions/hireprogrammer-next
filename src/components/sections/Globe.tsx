"use client";

import { useEffect, useRef } from "react";

/* ─── World map canvas ─── */
function buildWorldMapCanvas(): HTMLCanvasElement {
  const W = 360, H = 180;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";

  const px = (lon: number, lat: number): [number, number] => [
    ((lon + 180) / 360) * W,
    ((90 - lat) / 180) * H,
  ];
  const fill = (pts: [number, number][]) => {
    ctx.beginPath();
    ctx.moveTo(...px(pts[0][0], pts[0][1]));
    for (let i = 1; i < pts.length; i++) ctx.lineTo(...px(pts[i][0], pts[i][1]));
    ctx.closePath(); ctx.fill();
  };

  fill([[-168,72],[-160,70],[-148,72],[-130,74],[-90,73],[-80,68],[-72,64],[-64,62],[-57,57],[-56,47],[-66,44],[-75,35],[-80,25],[-87,18],[-92,15],[-105,22],[-118,32],[-125,38],[-128,48],[-140,58],[-155,62],[-168,62]]);
  fill([[-160,60],[-148,60],[-143,58],[-135,57],[-135,60],[-148,64],[-160,62]]);
  fill([[-73,76],[-18,77],[-18,61],[-40,59],[-73,70]]);
  fill([[-84,22],[-74,22],[-74,23],[-84,23]]);
  fill([[-73,18],[-68,18],[-68,20],[-73,20]]);
  fill([[-82,12],[-70,12],[-60,8],[-50,2],[-35,-8],[-35,-24],[-42,-34],[-55,-50],[-68,-54],[-72,-50],[-78,-36],[-80,-5]]);
  fill([[-12,72],[28,72],[30,70],[32,65],[25,62],[30,58],[28,55],[38,52],[42,42],[38,38],[26,38],[22,37],[14,38],[5,44],[0,44],[-5,44],[-8,44],[-9,38],[-5,36],[0,36],[-9,38],[-12,44],[-8,48],[-5,58],[0,62],[-6,68]]);
  fill([[-6,50],[2,51],[2,53],[-3,53],[-6,50]]);
  fill([[-5,55],[0,57],[-3,59],[-5,55]]);
  fill([[-25,63],[-12,63],[-12,66],[-25,66]]);
  fill([[18,70],[28,72],[30,70],[28,65],[24,62],[18,65],[15,70]]);
  fill([[-17,38],[37,38],[42,30],[42,20],[52,12],[44,5],[42,-2],[36,-10],[34,-20],[26,-35],[18,-35],[14,-28],[5,-5],[-8,5],[-16,12],[-17,20]]);
  fill([[44,-12],[50,-14],[50,-25],[44,-24]]);
  fill([[25,75],[80,75],[120,74],[145,72],[145,60],[142,46],[132,35],[121,22],[110,5],[105,-3],[115,-8],[122,0],[122,20],[120,24],[115,22],[110,20],[100,2],[95,5],[80,8],[58,22],[50,12],[42,15],[38,22],[38,30],[42,38],[55,44],[60,50],[56,57],[70,60],[90,68],[110,72]]);
  fill([[60,22],[80,8],[80,12],[92,20],[88,22],[80,28],[68,22]]);
  fill([[36,30],[58,22],[58,14],[50,12],[42,15],[36,22]]);
  fill([[130,32],[140,34],[143,42],[141,44],[139,40],[130,33]]);
  fill([[120,22],[122,22],[122,25],[120,25]]);
  fill([[80,6],[82,6],[82,10],[80,10]]);
  fill([[118,10],[122,10],[122,18],[118,18]]);
  fill([[98,5],[110,-3],[115,2],[105,8],[99,12],[98,5]]);
  fill([[108,0],[118,0],[118,7],[108,7]]);
  fill([[95,5],[107,-5],[110,-3],[98,5]]);
  fill([[106,-6],[115,-8],[115,-6],[106,-6]]);
  fill([[131,-2],[145,-2],[150,-8],[141,-8],[131,-2]]);
  fill([[113,-22],[125,-14],[138,-12],[145,-14],[154,-20],[154,-34],[143,-38],[130,-32],[115,-35],[113,-28]]);
  fill([[144,-41],[148,-41],[148,-44],[144,-44]]);
  fill([[172,-36],[178,-40],[174,-42],[170,-40]]);
  ctx.fillRect(0, Math.round(((90 - (-65)) / 180) * H), W, H);
  return c;
}

type Vec3 = [number, number, number];

function makeRing(r: number, tiltX: number, tiltZ: number, segments = 400): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const x0 = r * Math.cos(t), z0 = r * Math.sin(t);
    const y1 = -z0 * Math.sin(tiltX);
    const z1 =  z0 * Math.cos(tiltX);
    const x2 = x0 * Math.cos(tiltZ) - y1 * Math.sin(tiltZ);
    const y2 = x0 * Math.sin(tiltZ) + y1 * Math.cos(tiltZ);
    pts.push([x2, y2, z1]);
  }
  return pts;
}

interface GlobeProps {
  className?: string;
  /** Push globe centre below canvas centre. 0 = centred, 0.38 = near-bottom semicircle. */
  yOffset?: number;
}

export function Globe({ className, yOffset = 0.38 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const cont = canvas.parentElement!;
      canvas.width  = cont.clientWidth  * dpr;
      canvas.height = cont.clientHeight * dpr;
      canvas.style.width  = cont.clientWidth  + "px";
      canvas.style.height = cont.clientHeight + "px";
    };
    resize();

    // ── Dots ──
    const mapC = buildWorldMapCanvas();
    const imgData = mapC.getContext("2d")!.getImageData(0, 0, mapC.width, mapC.height);
    const dots: Vec3[] = [];
    const STEP = 2;
    for (let py = 0; py < mapC.height; py += STEP) {
      for (let px2 = 0; px2 < mapC.width; px2 += STEP) {
        if (imgData.data[(py * mapC.width + px2) * 4] > 128) {
          const lon = (px2 / mapC.width) * 360 - 180;
          const lat = 90 - (py / mapC.height) * 180;
          const phi   = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);
          dots.push([
            -Math.sin(phi) * Math.cos(theta),
             Math.cos(phi),
             Math.sin(phi) * Math.sin(theta),
          ]);
        }
      }
    }

    // ── Stars ──
    const STARS = Array.from({ length: 260 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.1 + 0.25,
      a: Math.random() * 0.55 + 0.15,
    }));

    // ── Rings ──
    const mainRing = makeRing(1.44, Math.PI / 6.5,  Math.PI / 20);
    const ring2    = makeRing(1.62, -Math.PI / 5,   Math.PI / 11);
    const ring3    = makeRing(1.78, Math.PI / 3.8, -Math.PI / 9);

    const rotY = ([x, y, z]: Vec3, a: number): Vec3 => [
      x * Math.cos(a) + z * Math.sin(a), y,
     -x * Math.sin(a) + z * Math.cos(a),
    ];

    let angle = 0, satAngle = 0, frameId = 0;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr, ch = canvas.height / dpr;
      // Globe centre pushed below canvas centre
      const cx = cw / 2;
      const cy = ch * (0.5 + yOffset);      // e.g. ch * 0.88
      const scale = cw * 0.50;             // globe radius = 50 % viewport width

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      // ── Stars ──
      for (const s of STARS) {
        ctx.beginPath();
        ctx.arc(s.x * cw, s.y * ch * 0.7, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      }

      // ── Deep atmosphere behind globe ──
      const atm = ctx.createRadialGradient(cx, cy, scale * 0.05, cx, cy, scale * 1.6);
      atm.addColorStop(0,    "rgba(120,35,230,0.30)");
      atm.addColorStop(0.4,  "rgba(90,20,190,0.16)");
      atm.addColorStop(0.72, "rgba(55,10,140,0.07)");
      atm.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = atm;
      ctx.fillRect(0, 0, cw, ch);

      const proj = ([x, y, z]: Vec3): [number, number, number] => {
        const [rx, ry, rz] = rotY([x, y, z], angle);
        return [cx + rx * scale, cy - ry * scale, rz];
      };

      // ── Ring draw helper ──
      const drawRing = (
        ring: Vec3[],
        frontStroke: string, frontW: number, frontBlur: number,
        backStroke: string,  backW: number,
      ) => {
        let prev: [number, number, number] | null = null;
        for (const pt of ring) {
          const cur = proj(pt);
          if (prev) {
            ctx.beginPath();
            ctx.moveTo(prev[0], prev[1]);
            ctx.lineTo(cur[0], cur[1]);
            if (cur[2] > 0) {
              ctx.strokeStyle = frontStroke;
              ctx.lineWidth   = frontW;
              ctx.shadowColor = frontStroke;
              ctx.shadowBlur  = frontBlur;
            } else {
              ctx.strokeStyle = backStroke;
              ctx.lineWidth   = backW;
              ctx.shadowBlur  = 0;
            }
            ctx.stroke();
          }
          prev = cur;
        }
        ctx.shadowBlur = 0;
      };

      // Back arcs first
      drawRing(ring2,    "rgba(150,65,255,0.42)",  1.0, 7,  "rgba(65,12,150,0.18)", 0.5);
      drawRing(ring3,    "rgba(130,55,225,0.32)",  0.8, 5,  "rgba(55,8,130,0.14)",  0.4);
      drawRing(mainRing, "rgba(190,90,255,0.58)",  1.8, 16, "rgba(85,18,180,0.24)", 0.8);

      // ── Globe dots ──
      const projected = dots.map(d => {
        const [sx, sy, sz] = proj(d);
        return { sx, sy, sz };
      });
      projected.sort((a, b) => a.sz - b.sz);

      for (const { sx, sy, sz } of projected) {
        // Only render dots visible from canvas (don't draw below canvas)
        if (sy > ch + 10) continue;
        const alpha = (sz + 0.06) / 1.06;
        if (alpha <= 0.02) continue;

        const size = 1.1 + alpha * 1.5;
        const rv = Math.round(105 + alpha * 125);
        const gv = Math.round(18 + alpha * 48);

        if (alpha > 0.55) {
          ctx.shadowColor = `rgba(${rv},${gv},255,0.9)`;
          ctx.shadowBlur  = 8;
        } else if (alpha > 0.25) {
          ctx.shadowColor = `rgba(${rv},${gv},255,0.5)`;
          ctx.shadowBlur  = 3;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${rv},${gv},255,${Math.min(1, alpha * 0.95)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Front ring arcs (on top of dots)
      drawRing(ring2,    "rgba(165,82,255,0.48)",  1.0, 9,  "rgba(65,12,150,0.18)", 0.5);
      drawRing(ring3,    "rgba(145,62,235,0.38)",  0.8, 6,  "rgba(55,8,130,0.14)",  0.4);
      drawRing(mainRing, "rgba(215,115,255,0.88)", 2.4, 24, "rgba(85,18,180,0.24)", 0.8);

      // ── Flare at brightest ring point ──
      const flIdx = Math.round(mainRing.length * 0.62);
      const [fx, fy, fz] = proj(mainRing[flIdx]);
      if (fz > 0.25 && fy < ch) {
        const fl = ctx.createRadialGradient(fx, fy, 0, fx, fy, 32);
        fl.addColorStop(0,   "rgba(235,165,255,0.95)");
        fl.addColorStop(0.3, "rgba(180,85,255,0.50)");
        fl.addColorStop(1,   "rgba(100,20,200,0)");
        ctx.fillStyle = fl;
        ctx.beginPath(); ctx.arc(fx, fy, 32, 0, Math.PI * 2); ctx.fill();
      }

      // ── Satellite dot ──
      const satIdx = Math.round((satAngle % (Math.PI * 2)) / (Math.PI * 2) * (mainRing.length - 1));
      const satPt = mainRing[satIdx];
      if (satPt) {
        const [ssx, ssy, ssz] = proj(satPt);
        if (ssz > -0.1 && ssy < ch) {
          const sa = Math.max(0, (ssz + 0.1) / 1.1);
          ctx.shadowColor = "rgba(245,185,255,1)";
          ctx.shadowBlur  = 20;
          ctx.fillStyle   = `rgba(245,185,255,${sa})`;
          ctx.beginPath(); ctx.arc(ssx, ssy, 4, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // ── Bottom fade — blends globe into page background ──
      const fadeH = ch * 0.22;
      const fade = ctx.createLinearGradient(0, ch - fadeH, 0, ch);
      fade.addColorStop(0, "rgba(8,3,22,0)");
      fade.addColorStop(1, "rgba(8,3,22,1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, ch - fadeH, cw, fadeH);

      angle    += 0.0022;
      satAngle += 0.018;
      frameId = requestAnimationFrame(draw);
    };

    draw();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(frameId); window.removeEventListener("resize", onResize); };
  }, [yOffset]);

  return <canvas ref={canvasRef} className={className} style={{ display: "block" }} />;
}
