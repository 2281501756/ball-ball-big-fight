<template>
  <div class="singleGrade">
    <div class="centent">
      <div class="card" @click="card1">
        <div class="test"></div>
        <div class="box">
          <div class="title">简单</div>
          <div class="brief">有三个怪 每个怪25滴血</div>
        </div>
      </div>
      <div class="card" @click="card2">
        <div class="test"></div>
        <div class="box">
          <div class="title">一般</div>
          <div class="brief">有六个怪 每个怪75滴血</div>
        </div>
      </div>
      <div class="card" @click="card3">
        <div class="test"></div>
        <div class="box">
          <div class="title">困难</div>
          <div class="brief">有十个怪 每个怪100滴血 一个急速怪</div>
        </div>
      </div>
      <div class="card" @click="card4">
        <div class="test"></div>
        <div class="box">
          <div class="title">噩梦</div>
          <div class="brief">有十个怪 每个怪150滴血 五个急速怪</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <button @click="back">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push("menu");
    },
    card1() {
      this.$store.state.gameGrade = 1;
      this.$router.push("single");
    },
    card2() {
      this.$store.state.gameGrade = 2;
      this.$router.push("single");
    },
    card3() {
      this.$store.state.gameGrade = 3;
      this.$router.push("single");
    },
    card4() {
      this.$store.state.gameGrade = 4;
      this.$router.push("single");
    },
  },
};
</script>

<style>
.singleGrade {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/image/background/image5.jpg") no-repeat
    center/cover;
}
.bottom {
  position: absolute;
  width: 100%;
  height: 20%;
  bottom: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom > button {
  height: 40%;
  width: 30%;
  cursor: pointer;
  color: #eee;
  font-size: 20px;
  letter-spacing: 18px;
  border: 2px solid black;
  background: url("~@/assets/image/chartlet/1.png");
}
button:hover {
  border: 3px solid #eee;
}
.centent {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  height: 55%;
}
.card {
  cursor: pointer;
  width: 20%;
  height: 80%;
  overflow: hidden;
  position: relative;
  box-shadow: -7px 2px 90px -9px rgba(0, 0, 0, 0.66);
  -webkit-box-shadow: -7px 2px 90px -9px rgba(0, 0, 0, 0.66);
  -moz-box-shadow: -7px 2px 90px -9px rgba(0, 0, 0, 0.66);
}
.card:hover .box {
  transform: translate(0, 0);
}
.card:hover .test {
  transform: scale(1.1);
  box-shadow: 10px -200px 299px -85px rgba(0, 0, 0, 0.78) inset;
  -webkit-box-shadow: 10px -200px 299px -85px rgba(0, 0, 0, 0.78) inset;
  -moz-box-shadow: 10px -200px 299px -85px rgba(0, 0, 0, 0.78) inset;
}
.test {
  width: 100%;
  height: 100%;
  transition: all 0.4s;
}
.card:nth-child(1) > .test {
  background: url("../../assets/image/card/8.jpg") no-repeat center/cover;
}
.card:nth-child(2) .test {
  background: url("../../assets/image/background/image1.jpg") no-repeat
    center/cover;
}
.card:nth-child(3) .test {
  background: url("../../assets/image/background/image7.jpg") no-repeat
    center/cover;
}
.card:nth-child(4) .test {
  background: url("../../assets/image/card/4.jpg") no-repeat center/cover;
}
.box {
  width: 100%;
  height: 100%;
  top: 0%;
  position: absolute;
  transform: translate(0, 60%);
  transition: all 0.4s;
}
.title {
  width: 100%;
  height: 20%;
  text-align: center;
  position: relative;
  top: 20%;
  font-weight: 600;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 25px;
  color: white;
}
.brief {
  width: 100%;
  height: 40%;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>