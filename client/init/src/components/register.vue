<template>
  <div>
    <div class="log-regbox" style="height: 230px;">
      <div class="title2">
        <span>请注册一个账号！</span>
        <button @click="send()">确认注册</button>
      </div>
      <p v-if="showyzm" style="color:red">验证码输入错误！</p>
      <p v-if="showuname" style="color:red">此账号已被注册！</p>
      <div class="acc-padbox2">
        <div class="uploadtx">
          <span>上传头像</span>
          <input type="file" @change="filechange($event)" />
        </div>
        <div>
          <span>注册邮箱：</span>
          <input
            v-model="email"
            @focus="yzm"
            @blur="testingzh()"
            type="text"
            placeholder="请注册您的邮箱号"
          />
        </div>
        <div>
          <span>新密码：</span>
          <input v-model="pwd1" @blur="testingpwd()" type="text" placeholder="6-20个字母、数字、下划线" />
        </div>
        <!-- <div>
        <span>确认密码：</span>
        <input v-model="pwd2" type="text" placeholder="请确认您的密码！" />
        </div>-->
        <div>
          <span>验证码：</span>
          <input v-model="verif" @focus="yzm" type="text" placeholder="请输入您的验证码！" />
        </div>
      </div>
    </div>
    <span class="svg" v-html="svg" @click="changeyzm"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      pwd1: "",
      // pwd2: "",
      verif: "",
      file1: "",
      svg: "",
      showyzm: false,
      showuname: false,
    };
  },
  mounted() {
    //页面一挂载就去请求验证码
    this.$axios.get("/verif").then((res) => {
      // console.log(res.data);
      this.svg = res.data;
    });
  },
  components: {},
  methods: {
    filechange(e) {
      //e.target.files[0]获取图片信息
      //把他设置到file1里面，然后我们就可以在send()里面用这个信息
      this.file1 = e.target.files[0];
    },

    //输入框失去焦点
    testingzh() {
      if (this.email) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (!re.test(this.email)) {
          alert("请输入正确的邮箱！");
        }
      }
    },
    testingpwd() {
      if (this.pwd1) {
        var re = /^(\w){6,20}$/;
        if (!re.test(this.pwd1)) {
          alert("密码格式错误！输入6-20个字母、数字、下划线 ！");
        }
      }
    },

    //验证码输入框获取焦点
    yzm() {
      this.showyzm = false;
      this.showuname = false;
    },
    //获取用户交互结构，发给后端
    async send() {
      var re1 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      var re2 = /^(\w){6,20}$/;
      if (re1.test(this.email) && re2.test(this.pwd1) && this.file1) {
        //创建form表单格式数据包，打包数据
        var f = new FormData();
        f.append("file1", this.file1);
        f.append("email", this.email);
        f.append("pwd1", this.pwd1);
        f.append("verif", this.verif);
        // f.append("svg", this.svg);
        var res = await this.$axios.post("/register", f, {
          header: { "content-Tyoe": "application/x-www-form-urlencoded" },
        });
        // .then((res) => {
        // console.log(res.data);
        //code: 4001, info: '验证码错误！'
        //code: 4002, info: '此账号已被注册！'
        //code: 2001, info: '注册成功！'
        // });
        // console.log(res.data);
        if (res.data.code == 4001) {
          this.showyzm = true;
        } else if (res.data.code == 4002) {
          this.showuname = true;
        } else {
          // console.log(res);
          this.$router.go(0);
          // this.$router.push("/my");
        }
      } else if (!this.file1) {
        alert("请上传头像！");
      } else {
        alert("邮箱或密码格式错误");
      }
    },
    //用户点击验证码，再去做网络请求，从而刷新验证码
    //{ params: {} }, { withCredentials: true }
    changeyzm() {
      this.$axios.get("/verif").then((res) => {
        this.svg = res.data;
      });
    },
  },
};
</script>
<style>
.log-regbox .title2 span {
  position: relative;
  top: 7px;
  right: -23px;
}
.log-regbox .title2 button {
  position: relative;
  top: 7px;
  right: -58px;
  display: inline-block;
}
.log-regbox .acc-padbox2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  width: 280px;
  height: 200px;
  /* background-color: rgb(153, 206, 188); */
}

.acc-padbox2 .uploadtx {
  width: 150px;
  height: 25px;
  position: relative;
  display: inline-block;
  /* background: #d0eeff; */
  border: 1px solid #64958f;
  border-radius: 10px;
  /* padding: 4px 12px; */
  padding-left: 5px;
  font-size: 13px;
  overflow: hidden;
  color: #64958f;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.acc-padbox2 .uploadtx span {
  margin-left: -17px;
}
.acc-padbox2 .uploadtx input {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
}

.acc-padbox2 .uploadtx:hover {
  background: #a0c1b8;
  color: #d9ecf2;
  text-decoration: none;
}
.svg {
  position: relative;
  top: 191px;
  right: -327px;
  /* background-color: aqua; */
}
</style>
