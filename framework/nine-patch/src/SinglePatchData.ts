export default class SinglePatchData {
  constructor(
    public readonly textureName: string,
    public readonly additionalTextureNames: string[] | undefined,
    public readonly textureWidth: number,
    public readonly textureHeight: number
  ) {
    // Nothing.
  }
}
