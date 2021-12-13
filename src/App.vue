<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import { getinfo } from "./utils/http/index";
export default {
  name: "App",
  components: {},
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  created() {
    getinfo().then((Response) => {
      if (Response.result === "succeed") {
        this.$store.state.userName = Response.name;
        this.$store.state.userGender = Response.gender;
        this.$store.state.userPhoto = Response.photo;
        if (this.$route.path !== "/menu") this.$router.push("/menu");
      } else {
        if (this.$route.path !== "/login") this.$router.push("/login");
      }
    });
  },
};
</script>

<style>
@import "./assets/font/iconfont.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
