<template>
	<div class="goods-list">
		<div class="container" v-if="goodsList.length != 0">
			<div class="item" v-for="(item,index) in goodsList" @click="toDetails(item.id,item.entityType)">
				<div class="headernav">订单号：{{item.order_code}}</div>
				<p>订单名字：{{item.name}}</p>
				<p>支付状态：{{item.pay_status}}</p>
				<p>订单金额：{{item.money}}</p>
				<p>订单类型：{{item.entityType == 3?'客户订单':'变更单'}}</p>
				<p>
					审核状态：
					<span v-if="item.change_type == 1">审核中</span>
					<span v-else-if="item.change_type == 2">审核不通过</span>
					<span v-else="item.change_type == 3">通过审核</span>
				</p>
				<div class="detailsBtn">
					<p>查看详情</p>
				</div>
			</div>

		</div>
		<div v-else class="nodata">
			<div class="imgDiv">
				<img src="./img/wuneirong.png">
			</div>
			<div class="noText">暂无订单列表</div>
		</div>
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
				goodsList: []
			}

		},
		async created() {
			this.initData()
		},
		methods: {
			toDetails(id, type) {
				this.$router.push({
					name: 'goodsDetails',
					params: {
						id: id,
						type: type
					}
				});
			},
			async initData() {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				let getProjectList = await request('/decorate/orders/ContractOrder/orderList',
					'post', {
						siteId: this.$store.state.projectId
					}, 'application/x-www-form-urlencoded')
				loading.hide()
				let info = result(getProjectList)
				loading.hide()
				if(!info) return

				this.goodsList.push(...info)
			}
		}
	}
</script>

<style scoped lang="less">
	@import "~static/css/minxin.less";
	/*.border-bottom(#e5e6e7);*/
	
	.goods-list {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		background-color: #f9f9f9;
		.container {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			.item {
				background: #fff;
				margin-bottom: 20rem/@rootFontSize;
				padding: 0 20rem/@rootFontSize;
				padding-bottom:20rem/@rootFontSize;
				.headernav {
					line-height: 80rem/@rootFontSize;
					position: relative;
					.font-dpr(16px);
					.border-bottom(#e5e6e7);
					color: #000000;
				}
				p {
					line-height: 60rem/@rootFontSize;
					.font-dpr(14px);
					color: #666666;
				}
				.detailsBtn {
					text-align: right;
					p {
						line-height: 40rem/@rootFontSize;
						display: inline-block;
						border-radius: 10rem/@rootFontSize;
						.font-dpr(12px);
						border: 1px solid #e08a39;
						padding: 0 8rem/@rootFontSize;
						color:#e08a39;
					}
				}
			}
		}
		.nodata {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			.imgDiv {
				width: 300rem/@rootFontSize;
				height: 300rem/@rootFontSize;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.noText {
				.font-dpr(14px);
				color: #999;
				line-height: 80rem/@rootFontSize;
				text-align: center;
			}
		}
	}
</style>