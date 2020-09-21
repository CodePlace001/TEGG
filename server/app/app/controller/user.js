'use strict';

const Controller = require('egg').Controller;
const path = require('path')
const fs = require('fs')

class UserController extends Controller {
    //验证码
    async verif() {
        this.ctx.body = await this.ctx.service.user.verif()
    }
    //注册
    async register() {
        // console.log(666)
        // console.log(this.ctx.request.files,11111)

        //1.如果传头像图片上来
        if (this.ctx.request.files[0]) {
            var filename1 = path.basename(this.ctx.request.files[0].filepath)
            var oldpath = `${this.ctx.request.files[0].filepath}`
            var newpath = `${__dirname}/../public/upload/userimg/${filename1}`
            fs.renameSync(oldpath, newpath)
            var imgurl = `http://localhost:7001/public/upload/userimg/${filename1}`
            this.ctx.request.body.img = imgurl
        }
        //2.如果不传头像图片上来
        else {
            this.ctx.request.body.img = "http://localhost:7001/public/upload/touxiang.jpg"
        }

        //3.把处理之后的数据传给service的工具函数  让它去处理  把处理的结果发给前端
        this.ctx.body = await this.ctx.service.user.register(this.ctx.request.body)



    }


    //登录
    async login() {
        var result = await this.ctx.service.user.login(this.ctx.request.body)
        console.log("66666", result);
        if (result[0]) {
            //验证通过,用户输入正确,通知浏览器做cookie缓存,后端保存用户id
            console.log("aaa", this.ctx.request.body.email);
            console.log("bbb", this.ctx.session.email);
            this.ctx.session.email = this.ctx.request.body.email
            this.ctx.body = { code: 2002, info: "登录成功,接下来请求任何接口都不用传账号密码" }
        } else {
            this.ctx.body = { code: 4003, info: "密码或账号错误" }
        }
    }

    //用户信息，头像，昵称
    async userinfo() {
        const { ctx } = this;
        console.log("11111111", ctx.session.email);
        var res = await ctx.service.user.userinfo()
        ctx.body = res;
    }
    // 注销
    async destroy() {
        const { ctx } = this;
        var res = await ctx.service.user.destroy()
        // ctx.body = res;
    }

    // 昵称
    async username() {
        const { ctx } = this;
        console.log(ctx.request.queries, ctx.request.files, ctx.request.body);
        console.log(ctx.request.queries);
        // console.log(ctx.request.queries.username[0]);
        var re = await ctx.service.user.username(ctx.request.queries);
        ctx.body = re;
    }


}

module.exports = UserController;
