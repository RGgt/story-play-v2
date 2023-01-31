# story-play-v2
Is the second iteration of my attempt to make games with Phaser.

This is a monorepo structured like this:

* `pages` folder. Contains the **web pages** that will display the game. 
❗TODO: decide is there should be an `Electron` folder or an `Offline` folder, or if these will actually be implemented as different `games`.
* `titles` folder. Contains the **actual games that are (to be) published** and **their resources** (images, translations etc).
* `games` folder. Contains the code that manages the mechanics logic for each game-type supported. E.g.: visual novels, escape rooms, business simulation etc.
* `framework` folder. Contains all code libraries build to support the creation of all the game-types supported.

 