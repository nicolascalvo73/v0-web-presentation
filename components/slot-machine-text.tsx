"use client";

import { useEffect, useRef } from "react";

interface SlotMachineTextProps {
  text?: string;
}

export function SlotMachineText({ text = "NO-LO-SE" }: SlotMachineTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-".split("");
    const textChars = text.split("");
    const scale = 50;
    const breaks = 0.002;
    const endSpeed = 0.0333;
    const firstLetter = 330;
    const delay = 60;

    const charMap: Record<string, number> = {};
    const offset: number[] = [];
    const offsetV: number[] = [];

    for (let i = 0; i < chars.length; i++) {
      charMap[chars[i]] = i;
    }

    for (let i = 0; i < textChars.length; i++) {
      const f = firstLetter + delay * i;
      offsetV[i] = endSpeed + breaks * f;
      offset[i] = -((1 + f) * (breaks * f + 2 * endSpeed)) / 2;
    }

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let animationId: number;

    const loop = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#666";
      ctx.fillRect(0, (canvas.height - scale) / 2, canvas.width, scale);

      for (let i = 0; i < textChars.length; i++) {
        ctx.fillStyle = "#ccc";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.setTransform(
          1,
          0,
          0,
          1,
          Math.floor((canvas.width - scale * (textChars.length - 1)) / 2),
          Math.floor(canvas.height / 2)
        );

        let o = offset[i];
        while (o < 0) o++;
        o %= 1;

        const h = Math.ceil(canvas.height / 2 / scale);
        for (let j = -h; j < h; j++) {
          let c = charMap[textChars[i]] + j - Math.floor(offset[i]);
          while (c < 0) c += chars.length;
          c %= chars.length;

          const s = 1 - Math.abs(j + o) / (canvas.height / 2 / scale + 1);
          ctx.globalAlpha = s;
          ctx.font = scale * s + "px Helvetica";
          ctx.fillText(chars[c], scale * i, (j + o) * scale);
        }

        offset[i] += offsetV[i];
        offsetV[i] -= breaks;
        if (offsetV[i] < endSpeed) {
          offset[i] = 0;
          offsetV[i] = 0;
        }
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}
