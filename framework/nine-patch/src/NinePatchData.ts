export default class NinePatchData {
  constructor(
    public readonly textureName: string,
    public readonly additionalTextureNames: string[] | undefined,
    public readonly textureWidth: number,
    public readonly textureHeight: number,
    public readonly textureCornerWidth: number,
    public readonly textureCornerHeight: number
  ) {
    // Nothing.
  }
}
