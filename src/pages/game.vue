<template>
  <div>
    <!-- IF PLAYING -->
    <div v-show="isPlaying">
      <div class="stats-board bg(black) t(white)">
        <div class="game-chip t(white) bg(red)">Collisions: {{ collided }}</div>
        <div class="game-chip t(white) bg(red)">Level: {{ level }}</div>
        <div class="game-chip t(white) bg(red)">Score: {{ score }}</div>
        <div class="game-chip t(white) bg(red)">{{ timer }}</div>
      </div>
      <canvas
        ref="canvas"
        class="bg(black) cursor(crosshair)"
        id="game"
      ></canvas>
    </div>
    <!-- /IF PLAYING -->

    <!-- IF NOT PLAYING -->
    <div v-show="!isPlaying" class="non-playing-container bg(black) ">
      <div v-if="prevStats" class="t(white)">
        <div class="pb(1)">Score: {{ prevStats.score }}</div>
        <div class="pb(1)">Collisions: {{ prevStats.collisions }}</div>
        <div class="pb(1)">Time: {{ prevStats.time }}</div>
        <div class="pb(1)">Level: {{ prevStats.level }}</div>
      </div>

      <button
        class="game-button t(white) bg(red) cursor(pointer)"
        @click="isPlaying = true"
      >
        New Game
      </button>
    </div>
    <!-- IF NOT PLAYING -->
  </div>
