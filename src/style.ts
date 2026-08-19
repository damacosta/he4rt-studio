export const INK = "#08060B";
export const PAPER = "#F4F2F7";
export const MUTED = "rgba(244,242,247,.62)";
export const ACCENT = "#F6C21B";
export const DISPLAY = "Anton, sans-serif";
export const META = "'Barlow Condensed', sans-serif";

/** margem editorial */
export const M = 92;

export const FPS = 30;

/** trilha: 141,75 BPM, o riff entra em 7,709s do arquivo */
export const BPM = 141.75;
export const BT = 60 / BPM;
export const MUSICA_IN = 7.709;
/** n batidas em segundos */
export const b = (n: number) => n * BT;

/** roteiro em segundos — igual ao preview HTML */
export const SCENES = [
  { name: "Movimento", dur: 13.122 },
  { name: "Respira", dur: 5.079 },
  { name: "Dia28", dur: 4.233 },
  { name: "Banda", dur: 5.926 },
  { name: "Titulo", dur: 3.386 },
  { name: "Fecho", dur: 4.233 },
] as const;

export const TOTAL_SEC = SCENES.reduce((a, s) => a + s.dur, 0);
export const TOTAL_FRAMES = Math.round(TOTAL_SEC * FPS);

/** segundo inicial de cada cena */
export const CUES: Record<string, number> = (() => {
  let t = 0;
  const out: Record<string, number> = {};
  for (const s of SCENES) {
    out[s.name] = t;
    t += s.dur;
  }
  return out;
})();
