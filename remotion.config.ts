// Todas as opções: https://remotion.dev/docs/config
// Cada uma também existe como flag do CLI: https://remotion.dev/docs/cli
//
// Ao usar as APIs de Node este arquivo não vale: passe as opções direto na API.

import { Config } from "@remotion/cli/config";

Config.setRspack(true);

// Master para o Reels do Instagram: 1080x1920, 30fps, H.264/AAC em mp4.
// O Instagram reencoda tudo no upload, então a meta aqui é entregar a ele
// um arquivo limpo, não economizar bytes.
Config.setVideoImageFormat("png"); // frame sem perda antes do encode
Config.setCodec("h264"); // o único codec que o Instagram aceita sem ressalva
Config.setCrf(14); // qualidade constante; menor = melhor
Config.setX264Preset("slow"); // mais eficiente no mesmo CRF, encode mais lento
Config.setPixelFormat("yuv420p");
Config.setColorSpace("bt709"); // marca o espaço de cor em vez de deixar o app adivinhar
Config.setAudioBitrate("320k");
Config.setScale(1); // nunca reescalar: 1080x1920 é o nativo do Reels
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
