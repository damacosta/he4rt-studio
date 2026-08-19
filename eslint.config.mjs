import { config } from "@remotion/eslint-config-flat";

export default [
  ...(Array.isArray(config) ? config : [config]),
  {
    files: ["src/**/*.tsx"],
    rules: {
      // Os planos passam o caminho como string para <Foto> e <Video>, que
      // chamam staticFile() lá dentro (src/helpers.tsx). A regra só enxerga a
      // string na prop e acusa falso positivo.
      "@remotion/no-string-assets": "off",
    },
  },
];
