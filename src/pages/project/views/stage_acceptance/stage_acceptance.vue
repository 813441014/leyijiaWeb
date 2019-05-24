<template>
	<div class="stage_acceptance">
		<div class="stage_container">
			<div class="container_top">
				<div class="flex_div">
					<img src="./img/address.png" alt="">
					<p>{{location.address == ""?params.address:location.address}}</p>
					<img src="./img/nextstep.png" alt="">
				</div>
				<div class="flex_div" @click="pickClick">
					<img src="./img/sinker.png" alt="">
					<p>当前工序</p>
					<div class="right_next">
						<p>{{processSelect.title?processSelect.title:'请选择'}}</p>
						<img src="./img/nextstep.png" alt="">
					</div>
				</div>
			</div>
			<div class="standardcontent" v-if="processSelect.standard != undefined">{{processSelect.standard == ""?"暂无验收标准":"验收标准："+processSelect.standard}}</div>
			<div class="stage_content">
				<textarea v-model="content" placeholder="请输入验收时输入的内容" style="resize:none"></textarea>
				<div class="imgdiv">
					<div v-for="(item,index) in imgurl" class="photoimg">
						<img :src="item" alt="" class="srcImg" @click='toImgDetail(item)'>
						<img src='./img/delImg.png' alt="" class="delImg" @click='deleteImg(index)'>
					</div>
					<div class="photoimg" @click="addImg" v-if="imgurl.length<9">
						<img src="./img/jia.png" alt="">
					</div>
				</div>
				<div class="weui-cell weui-cell_switch">
					<div class="weui-cell__bd">是否通过</div>
					<div class="weui-cell__ft">
						<label for="switchCP" class="weui-switch-cp">
                            <input id="switchCP" class="weui-switch-cp__input" type="checkbox" checked="checked" v-model="switchStatus">
                            <div class="weui-switch-cp__box"></div>
                        </label>
					</div>
				</div>
			</div>
			<div class="submitbtn" @click="submitStage">
				<p>提交</p>
			</div>
		</div>

	</div>
</template>

