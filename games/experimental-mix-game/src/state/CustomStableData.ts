interface CustomStableData {
  startingFrame: string;
  frames: FrameData[];
}
interface FrameData {
  code: string;
  components: ComponentData[];
}
interface ComponentData {
  code: string;
  data: string;
  config: object;
}
export type { CustomStableData, FrameData, ComponentData };
