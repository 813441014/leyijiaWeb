<template>
	<div class="index-main">
		<div v-wechat-title="$route.meta.title"></div>
		<div class="work-team">
			<div>
				<p class="team-title">施工团队</p>
				<div class="member" @click="workTeam">
					<div class="member-detail">
						<div class="member-item" v-if="!address.teamMember.length">
							<img src='./img/avatar.png'>
							<p>工人</p>
							<p>职位</p>
						</div>
						<div class="member-item" v-for="(item,index) in address.teamMember" :key="index" v-if="index<4">
							<img :src="item.headImg?item.headImg:require('./img/avatar.png')">
							<p>{{item.name}}</p>
							<p>{{item.type}}</p>
						</div>

					</div>
					<div class="member-icon">
						<img src="./img/right.png">
					</div>
				</div>
			</div>
			<div class="project-address">
				<div class="address-icon">
					<img src="./img/address.png">
				</div>
				<div class="address-detail">
					<p>工程地址:{{address.addressInfo}}</p>
				</div>
				<p @click="deliquesce()" class="removeBtn">解除绑定</p>
				<div class="switch-address" @click="switchProject">
					<span>切换工地</span>
				</div>
			</div>
		</div>

		<div class="function">
			<div class="item" @click="_construction_dynamic">
				<div class="item-detail">
					<img src="./img/SiteDy.png">
					<p>施工进度</p>
				</div>
			</div>
			<div class="item" @click="image">
				<div class="item-detail">
					<img src="./img/design.png">
					<p>设计图纸</p>
				</div>
			</div>
			<div class="item">
				<div class="item-detail" @click="constructionPlan">
					<img src="./img/plan.png">
					<p>施工计划</p>
				</div>
			</div>
			<!--<div class="item">-->
			<!--<div class="item-detail">-->
			<!--<img src="./img/MainMaterial.png">-->
			<!--<p>主材订单</p>-->
			<!--</div>-->
			<!--</div>-->
			<div class="item" @click="toContract">
				<div class="item-detail">
					<img src="./img/purchase.png">
					<p>施工合同</p>
				</div>
			</div>
			<!--<div class="item" @click="toList">
				<div class="item-detail">
					<img src="./img/proList.png">
					<p>物料清单</p>
				</div>
			</div>-->
			<div class="item" @click="paymentRecord">
				<div class="item-detail">
					<img src="./img/payRecord.png">
					<p>交费记录</p>
				</div>
			</div>
			<div class="item" @click="_acceptance">
				<div class="item-detail">
					<img src="./img/feedBack.png">
					<p>阶段验收</p>
				</div>
			</div>
			<div class="item" @click="completeAcceptance">
				<div class="item-detail">
					<img src="./img/comment.png">
					<p>竣工验收</p>
				</div>
			</div>
			<div class="item" @click="vrDisplay">
				<div class="item-detail">
					<img src="./img/vr.png">
					<p>VR展示</p>
				</div>
			</div>
			<div class="item" @click="goodsList">
				<div class="item-detail">
					<img src="./img/proList.png">
					<p>订单列表</p>
				</div>
			</div>
		</div>

		<transition :name="transitionName">
			<router-view class="refresh"></router-view>
		</transition>
	</div>

</template>

<script>
	import request from 'static/js/request'
	import result from 'static/js/result'
	export default {
		name: "root",
		data() {
			return {
				transitionName: 'slide-left',

				address: {
					addressInfo: '',
					teamMember: []
				}
			}
		},
		async created() {
			await this.getAddressInfo()
		},
		methods: {
			// 工地动态。
			_construction_dynamic() {
				this.$router.push({
					name: 'construction_dynamic'
				});
			},
			//阶段验收
			async _acceptance() {
				var params = {
					siteId: this.$store.state.projectId
				};
				let getProjectList = await request('/decorate/constructionSite/Check/partProcedure',
					'post',
					params,
					'application/x-www-form-urlencoded')
				let planarray = result(getProjectList);
				console.log(1);
				console.log(planarray);
				if(!planarray) return;
				this.$router.push({
					name: 'stageAcceptance',
					params: {
						address: this.address.addressInfo
					}
				});
			},
			//切换工地
			switchProject() {
				this.$router.push({
					name: 'switchProject'
				})
			},
			//施工团队
			workTeam() {
				this.$router.push({
					name: 'workTeam',
					params: {
						team: this.address.teamMember
					}
				})
			},
			//施工计划
			constructionPlan() {
				this.$router.push({
					name: 'constructionPlan',
					params: {
						houseLocation: this.address.addressInfo
					}
				})
			},
			//设计图纸
			image() {
				this.$router.push({
					name: 'projectImage'
				})
			},
			// 竣工验收
			async completeAcceptance() {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				const getInfo = await request('/decorate/constructionSite/Check/judge', 'post', {
					userId: this.$store.state.userId,
					site_id: this.$store.state.projectId
				}, 'application/x-www-form-urlencoded')
				loading.hide()
				console.log(getInfo);
				console.log(getInfo.code);
				if(getInfo.code == 0) {

				} else if(getInfo.code == 1) {

				} else {
					console.log("3");
					weui.alert("当前不允许验收");
					return false
				}
				this.$router.push({
					name: 'completeAcceptance',
					params: {
						address: this.address.addressInfo
					}
				})
			},
			//交费记录
			paymentRecord() {
				this.$router.push({
					name: 'paymentRecord'
				})

			},
			//订单
			goodsList() {
				this.$router.push({
					name: 'goodsList'
				})
				//{

			},
			// 获取工地信息
			async getAddressInfo() {
				//获取工地信息
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				const projectInfo = await request('/decorate/constructionSite/Home/homePage', 'post', {
					addressId: this.$store.state.projectId,
				}, 'application/x-www-form-urlencoded')
				loading.hide()
				let info = result(projectInfo)
				if(!info) return
				this.$set(this.address, 'teamMember', [])
				this.address.teamMember.push(...info.team)
				this.$set(this.address, 'addressInfo', info.name)
				console.log(projectInfo)
			},
			//跳转到excel
			async toList() {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				const getList = await request('/decorate/materiel/Materiel/billMateriel', 'post', {
					siteId: this.$store.state.projectId
				}, 'application/x-www-form-urlencoded')
				loading.hide()

				if(getList.code === 0) {

					window.location.href = getList.data[0]
				} else {
					weui.alert('物料清单获取失败')
				}
			},
			//合同
			toContract() {
				this.$router.push({
					name: 'contract'
				})
			},
			// VR展示
			vrDisplay() {
				this.$router.push({
					name: 'vrDisplay'
				});
			},
			//解除绑定
			async deliquesce() {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				var params = {
					openId: this.$store.state.openId
				};
				var getImgUrl_request = await request(
					'/lyjlogin/index/untied?openId=' + this.$store.state.openId,
					'get', {},
					'application/x-www-form-urlencoded'

				);
				var getImgUrl_result = result(getImgUrl_request);
				console.log(getImgUrl_result);
				if(!getImgUrl_result) return;
				loading.hide();
				localStorage.clear();
				this.$store.commit('removeJSSDKstatus');
				this.$store.commit('removeBindStatus');
				location.reload();
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
			},
			async '$store.state.projectId' () {
				await this.getAddressInfo()
			}
		}
	}
