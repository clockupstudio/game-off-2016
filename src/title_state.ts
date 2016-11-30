export class TitleState extends Phaser.State {

    create() {
        this.createText("Github game-off 2016", 18, -280);
        this.createText("F5", 128, -200);
        this.createText("PRESS ANY KEY TO START", 48, 200);
        this.createText("2016 Clockup studio", 24, 500);
        
        this.game.input.keyboard.onPressCallback = ()=> {
            this.input.keyboard.onPressCallback = null;
            this.game.state.start("war");
        };
    }

    createText(text: string, size: number, offsetY: number) {
        let aboveTitleStyle = { font: `bold ${size}px Arial`, fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.game.add.text(this.game.world.centerX, this.game.world.centerY+offsetY, text, aboveTitleStyle).anchor.setTo(0.5, 0.5);
    }
}