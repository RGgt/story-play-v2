import Phaser from 'phaser';
import SinglePatchData from './SinglePatchData';

export default class ThreePatch extends Phaser.GameObjects.Group {
  private spriteM: Phaser.GameObjects.Sprite | undefined;

  protected _bounds: Phaser.Geom.Rectangle | undefined;

  protected _x = 0;

  protected _y = 0;

  protected _scaleX = 1;

  protected _scaleY = 1;

  constructor(public readonly data: SinglePatchData, scene: Phaser.Scene) {
    super(scene);
  }

  init(x: number, y: number, width: number, height: number) {
    this.addFrames(this.data.textureName);
    if (this.data.additionalTextureNames) {
      this.data.additionalTextureNames.forEach((textureName) => {
        this.addFrames(textureName);
      });
    }

    this.calculateScales(width, height);

    const scaleX = this._scaleX;
    const scaleY = this._scaleY;

    this.spriteM = this.scene.add.sprite(x, y, this.data.textureName, 'frmM');
    this._bounds = new Phaser.Geom.Rectangle(x, y, width, height);

    this.spriteM.setOrigin(0, 0);

    this.setScales(scaleX, scaleY);
    this.children.set(this.spriteM);
  }

  protected addFrames(textureName: string) {
    const texture = this.scene.textures.get(textureName);

    texture.add(
      'frmM',
      0,
      0,
      0,
      this.data.textureWidth,
      this.data.textureHeight
    );
  }

  protected setTexture(textureName: string) {
    if (!this.scene) return;
    this.spriteM?.setTexture(textureName, 'frmM');
  }

  protected calculateScales(width: number, height: number) {
    this._scaleX = width / this.data.textureWidth;
    this._scaleY = height / this.data.textureHeight;
  }

  private setScales(scaleX: number, scaleY: number) {
    if (!this.spriteM) throw new Error('Component not initialized!');
    this.spriteM.scaleX = scaleX;
    this.spriteM.scaleY = scaleY;
  }

  public getCenter() {
    if (!this._bounds) throw new Error('Component not initialized!');
    return new Phaser.Geom.Point(this._bounds.centerX, this._bounds.centerY);
  }

  public getBound() {
    if (!this._bounds) return new Phaser.Geom.Rectangle(0, 0, 0, 0);
    return new Phaser.Geom.Rectangle(
      this._bounds.x,
      this._bounds.y,
      this._bounds.width,
      this._bounds.height
    );
  }

  public getLeft() {
    if (!this._bounds) return 0;
    return this._bounds.x;
  }

  public getRight() {
    if (!this._bounds) return 0;
    return this._bounds.x + this._bounds.width;
  }

  public getTop() {
    if (!this._bounds) return 0;
    return this._bounds.y;
  }

  public getBottom() {
    if (!this._bounds) return 0;
    return this._bounds.y + this._bounds.height;
  }

  public destroy(): void {
    super.destroy(true, true);
  }
}