<script>
	import request from 'static/js/request'
	console.log(request)
	import result from 'static/js/result'
	export default {
		name: "complete-acceptance",
		data() {
			return {
				flag: true,
				switchStatus: true,
				location: {
					address: ""
				},
				content: '',
				imgurl: [],
				processList: [

				],
				processPicker: [],
				processSelect: {},
				params: {
					address: ""
				},
				baseImg: [],
				localData: [],
				chooseLength: "",
				chooseLocalIds: "",
				chooseTogol: 0 //总上传图片的长度
			}

		},
		async created() {
			this.$set(this.params, 'address', this.$route.params.address)
			this.initData();
			this.$jsonp('https://apis.map.qq.com/ws/place/v1/search?keyword=%E9%85%92%E5%BA%97&boundary=nearby(39.908491,116.374328,1000)&key=XUNBZ-RDQCD-6FO4X-PCQUB-WFNO6-T4BJE&output=jsonp').then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
			this.getLocation()
		},
		methods: {
			async initData() {
				var params = {
					   siteId:this.$store.state.projectId
				};
				let getProjectList = await request('/decorate/constructionSite/Check/partProcedure',
					'post',
					params,
					'application/x-www-form-urlencoded')
				let planarray = result(getProjectList);
				console.log(1);
				console.log(planarray);
				if(!planarray) return;
				
				this.processList.push(...planarray);
				console.log(JSON.stringify(this.processList));
				var processPicker = [];
				var strContent = ""
				for(var i = 0; i < planarray.length; i++) {
					processPicker[i] = {};
					processPicker[i].label = planarray[i].title;
					processPicker[i].value = i
				}
				this.processPicker.push(...processPicker);
				console.log(this.processPicker);
				
			},
			//点击picker
			pickClick() {
				if(this.length == 0) {
					weui.alert("暂无工序");
					return false
				}

				var _self = this;
				weui.picker(this.processPicker, {
					className: 'custom-classname',
					container: 'body',
					defaultValue: [0],
					onChange: function(result) {
						console.log(result);
						_self.$set(_self.processSelect, 'title', result[0].label)
					},
					onConfirm: function(result) {
						console.log(result)
					},
					id: 'singleLinePicker'
				});
			},
			//添加图片
			addImg() {
				//          	weui.alert("1232");
				var _this = this;
				var count = 9 - (this.imgurl.length);
				//选择图片
				wx.chooseImage({
					count: count, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						_this.chooseLocalIds = res.localIds;
						_this.chooseLength = res.localIds.length;
						_this.chooseTogol = _this.chooseTogol + res.localIds.length;
						_this.getLocalImgData(0)
					},
					fail: function(err) {
						weui.alert(JSON.stringify(err));
					}
				});
			},
			//上传图片base64
			getLocalImgData(num) {
				var _this = this;
				var number = num + 1;
				wx.getLocalImgData({
					localId: this.chooseLocalIds[num], // 图片的localID
					success: function(res) {
						let localData = res.localData; // localData是图片的base64数据
						let prefix = 'base64,';
						let index = localData.indexOf(prefix);
						let actData = localData;
						if(index > -1) {
							actData = localData.substring(index + 7);
						}
						_this.uploadImage(actData, number);
					}
				});
			},
			//上传图片到服务器
			async uploadImage(basedata, num) {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				var _len = this.chooseLength;
				var _this = this;
				//lyjlogin/UploadImg/uploadImage
				var params = {
					base64: encodeURIComponent(basedata)
				};
				let getProjectList = await request('/lyjlogin/UploadImg/uploadImage',
					'post',
					params,
					'application/x-www-form-urlencoded')
				let planarray = result(getProjectList);
				loading.hide();
				if(!planarray) return;
				this.$set(this.imgurl, this.imgurl.length, planarray.imageSrc);
				if(num < _len) {
					_this.getLocalImgData(num)

				} else {
					//总长度 
					if(_this.chooseTogol == _this.imgurl.length) {
						return false
					} else {
						weui.alert("部分图片上传失败");
					}
				}

			},
			//删除图片
			deleteImg(index) {
				this.chooseTogol = this.chooseTogol - 1;
				this.imgurl.splice(index, 1);
				this.flag = !this.flag;

			},
			//预览图片
			toImgDetail(src) {
				wx.previewImage({
					// 当前显示图片的链接，不填则默认为 urls 的第一张
					current: src,
					// 需要预览的图片链接列表
					urls: this.imgurl
				});
			},
			//获取地理位置
			getLocation() {
				let _self = this;
				wx.getLocation({
					type: 'gcj02',
					success: function(res) {
						_self.$jsonp(`https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=FVZBZ-GSOKX-UPP4W-74A65-OSBU2-3WB2U&get_poi=1&output=jsonp`).then(res => {
							// weui.alert(JSON.stringify(res))
							_self.$set(_self.location, 'address', res.result.address)
						}).catch(err => {
							console.log(err);

						})
					},
					cancel: function(res) {
						alert('用户拒绝授权获取地理位置');
					}
				});
			},
			//    上传
			async submitStage() {
				if(this.processPicker.length == 0) {
					weui.alert("暂无工序");
					return false
				}
				if(this.content == "") {
					weui.alert("请输入内容");
					return false
				}
				if(!this.processSelect.title) {
					weui.alert("请选择工序");
					return false
				}
				var switchStatus = "";
				if(this.switchStatus) {
					switchStatus = 1
				} else {
					switchStatus = 2
				}
				var params = {
					site_id: this.$store.state.projectId,
					content: this.content,
					uploadFile: this.imgurl,
					title: this.processSelect.title,
					is_check: switchStatus,
					userId: this.$store.state.userId,
					address: this.location.address
					//                  gongxu:this.processSelect.id
				};
				let getProjectList = await request('/decorate/constructionSite/Check/stageCheck',
					'post',
					params,
					'application/x-www-form-urlencoded')
				let planarray = result(getProjectList);
				if(!planarray) return;
				weui.alert("提交成功");
				this.$router.go(-1)
				//              this.content= "";
				//              this.imgurl = [];
				//              this.chooseLocalIds=[];
				//              this.chooseTogol = 0;

			}
		}
	}
