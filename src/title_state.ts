export class TitleState extends Phaser.State {

    create() {
        let aboveTitleStyle = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.game.add.text(this.game.world.centerX, this.game.world.centerY-280, "Github game-off 2016", aboveTitleStyle).anchor.setTo(0.5, 0.5);

        let titleStyle = { font: "bold 128px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.game.add.text(this.game.world.centerX, this.game.world.centerY-200, "F5", titleStyle).anchor.setTo(0.5, 0.5);

        let messageStyle = { font: "bold 48px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.game.add.text(this.game.world.centerX, this.game.world.centerY+200, "PRESS ANY KEY TO START", messageStyle).anchor.setTo(0.5, 0.5);

        let teamStyle = { font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.game.add.text(this.game.world.centerX, this.game.world.height - 32, "2016 Clockup studio", teamStyle).anchor.setTo(0.5, 0.5);

        this.game.input.keyboard.addCallbacks(this, null, null, ()=> {
            this.game.state.start("war");
        });
    }

}