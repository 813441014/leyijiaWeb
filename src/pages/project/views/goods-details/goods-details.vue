<template>
	<div class="goods-details">
		<!--<div class="container">
			<div class="headerNav">
				<p>订单编号：111111</p>
				<img src="../img/moercolor.png" alt="" class="rightIcon" />
			</div>
			<div id="" class="content">
				<div class="items" v-for="(item,index) in goodsDetails">
					<div class="mainFlex nav">
						<p>{{item.ItemName}}</p>
						<p>￥{{item.transaction_price}}{{item.InvntryUom}}</p>
					</div>
					<div class="itemsContent mainFlex">
						<p>{{item.U_Spec}}</p>
						<p>x{{item.goods_number}}</p>
					</div>
					<div class="icon">
						<p>{{item.mainTypeName}}/{{item.mediumTypeName}}/{{item.groupName}}</p>
					</div>
				</div>
			</div>
			<div class="details">
				<div>
					<p>订单信息</p>
				</div>
				<div class="itemDetails">
					<p>物流单号：{{goodsDetails.ItemCode}}</p>
				</div>
				<div class="itemDetails">
					<p>姓名：{{goodsDetails.attributeName}}</p>
				</div>
				<div class="itemDetails">
					<p>仓库：{{goodsDetails.DfltWHName}}</p>
				</div>

			</div>
		</div>-->
		<div class="content">
			<div class="test" v-for="roomItems in goodsDetails">
				<div class="list border-1px-bottom" :style="{'background-color' : status.isShow==roomItems.id ? '#f4f5f6' : ''}" @click="_details(roomItems.id)">
					<div class="title">{{ roomItems.house_name}}</div>
					<div class="icon">
						<img src="./img/arrow.png" :class="[status.isShow==roomItems.id ? 'go-rotate' : 'no-rotate']" alt=""></div>
				</div>
				<div class="details" :id="'parlour'+roomItems.id">
					<!--<div class="unit border-1px-bottom">
						<div class="goodsName">
							<p>商品名称</p>
						</div>
						<div class="goodsNum">数量</div>
						<div class="goodsPrice">单位</div>
					</div>-->
					<div class="goodsList">
						<div class="unit border-1px-bottom" v-for="goodsItems in roomItems.goods">
							<div class="goodsName">
								<p>名称：{{ goodsItems.ItemName }}</p>
							</div>
							<div class="goodsName" v-if="goodsItems.mainTypeId != '61'&&goodsItems.mainTypeId != '62'">
								<p>数量：{{ goodsItems.goods_number }}</p>
							</div>
							<div class="goodsNum">
								<p class="goodsNumTitle">描述：</p>
								<p class="goodsNumContent">{{ goodsItems.U_Spec }}</p></div>
							<div class="smallIcon">
								<p class="goodsNumTitle">类别：</p>
								<p class="goodsNumContent">{{ goodsItems.mainTypeName }}/{{ goodsItems.mediumTypeName }}/{{ goodsItems.groupName }}</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		<!--<div class="bottom"><span style="color: #77a7e6;">共计：</span>¥ {{ price.allPrice }}</div>-->
	</div>
</template>

<script>
	import request from 'static/js/request'
	import result from 'static/js/result'
	import wxReady from 'static/js/wxReady'

	export default {
		name: "goodsList",
		data() {
			return {
				planList: {}, //
				planoption: [], //计划工序列表
				houseLocation: "",
				goodsDetails: [],
				status: {
					// 控制箭头的旋转
					rotate: 0,
					isShow: 0
				},
				count: {
					// 客厅
					rotateCount: 0
				}
			}

		},
		async created() {
			console.log(this.$route.params.type)
			if(this.$route.params.type = 3) {
				this.initData()
			} else {
				this.init()
			}

		},
		watch: {
			'status.rotate' (newVal, oldVal) {
				$(`#parlour${newVal}`).slideDown(300);
				$(`#parlour${oldVal}`).slideUp(300);
			}
		},
		methods: {
			async initData() {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				var params = {
					orderId: this.$route.params.id
				}
				let getProjectList = await request('/decorate/orders/ContractOrder/customOrderDetails',
					'post',
					params, 'application/x-www-form-urlencoded')
				loading.hide()
				let info = result(getProjectList)
				loading.hide()
				if(!info) return

				this.goodsDetails = info
			},
			async init() {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				var params = {
					orderId: this.$route.params.id
				}
				let getProjectList = await request('/decorate/orders/ContractOrder/changeOrderDetails',
					'post', params, 'application/x-www-form-urlencoded')
				loading.hide()
				let info = result(getProjectList)
				loading.hide()
				if(!info) return

				this.goodsDetails.push(...info)
			},
			_details(id) {
				if(this.status.rotate === id) {
					if(this.count.rotateCount === 0) {
						$(`#parlour${id}`).slideUp(300);
						this.$set(this.status, 'isShow', 0);
						this.$set(this.count, 'rotateCount', 1);
					} else {
						$(`#parlour${id}`).slideDown(300);
						this.$set(this.status, 'isShow', id);
						this.$set(this.count, 'rotateCount', 0);
					}
				} else {
					this.$set(this.status, 'isShow', id);
					this.$set(this.status, 'rotate', id);
					this.$set(this.count, 'rotateCount', 0);
				}
			},

		}
	}
