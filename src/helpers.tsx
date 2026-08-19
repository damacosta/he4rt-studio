import React from "react";
import {
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video as MediaVideo } from "@remotion/media";
import { ACCENT, DISPLAY, META, PAPER } from "./style";

const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const EASE_OUT = Easing.bezier(0.25, 1, 0.5, 1); // easeOutQuart
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1); // easeInOutCubic

/* mesmas curvas do preview, tudo em SEGUNDOS */
export const fade = (T: number, a: number, c: number) =>
  interpolate(T, [a, c], [0, 1], { easing: EASE_OUT, ...CL });
export const lin = (
  T: number,
  a: number,
  c: number,
  from: number,
  to: number,
) => interpolate(T, [a, c], [from, to], CL);
export const hard = (T: number, a: number, c: number) =>
  interpolate(T, [a - 0.012, a, c, c + 0.012], [0, 1, 1, 0], CL);
export const soft = (T: number, a: number, c: number, s: number) =>
  interpolate(T, [a - s, a, c, c + s], [0, 1, 1, 0], {
    easing: EASE_IO,
    ...CL,
  });
export const hit = (T: number, at: number, len = 0.16) =>
  interpolate(T, [at - 0.015, at, at + len], [0, 1, 0], {
    easing: Easing.out(Easing.quad),
    ...CL,
  });

/** T em segundos */
export const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

type FotoProps = {
  src: string;
  pos?: string;
  t: number;
  d: number;
  z0?: number;
  z1?: number;
  x?: number;
  tr?: number;
  blur?: number;
  cortar?: boolean;
  T: number;
};

export const Foto: React.FC<FotoProps> = ({
  src,
  pos,
  t,
  d,
  z0 = 1,
  z1 = 1.1,
  x,
  tr,
  blur,
  cortar,
  T,
}) => {
  const op = tr ? soft(T, t, t + d, tr) : hard(T, t, t + d);
  if (op <= 0) return null;
  const z = lin(
    T,
    t - (tr ?? 0),
    t + d + (tr ?? 0.2),
    cortar ? z0 : 1,
    cortar ? z1 : 1.04,
  );
  const bl = blur
    ? interpolate(T, [t, t + 0.22], [blur, 0], { easing: EASE_OUT, ...CL })
    : 0;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: op,
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: cortar ? "cover" : "contain",
          objectPosition: pos ?? "center center",
          transform: `scale(${z}) translateX(${x ?? 0}px)`,
          filter: `contrast(1.05) saturate(1.04)${bl ? ` blur(${bl}px)` : ""}`,
          translate: "-82.2px -57.7px",
          scale: 1.138,
        }}
      />
    </div>
  );
};

type VideoProps = {
  src: string;
  t: number;
  d: number;
  off?: number;
  z0?: number;
  z1?: number;
  pos?: string;
  tr?: number;
  T: number;
};

/**
 * O clipe roda pelo próprio relógio: a Sequence começa em `t`, então o tempo
 * interno do vídeo anda 1s por segundo de timeline. `trimBefore` só escolhe o
 * ponto de partida dentro do arquivo (`off`), nunca acompanha o frame atual.
 */
export const Video: React.FC<VideoProps> = ({
  src,
  t,
  d,
  off = 0,
  z0 = 1.08,
  z1 = 1.2,
  pos,
  tr,
  T,
}) => {
  const { fps } = useVideoConfig();
  const op = tr ? soft(T, t, t + d, tr) : hard(T, t, t + d);
  if (op <= 0) return null;
  const z = lin(T, t, t + d + 0.3, z0, z1);
  /* a opacidade já começa a subir antes de `t`; o clipe entra junto */
  const antes = Math.min(tr ?? 0.012, off);
  return (
    <Sequence from={Math.round((t - antes) * fps)} layout="none">
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: op,
          overflow: "hidden",
        }}
      >
        <MediaVideo
          src={staticFile(src)}
          trimBefore={Math.round((off - antes) * fps)}
          muted
          objectFit="contain"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectPosition: pos ?? "center center",
            transform: `scale(${z})`,
            filter: "contrast(1.06) saturate(1.06) brightness(1.04)",
            translate: "2.8px -98.8px",
          }}
          from={1}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 1080,
            background:
              "linear-gradient(0deg, #08060B 0%, #08060B 12%, rgba(8,6,11,.96) 26%, rgba(8,6,11,.78) 46%, rgba(8,6,11,.42) 68%, rgba(8,6,11,.14) 86%, rgba(8,6,11,0) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </Sequence>
  );
};

