
'use strict';
const Controller = require('egg').Controller;
	class PostController extends Controller {
		async list() {
			const { ctx, app } = this
			// const res = await app.knex('post').join('user','user.id','=','post.publish_id').select();
			const postList = await app.knex('post').select();
			const userList = await app.knex('user').select();
			postList.map(post=>{
				userList.map(user=>{
					if (post.publish_id == user.id) {
						post.userInfo = user
					}
				})
			})
			console.log('最后生成的postList',postList);
			
			if (postList) {
				ctx.body = {
					data:postList,
					code:0,
					msg:'success'
				}
			}
    }
    async addPost() {
      const { ctx, app } = this
      const acceptData = ctx.request.body; //接受post提交过来的参数
      if (!acceptData) {
        return;
      }
      acceptData.create_time = new Date().getTime()
      const res = await app.knex('post').insert(acceptData)
      let data= {}
      if (res) {
        data = {
          message: '新增成功',
          data: null,
          code: 0,
        };
      } else {
        data = {
          message: '新增失败',
          data: null,
          code: -1,
        };
      }
      ctx.body = data
		}
	}
module.exports = PostController;

