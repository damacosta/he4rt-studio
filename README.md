# He4rt Studio — He4rt Pub 3ª edição

Reels 1080x1920, 30 fps, ~36s, com trilha. O corte veio do projeto
`Vídeo He4rt Pi 2` (pasta `remotion/`): mesmas cenas, mesmas legendas, mesmos
tempos.

## Rodar

```bash
npm run dev      # abre o Remotion Studio
npm run render   # gera out/he4rt-pub-3a-edicao.mp4
```

## Estrutura (segundos)

| Cena      | Dur. | Conteúdo                                                                                                     |
| --------- | ---- | ------------------------------------------------------------------------------------------------------------ |
| Movimento | 13,1 | "uma noite não é feita pra ficar parado" → é pra chegar → falar de tecnologia → encontrar a galera → brindar |
| Respira   | 5,1  | "e fazer parte" e o He4rt Pub "está de volta" sobre fundo roxo                                               |
| Dia28     | 4,2  | "e dia 28... a gente vai fazer barulho"                                                                      |
| Banda     | 5,9  | "porque dessa vez... o rock é ao vivo" → NO PALCO / ZERODOZE ROCKET                                          |
| Titulo    | 3,4  | Confraria Rota 116 e o endereço                                                                              |
| Fecho     | 4,2  | logo 3ª edição, marca na agenda, 28.08, Rota 116 · 19h, entrada franca, heartdevs                            |

## Onde editar o quê

| O quê                                            | Arquivo                                     |
| ------------------------------------------------ | ------------------------------------------- |
| Duração das cenas, BPM, offset da trilha, paleta | `src/style.ts`                              |
| Ordem/tempo dos planos e as legendas             | `src/Reels.tsx` (tempos em batidas: `b(9)`) |
| Componentes de plano, legenda, grão, vinheta     | `src/helpers.tsx`                           |

Tudo é autorado em segundos e em batidas (`b(n)`, 141,75 BPM). Mudar `BPM` em
`src/style.ts` reajusta o filme inteiro.

## Trilha

`public/promo/trilha.mp3` entra a partir de `MUSICA_IN` (7,709s, onde o riff
começa). Trocando a faixa, ajuste `MUSICA_IN` e `BPM`.

## Assets

`public/promo/` (fotos, vídeos, logos, trilha), `public/video/` (grão, halftone,
light leak, arranhões, pinceladas) e `public/banda.png`.

`base-assets/` guarda o material bruto do evento (fotos, vídeos, a foto da banda
e o mp3 original). Nada dali é lido pelo Remotion: é fonte para gerar os assets
de `public/`.

## Render neste WSL

O Chrome que o Remotion baixa precisa de bibliotecas do sistema que não vêm na
imagem. Sem elas o render quebra com `libnspr4.so: cannot open shared object
file`. Instalar uma vez:

```bash
sudo apt install libnss3 libnspr4 libasound2t64
```
