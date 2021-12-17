<template>
  <div class="multiMode">
    <div class="menu" v-if="showMenu">
      <button class="menu_item" @click="backGame">返回游戏</button>
      <button class="menu_item" @click="refreshGame">从新开始</button>
      <button class="menu_item" @click="exitGame">退出游戏</button>
    </div>
  </div>
</template>

<script>
import gameInit from "@/utils/js/game/multiMode";
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  inject: ["reload"],
  mounted() {
    if (this.$store.state.userPhoto != "") {
      cancelAnimationFrame(this.$store.state.animationId);
      let root = document.querySelector(".multiMode");
      gameInit(this.$store, root);
    } else {
      setTimeout(() => {
        cancelAnimationFrame(this.$store.state.animationId);
        let root = document.querySelector(".multiMode");
        gameInit(this.$store, root);
      }, 300);
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.showMenu = !this.showMenu;
        if (this.showMenu === true) {
          setTimeout(() => {
            let menu = document.querySelector(".menu");
            menu.addEventListener("contextmenu", (e) => {
              if (e.which === 3) {
                e.preventDefault();
                return false;
              }
            });
          }, 100);
        } else {
        }
      }
    });
  },
  methods: {
    backGame() {
      this.showMenu = !this.showMenu;
    },
    refreshGame() {
      cancelAnimationFrame(this.$store.state.animationId);
      this.reload();
    },
    exitGame() {
      this.$router.push("/menu");
    },
  },
};
</script>

<style scoped>
.multiMode {
  height: 100vh;
  width: 100vw;
  background: url(~@/assets/image/background/image5.jpg) no-repeat center/cover;
  display: flex;
  justify-items: center;
}
.menu {
  position: absolute;
  color: white;
  width: 30%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.menu_item {
  display: block;
  margin-bottom: 5%;
  width: 100%;
  height: 25%;
}
</style>>


