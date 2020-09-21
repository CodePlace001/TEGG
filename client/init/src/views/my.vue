<template>
  <div>
    <div>个人中心</div>
    <div class="myinfo">
      <div class="headingbox">
        <div>
          <img @click="show2()" class="tximg" :src="tximg" />
          <div>{{email}}</div>
        </div>
        <div class="changeimgbox" v-show="touxing">
          <div class="file">
            <div>更换头像</div>
            <input @change="filechange($event)" type="file" />
          </div>
          <button @click="send2()">提交</button>
          <button @click="hide2()">隐藏</button>
        </div>
      </div>
      <div
        style="display: flex; flex-direction: column;justify-content: space-between;  align-items: flex-end; "
      >
        <div @click="destroy()">注销账号</div>
        <div id="input">
          <div v-show="nicheng">
            <button @click="hide()">隐藏</button>
            <button @click="send()">确认</button>
            <input v-model="username" type="text" />
          </div>
          <div @click="show1()">修改昵称</div>
        </div>
        <div @click="signout()">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      username: "",
      touxing: false,
      nicheng: false,
      myemail: "",
      email: "",
      tximg: "",
      file1: "",
    };
  },
  components: {},
  mounted() {
    console.log(999);
    this.$axios.get("/userinfo").then((res) => {
      console.log("000000000", res.data);
      if (res.data[0]) {
        // this.email = `${res.data[0].email}`;
        this.myemail = `${res.data[0].email}`;
        this.tximg = res.data[0].img;
        if (res.data[0].username) {
          this.email = `${res.data[0].username}`;
        } else {
          this.email = `${res.data[0].email}`;
        }
      } else {
        this.email = "未登录！";
        this.tximg = "http://localhost:7001/public/upload/touxiang.jpg";
      }
    });
  },
  methods: {
    // 上传头像
    filechange(e) {
      //e.target.files[0]获取图片信息
      //把他设置到file1里面，然后我们就可以在send()里面用这个信息
      this.file1 = e.target.files[0];
    },
    //提交上传头像
    send2() {
      var f = new FormData();
      f.append("file1", this.file1);
      f.append("myemail", this.myemail);
      var res = this.$axios
        .post("/register", f, {
          header: { "content-Tyoe": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          console.log(res);
          this.$axios.get("/userinfo").then((res) => {
            // console.log(res.data);
            this.tximg = `${res.data[0].img}`;
          });
        });
    },
    //修改昵称
    show1() {
      if (this.email == "未登录！") {
        alert("请先登录！");
      } else {
        this.nicheng = true;
      }
    },
    //修改头像
    show2() {
      console.log(this.email);
      if (this.email == "未登录！") {
        alert("请先登录！");
      } else {
        this.touxing = true;
      }
    },
    //隐藏修改昵称输入框
    hide() {
      this.nicheng = false;
    },
    //隐藏修改头像输入框
    hide2() {
      this.touxing = false;
    },
    //改昵称
    send() {
      if (this.username) {
        console.log(this.username);
        this.$axios
          .get(`/username?username=${this.username}&myemail=${this.myemail}`)
          .then((res) => {
            console.log(res);
            if (res) {
              this.$axios.get("/userinfo").then((res) => {
                // console.log(res.data);
                if (res.data[0]) {
                  this.email = `${res.data[0].username}`;
                }
              });
            }
          });
      } else {
        alert("昵称为空！");
      }
    },
    //注销账号
    destroy() {
      this.$axios.get("/destroy").then((res) => {
        console.log(res);
      });
      this.email = "未登录！";
      this.tximg = "http://localhost:7001/public/upload/touxiang.jpg";
      // require("@/assets/logo.png");
      // http://localhost:7001/public/upload/touxiang.jpg
    },

    //退出登录  这个有问题
    signout() {
      this.email = "未登录！";
      this.tximg = "http://localhost:7001/public/upload/touxiang.jpg";
      var storage = window.localStorage;
      storage.clear();
    },
  },
};
</script>

<style>
.myinfo {
  display: flex;
  justify-content: space-between;
  font-family: "幼圆";
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #64958f;
  /* background-color: aqua; */
}
.headingbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 240px;
  /* background-color: coral; */
}
.tximg {
  width: 50px;
  height: 50px;
}

/* 更换头像 */
.changeimgbox {
  display: flex;
  justify-content: space-between;
  width: 180px;
  /* background-color: coral; */
}
#input {
  display: inline-block;
  /* background-color: blueviolet; */
}
#input div {
  display: inline-block;
}
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}

.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}

.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
</style>
