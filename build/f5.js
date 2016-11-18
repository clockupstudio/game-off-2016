/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="./typings/index.d.ts"/>
	"use strict";
	var f5_1 = __webpack_require__(1);
	window.onload = function () { return new f5_1.F5(); };


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Phaser = __webpack_require__(2);
	var war_state_1 = __webpack_require__(3);
	var GAME_WIDTH = 1920;
	var GAME_HEIGHT = 1080;
	var GAME_ID = "f5-game";
	var F5 = (function () {
	    function F5() {
	        this.game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_ID, {
	            create: this.create,
	        });
	    }
	    F5.prototype.create = function () {
	        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	        this.game.scale.pageAlignHorizontally = true;
	        this.game.scale.pageAlignVertically = true;
	        this.game.state.add("war", war_state_1.WarState, false);
	        this.game.state.start("war");
	    };
	    return F5;
	}());
	exports.F5 = F5;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Phaser;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Phaser = __webpack_require__(2);
	var her_1 = __webpack_require__(4);
<<<<<<< HEAD
<<<<<<< HEAD
	var small_fish_1 = __webpack_require__(6);
=======
	var small_fish_1 = __webpack_require__(5);
>>>>>>> Remove ignore's entry for deploy to Github page
=======
	var small_fish_1 = __webpack_require__(6);
>>>>>>> Player can shoot bullet
	var SPRITESHEETS_PATH = "assets/spritesheets";
	var TILEMAPS_PATH = "assets/tilemaps";
	var WarState = (function (_super) {
	    __extends(WarState, _super);
	    function WarState() {
	        _super.apply(this, arguments);
	    }
	    WarState.prototype.preload = function () {
<<<<<<< HEAD
<<<<<<< HEAD
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);
	        this.game.load.image("her", SPRITESHEETS_PATH + "/main_char.png");
	        this.game.load.image("small_fish", SPRITESHEETS_PATH + "/small_fish.png");
	        this.game.load.image("bullet", SPRITESHEETS_PATH + "/bullet.png");
	        this.game.load.tilemap("level_01", TILEMAPS_PATH + "/level_01.json", null, Phaser.Tilemap.TILED_JSON);
	    };
	    WarState.prototype.create = function () {
	        this.levelMap = this.game.add.tilemap("level_01");
	        this.backgroundLayer = this.levelMap.createLayer('Background');
	        this.backgroundLayer.resizeWorld();
	        this.smallFish = small_fish_1.SmallFish.create(this.game);
	        this.herController = new HerController(this.game, this.createHer());
	        //this.game.camera.y = 2280;
	        this.game.camera.follow(this.herController.herSprite);
	    };
	    WarState.prototype.createHer = function () {
	        var position = this.findHerOrigin();
	        return her_1.Her.create(this.game, position.x, position.y);
	    };
	    WarState.prototype.findHerOrigin = function () {
	        var result = {
	            x: this.game.world.centerX,
	            y: this.game.world.centerY
	        };
	        this.levelMap.objects["Player"].find(function (mapObject) {
	            console.log(mapObject);
	            if (mapObject.type === "player_start") {
	                result = {
	                    x: mapObject.x,
	                    y: (mapObject.y - 160)
	                };
	            }
	        });
	        return result;
	    };
	    WarState.prototype.update = function () {
	        console.log(this.camera.y);
	        this.herController.update();
	        if (this.smallFish !== null) {
	            this.smallFish.move();
	            if (this.smallFish.movedOutOfGame()) {
	                this.smallFish.destroy();
	                this.smallFish = null;
	            }
	        }
	    };
	    WarState.prototype.render = function () {
	        this.game.debug.cameraInfo(this.game.camera, 32, 32);
	    };
	    return WarState;
	}(Phaser.State));
	exports.WarState = WarState;
	var HerController = (function () {
	    function HerController(game, her) {
	        this.game = game;
	        this.her = her;
	    }
	    HerController.prototype.update = function () {
=======
=======
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);
>>>>>>> Player can shoot bullet
	        this.game.load.image("her", SPRITESHEETS_PATH + "/main_char.png");
	        this.game.load.image("small_fish", SPRITESHEETS_PATH + "/small_fish.png");
	        this.game.load.image("bullet", SPRITESHEETS_PATH + "/bullet.png");
	    };
	    WarState.prototype.create = function () {
	        this.herController = new HerController(this.game, her_1.Her.create(this.game));
	        small_fish_1.SmallFish.create(this.game);
	    };
	    WarState.prototype.update = function () {
<<<<<<< HEAD
>>>>>>> Remove ignore's entry for deploy to Github page
=======
	        this.herController.update();
	    };
	    return WarState;
	}(Phaser.State));
	exports.WarState = WarState;
	var HerController = (function () {
	    function HerController(game, her) {
	        this.game = game;
	        this.her = her;
	    }
	    HerController.prototype.update = function () {
>>>>>>> Player can shoot bullet
	        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	            this.her.moveRight();
	        }
	        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	            this.her.moveLeft();
	        }
	        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	            this.her.moveUp();
	        }
	        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	            this.her.moveDown();
	        }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
	            this.her.fire();
	        }
	    };
	    return HerController;
	}());
	exports.HerController = HerController;
