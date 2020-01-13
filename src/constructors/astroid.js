import astroidOptions from '../utils/goodAstroidsMaping'
export const CreateAstroid = function (x, y, radius, ctx, good, height, width) {
    let index = 1 + Math.floor((Math.random() * astroidOptions.length))
    this.x = x,
        this.y = y,
        this.radius = radius,
        this.isGoodAstroid = good,
        this.goodAstroidOptions = astroidOptions.find(opt => opt.key == index),
        this.update = function(fallspeed) {
            if (this.y > height) {
                if(this.isGoodAstroid) {
                    return 0
                }
                else {
                    this.y = 0;
                }
            } else {
                this.y += fallspeed ;
            }
            if (this.x < 0) {
                this.x = width;
            } else {
                this.x -= 1;
            }
            this.draw();
            return 1
        },
        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.isGoodAstroid ? this.goodAstroidOptions.color : "red";
            ctx.fill();
            if(this.isGoodAstroid) {
                ctx.beginPath()
                ctx.font = "14px Proxima";
                ctx.fillStyle = 'white'
                ctx.fillText(this.goodAstroidOptions.text, this.x - 5, this.y + 5)
                ctx.fill()
            }

        };
}