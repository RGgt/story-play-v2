/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DRAW_DEBUG_RECTANGLE: string;
  readonly VITE_DRAW_DEBUG_RECTANGLE_FOR_TEXTS: string;
  readonly VITE_DRAW_DEBUG_RECTANGLE_FOR_SLOTS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