=======
	    };
	    return WarState;
	}(Phaser.State));
	exports.WarState = WarState;
>>>>>>> Remove ignore's entry for deploy to Github page
=======
	        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
=======
	        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
>>>>>>> build move and shoot at the same time
	            this.her.fire();
	        }
	    };
	    Object.defineProperty(HerController.prototype, "herSprite", {
	        get: function () {
	            return this.her.herSprite;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return HerController;
	}());
	exports.HerController = HerController;
>>>>>>> Player can shoot bullet


/***/ },
/* 4 */
<<<<<<< HEAD
<<<<<<< HEAD
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var bullet = __webpack_require__(5);
=======
/***/ function(module, exports) {

	"use strict";
>>>>>>> Remove ignore's entry for deploy to Github page
=======
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var bullet = __webpack_require__(5);
>>>>>>> Player can shoot bullet
	var VELOCITY = 10;
	var Her = (function () {
	    function Her(sprite) {
	        this.sprite = sprite;
<<<<<<< HEAD
<<<<<<< HEAD
	        this.fireRate = 200;
=======
>>>>>>> Remove ignore's entry for deploy to Github page
=======
	        this.fireRate = 200;
>>>>>>> Player can shoot bullet
	    }
	    Her.prototype.moveRight = function () {
	        this.sprite.x += VELOCITY;
	    };
	    Her.prototype.moveLeft = function () {
	        this.sprite.x -= VELOCITY;
	    };
	    Her.prototype.moveUp = function () {
	        this.sprite.y -= VELOCITY;
	    };
	    Her.prototype.moveDown = function () {
	        this.sprite.y += VELOCITY;
	    };
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Player can shoot bullet
	    Her.prototype.fire = function () {
	        if (this.sprite.game.time.time < this.nextFire) {
	            return;
	        }
	        var bullets = bullet.createDualBullets(this.sprite.game, this.sprite.x, this.sprite.y);
	        bullet.moveBullets(bullets);
	        this.nextFire = this.sprite.game.time.time + this.fireRate;
	    };
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Remove ignore's entry for deploy to Github page
=======
>>>>>>> Player can shoot bullet
	    Her.create = function (game) {
	        var sprite = game.add.sprite(game.world.centerX, game.world.centerY, "her");
	        sprite.anchor.setTo(0.5, 0.5);
=======
	    Object.defineProperty(Her.prototype, "herSprite", {
	        get: function () {
	            return this.sprite;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Her.create = function (game, x, y) {
	        var sprite = game.add.sprite(x, y, "her");
	        //sprite.anchor.setTo(0.5, 0.5);
>>>>>>> set origin point of her from tilemap
	        sprite.inputEnabled = true;
	        return new Her(sprite);
	    };
	    return Her;
	}());
	exports.Her = Her;


/***/ },
/* 5 */
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Player can shoot bullet
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Phaser = __webpack_require__(2);
	var BULLET_VELOCITY = 300;
	function moveBullets(bullets) {
	    bullets[0].body.velocity.y -= BULLET_VELOCITY;
	    bullets[1].body.velocity.y -= BULLET_VELOCITY;
	}
	exports.moveBullets = moveBullets;
	function createDualBullets(game, x, y) {
	    return [
	        new Bullet(game, x - 55, y - 30),
	        new Bullet(game, x + 55, y - 30),
	    ];
	}
	exports.createDualBullets = createDualBullets;
	var Bullet = (function (_super) {
	    __extends(Bullet, _super);
	    function Bullet(game, x, y) {
	        _super.call(this, game, x, y, "bullet");
	        game.add.existing(this);
	        game.physics.arcade.enable(this);
	        this.sendToBack();
	    }
	    return Bullet;
	}(Phaser.Sprite));


/***/ },
/* 6 */
<<<<<<< HEAD
=======
>>>>>>> Remove ignore's entry for deploy to Github page
=======
>>>>>>> Player can shoot bullet
/***/ function(module, exports) {

	"use strict";
	var VELOCITY = 10;
	var SmallFish = (function () {
	    function SmallFish(sprite) {
	        this.sprite = sprite;
	    }
	    SmallFish.prototype.move = function () {
	        this.sprite.y += VELOCITY;
	    };
	    SmallFish.prototype.movedOutOfGame = function () {
	        return (this.sprite.y > 1080);
	    };
	    SmallFish.prototype.destroy = function () {
	        this.sprite.destroy();
	    };
	    SmallFish.create = function (game) {
	        var sprite = game.add.sprite(game.world.centerX, game.world.centerY - 300, "small_fish");
	        sprite.anchor.setTo(0.5);
	        return new SmallFish(sprite);
	    };
	    return SmallFish;
	}());
	exports.SmallFish = SmallFish;


/***/ }
/******/ ]);