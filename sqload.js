(function() {
  const HTMXSqLoad = {
    init: function(config = {}) {
      this.delay = config.delay || 1000;
      this.initialDelay = config.initialDelay || 100;
      this.triggerEvent = 'sqload';
      
      document.addEventListener("DOMContentLoaded", () => this.setupSequentialLoad());
    },

    setupSequentialLoad: function() {
      const items = document.querySelectorAll(`[hx-trigger="${this.triggerEvent}"]`);
      
      const triggerNextLoad = (index) => {
        if (index < items.length) {
          const item = items[index];
          item.dispatchEvent(new Event(this.triggerEvent));
          setTimeout(() => triggerNextLoad(index + 1), this.delay);
        }
      };

      setTimeout(() => triggerNextLoad(0), this.initialDelay);
    }
  };

  window.HTMXSqLoad = HTMXSqLoad;
})();
