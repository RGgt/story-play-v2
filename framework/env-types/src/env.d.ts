/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DRAW_DEBUG_RECTANGLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
