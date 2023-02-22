<template>
  <div class="modalBox">
    <div class="modal">
      <header>
        <slot name="header"></slot>
      </header>
      <div class="section">
        <slot name="section"></slot>
      </div>
      <footer>
        <button @mousedown="hide">确定</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  mounted() {},
  methods: {
    hide() {
      this.$emit("hide");
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
}
.modalBox {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
}
@keyframes init {
  0% {
    filter: blur(10px);
  }
  100% {
    filter: blur(0);
  }
}
.modal {
  width: 45%;
  background-color: white;
  border-radius: 3px;
  position: relative;
}
header {
  color: #333;
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
  height: 30px;
}
.section {
  color: #333;
  padding: 10px;
  width: 100%;
  max-height: 600px;
  overflow-y: scroll;
}
footer {
  margin: 10px;
  width: 100%;
  height: 30px;
}
footer > button:nth-child(1) {
  position: absolute;
  right: 5%;
  color: #fff;
  border: 0;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  background-color: #62a0ff;
}
</style>