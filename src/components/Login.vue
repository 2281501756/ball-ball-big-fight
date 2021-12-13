<template>
  <div class="login">
    <div class="login-form login-form-login" v-if="!isRegister">
      <div class="login-title">随便游戏</div>
      <div class="login-form-item user">
        <input type="text" placeholder="用户名" v-model="username_login" />
      </div>
      <div class="login-form-item password">
        <input type="password" placeholder="密码" v-model="password_login" />
      </div>
      <div class="login-form-item-config">
        <span class="warning">{{ warning_login }}</span>
        <span class="register" @click="goTo">注册</span>
      </div>
      <div class="login-form-item"><button @click="goLogin">登录</button></div>
    </div>

    <div class="login-form login-form-register" v-if="isRegister">
      <div class="login-title">随便游戏</div>
      <div class="login-form-item user">
        <input type="text" placeholder="用户名" v-model="username_register" />
      </div>
      <div class="login-form-item password">
        <input
          type="password"
          placeholder="密码"
          v-model="password_register1"
        />
      </div>
      <div class="login-form-item password">
        <input
          type="password"
          placeholder="确认密码"
          v-model="password_register2"
        />
      </div>
      <div class="login-form-item-config">
        <span class="warning">{{ warning_register }}</span>
        <span class="register" @click="goTo">登录</span>
      </div>
      <div class="login-form-item">
        <button @click="goRegister">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "../utils/http/index";
export default {
  data() {
    return {
      isRegister: false,
      username_login: "",
      password_login: "",
      warning_login: "",
      warning_register: "",
      username_register: "",
      password_register1: "",
      password_register2: "",
    };
  },
  methods: {
    goTo() {
      //登录和注册切换
      this.isRegister = !this.isRegister;
    },
    goLogin() {
      if (this.username_login === "" || this.password_login === "") {
        this.warning_login = "用户名或密码不能为空";
        return;
      }
      login(this.username_login, this.password_login).then((Response) => {
        if (Response.result === "success") {
          this.warning_login = "";
          this.$store.state.userName = Response.name;
          this.$store.state.userGender = Response.gender;
          this.$store.state.userPhoto = Response.photo;
          this.$router.push("/menu");
        } else {
          this.warning_login = "用户名或密码错误";
        }
      });
    },
    goRegister() {
      if (this.username_register === "" || this.password_register1 === "") {
        this.warning_register = "用户名或密码不能为空";
        return;
      }
      register(
        this.username_register,
        this.password_register1,
        this.password_register2
      ).then((Response) => {
        if (Response.result === "succeed") {
          this.warning_register = "注册成功";
        } else {
          this.warning_register = Response.result;
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url("../assets/image/background/image2.jpg") no-repeat
    center/cover;
  overflow: hidden;
  user-select: none;
}
.login-form-login {
  width: 35%;
  height: 45%;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 5px;
}
.login-form-register {
  width: 35%;
  height: 60%;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 5px;
}
.login-title {
  color: white;
  text-align: center;
  font-size: 22px;
  letter-spacing: 5px;
  padding-top: 2%;
  height: 15%;
  margin-bottom: 8%;
}
.login-form-item {
  height: 12%;
  margin-bottom: 4%;
}
.login-form-item > button {
  width: 50%;
  height: 100%;
  outline: none;
  font-size: 16px;
  margin-left: 25%;
}
.login-form-item > input {
  width: 60%;
  height: 100%;
  outline: none;
  font-size: 18px;
  padding-left: 8%;
  margin-left: 20%;
}
.user::before {
  height: 100%;
  font-size: 18px;
  left: 22%;
  margin-top: 2.25%;
  font-family: "iconfont";
  position: absolute;
  content: "\e65e";
}
.password::before {
  height: 100%;
  font-size: 18px;
  left: 22%;
  margin-top: 2.25%;
  font-family: "iconfont";
  position: absolute;
  content: "\e608";
}
.login-form-item-config {
  height: 10%;
}
.warning {
  color: red;
  float: left;
  padding-left: 20%;
}
.register {
  color: white;
  float: right;
  padding-right: 20%;
  cursor: pointer;
}
</style>