</script>

<style scoped lang="less">
	@import "~static/css/minxin.less";
	@import "~static/css/transition.less";
	.index-main {
		width: 100%;
		height: 100%;
		position: relative;
		.work-team {
			background-color: #e08a39;
			padding: 20rem/@rootFontSize;
			div {
				width: 100%;
				.team-title {
					.font-dpr(20px);
					font-weight: 300;
					color: #fff;
					padding: 10rem/@rootFontSize 20rem/@rootFontSize;
				}
				.member {
					display: flex;
					flex-wrap: nowrap;
					align-items: center;
					margin-top: 30rem/@rootFontSize;
					padding: 0 10rem/@rootFontSize;
					padding-bottom: 10rem/@rootFontSize;
					position: relative;
					.border-bottom(#fff);
					box-sizing: border-box;
					.member-detail {
						/*width: 70%;*/
						display: flex;
						flex-wrap: nowrap;
						align-items: center;
						.member-item {
							width: 120rem/@rootFontSize;
							margin-left: 10rem/@rootFontSize;
							img {
								width: 120rem/@rootFontSize;
								height: 120rem/@rootFontSize;
								border-radius: 15rem/@rootFontSize;
							}
							p {
								text-align: center;
								color: #fff;
								font-weight: 300;
								overflow: hidden; //超出的文本隐藏
								text-overflow: ellipsis; //溢出用省略号显示
								white-space: nowrap; //溢出不换行
							}
							p:nth-child(2) {
								.font-dpr(16px);
								padding: 10rem/@rootFontSize 0;
							}
							p:nth-child(3) {
								.font-dpr(14px);
								padding: 10rem/@rootFontSize 0;
							}
						}
					}
					.member-icon {
						img {
							width: 60rem/@rootFontSize;
							height: 60rem/@rootFontSize;
							position: relative;
							top: -40rem/@rootFontSize;
							right: -20rem/@rootFontSize;
						}
					}
				}
			}
		}
		.project-address {
			display: flex;
			margin-top: 10rem/@rootFontSize;
			.address-icon {
				width: 60rem/@rootFontSize ;
				img {
					width: 60rem/@rootFontSize;
					height: 60rem/@rootFontSize;
				}
			}
			.removeBtn {
				background: #e6a551;
				color: #fff;
				display: inline-block;
				padding: 0 4px;
				border-radius: 4px;
				display: flex;
				align-items: center;
			}
			.switch-address {
				justify-content: flex-end;
				width: 170rem/@rootFontSize;
				display: flex;
				align-items: center;
				span {
					.font-dpr(12px);
					color: #fff;
					border: 1px solid #fff;
					border-radius: 30rem/@rootFontSize;
					padding: 5rem/@rootFontSize 10rem/@rootFontSize;
				}
			}
			.address-detail {
				width: calc(100% - 400rem / @rootFontSize);
				display: flex;
				align-items: center;
				color: #fff;
				.font-dpr(12px);
				font-weight: 300;
				p {
					overflow: hidden; //超出的文本隐藏
					text-overflow: ellipsis; //溢出用省略号显示
					white-space: nowrap; //溢出不换行
				}
			}
		}
		.function {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			height: calc( 100% - 500rem / @rootFontSize);
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			.item {
				width: 33%;
				height: 28%;
				/*margin: 0 auto;*/
				display: flex;
				align-items: center;
				justify-content: center;
				.item-detail {
					text-align: center;
					img {
						width: 120rem/@rootFontSize;
						height: 120rem/@rootFontSize;
					}
					p {
						.font-dpr(14px);
						padding-top: 20rem/@rootFontSize;
					}
				}
			}
		}
	}
</style>