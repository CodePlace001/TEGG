'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
	
  async goods() {
	var data = await this.app.mysql.query("select *from goods");
	return data;
  }
}

module.exports = HomeService;
