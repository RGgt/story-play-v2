class ImplicitStateUpdater {
  constructor(private scene: Phaser.Scene) {}

  public processUpdates(data: string, updateStateMode: 'yes' | 'undo' | 'no') {
    switch (updateStateMode) {
      case 'yes':
        console.log('processing changes to state as player arrives here');
        break;
      case 'no':
        console.log(
          'no need to process changes to state as the frame just refreshed'
        );
        break;
      case 'undo':
        console.log(
          'process UNDO changes, as the player is rolling the story back'
        );
        break;

      default:
        throw new Error(`Invalid status update mode '${updateStateMode}'`);
    }
  }
}
export { ImplicitStateUpdater };