</template>
<script>
import { CreateAstroid } from "../constructors/astroid";
import moment from "moment";
export default {
  data() {
    return {
      prevStats: null,
      initTime: null,
      timer: null,
      canvas: null,
      ctx: null,
      astroids: [],
      mouseY: null,
      mouseX: null,
      score: 0,
      collided: 0,
      collisionTimer: null,
      isMouseOnCanvas: false,
      level: 1,
      statsTimer: null,
      scoreTimer: null,
      isPlaying: false,
      positiveCollideIndex: null,
      fallspeed: 3,
      isPositiveCollision: false
    };
  },
  watch: {
    isMouseOnCanvas: {
      handler() {
        if (this.isMouseOnCanvas && this.timer == null) {
          setInterval(this.updateTimer, 100);
        }
      }
    },
    isPlaying: {
      handler() {
        if (this.isPlaying) {
          this.initAnimation();
        }
      }
    },
    positiveCollideIndex: {
      handler() {
        if (this.positiveCollideIndex) {
          setTimeout(() => {
            if (this.positiveCollideIndex === 2) {
              this.fallspeed = this.fallspeed * 2.8;
            }
            if (this.positiveCollideIndex === 3) {
              this.astroids.forEach(a => (a.radius = a.radius * 3.2));
            }
            this.positiveCollideIndex = null;
            this.isPositiveCollision = false;
          }, 30 * 1000);
        }
      },
      immediate: true
    }
  },
  methods: {
    updateTimer() {
      let time = moment().diff(moment(this.initTime));
      this.timer = `${moment
        .duration(time, "milliseconds")
        .minutes()}: ${moment.duration(time, "milliseconds").seconds()}`;
    },
    resetValues() {
      this.prevStats = {
        score: this.score,
        time: this.timer,
        collisions: this.collided,
        level: this.level < 8 ? this.level : 7
      };
      this.isPlaying = false;
      this.score = 0;
      this.level = 1;
      this.collided = 0;
      this.fallspeed = 3;
      this.timer = null;
      this.initTime = null;
    },
    animate() {
      requestAnimationFrame(() => this.animate());
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < this.astroids.length; i++) {
        let astroid = this.astroids[i];
        let value = astroid.update(this.fallspeed);
        if (!value) {
          this.astroids.splice(i, 1);
        }
      }
      if (this.positiveCollideIndex === 1) {
        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, 20, 0, Math.PI * 2, false);

        this.ctx.strokeStyle = "gold";
        this.ctx.stroke();
      }
      if (!this.isPositiveCollision) {
        this.isPositiveCollision = true;
        if (this.positiveCollideIndex === 2) {
          this.fallspeed = this.fallspeed / 2.8;
        }
        if (this.positiveCollideIndex === 3) {
          this.astroids.forEach(a => (a.radius = a.radius / 3.2));
        }
      }
      this.collision();
    },
    addGoodAstroid() {
      let x = Math.random() * this.canvas.width;
      let y = Math.random() * (this.canvas.height * 0.2);
      let index = this.astroids.findIndex(a => a.isGoodAstroid);
      if (index !== -1) {
        this.astroids.splice(index, 1);
      }
      this.astroids.push(
        new CreateAstroid(
          x,
          y,
          10,
          this.ctx,
          true,
          this.canvas.height,
          this.canvas.width
        )
      );
    },
    mouseEventActions(e) {
      if (e.target.id === "game") {
        this.isMouseOnCanvas = true;
        if (!this.statsTimer) {
          this.scoreTimer = setInterval(() => {
            this.score++;
          }, 100);
          this.statsTimer = setInterval(this.stats, 90 * 1000);
        }
      } else {
        this.isMouseOnCanvas = false;
        clearInterval(this.statsTimer);
        clearInterval(this.scoreTimer);
        this.statsTimer = null;
      }
      this.mouseY = e.offsetY;
      this.mouseX = e.offsetX;
    },
    initAnimation() {
      this.initTime = moment();
      this.astroids = [];
      for (let i = 0; i < 10; i++) {
        let x = Math.random() * this.canvas.width;
        let y = Math.random() * this.canvas.height;
        this.astroids.push(
          new CreateAstroid(
            x,
            y,
            Math.floor(3 + Math.random() * 6),
            this.ctx,
            false,
            this.canvas.height,
            this.canvas.width
          )
        );
      }
      setInterval(this.addGoodAstroid, 60 * 1000);
    },
    collision() {
      if (this.positiveCollideIndex === 1) {
        return;
      }
      let pts = this.astroids;
      let colide = pts.filter(pt => {
        let xCondition =
          this.mouseX >= pt.x - pt.radius && this.mouseX <= pt.x + pt.radius;

        let yCondition =
          this.mouseY >= pt.y - pt.radius && this.mouseY <= pt.y + pt.radius;

        if (xCondition && yCondition) {
          return pt;
        }
      });
      if (colide.length && this.isMouseOnCanvas) {
        if (this.collisionTimer) {
          return;
        }
          // collision debounce
        this.collisionTimer = setTimeout(() => {
          if (!colide.filter(c => c.isGoodAstroid).length) {
            this.collided++;
            this.score--;
          } else {
            if (!this.positiveCollideIndex) {
              let goodAstroid = this.astroids.find(a => a.isGoodAstroid)
                .goodAstroidOptions;
              this.astroids = this.astroids.filter(a => !a.isGoodAstroid);
              this.isPositiveCollision = false;
              this.positiveCollideIndex = goodAstroid.key;
              if (this.positiveCollideIndex === 4) {
                this.positiveCollideIndex = null;
                this.score += 10;
              }
            }
          }
          this.collisionTimer = null;
        }, 200);
      }
    },
    setCanvasDimensions() {
      this.canvas.height = innerHeight - 30;
      this.canvas.width = innerWidth;
    },
    stats() {
      this.level++;
      this.$appStandardSnackbar.show({ text: "LEVEL UP!!" });

      this.fallspeed++;
      for (let i = 0; i < this.level * 3; i++) {
        let x = Math.random() * this.canvas.width;
        let y = Math.random() * this.canvas.height;
        this.astroids.push(
          new CreateAstroid(
            x,
            y,
            3 + Math.floor(Math.random() * this.level),
            this.ctx,
            false,
            this.canvas.height,
            this.canvas.width
          )
        );
      }
      this.astroids.forEach(a => (a.radius = a.radius += 0.5));
    }
  },
  mounted() {
    this.$watch(
      vm => [vm.level, vm.collided],
      value => {
        if (this.level === 8) {
          this.$appStandardSnackbar.show({ text: "Congratulations! You win" });
          this.resetValues();
        } else if (this.collided === 10) {
          this.$appStandardSnackbar.show({ text: "GAME OVER!!" });
          this.resetValues();
        }
      }
    );

    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.setCanvasDimensions();

    addEventListener("resize", () => {
      this.setCanvasDimensions();
      this.initAnimation();
    });

    addEventListener("mousemove", e => {
      this.mouseEventActions(e);
    });

    addEventListener("mouseover", e => {
      this.mouseEventActions(e);
    });

    this.animate();
  }
};
</script>
