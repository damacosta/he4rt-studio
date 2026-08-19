import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import {
  ACCENT,
  CUES,
  DISPLAY,
  FPS,
  INK,
  M,
  META,
  MUTED,
  MUSICA_IN,
  PAPER,
  TOTAL_SEC,
  b,
} from "./style";
import {
  Banda,
  EASE_OUT,
  Foto,
  G_BAIXO,
  G_CHEIO,
  Kicker,
  Legenda,
  Video,
  fade,
  glow,
  hard,
  hit,
  lin,
  scrim,
  soft,
  useT,
} from "./helpers";

const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const clamp = (v: number, a: number, c: number) => Math.min(Math.max(v, a), c);

export const Reels: React.FC = () => {
  const T = useT();

  const s1 = CUES.Movimento;
  const s2 = CUES.Respira;
  const s3 = CUES.Dia28;
  const s4 = CUES.Banda;
  const s6 = CUES.Titulo;
  const s7 = CUES.Fecho;

  const shake3 =
    8 *
    (hit(T, s3 + b(4.5), 0.13) +
      hit(T, s3 + b(6), 0.11) +
      hit(T, s3 + b(8), 0.11));
  const tick = lin(T, s4 + 3.8, s6, 0, -360);
  const flash =
    0.45 *
      (hit(T, s1 + b(0.5), 0.1) +
        hit(T, s1 + b(2), 0.1) +
        hit(T, s1 + b(3.5), 0.12)) +
    0.55 * hit(T, s3 + 2.0, 0.12) +
    0.7 * hit(T, s4 + 4.0, 0.14) +
    0.5 * hit(T, s6, 0.12);

  /* gate weave — a trepidação leve do filme na janela do projetor */
  const wx = Math.sin(T * 7.3) * 1.6 + Math.sin(T * 17.1) * 0.7;
  const wy = Math.cos(T * 5.9) * 1.9 + Math.sin(T * 13.7) * 0.6;
  const wr = Math.sin(T * 4.7) * 0.09;
  const wz = 1.006 + Math.sin(T * 3.1) * 0.0025;
  const arranhaoX = Math.sin(T * 2.3) * 26;
  const arranhaoOp = 0.1 + 0.06 * (0.5 + 0.5 * Math.sin(T * 9.1));

  const vis = (a: number, c: number) => T > a - 0.35 && T < c + 0.35;

  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden" }}>
      <Audio
        src={staticFile("promo/trilha.mp3")}
        trimBefore={Math.round(MUSICA_IN * FPS)}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${wx}px, ${wy}px) rotate(${wr}deg) scale(${wz})`,
          transformOrigin: "50% 50%",
        }}
      >
        {/* 1. UMA NOITE NÃO É FEITA PRA FICAR PARADO */}
        {vis(0, s2) && (
          <AbsoluteFill>
            <Video
              src="promo/v7-abertura.mp4"
              t={s1}
              d={b(6)}
              off={0}
              z0={1.06}
              z1={1.2}
              T={T}
            />
            <Foto
              src="promo/chegando2.jpg"
              pos="48% 44%"
              t={s1 + b(6)}
              d={b(6)}
              z0={1.28}
              z1={1.46}
              blur={14}
              tr={0.14}
              T={T}
            />
            <Foto
              src="promo/tec2.jpg"
              pos="center 36%"
              t={s1 + b(12)}
              d={b(6)}
              z0={1.12}
              z1={1.24}
              tr={0.2}
              cortar
              T={T}
            />
            <Foto
              src="promo/galera-roda2.jpg"
              pos="52% 40%"
              t={s1 + b(18)}
              d={b(3)}
              z0={1.1}
              z1={1.22}
              tr={0.14}
              cortar
              T={T}
            />
            <Video
              src="promo/v7-abertura.mp4"
              t={s1 + b(21)}
              d={b(10)}
              off={55}
              z0={1.06}
              z1={1.18}
              tr={0.3}
              T={T}
            />
            {scrim(G_BAIXO)}
            <div
              style={{
                position: "absolute",
                left: M,
                right: M,
                bottom: 300,
                opacity: hard(T, s1, s1 + b(6)),
              }}
            >
              {(
                [
                  ["UMA NOITE NÃO", b(0.5), PAPER],
                  ["É FEITA PRA", b(2), PAPER],
                  ["FICAR PARADO.", b(3.5), ACCENT],
                ] as [string, number, string][]
              ).map(([w, at, cor]) => {
                const p = interpolate(T, [s1 + at, s1 + at + 0.3], [0, 1], {
                  easing: EASE_OUT,
                  ...CL,
                });
                return (
                  <div
                    key={w}
                    style={{
                      overflow: "hidden",
                      paddingTop: "0.16em",
                      marginTop: "-0.16em",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: 116,
                        lineHeight: 1.05,
                        color: cor,
                        transform: `translateY(${(1 - p) * 118}%)`,
                      }}
                    >
                      {w}
                    </div>
                  </div>
                );
              })}
            </div>
            <Legenda t={s1 + b(6)} d={b(6)} T={T} bottom={300} size={140}>
              É PRA CHEGAR.
            </Legenda>
            <Legenda t={s1 + b(12)} d={b(6)} T={T} bottom={300} size={126}>
              FALAR DE
              <br />
              TECNOLOGIA.
            </Legenda>
            <Legenda t={s1 + b(18)} d={b(3)} T={T} bottom={300} size={126}>
              ENCONTRAR
              <br />A GALERA.
            </Legenda>
            <Legenda
              t={s1 + b(21.25)}
              d={b(9.5)}
              T={T}
              bottom={300}
              size={140}
              color={ACCENT}
            >
              BEBER.
            </Legenda>
          </AbsoluteFill>
        )}

        {/* 2. O HE4RT PUB ESTÁ DE VOLTA */}
        {vis(s2, s3) && (
          <AbsoluteFill>
            <Foto
              src="promo/galera-grupo.jpg"
              pos="center 20%"
              t={s2}
              d={b(5)}
              z0={1.16}
              z1={1.3}
              tr={0.2}
              T={T}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 760,
                background:
                  "linear-gradient(0deg, #08060B 0%, rgba(8,6,11,.92) 26%, rgba(8,6,11,.62) 54%, rgba(8,6,11,.22) 80%, rgba(8,6,11,0) 100%)",
                opacity: soft(T, s2, s2 + b(5), 0.3),
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 640,
                background:
                  "linear-gradient(180deg, rgba(8,6,11,.55) 0%, rgba(8,6,11,.34) 34%, rgba(8,6,11,.14) 66%, rgba(8,6,11,0) 100%)",
                opacity: soft(T, s2, s2 + b(5), 0.3),
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: soft(T, s2 + b(5), s2 + b(12), 0.45),
                overflow: "hidden",
                background: "#3B0F86",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 1700,
                  height: 1700,
                  transform: `translate(-50%,-50%) scale(${1 + 0.06 * Math.sin(T * 1.6)})`,
                  background:
                    "radial-gradient(circle, rgba(151,86,255,.95), rgba(59,15,134,0) 62%)",
                  filter: "blur(20px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: -260,
                  top: 1180,
                  width: 1300,
                  height: 1300,
                  background:
                    "radial-gradient(circle, rgba(246,194,27,.3), rgba(246,194,27,0) 62%)",
                  filter: "blur(26px)",
                  transform: `translate(${Math.sin(T * 0.7) * 70}px, ${Math.cos(T * 0.55) * 50}px)`,
                }}
              />
              <Img
                src={staticFile("video/halftone.png")}
                style={{
                  position: "absolute",
                  inset: "-8%",
                  width: "116%",
                  height: "116%",
                  objectFit: "cover",
                  opacity: 0.2,
                  mixBlendMode: "overlay",
                  transform: `scale(${1.05 + Math.sin(T * 0.8) * 0.04}) rotate(${Math.sin(T * 0.35) * 2}deg)`,
                  translate: "-4.6px -50.9px",
                }}
              />
              <Img
                src={staticFile("video/pincelada-amarela.png")}
                style={{
                  position: "absolute",
                  left: -140,
                  top: 1320,
                  width: 1420,
                  opacity: 0.42,
                  mixBlendMode: "screen",
                  transform: `translateX(${lin(T, s2 + b(5), s2 + b(12), -80, 40)}px) rotate(-4deg)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: -80,
                  right: -80,
                  top: 1520,
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                {[0.14, 0.08].map((al, k) => (
                  <div
                    key={k}
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 96,
                      lineHeight: 1,
                      color: `rgba(244,242,247,${al})`,
                      letterSpacing: 12,
                      whiteSpace: "nowrap",
                      transform: `translateX(${lin(T, s2 + b(5), s2 + b(12), k ? 80 : -80, k ? -280 : 240)}px)`,
                    }}
                  >
                    3ª EDIÇÃO · 3ª EDIÇÃO · 3ª EDIÇÃO · 3ª EDIÇÃO
                  </div>
                ))}
              </div>
              <Img
                src={staticFile("video/light-leak.png")}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.24 + 0.1 * Math.sin(T * 1.9),
                  mixBlendMode: "screen",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 50% 45%, rgba(8,6,11,0) 40%, rgba(8,6,11,.68) 100%)",
                }}
              />
            </div>
            {scrim(G_BAIXO)}
            <Legenda t={s2} d={b(5)} T={T} bottom={300} size={122}>
              E FAZER
              <br />
              PARTE.
            </Legenda>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(8,6,11,.4) 0%, rgba(8,6,11,.05) 40%, rgba(8,6,11,.35) 100%)",
                opacity: hard(T, s2 + b(5), s2 + b(12)),
              }}
            />
            <div
              style={{
                position: "absolute",
                left: M,
                right: M,
                top: 620,
                opacity: hard(T, s2 + b(5), s2 + b(12)),
                textAlign: "center",
              }}
            >
              <div
                style={{ position: "relative", width: 820, margin: "0 auto" }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 1000,
                    height: 1000,
                    transform: "translate(-50%,-50%)",
                    background:
                      "radial-gradient(circle, rgba(123,47,247,.5), rgba(123,47,247,0) 62%)",
                    filter: "blur(24px)",
                    opacity:
                      fade(T, s2 + b(5.25), s2 + b(7)) *
                      (0.75 + 0.25 * Math.sin(T * 3.4)),
                  }}
                />
                <Img
                  src={staticFile("promo/logo-pub.png")}
                  style={{
                    position: "relative",
                    width: 820,
                    display: "block",
                    opacity: fade(T, s2 + b(5.25), s2 + b(6.5)),
                    transform: `scale(${interpolate(T, [s2 + b(5.25), s2 + b(7.25)], [0.86, 1], { easing: EASE_OUT, ...CL })}) translateY(${lin(T, s2 + b(5), s2 + b(12), 14, -14)}px)`,
                    filter: `drop-shadow(0 0 ${30 + 14 * Math.sin(T * 3.4)}px rgba(123,47,247,.75))`,
                    scale: 1.021,
                    translate: "1.1px -24.5px",
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 112,
                  lineHeight: 1.06,
                  color: ACCENT,
                  marginTop: 26,
                  opacity: fade(T, s2 + b(8), s2 + b(9.25)),
                  textShadow: "0 6px 40px rgba(8,6,11,.9)",
                }}
              >
                ESTÁ DE VOLTA.
              </div>
            </div>
          </AbsoluteFill>
        )}

        {/* 3. E DIA 28 A GENTE VAI FAZER BARULHO */}
        {vis(s3, s4) && (
          <AbsoluteFill style={{ transform: `translateX(${shake3}px)` }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#26094F",
                overflow: "hidden",
                opacity: soft(T, s3, s3 + b(10), 0.4),
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 1800,
                  height: 1800,
                  transform: `translate(-50%,-50%) scale(${1 + 0.05 * Math.sin(T * 1.4)})`,
                  background:
                    "radial-gradient(circle, rgba(140,72,255,.8), rgba(38,9,79,0) 62%)",
                  filter: "blur(24px)",
                }}
              />
              <Img
                src={staticFile("video/halftone.png")}
                style={{
                  position: "absolute",
                  inset: "-10%",
                  width: "120%",
                  height: "120%",
                  objectFit: "cover",
                  opacity: 0.18,
                  mixBlendMode: "overlay",
                  transform: `scale(${1.06 + Math.sin(T * 0.7) * 0.04}) rotate(${Math.sin(T * 0.4) * 2}deg)`,
                }}
              />
              <Img
                src={staticFile("video/light-leak.png")}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.22 + 0.1 * Math.sin(T * 2.1),
                  mixBlendMode: "screen",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 50% 48%, rgba(8,6,11,.1) 30%, rgba(8,6,11,.8) 100%)",
                }}
              />
            </div>
            <Video
              src="promo/v8-barulho.mp4"
              t={s3}
              d={b(10)}
              off={1.5}
              z0={1.04}
              z1={1.16}
              tr={0.35}
              T={T}
            />
            {scrim(G_CHEIO)}
            <Legenda t={s3 + b(0.5)} d={b(9.5)} T={T} bottom={300} size={126}>
              E <span style={{ color: ACCENT }}>DIA 28...</span>
              <br />
              <span style={{ opacity: fade(T, s3 + b(4.5), s3 + b(5.5)) }}>
                A GENTE VAI
                <br />
                FAZER BARULHO.
              </span>
            </Legenda>
          </AbsoluteFill>
        )}

        {/* 4. PORQUE DESSA VEZ O ROCK É AO VIVO — ZERODOZE ROCKET */}
        {vis(s4, s6) && (
          <AbsoluteFill
            style={{
              background: INK,
              /* sai enquanto a cena da placa entra, sem dividir o quadro com ela */
              opacity: 1 - fade(T, s6 - 0.45, s6 - 0.15),
            }}
          >
            {/* luz roxa atrás da banda: subiu para a área que não é coberta
                pela foto nem pelo degradê de baixo, senão não se vê */}
            {glow(-200, 0.5)}
            <Banda
              t={s4}
              d={b(5)}
              z0={3.1}
              z1={3.35}
              ox0={200}
              ox1={150}
              oy0={120}
              oy1={90}
              T={T}
            />
            <Banda
              t={s4 + b(5)}
              d={b(4)}
              z0={1.9}
              z1={1.5}
              oy0={40}
              oy1={10}
              tr={0.3}
              T={T}
            />
            <div
              style={{
                position: "absolute",
                left: -80,
                right: -80,
                top: 470,
                display: "flex",
                flexDirection: "column",
                gap: 22,
                opacity: fade(T, s4 + b(8.75), s4 + b(9.5)),
              }}
            >
              {(
                [
                  ["rgba(123,47,247,.55)", 0],
                  ["rgba(246,194,27,.4)", 90],
                  ["rgba(244,242,247,.28)", 180],
                ] as [string, number][]
              ).map(([cor, dx], k) => (
                <div
                  key={k}
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 64,
                    lineHeight: 1,
                    color: cor,
                    letterSpacing: 10,
                    whiteSpace: "nowrap",
                    transform: `translateX(${tick + dx}px)`,
                  }}
                >
                  MÚSICA AO VIVO · MÚSICA AO VIVO · MÚSICA AO VIVO · MÚSICA AO
                  VIVO
                </div>
              ))}
            </div>
            <Img
              src={staticFile("banda.png")}
              style={{
                position: "absolute",
                left: "50%",
                bottom: 470,
                width: 1080,
                transform: `translateX(calc(-50% + ${4 * hit(T, s4 + b(10), 0.12)}px)) translateY(${interpolate(T, [s4 + b(9), s4 + b(11.5)], [70, 0], { easing: EASE_OUT, ...CL })}px)`,

                opacity:
                  hard(T, s4 + b(9), s6 + 0.1) *
                  fade(T, s4 + b(9), s4 + b(10.25)),

                WebkitMaskImage:
                  "linear-gradient(180deg, #000 62%, rgba(0,0,0,0) 96%)",

                maskImage:
                  "linear-gradient(180deg, #000 62%, rgba(0,0,0,0) 96%)",

                translate: "6.1px 35.4px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 820,
                background:
                  "linear-gradient(180deg, rgba(8,6,11,0) 0%, rgba(8,6,11,.85) 46%, #08060B 72%)",
              }}
            />
            <Legenda t={s4 + b(0.5)} d={b(4.5)} T={T} bottom={300} size={122}>
              PORQUE
              <br />
              DESSA VEZ...
            </Legenda>
            <Legenda
              t={s4 + b(5)}
              d={b(4)}
              T={T}
              bottom={300}
              size={132}
              color={ACCENT}
            >
              O ROCK É<br />
              AO VIVO.
            </Legenda>
            <div
              style={{
                position: "absolute",
                left: M,
                right: M,
                bottom: 250,
                opacity: hard(T, s4 + b(9), s6 + 0.1),
              }}
            >
              <div style={{ opacity: fade(T, s4 + b(9.25), s4 + b(10)) }}>
                <Kicker>no palco</Kicker>
              </div>
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
                    fontSize: 138,
                    lineHeight: 1.05,
                    color: PAPER,
                    transform: `translateY(${(1 - interpolate(T, [s4 + b(9.25), s4 + b(10.25)], [0, 1], { easing: EASE_OUT, ...CL })) * 118}%)`,
                  }}
                >
                  ZERODOZE
                  <br />
                  ROCKET
                </div>
              </div>
              <div
                style={{
                  height: 3,
                  background: ACCENT,
                  marginTop: 24,
                  width: `${interpolate(T, [s4 + b(10.5), s4 + b(13)], [0, 100], { easing: EASE_OUT, ...CL })}%`,
                }}
              />
            </div>
          </AbsoluteFill>
        )}

        {/* 6. CONFRARIA ROTA 116 */}
        {vis(s6, s7) && (
          /* entra por uma rampa só: nada da cena aparece antes da foto */
          <AbsoluteFill style={{ opacity: fade(T, s6 - 0.3, s6) }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 1120,
                overflow: "hidden",
              }}
            >
              {/* solta do helper Foto: essa imagem se ajusta sozinha.
                  A animação (fade e zoom) fica no div de fora, então
                  translate, scale e rotate do <Img> estão livres para o Studio. */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: soft(T, s6, s6 + b(8), 0.85),
                  scale: lin(T, s6 - 0.85, s6 + b(8) + 0.85, 1.16, 1),
                }}
              >
                <Img
                  name="Placa Rota 116"
                  src={staticFile("promo/placa-rota116.jpg")}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "58% 30%",
                    filter: "contrast(1.05) saturate(1.04)",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 900,
                background:
                  "linear-gradient(180deg, rgba(8,6,11,0) 0%, rgba(8,6,11,.9) 22%, #08060B 34%)",
                opacity: soft(T, s6, s6 + b(8), 0.6),
              }}
            />
            {scrim(G_CHEIO)}
            {/* o roxo entra depois dos escurecimentos, senão eles o apagam */}
            {glow(900, 0.38)}
            <div
              style={{
                position: "absolute",
                left: M,
                right: M,
                bottom: 300,
                opacity: soft(T, s6, s6 + b(8), 0.5),
              }}
            >
              <div style={{ opacity: fade(T, s6 + b(1), s6 + b(2.5)) }}>
                <Kicker>nosso ponto de encontro</Kicker>
              </div>
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
                    fontSize: 124,
                    lineHeight: 1.06,
                    color: ACCENT,
                    transform: `translateY(${(1 - interpolate(T, [s6 + b(1), s6 + b(3)], [0, 1], { easing: EASE_OUT, ...CL })) * 118}%)`,
                  }}
                >
                  CONFRARIA
                  <br />
                  ROTA 116
                </div>
              </div>
              <div
                style={{
                  fontFamily: META,
                  fontWeight: 500,
                  fontSize: 44,
                  lineHeight: 1.24,
                  color: MUTED,
                  marginTop: 22,
                  opacity: fade(T, s6 + b(3), s6 + b(4.5)),
                }}
              >
                Av. Antônio Marota, 375 — Parque Primavera
                <br />
                Cachoeira Paulista · SP
              </div>
            </div>
          </AbsoluteFill>
        )}

        {/* 7. FECHO */}
        {T > s7 - 0.35 && (
          <AbsoluteFill style={{ background: INK }}>
            {glow(700, 0.3)}
            <div
              style={{
                position: "absolute",
                left: M,
                right: M,
                top: 430,
                textAlign: "center",
                opacity: hard(T, s7 - 0.1, TOTAL_SEC),
              }}
            >
              <Img
                src={staticFile("promo/logo-3a.png")}
                style={{
                  width: 880,
                  display: "block",
                  margin: "0 auto",
                  opacity: fade(T, s7 + 0.15, s7 + 0.6),
                  translate: "2px -129.9px",
                }}
              />
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 216,
                  lineHeight: 1.02,
                  color: ACCENT,
                  letterSpacing: -3,
                  /* negativo porque o logo acima está deslocado 130px para cima */
                  marginTop: -30,
                  opacity: fade(T, s7 + 0.5, s7 + 0.95),
                }}
              >
                28.08
              </div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 104,
                  lineHeight: 1.06,
                  color: PAPER,
                  marginTop: 6,
                  opacity: fade(T, s7 + 0.7, s7 + 1.15),
                }}
              >
                ROTA 116 · 19H
              </div>
              <div
                style={{
                  width: 120,
                  height: 3,
                  background: "rgba(244,242,247,.3)",
                  margin: "44px auto",
                  opacity: fade(T, s7 + 0.9, s7 + 1.3),
                }}
              />
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 72,
                  lineHeight: 1.1,
                  color: PAPER,
                  opacity: fade(T, s7 + 1.05, s7 + 1.5),
                }}
              >
                ZERODOZE ROCKET AO VIVO
              </div>
              <div
                style={{
                  fontFamily: META,
                  fontWeight: 700,
                  fontSize: 46,
                  letterSpacing: 6,
                  color: INK,
                  background: ACCENT,
                  padding: "16px 36px",
                  display: "inline-block",
                  marginTop: 44,
                  opacity: fade(T, s7 + 1.3, s7 + 1.75),
                }}
              >
                MARCA NA AGENDA
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 40,
                  opacity: fade(T, s7 + 1.5, s7 + 1.95),
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(244,242,247,.62)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.4" />
                  <circle cx="12" cy="12" r="4.4" />
                  <circle
                    cx="17.6"
                    cy="6.4"
                    r="1.15"
                    fill="rgba(244,242,247,.62)"
                    stroke="none"
                  />
                </svg>
                <div
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 48,
                    color: MUTED,
                    letterSpacing: 1,
                  }}
                >
                  heartdevs
                </div>
              </div>
            </div>
          </AbsoluteFill>
        )}
      </div>
      <Img
        src={staticFile("video/arranhoes.png")}
        style={{
          position: "absolute",
          top: -30,
          left: 0,
          width: "100%",
          height: "calc(100% + 60px)",
          objectFit: "cover",
          opacity: arranhaoOp,
          mixBlendMode: "screen",
          transform: `translateX(${arranhaoX}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: PAPER,
          opacity: clamp(flash, 0, 1) * 0.45,
        }}
      />
      <Img
        src={staticFile("video/grain.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.055,
          mixBlendMode: "overlay",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(8,6,11,0) 42%, rgba(8,6,11,.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
