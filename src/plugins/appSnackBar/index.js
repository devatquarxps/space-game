import Snackbar from "./appSnackBar.vue";

const AppStandardSnackbar = {
  install(Vue) {
    // INSTALL
    if (this.installed) return;
    this.installed = true;

    // RENDER
    const root = new Vue({ render: h => h(Snackbar) });
    root.$mount(document.body.appendChild(document.createElement("div")));

    // EXPOSED :: SHOW/HIDE
    Vue.appStandardSnackbar = {
      show: ({ text, onClick, timeout }) =>
        root.$emit("show", { text, onClick, timeout }), // SHOW
      hide: () => root.$emit("hide") // HIDE
    };
    Vue.prototype["$appStandardSnackbar"] = Vue.appStandardSnackbar;
  }
};

export default AppStandardSnackbar;
