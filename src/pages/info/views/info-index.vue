<template>
	<div id="app">
		<div id="nav">
			<div class="headernav" @click="_addHeaderImg">
				<img :src="user.header ? user.header : require('./img/perImg.png')" alt="" class="navor">
				<img src="./img/uploadHeader.png" alt="" class="upfile" v-if="!user.header">
			</div>
			<p class="nickname">{{ user.name }}</p>
			<p class="tabtaps">业主</p>
			<div class="iphonenum" v-on:click="editPhone">
				<p>{{ $store.state.userTel }}</p>
				<p><img src="./img/editphone.png" alt=""> <span>修改</span></p>
			</div>
			<p class="address">{{ user.address }} →</p>
			<p @click="deliquesce()" class="removeBtn">解除绑定</p>
		</div>
		<transition :name="transitionName">
			<router-view class="refresh"></router-view>
		</transition>
	</div>
</template>
<script>
	import requestInfo from 'static/js/request';
	import resultInfo from 'static/js/result';
	export default {
		name: "root",
		data() {
			return {
				transitionName: 'slide-left',
				user: {
					userId: '',
					name: '',
					header: '',
					tel: '',
					address: ''
				}
			}
		},
		async created() {
			console.log(this.$store.state.openId);
			var loading = weui.loading('loading', {
				className: 'custom-classname'
			});
			var params = {
				openId: this.$store.state.openId
				// openId: 'opcIq6N08ZJno7NkMumEQFKfDtEg'
				// openId: 'opcIq6DbbI0-kYAFgEUbtRt8TRqU'
			};
			console.log(JSON.stringify(params));
			var init_request = await requestInfo(
				'/decorate/login/DoLogin/personalInformation',
				'post',
				params,
				'application/x-www-form-urlencoded'
			);
			loading.hide();
			console.log(init_request);
			var init_result = resultInfo(init_request);
			console.log(init_result);
			if(!init_result) return;
			this.$set(this.user, 'userId', init_result.userId);
			this.$set(this.user, 'name', init_result.name);
			this.$set(this.user, 'header', init_result.headPic);
			this.$set(this.user, 'tel', init_result.phone);
			this.$set(this.user, 'address', init_result.detailAddress);
			var items = {
				id: init_result.userId,
				tel: init_result.phone
			};
			this.$store.commit('setUserTel', items);
		},
		methods: {
			// 修改手机号
			editPhone: function() {
				this.$router.push({
					name: 'editPhone'
				})
			},
			// 上传头像
			_addHeaderImg() {
				var _self = this;
				wx.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						console.log(JSON.stringify(res)); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						wx.getLocalImgData({
							localId: res.localIds[0],
							success: (res) => {
								var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
								var prefix = 'base64,';
								var index = localData.indexOf(prefix);
								var actData = localData;
								if(index > -1) {
									actData = localData.substring(index + 7);
								}
								_self._uploadImg(actData);
							}
						});
					}
				});
			},
			async _uploadImg(basedata) {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				var params = {
					base64: encodeURIComponent(basedata)
				};
				var getImgUrl_request = await requestInfo(
					'/lyjlogin/UploadImg/uploadImage',
					'post',
					params,
					'application/x-www-form-urlencoded'
				);
				var getImgUrl_result = resultInfo(getImgUrl_request);
				if(!getImgUrl_result) return;
				this.$set(this.user, 'header', getImgUrl_result.imageSrc);
				var edit_params = {
					id: this.user.userId,
					headPic: this.user.header
				};
				var uploadImg_request = await requestInfo(
					'/decorate/login/DoLogin/updatePersonalInformation',
					'post',
					edit_params,
					'application/x-www-form-urlencoded'
				);
				var uploadImg_result = resultInfo(uploadImg_request);
				if(!uploadImg_result) return;
				weui.toast('头像修改成功！', 2000);
				loading.hide();
			},
			async deliquesce() {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				var params = {
					openId: this.$store.state.openId
				};
				var getImgUrl_request = await requestInfo(
					'/lyjlogin/index/untied?openId='+this.$store.state.openId,
					'get',
					{},
					'application/x-www-form-urlencoded'

				);
				var getImgUrl_result = resultInfo(getImgUrl_request);
				console.log(getImgUrl_result);
				if(!getImgUrl_result) return;
				loading.hide();
				localStorage.clear();
				this.$store.commit('removeJSSDKstatus');
				this.$store.commit('removeBindStatus');
				location.reload()
				this.$router.push({
					name: 'setPhone'
				})

			}
		},
		watch: {
			'$route' (to, from) {
				var toDepth = to.path.length;
				var fromDepth = from.path.length;
				this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
			}
		}
	}
</script>
<style lang="less">
	@import "~static/css/minxin.less";
	@import "~static/css/transition.less";
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	
	.bgcolor {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 358rem/@rootFontSize;
		background: #e6a551;
	}
	
	#nav {
		width: 684rem/@rootFontSize;
		margin: auto;
		margin-top: 100rem/@rootFontSize;
		background: #fff;
		position: relative;
		-webkit-border-radius: 20rem/@rootFontSize;
		-moz-border-radius: 20rem/@rootFontSize;
		border-radius: 20rem/@rootFontSize;
		padding-top: 86rem/@rootFontSize;
		padding-bottom: 20rem/@rootFontSize;
		box-shadow: 0 0 20rem/@rootFontSize #d7d7d7;
		.headernav {
			position: absolute;
			width: 152rem/@rootFontSize;
			height: 152rem/@rootFontSize;
			top: -76rem/@rootFontSize;
			left: 266rem/@rootFontSize;
			-webkit-border-radius: 100%;
			-moz-border-radius: 100%;
			border-radius: 100%;
			.navor {
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 100%;
			}
			.upfile {
				position: absolute;
				top: 0rem/@rootFontSize;
				right: 0rem/@rootFontSize;
				width: 152rem/@rootFontSize;
				height: 152rem/@rootFontSize;
				opacity: 0.5;
			}
		}
		p {
			.font-dpr(12px);
			line-height: 50rem/@rootFontSize;
			img {
				width: 30rem/@rootFontSize;
				height: 30rem/@rootFontSize;
				vertical-align: middle;
				margin-left: 20rem/@rootFontSize;
				margin-right: 5rem/@rootFontSize;
			}
		}
		.nickname {
			.font-dpr(16px);
			line-height: 50rem/@rootFontSize;
			color: #000000;
		}
		.tabtaps {
			.font-dpr(12px);
			color: #e6a551;
			position: relative;
			width: 70rem/@rootFontSize;
			.border(#e6a551);
			line-height: 36rem/@rootFontSize;
			-webkit-border-radius: 10rem/@rootFontSize;
			-moz-border-radius: 10rem/@rootFontSize;
			border-radius: 10rem/@rootFontSize;
			margin: auto;
			margin-top: 10rem/@rootFontSize;
			margin-bottom: 10rem/@rootFontSize;
		}
		.iphonenum {
			.font-dpr(14px);
			overflow: hidden;
			white-space: nowrap;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 50rem/@rootFontSize;
		}
		.address {
			line-height: 70rem/@rootFontSize;
		}
		.removeBtn {
			background: #e6a551;
			color: #fff;
			display: inline-block;
			padding: 0 4px;
			border-radius: 4px;
		}
	}
</style>