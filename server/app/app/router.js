'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;


  //验证码
  router.get("/verif", controller.user.verif)
  //注册
  router.post('/register', controller.user.register);

  //登录
  router.post('/login', controller.user.login);

  router.get('/userinfo', controller.user.userinfo);//用户信息
  router.get('/destroy', controller.user.destroy);//注销
  router.get('/username', controller.user.username);//昵称


  //上传作品
  router.post('/uploadImg', controller.userProduction.uploadImg);


  //获取所有作品(包含官方的用户的作品和普通用户的作品)
  router.get('/allproduction', controller.userProduction.productionImg);



  //用户需要收藏某个摄影图片
  router.get('/collectionProduction', controller.userProduction.collectionProduction);




  //获取用户所有收藏的图片
  router.get('/getcollectionProduction', controller.userProduction.getcollectionProduction);


};
/*
1.验证码接口
url:    /verif
请求方式:   get
参数:  不用传参
返回数据:   svg标签字符串   注:可以直接把字符串用在标签的innerHTM内




2.注册接口

url:    /register
请求方式:   post

参数:
字段名             描述
username         用户名,可以中文随便
email            独一无二,注册过的不能在注册
pwd              用户密码
img              用户上传的头像图片,可以不传有默认头像

返回数据示例:
{ code: 4003, info: "没有先获取验证码 " }
{ code: 4001, info: "验证码错误" }
{ code: 4002, info: "邮箱已经注册过" }
{ code: 2001, info: "注册成功" }
{ code: 5001, info: "注册失败,稍后再试:后端bug" }






3.登录接口

url:    /login
请求方式:   post

参数:
字段名             描述
email            用户的邮箱
pwd              用户的密码


返回数据示例:
{code:2002,info:"登录成功,接下来请求任何接口都不用传账号密码"}
{code:4003,info:"密码或账号错误"}




4.上传作品接口
url:    /uploadImg
请求方式:   post

请求条件:用户必须已经登录
参数:
字段名             描述
upimgsrc          用户上传的图片文件:摄影图片
description       对作品图片的描述-->用于后面搜索
imgtype           摄影图片分类-->用于后面搜索
imgname           摄影图片的名字-->用于后面搜索
imgtitle          摄影图片的标题-->用于后面搜索



返回数据示例:
{code:4005,info:"没上传图片"}
{code:2004,info:"上传成功",img:imgurl}
{code:4006,info:"用户未登录"}




5.获取所有摄影作品(包含官方的用户的作品和普通用户的作品)
url:    /allproduction
请求方式:   get

请求条件:用户没有登录也可以访问
参数:  无

返回数据示例:
[{
id                    摄影图片的id
userid                摄影图片所属用户id
description           摄影图片描述
upimgsrc              摄影图片的网址
imgtype
imgname
imgtitle},...]




6.用户要收藏作品
url:    /collectionProduction
请求方式:   get

请求条件:用户必须已经登录
参数:
id   要收藏的图片id

返回数据示例:
{ code: 4006, info: "用户未登录" }
{ code: 2006, info: "收藏成功" }


//7.获取用户所有收藏的图片
url:   /getcollectionProduction
请求方式:   get

请求条件:用户必须已经登录
参数:  无

返回数据示例:
{ code: 4006, info: "用户未登录" }
[{id,userid,upimgsrc,description,imgtype,imgname,imgtitle}]



*/