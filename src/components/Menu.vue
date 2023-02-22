<template>
  <div class="menu">
    <div class="commen commen1" @mousedown="commenModal">公告</div>
    <div class="commen skill" @mousedown="skillModal">技能</div>
    <div class="commen course" @mousedown="courseModal">教程</div>
    <div class="content">
      <button class="menu-button" @click="single">单人游戏</button>
      <button class="menu-button" @click="multi">多人游戏</button>
      <button class="menu-button">游戏社区</button>
      <div class="menu-bottom-button">
        <button @click="personSetting">个人设置</button>
        <button @click="exitGame">退出游戏</button>
      </div>
    </div>
    <div class="chat">
      <div class="chat_list"></div>
      <input
        class="chat_input"
        type="text"
        @keyup.enter="tochat"
        v-model="value"
      />
    </div>
    <ModalBox v-if="commenshow" v-on:hide="hidecommen">
      <div slot="header">
        <h2>公告</h2>
      </div>
      <div slot="section">
        <div style="text-indent: 2em">
          这是一个休闲moba类游戏， 游戏的操作类似英雄联盟，
          击杀你所看到的所有敌人完成胜利, 现在完成了单人模式和多人模式，
          单人模式可以尽情的去击杀电脑， 多人模式可以拉着你的好伙伴一起玩耍，
          目前游戏的可玩性还不高大部分功能还没有实现，
          但是希望你们可以感受到乐趣， 如果后续我有空的话我会继续完善这个作品。
        </div>
        <div style="text-indent: 2em">祝你们玩的开心😁</div>
      </div>
    </ModalBox>

    <ModalBox v-if="skillshow" v-on:hide="hideskill">
      <div slot="header">
        <h2>技能</h2>
      </div>
      <div slot="section">
        <div>目前就开发了两个技能就先不写这个了</div>
      </div>
    </ModalBox>

    <ModalBox v-if="courseshow" v-on:hide="hidecourse">
      <div slot="header"><h1>游戏教程</h1></div>
      <div slot="section">
        <h1>按m可以关闭游戏音乐</h1>
        <h4 style="text-indent: 2em">
          进入游戏后我们首先先修改一下我们的个人信息这样增加游戏的辨识度，
          我们首先点击游戏首页的个人设置
        </h4>
        <img src="@/assets/image/course/1.png" alt="" width="100%" />
        然后我们可以看到我给你们默认分配的头像和游戏名，
        如果你对这个头像不满意可以通过以下方式修改
        <img src="@/assets/image/course/6.png" alt="" width="100%" />
        点击链接
        <img src="@/assets/image/course/7.png" alt="" width="100%" />
        选出你喜欢的头像右键在新标签打开
        <img src="@/assets/image/course/8.png" alt="" width="100%" />
        复制出url地址
        <img src="@/assets/image/course/9.png" alt="" width="100%" />
        给原来的url换成这个保存刷新以下就可以啦
        <div style="text-indent: 2em">
          修改名称和头像时候我们就可以先开始一句入门人机，
          点击单人模式简单进入游戏。
        </div>
        <img src="@/assets/image/course/2.png" alt="" width="100%" />
        <h3>游戏操作方式</h3>
        <li>鼠标右键进行移动</li>
        <li>
          鼠标左键进行火球攻击， 这个是后来加的推荐用q技能释放火球，
          你也可以两个一起按可以出两个（游戏特性(●'◡'●)）
        </li>
        <li>q技能发射火球 冷却0.3s</li>
        <li>
          f技能进行闪现 冷却5s 闪现到你指针所指的地方
          按y解除视角锁定可以实现距离无线
        </li>
        <li>esc打开游戏菜单退出游戏</li>
        <li>按y可以取消视角锁定然后就可以在小地图上进行视角移动</li>
        <li>取消视角后可以按住空格锁定自己</li>
        <li>方向键移动视角</li>
        <li>
          我还写了wasd的移动方式， 但是这中移动方式在多人游戏中没有加进去，
          因为用这个同步起来延迟有点高
        </li>
        <li>单人模式下wasd和鼠标右键一起按会双倍移速 （游戏特性(●'◡'●)）</li>
        <h3>特殊方块</h3>
        <li>
          普通方块 黑色的就是普通方块没有效果 如果玩家飞出地图就会每秒扣10滴血
        </li>
        <li>回血方块 在这个方块上每秒钟会回5滴血 玩家最高血量50</li>
        <li>岩浆方块 在这个方块上每秒扣10滴血</li>
        <li>冰块 在这个方块上会给一个3秒的脚滑状态，可能会被打飞(。・∀・)ノ</li>
        <img src="@/assets/image/course/3.png" alt="" width="100%" />
        <div>
          多人模式下我们按回车可以进行聊天，在死亡后我们可以按esc快速匹配，
          匹配机制是3个人一个房间， 刷新会退出房间
        </div>
        <img src="@/assets/image/course/4.png" alt="" width="100%" />
        <h5>
          游戏的时候我们可以按f11进入全屏模式，沉浸式体验，
          但是现在有给bug有的时候多人模式自适应会失灵，例如下面这样，
          我么这个时候手动调整下窗口大小或者刷新一下就会恢复
        </h5>
        <img src="@/assets/image/course/5.png" alt="" width="100%" />
      </div>
    </ModalBox>
  </div>
