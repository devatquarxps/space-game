class apis {
  async getRideList() {
    let { default: rides } = await import("../../mock/getRides");
    return rides;
  }
}

const plugin = {
  install(Vue) {
    // INSTALL
    if (this.installed) return;
    this.installed = true;

    // EXPOSED
    Vue.apis = new apis();
    Vue.prototype["$apis"] = Vue.apis;
  }
};

export default plugin;
