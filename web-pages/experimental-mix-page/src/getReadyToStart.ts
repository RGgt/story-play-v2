import { loadDocument } from './loadDocument';
import { loadGameFonts } from './loadGameFonts';

async function getReadyToStart(): Promise<void> {
  await loadGameFonts();
  await loadDocument();
}

export { getReadyToStart };
