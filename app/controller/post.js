
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
	}
module.exports = PostController;

