<template>
  <div class="homepage">
    <div class="log-reg">
      <button
        ref="myInput1"
        @click="fn('login',$event)"
        @mousedown="fn1($event)"
        @mouseup="fn2($event)"
        :style="{backgroundColor: cc,border:'1px solid transparent'}"
      >登录界面</button>
      <button
        ref="myInput2"
        @click="fn('register',$event)"
        @mousedown="fn1($event)"
        @mouseup="fn2($event)"
        :style="{backgroundColor: cc,border:'1px solid transparent'}"
      >注册界面</button>
    </div>
    <keep-alive>
      <component :is="com"></component>
    </keep-alive>
  </div>
</template>

<script>
import login from "@/components/login.vue";
export default {
  data() {
    return {
      cc: "#f1f1e8",
      com: "login",
    };
  },
  components: {
    login,
    register: () => import("@/components/register.vue"),
  },
  methods: {
    fn(arg, $event) {
      this.com = arg;
      var btnadd = $event.target;
    },
    fn1($event) {
      var btnadd = $event.target;

      btnadd.style.backgroundColor = "#bfdcae";
    },
    fn2($event) {
      var btnadd = $event.target;
      btnadd.style.backgroundColor = "#f1f1e8";
    },
  },
};
</script>

<style>
.homepage {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  position: relative;
  border-radius: 5px;
  background-color: #f6f6f6;
  animation: shadow-drop-2-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.log-reg {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 40px;
  left: 50%;
  bottom: 200px;
  position: absolute;
  /* background-color: cyan; */
  transform: translate(-50%, 0);
}
.log-reg button {
  outline: none;
  width: 70px;
  height: 30px;
  font-family: "幼圆";
  border-radius: 10px;
  /* border: 1px solid transparent; */
}
@keyframes shadow-drop-2-center {
  0% {
    transform: translateZ(0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    transform: translateZ(50px);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}
</style>
