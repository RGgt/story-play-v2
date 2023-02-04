# story-play-v2
Is the second iteration of my attempt to make games with Phaser.

This is a monorepo structured like this:

* `web-pages` folder. Contains the **web pages** that will display the game.
Additionally, as there is not acceptable way to bundle assets in npm packages all game assets (e.g: background images, sounds, music, sprites, translations files, json data etc) will be also stored here, in special folders in site the `public` folder.
❗<-TODO: decide is there should be an `Electron` folder or an `Offline` folder, or if these will actually be implemented as different `games`->❗.
* `titles` folder. Contains the code that is particular cu each game to be published (or already published), while for the bulk of the code it relies on a specific game-mechanic that is implemented in a game in the `games` folder. So you may find here code for functionalities that are not commonly used for all game of a specific `games` type, such as, for example, a particular type of text scrolling frame, which, even if it could have been implemented in the base `games`, would have bottled it. Note: as there is no acceptable way to share resources from npm packages and have them accessible in the published page, all game assets will be stored in special folders in the `web-pages` folder.
* `games` folder. Contains the code that manages the mechanics logic for each game-type supported. E.g.: visual novels, escape rooms, business simulation etc. For each time of game, there is a project inside `games` folder, hosting the common logic and mechanic that is too be used in all `titles` based on it.
* `framework` folder. Contains all code libraries build to support the creation of all the game-types supported. It contains folders for each package that isolates some functionality to be used in client projects (including, but not limited, other `framework` projects, `games` and `titles`).

