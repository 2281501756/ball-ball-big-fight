<template>
  <div class="menu">
    <div class="commen commen1">公告</div>
    <div class="commen skill">技能</div>
    <div class="commen course">教程</div>
    <div class="content">
      <button class="menu-button" @click="single">单人游戏</button>
      <button class="menu-button">多人游戏</button>
      <button class="menu-button">游戏社区</button>
      <div class="menu-bottom-button">
        <button @click="personSetting">个人设置</button>
        <button @click="exitGame">退出游戏</button>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "../utils/http/index";
export default {
  methods: {
    single() {
      this.$router.push("/single");
    },
    personSetting() {
      this.$router.push("/setting/personSetting");
    },
    exitGame() {
      this.$router.push("/login");
      logout()
        .then((Response) => {
          console.log(Response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.menu {
  user-select: none;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/image/background/image4.jpg") no-repeat
    center/cover;
}
.commen {
  cursor: pointer;
  color: white;
  background: url("../assets/image/chartlet/1.png");
  position: absolute;
  padding: 5px;
  font-size: 28px;
}
.commen:hover {
  border: 3px solid #eee;
  border-left: 0;
  transform: translateY(-3px);
}
.commen1 {
  left: 0;
  top: 5%;
}
.skill {
  left: 0;
  top: 15%;
}
.course {
  left: 0;
  top: 25%;
}
.content {
  width: 40%;
  height: 60%;
  padding-top: 100px;
}
button {
  cursor: pointer;
}
.menu-button {
  color: #eee;
  font-size: 20px;
  letter-spacing: 18px;
  border: 2px solid black;
  width: 80%;
  height: 15%;
  margin-bottom: 2%;
  margin-left: 10%;
  background: url("../assets/image/chartlet/1.png");
}
.menu-bottom-button > button {
  color: #eee;
  font-size: 20px;
  letter-spacing: 18px;
  border: 2px solid black;
  width: 45%;
  height: 100%;
  background: url("../assets/image/chartlet/1.png");
}
.menu-bottom-button > button:nth-child(1) {
  margin-right: 10%;
}
.menu-bottom-button {
  margin-top: 10px;
  width: 80%;
  height: 15%;
  margin-bottom: 2%;
  margin-left: 10%;
}
button:hover {
  border: 3px solid #eee;
}
</style>