</script>

<style scoped lang="less">
	@import "~static/css/minxin.less";
	.stage_acceptance {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #f8f9fa;
		.stage_container {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			.container_top {
				background: #fff;
				margin-bottom: 20rem/@rootFontSize;
				padding: 0 20rem/@rootFontSize;
				.flex_div {
					display: flex;
					align-items: center;
					line-height: 100rem/@rootFontSize;
					height: 100rem/@rootFontSize;
					.font-dpr(12px);
					&:nth-of-type(2) {
						border: none;
					}
					img {
						width: 40rem/@rootFontSize;
						height: 40rem/@rootFontSize;
						margin-right: 20rem/@rootFontSize;
					}
					p {
						flex: 1;
					}
					.right_next {
						display: flex;
						align-items: center;
						color: #999;
					}
				}
				.flex_div:not(:last-child) {
					position: relative;
					.border-bottom(#e5e6e7);
				}
			}
			.standardcontent {
				background: #fff;
				padding: 0 20rem/@rootFontSize;
				margin-bottom: 20rem/@rootFontSize;
				line-height: 100rem/@rootFontSize;
			}
			.stage_content {
				background: #fff;
				textarea {
					.font-dpr(12px);
					width: 100%;
					overflow: hidden;
					box-sizing: border-box;
					-moz-box-sizing: border-box;
					/* Firefox */
					-webkit-box-sizing: border-box;
					/* Safari */
					border: none;
					padding: 0 20rem/@rootFontSize;
					line-height: 40rem/@rootFontSize;
					margin-top: 20rem/@rootFontSize;
					min-height: 80rem/@rootFontSize;
				}
				.imgdiv {
					padding: 0 15rem/@rootFontSize;
					overflow: hidden;
					position: relative;
					.border-bottom(#e5e6e7);
					.photoimg {
						width: 170rem/@rootFontSize;
						height: 170rem/@rootFontSize;
						margin: 0 5rem/@rootFontSize;
						overflow: hidden;
						text-align: center;
						float: left;
						margin-bottom: 20rem/@rootFontSize;
						position: relative;
						img {
							width: 170rem/@rootFontSize;
							height: 170rem/@rootFontSize;
							object-fit: cover;
						}
						.srcImg {
							width: 170rem/@rootFontSize;
							height: 170rem/@rootFontSize;
							object-fit: cover;
						}
						.delImg {
							position: absolute;
							width: 30rem/@rootFontSize;
							height: 30rem/@rootFontSize;
							right: 0;
							top: 0;
						}
					}
				}
				.weui-cell_switch {
					.weui-switch-cp__box {
						width: 38px;
						height: 18px;
						&:after {
							width: 16px;
							height: 16px;
						}
						&:before {
							width: 16px;
							height: 16px;
						}
					}
					&:before {
						border: none;
					}
				}
			}
		}
		.submitbtn {
			background: #f8f9fa;
			padding: 20rem/@rootFontSize 0;
			margin-top: 50rem/@rootFontSize ;
			p {
				margin: auto;
				width: 420rem/@rootFontSize;
				height: 80rem/@rootFontSize;
				line-height: 80rem/@rootFontSize;
				text-align: center;
				color: #fff;
				background: #f07e0c;
				-webkit-border-radius: 50rem/@rootFontSize;
				-moz-border-radius: 50rem/@rootFontSize;
				border-radius: 50rem/@rootFontSize;
			}
		}
	}
</style>