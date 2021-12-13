<template>
  <div class="personSetting">
    <div class="content">
      <div class="person-data photo">
        <div
          :style="{
            background:
              'url(' + this.$store.state.userPhoto + ') no-repeat center/cover',
          }"
        ></div>
      </div>
      <div class="person-data">
        <div class="person-data-item">
          <div>游戏名:</div>
          <input type="text" v-model="name" />
        </div>
        <div class="person-data-item">
          <div>头像URL:</div>
          <input type="text" v-model="url" />
        </div>
        <div class="person-data-item">
          <div>性别:</div>
          <label
            ><input
              type="radio"
              name="gender"
              value="男"
              v-model="gender"
            />男</label
          >
          <label
            ><input type="radio" name="gender" value="女" v-model="gender" />
            女</label
          >
        </div>
        <div class="person-data-item text">
          <a
            href="https://avatars.alphacoders.com/by_category/3"
            target="_blank"
            >头像选取地址</a
          >
        </div>
      </div>
      <div class="bottom">
        <button @click="save_click">保存</button>
        <button @click="exit">退出</button>
      </div>
    </div>
  </div>
</template>
<script>
import { persenSettingSave } from "@/utils/http/index";
export default {
  data() {
    return {
      name: this.$store.state.userName,
      url: this.$store.state.userPhoto,
      gender: this.$store.state.userGender,
    };
  },
  methods: {
    exit() {
      this.$router.push("/menu");
    },
    save_click() {
      if (
        this.name !== this.$store.state.userName ||
        this.url !== this.$store.state.userPhoto ||
        this.gender !== this.$store.state.userGender
      ) {
        persenSettingSave(this.name, this.url, this.gender).then((Response) => {
          this.$store.state.userName = Response.name;
          this.$store.state.userPhoto = Response.url;
          this.$store.state.userPhoto = Response.gender;
        });
      }
      alert("保存成功！请刷新一下");
    },
  },
};
</script>

<style scoped>
.personSetting {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/image/background/image4.jpg") no-repeat
    center/cover;
}
a {
  margin-left: 20%;
  font-size: 20px;
  text-decoration: none;
  color: skyblue;
}
a:hover {
  color: aqua;
}
.content {
  width: 65%;
  height: 100%;
  position: relative;
}
.person-data {
  height: 8%;
  margin-bottom: 10px;
}
.person-data-item {
  width: 50%;
  height: 100%;
  margin-left: 25%;
  margin-bottom: 2%;
}
.person-data-item > div {
  height: 100%;
  width: 20%;
  line-height: 8vh;
  color: white;
  font-size: 20px;
  text-align: center;
  display: inline-block;
}
.person-data-item > input[type="text"] {
  height: 100%;
  width: 80%;
  font-size: 20px;
  float: right;
  border: 0;
  outline: none;
}
.person-data-item > label {
  color: white;
  font-size: 20px;
  margin-right: 10%;
}
.photo {
  height: 30%;
  display: flex;
  justify-content: center;
}
.photo > div {
  height: 100%;
  width: 30vh;
  line-height: 100%;
  display: flex;
  border-radius: 50%;
}

.bottom {
  height: 10%;
  width: 100%;
  position: absolute;
  bottom: 5%;
}
.bottom > button {
  height: 80%;
  width: 40%;
  cursor: pointer;
  color: #eee;
  font-size: 20px;
  letter-spacing: 18px;
  border: 2px solid black;
  background: url("~@/assets/image/chartlet/1.png");
}
.bottom > button:nth-child(1) {
  margin-right: 20%;
}
button:hover {
  border: 3px solid #eee;
}
</style>