</script>

<style scoped lang="less">
	@import "~static/css/minxin.less";
	/*.border-bottom(#e5e6e7);*/
	
	.goods-details {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		background-color: #f9f9f9;
		/*.container {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			.headerNav {
				background: #FFFFFF;
				margin-bottom: 20rem/@rootFontSize;
				height: 80rem/@rootFontSize;
				display: flex;
				align-items: center;
				padding: 0 20rem/@rootFontSize;
				.font-dpr(14px);
				p {
					flex: 1;
				}
				.rightIcon {
					width: 20rem/@rootFontSize;
					height: 20rem/@rootFontSize;
				}
			}
			.content {
				background: #FFFFFF;
				margin-bottom: 20rem/@rootFontSize;
				padding: 0 20rem/@rootFontSize;
				.mainFlex {
					display: flex;
					p {
						&:nth-of-type(1) {
							flex: 1;
						}
					}
				}
				.nav {
					line-height: 80rem/@rootFontSize;
					.font-dpr(16px);
				}
				.itemsContent {
					padding: 20rem/@rootFontSize 0;
					line-height: 40rem/@rootFontSize;
				}
				.icon {
					background: #eedda9;
					color: #ff4a2d;
					display: inline-block;
				}
			}
			.details {
				.itemDetails {
					height: 60rem/@rootFontSize;
					p {
						&:nth-of-type(1) {}
					}
				}
			}
		}*/
		.content {
			width: 100%;
			height: 100%;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			.test {
				position: relative;
				.border-bottom(#e5e6e7);
				/*margin-bottom: 20rem/@rootFontSize;*/
				background:#fff;
				.list {
					width: 100%;
					height: 80rem/@rootFontSize;
					display: flex;
					justify-content: space-between;
					position: relative;
					.title {
						height: 100%;
						display: flex;
						align-items: center;
						.font-dpr(16px);
						margin-left: 10rem/@rootFontSize;
					}
					.icon {
						width: 36rem/@rootFontSize;
						height: 36rem/@rootFontSize;
						margin-top: 15rem/@rootFontSize;
						margin-right: 15rem/@rootFontSize;
						.go-rotate {
							width: 100%;
							height: 100%;
							transform: rotate(-180deg);
							transition: all 0.5s;
						}
					}
				}
				&:nth-last-of-type(1){
					.border-bottom(#fff);
				}
			}
			.details {
				padding:20rem/@rootFontSize 20rem/@rootFontSize;
				display: none;
				background:#f9f9f9;
				.unit {
					width: 100%;
					position: relative;
					/*.border-bottom(#e5e6e7);*/
					background:#fff;
					margin-bottom: 20rem/@rootFontSize;
					box-shadow:0 0 20rem/@rootFontSize #ccc;
					border-radius: 20rem/@rootFontSize;	
					.goodsName {
						/*width: 100%;*/
						line-height: 60rem/@rootFontSize;
						padding: 10rem/@rootFontSize 10rem/@rootFontSize;
						display: flex;
						align-items: center;
						.font-dpr(14px);
						/*overflow: hidden; !* 超出的文本隐藏 *!*/
						/*text-overflow: ellipsis; !* 溢出用省略号显示 *!*/
						/*white-space: nowrap; !* 溢出不换行 *!*/
					}
					.goodsPrice {
						/*width: 100%;*/
						line-height: 60rem/@rootFontSize;
						padding: 10rem/@rootFontSize 10rem/@rootFontSize;
						text-align: left;
						.font-dpr(14px);
					}
					.goodsNum {
						/*width: 100%;*/
						line-height: 60rem/@rootFontSize;
						padding: 10rem/@rootFontSize 10rem/@rootFontSize;
						text-align: left;
						.font-dpr(14px);
						display: flex;
						.goodsNumTitle{
							
						}
						.goodsNumContent{
							flex: 1;
						}
					}
					.smallIcon {
						/*width: 100%;*/
						line-height: 60rem/@rootFontSize;
						padding: 10rem/@rootFontSize 10rem/@rootFontSize;
						text-align: left;
						.font-dpr(14px);
						display: flex;
						.goodsNumTitle{
							
						}
						.goodsNumContent{
							flex: 1;
						}
					}
				}
			}
		}
		.bottom {
			width: 100%;
			height: 40rem/@rootFontSize;
			position: absolute;
			bottom: 0;
			right: 10rem/@rootFontSize;
			.font-dpr(14px);
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		.no-rotate {
			width: 100%;
			height: 100%;
			transition: all 0.5s;
		}
	}
</style>