/** recorte da foto da banda: crop extremo → revelação */
export const Banda: React.FC<{
  t: number;
  d: number;
  z0: number;
  z1: number;
  ox0?: number;
  ox1?: number;
  oy0?: number;
  oy1?: number;
  tr?: number;
  T: number;
}> = ({ t, d, z0, z1, ox0 = 0, ox1, oy0 = 0, oy1, tr, T }) => {
  const op = tr ? soft(T, t, t + d, tr) : hard(T, t, t + d);
  if (op <= 0) return null;
  const z = lin(T, t - (tr ?? 0), t + d + (tr ?? 0.2), z0, z1);
  const ox = lin(T, t, t + d, ox0, ox1 ?? ox0);
  const oy = lin(T, t, t + d, oy0, oy1 ?? oy0);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: op,
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile("banda.png")}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1080,
          transform: `translate(-50%,-50%) translate(${ox}px,${oy}px) scale(${z})`,
          filter: "contrast(1.06) saturate(1.03)",
        }}
      />
    </div>
  );
};

/** legenda: sobe por máscara, desfoca entrando e sai por corte */
export const Legenda: React.FC<{
  t: number;
  d: number;
  T: number;
  size?: number;
  color?: string;
  top?: number;
  bottom?: number;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}> = ({
  t,
  d,
  T,
  size = 118,
  color = PAPER,
  top,
  bottom,
  align = "left",
  children,
}) => {
  const op = hard(T, t, t + d);
  if (op <= 0) return null;
  const p = interpolate(T, [t, t + 0.32], [0, 1], { easing: EASE_OUT, ...CL });
  const q = interpolate(T, [t, t + 0.55], [0, 1], { easing: EASE_OUT, ...CL });
  const sai = interpolate(T, [t + d - 0.22, t + d], [0, 1], {
    easing: Easing.in(Easing.quad),
    ...CL,
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 92,
        right: 92,
        top,
        bottom,
        opacity: op,
        textAlign: align,
      }}
    >
      <div
        style={{
          overflow: "hidden",
          paddingTop: "0.16em",
          marginTop: "-0.16em",
        }}
      >
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: size,
            lineHeight: 1.05,
            color,
            letterSpacing: `${-1 + (1 - q) * 9}px`,
            transform: `translateY(${(1 - p) * 118 - sai * 26}%) scale(${0.985 + q * 0.015})`,
            filter: `blur(${(1 - q) * 7}px)`,
            opacity: 1 - sai * 0.55,
            textWrap: "pretty",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}
  >
    <div style={{ width: 44, height: 2, background: ACCENT }} />
    <div
      style={{
        fontFamily: META,
        fontWeight: 600,
        fontSize: 30,
        letterSpacing: 6,
        color: PAPER,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  </div>
);

export const scrim = (g: string) => (
  <div style={{ position: "absolute", inset: 0, background: g }} />
);
export const G_BAIXO =
  "linear-gradient(180deg, rgba(8,6,11,.5) 0%, rgba(8,6,11,.02) 24%, rgba(8,6,11,.35) 58%, rgba(8,6,11,.95) 100%)";
export const G_CHEIO =
  "linear-gradient(180deg, rgba(8,6,11,.62) 0%, rgba(8,6,11,.18) 30%, rgba(8,6,11,.5) 62%, rgba(8,6,11,.96) 100%)";

export const glow = (top: number, a = 0.36) => (
  <div
    style={{
      position: "absolute",
      left: -200,
      top,
      width: 1480,
      height: 1480,
      background: `radial-gradient(circle, rgba(123,47,247,${a}), rgba(123,47,247,0) 60%)`,
      filter: "blur(14px)",
    }}
  />
);