</template>

<script>
import { logout } from "../utils/http/index";
import ModalBox from "../view/ModalBox.vue";
export default {
  data() {
    return {
      value: "",
      initchat: false,
      commenshow: false,
      skillshow: false,
      courseshow: false,
      modalshow: false,
    };
  },
  components: {
    ModalBox,
  },
  mounted() {
    this.ws = new WebSocket("ws://82.157.165.74:8000/wss/hallchat/");

    this.ws.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (
        data.event === "chat" &&
        this.$store.state.userName !== data.name &&
        data.name !== "系统"
      ) {
        this.send_list_add_data(data.name, data.message);
      } else if (data.name === "系统" && this.initchat === false) {
        this.send_list_add_data(
          data.name,
          "当前有" + data.message + "个人在主页"
        );
        this.initchat = true;
      }
    };
  },
  methods: {
    hidecommen() {
      this.commenshow = false;
    },
    commenModal() {
      this.commenshow = true;
    },
    hideskill() {
      this.skillshow = false;
    },
    skillModal() {
      this.skillshow = true;
    },
    hidecourse() {
      this.courseshow = false;
    },
    courseModal() {
      this.courseshow = true;
    },
    hideModal() {
      this.modalshow = false;
    },

    tochat() {
      this.list_add_data(this.$store.state.userName, this.value);
      this.ws.send(
        JSON.stringify({
          event: "chat",
          name: this.$store.state.userName,
          message: this.value,
        })
      );
      this.value = "";
    },
    list_add_data(name, message) {
      let box = document.querySelector(".chat_list");
      let div = document.createElement("div");
      div.style.width = "100%";
      div.innerHTML = `<span class="chat_item" style="color: #2c80c5">${name}</span>: ${message}`;
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
    },
    send_list_add_data(name, message) {
      let box = document.querySelector(".chat_list");
      let div = document.createElement("div");
      div.style.width = "100%";
      div.innerHTML = `<span class="chat_item" style="color: #2c80c5">${name}</span>: ${message}`;
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
    },
    single() {
      this.$router.push("/singlegrade");
    },
    multi() {
      this.$router.push("/multi");
    },
    personSetting() {
      this.$router.push("/setting/personSetting");
    },
    exitGame() {
      this.$router.push("/login");
      logout().catch((e) => {
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
.chat {
  position: absolute;
  left: 0%;
  bottom: 0%;
  width: 25%;
  height: 40%;
  background-color: rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar {
  width: 0; /*滚动条宽度*/
  height: 16px; /*滚动条高度*/
}
.chat_item {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.chat > div {
  width: 100%;
  height: 85%;
  color: #eee;
  overflow: scroll;
}
.chat > input {
  width: 100%;
  height: 15%;
}
</style>