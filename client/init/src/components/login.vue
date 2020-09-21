<template>
  <div class="log-regbox">
    <div class="title1">
      <span >请登录您的账号！</span>
      <!-- <p v-if="showerr">账号或密码错误！</p> -->
      <button @click="lofin()">确认登录</button>
    </div>
    <div class="acc-padbox">
      <div>
        <span>账号：</span>
        <input v-model="email" type="text" placeholder="请输入您的账号！" />
      </div>
      <div>
        <span>密码：</span>
        <input v-model="pwd" type="text" placeholder="请输入您的密码！" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      pwd: "",
      // showerr: false,
    };
  },
  methods: {
    async lofin() {
      var res = await this.$axios.post("/login", {
        email: this.email,
        pwd: this.pwd,
      });
      console.log(res);
      if (res.data.code == 2002) {
        //登录成功
        //先做缓存
        //1.前端做缓存---3种方式--Localstorage sessionStorage Cookie
        //2.后端缓存---后端2种方式-前端1种(cookie)
        localStorage.setItem("isLogin", true);
        this.$router.push("/my");
      } else if (res.data.code == 4003) {
        alert("账号或密码错误！")
      }
    },
  },
};
</script>

<style>
.log-regbox {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 400px;
  height: 200px;
  text-align: center;
  /* background-color: wheat; */
  border-radius: 10px;
  border: 1px solid #64958f;
}
.log-regbox .title1 {
  /* display: flex;
  justify-content: space-evenly; */
  /* background-color: turquoise; */
}
.log-regbox .title1 p {
  display: inline-block;
}
.log-regbox .title1 span {
  position: relative;
  top: 1px;
  right: -19px;
}
.log-regbox .title1 button {
  position: relative;
  top: 0;
  right: -49px;
  display: inline-block;
}
.log-regbox button {
  
  outline: none;
  width: 70px;
  height: 30px;
  font-family: "幼圆";
  border-radius: 10px;
  background-color: #f1f1e8;
  border: 1px solid transparent;
}
.log-regbox .acc-padbox {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  width: 280px;
  height: 80px;
  /* background-color: rgb(153, 206, 188); */
}
.log-regbox input {
  width: 150px;
  height: 25px;
  background: none;
  outline: none;
  padding-left: 5px;
  font-size: 13px;
  border-radius: 10px;
  border: 1px solid #64958f;
}
</style>