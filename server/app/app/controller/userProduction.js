'use strict';
const Controller = require('egg').Controller;
const path = require('path')
const fs = require('fs')
class UserProductionController extends Controller {
    //用户上传作品
    async uploadImg() {

        console.log(this.ctx.request.files, 11111)
        //如果没有登录  
        if (!this.ctx.session.userid) {
            this.ctx.body = { code: 4006, info: "用户未登录" }
        }
        //上传的有作品
        else if (this.ctx.request.files[0]) {
            var filename1 = path.basename(this.ctx.request.files[0].filepath)
            var oldpath = `${this.ctx.request.files[0].filepath}`
            var newpath = `${__dirname}/../public/upload/userProductionImg/${filename1}`
            fs.renameSync(oldpath, newpath)
            var imgurl = `http://localhost:7001/public/upload/userProductionImg/${filename1}`
            this.ctx.request.body.upimgsrc = imgurl

            this.ctx.request.body.userid = this.ctx.session.userid

            var re = await this.ctx.service.userProduction.uploadImg(this.ctx.request.body)
            this.ctx.body = { code: 2004, info: "上传成功", img: imgurl }
        }
        //如果没有上传图片
        else {
            this.ctx.body = { code: 4005, info: "没上传图片" }
        }
    }


    //获取所有作品
    async productionImg() {
        this.ctx.body = await this.ctx.service.userProduction.productionImg()
    }

    //用户需要收藏某个摄影图片
    async collectionProduction() {
        //如果没有登录  
        if (!this.ctx.session.userid) {
            this.ctx.body = { code: 4006, info: "用户未登录" }
        }
        else {
            this.ctx.request.query.userid=this.ctx.session.userid
            var re = await this.ctx.service.userProduction.collectionProduction(this.ctx.request.query)
            this.ctx.body = { code: 2006, info: "收藏成功" }
        }

    }



     //获取用户所有收藏的图片
    async getcollectionProduction(){
         //如果没有登录  
         if (!this.ctx.session.userid) {
            this.ctx.body = { code: 4006, info: "用户未登录" }
        }
        else {
            this.ctx.request.query.userid=this.ctx.session.userid
            var re = await this.ctx.service.userProduction.getcollectionProduction(this.ctx.request.query)
            this.ctx.body = re
        }

    }


}
module.exports = UserProductionController;