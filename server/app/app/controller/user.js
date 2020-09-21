'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    //验证码
    async verif() {
        this.ctx.body = await this.ctx.service.user.verif()
    }
    //注册
    async register() {

        //1.如果传头像图片上来
        if (this.ctx.request.files) {
            var filename1 = path.basename(this.ctx.request.files[0].filepath)
            var oldpath = `${this.ctx.request.files[0].filepath}`
            var newpath = `${__dirname}/../public/upload/${filename1}`
            fs.renameSync(oldpath, newpath)
            var imgurl = `http://localhost:7001/public/upload/${filename1}`
            this.ctx.request.body.img = imgurl
        }
        //2.如果不传头像图片上来
        else {
            this.ctx.request.body.img = "http://localhost:7001/public/upload/touxiang.jpg"
        }

        //3.把处理之后的数据传给service的工具函数  让它去处理  把处理的结果发给前端
        this.ctx.body = await this.ctx.service.user.register(this.ctx.request.body)



    }
}

module.exports = UserController;
