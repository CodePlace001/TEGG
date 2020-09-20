/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = exports = {};
	
	//配置mysql参数
	config.mysql = {
		client: {
			//host
			host: "localhost",
			//端口
			port: "3306",
			//用户名
			user: "root",
			//密码
			password: "root",
			//数据库名
			database: "taobo"
		}
	};
	//配置服务器跨域问题
	config.cors = {
		origin: '*', // 匹配规则  域名+端口  *则为全匹配
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
	};
	
	//配置服务器端口：
	config.cluster = {
	     listen: {
	       hostname: '192.168.29.1', //也就是“localhost”,不能在前面添加协议
	       port: 8080  //默认值是7001
	     }
	   };
	
	//解开post请求体大小限制的方法
	config.bodyParser = {
	      // 值的大小可以根据自己的需求修改
	        formLimit: '30mb',
	        jsonLimit: '30mb',
	        textLimit: '30mb'
	  }
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1599649721216_3406';

	// add your middleware config here
	config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		...userConfig,
	};
};
