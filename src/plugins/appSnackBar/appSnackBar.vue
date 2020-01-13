<template>
  <div class="b-app-standard-snackbar" v-if="snackbar.show">
    <div class="b-app-standard-snackbar__box" @click="onClickSnackbar()">
      <div class="b-app-standard-snackbar__box-text">{{ snackbar.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: {
        text: "",
        show: false
      }
    };
  },

  methods: {
    show() {
      this.snackbar.show = true;
    },
    hide() {
      this.snackbar.show = false;
    },
    initAutoHide({ timeout }) {
      setTimeout(() => (this.snackbar.show = false), timeout);
    },
    onClickSnackbar() {}
  },

  mounted() {
    // HANDLE :: SHOW
    this.$root.$on("show", ({ text, onClick = this.hide, timeout = 3000 }) => {
      this.snackbar.text = text;
      this.onClickSnackbar = onClick;
      this.show();

      // AUTO HIDE
      this.initAutoHide({ timeout });
    });

    // HANDLE :: HIDE
    this.$root.$on("hide", () => this.hide());
  }
};
</script>

<style lang="scss">
/* TEXT */
@mixin app-dynamic-text($color, $size, $weight) {
  font-weight: $weight;
  font-size: $size;
  color: $color;

  margin: 0;
  padding: 0;
}
/* /TEXT */

/* FLEX */
@mixin app-dynamic-flex($align, $justify, $direction, $wrap) {
  display: flex;
  flex: {
    direction: $direction;
    wrap: $wrap;
  }
  align-items: $align;
  justify-content: $justify;
}
/* /FLEX */

.b-app-standard-snackbar {
  @media screen and (max-width: 767px) {
    // m
    padding: {
      left: 40px;
      right: 40px;
    }
    @include app-dynamic-flex(flex-start, center, row, nowrap);
  }

  .b-app-standard-snackbar__box {
    border-radius: 4px;
    background-color: rgba(red, 0.5);
    position: fixed;
    cursor: pointer;
    z-index: 5000;
    @media screen and (max-width: 767px) {
      // m
      padding: {
        top: 15px;
        bottom: 12px;
        left: 16px;
        right: 16px;
      }
      width: 100%;
      max-width: 324px;
      bottom: 75px;
    }
    @media screen and (max-width: 320px) {
      // iphone 5
      width: 280px;
    }
    @media screen and (min-width: 768px) {
      // d
      padding: {
        top: 11px;
        bottom: 16px;
        left: 16px;
        right: 16px;
      }
      text-align: center;
      width: 324px;
      top: 20px;
      right: 20px;
    }

    .b-app-standard-snackbar__box-text {
      @include app-dynamic-text(#ffffff, 14px, 400);
    }
  }
}
</style>
