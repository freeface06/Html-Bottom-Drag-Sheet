//<i v-if="dismissable" @click="closeSheet" class="material-icons dismiss">keyboard_arrow_down</i>

Vue.component('bottomSheet', {
  template: `
	<div class="sheet-wrap">
  <div ref="overlay" class="overlay">
    // 여기에 바디내용 입력하는 공간
    <button>???</button>
  </div>
  <div ref="sheet" :class="c" class="sheet">
  <header class="handle-head" ref="handle">
  <span class="handle"></span>
    </header>

      <div ref="body" class="body bottom-sheet-body">
        // 여기에 바텀 시트 바디 내용 입력하는 공간
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
        <h1>하이</h1>
      </div>
		</div>
	</div>
	`,
  props: {
    initial: String,
    dismissable: Boolean
  },

  data() {
    return {
      c: '',
      lastPosition: 0
    };

  },
  methods: {
    drag() {
      const vm = this;
      var sheet = this.$refs.sheet;
      var handle = this.$refs.handle;
      var mc = new Hammer(handle);
      vm.lastPosition = sheet.clientHeight;
      mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

      // listen to events...

      mc.on("panup", function (event) {
        sheet.style.maxHeight = Math.abs(event.deltaY) + vm.lastPosition + 'px';
      });
      mc.on("pandown", function (event) {
        sheet.style.maxHeight = vm.lastPosition - event.deltaY + 'px';
      });
      mc.on('panstart', function () {
        vm.removeClass();
      });
      mc.on('panend', function (event) {
        vm.snap(sheet.clientHeight, event.deltaY);
      });
    },
    snap(height, delta) {
      var wh = window.innerHeight;
      var half = wh / 2;
      var sheet = this.$refs.sheet;
      const vm = this;
      if (height < half - 25 && delta > 0) {
        vm.closeSheet();
      } else if (height <= half + 35 || delta > 0) {
        vm.halfSheet();

      } else if (height > half + 15) {
        vm.fullSheet();
      }
    },
    removeClass() {
      var sheet = this.$refs.sheet;
      sheet.classList.remove("half");
      sheet.classList.remove("full");
      sheet.classList.remove("closed");
      var body = this.$refs.body;
      body.classList.remove("half");
      body.classList.remove("full");
      body.classList.remove("closed");
    },
    closeSheet() {
      const vm = this;
      var sheet = this.$refs.sheet;
      sheet.classList.add("closed");
      sheet.classList.remove("half");
      sheet.classList.remove("full");
      sheet.removeAttribute('style');
      var body = this.$refs.body;
      body.classList.add("closed");
      body.classList.remove("half");
      body.classList.remove("full");
      body.removeAttribute('style');
      setTimeout(function () {
        vm.lastPosition = sheet.clientHeight;
      }, 450);
      vm.setOverlay(false);
      vm.$emit('closed');
    },
    halfSheet() {
      const vm = this;
      var sheet = this.$refs.sheet;
      sheet.classList.add("half");
      sheet.removeAttribute('style');
      var body = this.$refs.body;
      body.classList.add("half");
      body.removeAttribute('style');
      setTimeout(function () {
        vm.lastPosition = sheet.clientHeight;
      }, 150);
      vm.setOverlay('half');
      vm.$emit('half');
    },
    fullSheet() {
      const vm = this;
      var sheet = this.$refs.sheet;
      sheet.classList.add("full");
      sheet.removeAttribute('style');
      var body = this.$refs.body;
      body.classList.add("full");
      body.removeAttribute('style');
      setTimeout(function () {
        vm.lastPosition = sheet.clientHeight;
      }, 150);
      vm.setOverlay('full');
      vm.$emit('full');
    },
    setOverlay(arg) {
      const vm = this;
      var overlay = this.$refs.overlay;
      if (arg == false) {
        overlay.classList.remove("half");
        overlay.classList.remove("full");
      } else if (arg == 'half') {
        overlay.classList.remove("full");
        overlay.classList.add("half");
      } else if (arg == 'full') {
        overlay.classList.remove("half");
        overlay.classList.add("full");
      }
    }
  },

  mounted() {
    const vm = this;
    this.drag();
    switch (this.initial) {
      case "half":
        vm.halfSheet();
        vm.setOverlay('half');
        break;
      case "full":
        vm.fullSheet();
        vm.setOverlay('full');
        break;
      default:
        vm.closeSheet();
        vm.setOverlay(false);
    }

    // 외부 클릭 이벤트 리스너를 Vue 인스턴스 내에 추가
    document.addEventListener('click', function (event) {
      var clickedElement = event.target;
      var className = clickedElement.className;

      var arr = className.split(" ");
      if (arr[0] == "overlay") {
        vm.closeSheet();
      }
    });
  }
});

var vm = new Vue({
  el: '#app'
});
