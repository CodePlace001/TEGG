'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
class UserService extends Service {

  //---验证码
  async verif() {
    //生成验证码 缓存文字 返回给调用者svg标签字符串
    const verifobj = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      bacground: '#cc9966'
    });
    this.ctx.session.verif = verifobj.text;
    return verifobj.data;
  }




  //---注册
  async register(userinfo) {
    console.log("提交的数据:", userinfo)//注册按钮提交时 提交的数据
    console.log("上一次的缓存验证码", this.ctx.session)//上一次的缓存验证码
    if (userinfo.email) {
      if (!this.ctx.session.verif) {
        return { code: 4003, info: "前端没有获取验证码,验证码接口: http://ip:7001/verif" }
      }
      else if (userinfo.verif.toUpperCase() != this.ctx.session.verif.toUpperCase()) {
        return { code: 4001, info: "验证码错误" }
      } else {
        var sql = `select * from userinfo where email="${userinfo.email}"`

        var results = await this.app.mysql.query(sql)
        // console.log(re)
        if (results[0]) {
          return { code: 4002, info: "邮箱已经注册过" }
        } else {
          var sql = `INSERT  INTO userinfo (email,  pwd,  img) VALUES('${userinfo.email}', '${userinfo.pwd1}', '${userinfo.img}')`
          console.log(sql, 1111)
          var results1 = await this.app.mysql.query(sql)
          if (results1.affectedRows > 0) {
            return { code: 2001, info: "注册成功" }
          } else {
            return { code: 5001, info: "注册失败,稍后再试:后端bug" }
          }

        }

      }
    } else {
      var sql = `UPDATE userinfo SET img='${userinfo.img}' WHERE email='${userinfo.myemail}'`;
      var res = await this.app.mysql.query(sql);
      console.log(666666777777);
      return res;
    }

  }



  // 登录
  async login(loginUserInfo) {
    console.log("9999999", loginUserInfo);
    var sql = `select * from userinfo where email="${loginUserInfo.email}" and pwd="${loginUserInfo.pwd}"`
    var result = await this.app.mysql.query(sql)
    console.log("7777777", result);
    return result
  }

  //改昵称
  async username(userinfo) {
    console.log(userinfo.username + "修改的昵称");//用户提交时的数据
    var sql = `UPDATE userinfo SET username='${userinfo.username}' WHERE email='${userinfo.myemail}'`;
    var res = await this.app.mysql.query(sql);
    return res;
  }

  //用户信息，头像，昵称
  async userinfo() {
    var sql = `select * from userinfo WHERE email='${this.ctx.session.email}';`;
    var res = await this.app.mysql.query(sql);
    // console.log(+7777777);
    return res;
  }

  //注销
  async destroy() {
    var sql = `DELETE FROM userinfo WHERE email='${this.ctx.session.email}';`;
    var res = await this.app.mysql.query(sql);
    // console.log(res);
    return res;
  }

}

module.exports = UserService;
