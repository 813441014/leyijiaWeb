<template>
	<div class="payment-record">
		<div class="container" v-if="payList.length != 0">
			<div class="titleFlex headerNav">
				<p>交费名称</p>
				<p>状态</p>
				<p>金额</p>
				<p>日期</p>
			</div>
			<div class="contentContainer">
				<div class="titleFlex content" v-for="(item,index) in payList" @click="toDetails(item.id)">
					<p>{{item.name}}</p>
					<p>{{item.customItem8__c == 2?'未完成':'已完成'}}</p>
					<p>{{item.customItem2__c}}</p>
					<p>{{item.customItem3__c}}</p>
				</div>
				
			</div>
		</div>
		<div v-else class="nodata">
			<div class="imgDiv">
				<img src="./img/wuneirong.png">
			</div>
			<div class="noText">暂无交费记录</div>
		</div>
	</div>
</template>

<script>
	import request from 'static/js/request'
	import result from 'static/js/result'
	import wxReady from 'static/js/wxReady'

	export default {
		name: "payment-record",
		data() {
			return {
				planList: {}, //
				planoption: [], //计划工序列表
				houseLocation: "",
				payList: []
			}

		},
		async created() {
			this.initData()
		},
		methods: {
			async initData() {
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				let getProjectList = await request('/decorate/payment/Payment/reimbursementPlanList',
					'post', {
						siteId: this.$store.state.projectId
					}, 'application/x-www-form-urlencoded')
				loading.hide()
				let info = result(getProjectList)
				loading.hide()
				if(!info) return
				console.log(info)
				for(var i=0;i<info.length;i++){
					info[i].customItem3__c = info[i].customItem3__c.substring(0,10)
				}
				this.payList.push(...info)
			},
			toDetails(id){
				this.$router.push({
					name: 'paymentDetails',
					params: {
						id: id
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@import "~static/css/minxin.less";
	/*.border-bottom(#e5e6e7);*/
	
	.payment-record {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		background-color: #f9f9f9;
		.titleFlex {
			display: flex;
		}
		.headerNav {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			line-height: 80rem/@rootFontSize;
			p {
				flex: 1;
				text-align: center;
				.font-dpr(14px);
			}
		}
		.container {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			.contentContainer {
				padding-top: 80rem/@rootFontSize;
				.content {
					position: relative;
					background: #fff;
					line-height: 80rem/@rootFontSize;
					.border-bottom(#e5e6e7);
					p {
						.font-dpr(14px);
						flex: 1;
						text-align: center;
						/*border-left: 1px solid #f3f3f3;*/
						&:nth-of-type(1) {
							border: none;
						}
						img {
							width: 40rem/@rootFontSize;
							height: 40rem/@rootFontSize;
							vertical-align: middle;
						}
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