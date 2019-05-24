    <template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="top" v-if="standardArr.length != 0">
            <div class="top-bgc">
                <img :src="site_dynamics.design_sketch?site_dynamics.design_sketch:require('./img/defaultBgc.png')" alt="">
            </div>
            <div class="bgc-color"></div>
            <div class="top-content">
                <div class="center-left">
                    <img :src="site_dynamics.construction_plans[0]?site_dynamics.construction_plans[0]:require('./img/default.png')" alt="" @click="_toImgDetailPic(site_dynamics.construction_plans)">
                    <div class="unit">{{ site_dynamics.construction_plans.length }}</div>
                </div>
                <div class="center-right">
                    <div class="unit">工程地址：<span class="txt">{{ site_dynamics.address }}</span></div>
                    <div class="unit">{{ site_dynamics.apartment }}/{{ site_dynamics.measure }}m<sup>2</sup>/{{ site_dynamics.style }}/设计师：{{ site_dynamics.designer }}</div>
                    <div class="unit">承诺完工日期：{{ formatDate(site_dynamics.completion_date) }}</div>
                </div>
            </div>
        </div>
        <div class="center" v-if="standardArr.length != 0">
            <div class="standard-center">
                <!--            <div class="all">-->
                <div class="all-box" @click="_cliStandard(0)">全部</div>
                <!--            </div>-->
<!--                <div class="items">-->
<!--                    <div class="items-box"></div>-->
<!--                </div>-->
                <div class="box" v-for="standardItems in standardArr">
                    <div class="items">
                        <div class="items-box"></div>
                    </div>
                    <div class="list" @click="_cliStandard(standardItems.id)">
                        <div class="list-box">
                            <div class="title-box">
                                <div class="top">{{ standardItems.name.substring(standardItems.name.length-4, standardItems.name.length-2) }}</div>
                                <div class="footer">{{ standardItems.name.substring(standardItems.name.length-2) }}</div>
                            </div>
                        </div>
                        <div class="title">{{ standardItems.name }}</div>
                    </div>
                </div>
            </div>

<!--            <div class="list">-->
<!--                <div class="list-box" @click="_auxiliary">辅材</div>-->
<!--                <div class="title">材料进场(辅材)验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_material">材料</div>-->
<!--                <div class="title">材料二次进场验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_electric">电</div>-->
<!--                <div class="title">电验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_water">水</div>-->
<!--                <div class="title">水验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_carpentry">木工</div>-->
<!--                <div class="title">木工验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_bricklayer">瓦工</div>-->
<!--                <div class="title">瓦工基础验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_waterproof">防水</div>-->
<!--                <div class="title">防水验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_medium">中期</div>-->
<!--                <div class="title">中期验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_project">变更单</div>-->
<!--                <div class="title">工程增减变更单</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_oil">油工</div>-->
<!--                <div class="title">油工验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
<!--            <div class="list">-->
<!--                <div class="list-box" @click="_complete">竣工</div>-->
<!--                <div class="title">竣工验收</div>-->
<!--            </div>-->
<!--            <div class="items">-->
<!--                <div class="items-box"></div>-->
<!--            </div>-->
        </div>
        <div class="content">
            <div class="unit" v-if="standardArr.length!=0 && standardListArr.length!=0">
                <!--开工交底-->
                <div class="item" v-for="startItems in $store.state.list">
                    <div class="header">
                        <div class="headerImg">
                            <img :src="startItems.headerImg ? startItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">
                        </div>
                    </div>
                    <div class="content">
                        <div class="userInfo">
                            <div class="name">{{ startItems.role }}：{{ startItems.name }}</div>
                            <div class="name">{{ startItems.title }}</div>
                        </div>
                        <div class="comment"><p>{{ startItems.content }}</p></div>
                        <div class="pic">
                            <div class="unit" v-for="startItemsImg in startItems.pic">
                                <div class="show-img">
                                    <img :src="startItemsImg.img" alt="" @error="_picError($event)" @click="_toImgDetail(startItemsImg.img, startItems.pic)">
                                </div>
                            </div>
                        </div>
                        <div class="address" v-if="startItems.house_name && startItems.pic.length!=0">
                            <div class="left-room">房间:</div>
                            <div class="right-room">{{ startItems.house_name }}</div>
                        </div>
                        <div class="address">
                            <div class="left-address">拍摄地点:</div>
                            <div class="right-address">{{ startItems.address }}</div>
                        </div>
                        <div class="bottom">
                            <div class="left">{{ formatDate(startItems.time) }}</div>
                            <!--<div class="right" @click="openMask">-->
                            <!--<img src="./img/comment.png" alt="">-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </div>
            <!--材料进场(辅材)验收-->
<!--            <div :id="'abc'+standard.auxiliaryId" class="item" v-for="auxiliaryItems in auxiliaryArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="auxiliaryItems.headerImg ? auxiliaryItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ auxiliaryItems.role }}：{{ auxiliaryItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ auxiliaryItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="auxiliaryItemsImg in auxiliaryItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="auxiliaryItemsImg.img ? auxiliaryItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(auxiliaryItemsImg.img, auxiliaryItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ auxiliaryItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(auxiliaryItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--材料二次进场验收-->
<!--            <div :id="'abc'+standard.materialId" class="item" v-for="materialItems in materialArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="materialItems.headerImg ? materialItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ materialItems.role }}：{{ materialItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ materialItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="materialItemsImg in materialItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="materialItemsImg.img ? materialItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(materialItemsImg.img, materialItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ materialItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(materialItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--电验收-->
<!--            <div :id="'abc'+standard.electricId" class="item" v-for="electricItems in electricArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="electricItems.headerImg ? electricItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ electricItems.role }}：{{ electricItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ electricItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="electricItemsImg in electricItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="electricItemsImg.img ? electricItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(electricItemsImg.img, electricItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ electricItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(electricItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--水验收-->
<!--            <div :id="'abc'+standard.waterId" class="item" v-for="waterItems in waterArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="waterItems.headerImg ? waterItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ waterItems.role }}：{{ waterItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ waterItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="waterItemsImg in waterItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="waterItemsImg.img ? waterItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(waterItemsImg.img, waterItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ waterItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(waterItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--木工验收-->
<!--            <div :id="'abc'+standard.carpentryId" class="item" v-for="carpentryItems in carpentryArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="carpentryItems.headerImg ? carpentryItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ carpentryItems.role }}：{{ carpentryItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ carpentryItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="carpentryItemsImg in carpentryItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="carpentryItemsImg.img ? carpentryItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(carpentryItemsImg.img, carpentryItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ carpentryItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(carpentryItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--瓦工基础验收-->
<!--            <div :id="'abc'+standard.bricklayerId" class="item" v-for="bricklayerItems in bricklayerArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="bricklayerItems.headerImg ? bricklayerItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ bricklayerItems.role }}：{{ bricklayerItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ bricklayerItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="bricklayerItemsImg in bricklayerItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="bricklayerItemsImg.img ? bricklayerItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(bricklayerItemsImg.img, bricklayerItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ bricklayerItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(bricklayerItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--防水验收-->
<!--            <div :id="'abc'+standard.waterproofId" class="item" v-for="waterproofItems in waterproofArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="waterproofItems.headerImg ? waterproofItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ waterproofItems.role }}：{{ waterproofItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ waterproofItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="waterproofItemsImg in waterproofItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="waterproofItemsImg.img ? waterproofItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(waterproofItemsImg.img, waterproofItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ waterproofItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(waterproofItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--中期验收-->
<!--            <div :id="'abc'+standard.mediumId" class="item" v-for="mediumItems in mediumArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="mediumItems.headerImg ? mediumItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ mediumItems.role }}：{{ mediumItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ mediumItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="mediumItemsImg in mediumItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="mediumItemsImg.img ? mediumItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(mediumItemsImg.img, mediumItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ mediumItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(mediumItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--工程增减变更单-->
<!--            <div :id="'abc'+standard.projectId" class="item" v-for="projectItems in projectArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="projectItems.headerImg ? projectItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ projectItems.role }}：{{ projectItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ projectItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="projectItemsImg in projectItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="projectItemsImg.img ? projectItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(projectItemsImg.img, projectItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ projectItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(projectItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--油工验收-->
<!--            <div :id="'abc'+standard.oilId" class="item" v-for="oilItems in oilArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="oilItems.headerImg ? oilItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ oilItems.role }}：{{ oilItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ oilItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="oilItemsImg in oilItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="oilItemsImg.img ? oilItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(oilItemsImg.img, oilItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ oilItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(oilItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!--竣工验收-->
<!--            <div :id="'abc'+standard.completeId" class="item" v-for="completeItems in completeArr">-->
<!--                <div class="header">-->
<!--                    <div class="headerImg">-->
<!--                        <img :src="completeItems.headerImg ? completeItems.headerImg : require('./img/avatar.png')" alt="" @error="_headerImgError($event)">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <div class="name">{{ completeItems.role }}：{{ completeItems.name }}</div>-->
<!--                    <div class="comment"><p>{{ completeItems.content }}</p></div>-->
<!--                    <div class="pic">-->
<!--                        <div class="unit" v-for="completeItemsImg in completeItems.pic">-->
<!--                            <div class="show-img">-->
<!--                                <img :src="completeItemsImg.img ? completeItemsImg.img : require('./img/no-image.png')" alt="" @error="_picError($event)" @click="_toImgDetail(completeItemsImg.img, completeItems.pic)">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="address">-->
<!--                        <div class="left">拍摄地点:</div>-->
<!--                        <div class="right">{{ completeItems.address }}</div>-->
<!--                    </div>-->
<!--                    <div class="bottom">-->
<!--                        <div class="left">{{ formatDate(completeItems.time) }}</div>-->
<!--                        &lt;!&ndash;<div class="right" @click="openMask">&ndash;&gt;-->
<!--                        &lt;!&ndash;<img src="./img/comment.png" alt="">&ndash;&gt;-->
<!--                        &lt;!&ndash;</div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <div class="noDataAll" v-if="$store.state.list.length === 0">暂无施工进度</div>
        </div>
        <!--<dialogBar v-model="sendVal" type="confirm" title="评论" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm" dangerText="删除"></dialogBar>-->
        <div class="noDataAll" v-if="standardArr.length === 0">该工地暂未施工</div>
    </div>
</template>

<script>
    import requestInfo from 'static/js/request';
    import resultInfo from 'static/js/result';
    import getParam from "../../../../static/js/getParam";
    // import dialogBar from './layer/dialog.vue';
    export default {
        components:{
        //     dialogBar
        },
        data() {
            return {
                sendVal: false,
                construction_site: [],
                // 验收工序ID
                // 5.7 修改：工序不是固定的。
                // standard: {
                //     // 开工交底工序ID
                //     startId: '',
                //     // 材料进场(辅材)验收工序ID
                //     auxiliaryId: '',
                //     // 材料二次进场验收工序ID
                //     materialId: '',
                //     // 电验收工序ID
                //     electricId: '',
                //     // 水验收工序ID
                //     waterId: '',
                //     // 木工验收工序ID
                //     carpentryId: '',
                //     // 瓦工基础验收工序ID
                //     bricklayerId: '',
                //     // 防水验收工序ID
                //     waterproofId: '',
                //     // 中期验收工序ID
                //     mediumId: '',
                //     // 工程增减变更单工序ID
                //     projectId: '',
                //     // 油工验收工序ID
                //     oilId: '',
                //     // 竣工验收工序ID
                //     completeId: ''
                // },
                standardArr: [],
                standardListArr: [],
                // // 存储开工交底工序数组
                // startArr: [],
                // // 存储材料进场(辅材)验收工序数组
                // auxiliaryArr: [],
                // // 存储材料二次进场验收工序数组
                // materialArr: [],
                // // 存储电验收工序数组
                // electricArr: [],
                // // 存储水验收工序数组
                // waterArr: [],
                // // 存储木工验收工序数组
                // carpentryArr: [],
                // // 存储瓦工基础验收工序数组
                // bricklayerArr: [],
                // // 存储防水验收工序数组
                // waterproofArr: [],
                // // 存储中期验收工序数组
                // mediumArr: [],
                // // 存储工程增减变更单工序数组
                // projectArr: [],
                // // 存储油工验收工序数组
                // oilArr: [],
                // // 存储竣工验收工序数组
                // completeArr: [],
                // 工地动态
                site_dynamics: {
                    // 工程地址
                    address: '',
                    // 户型
                    apartment: '',
                    // 面积
                    measure: 0,
                    // 房屋样式
                    style: '',
                    // 设计师
                    designer: '',
                    // 承诺完工日期
                    completion_date: '',
                    // 效果图(背景图)
                    design_sketch: '',
                    // 施工图(多图)
                    construction_plans: []
                }
            }
        },
        async created() {
            this.standardInfo();
            // this.standardList();
            // var standard_request = await requestInfo(
            //     '/decorate/constructionSite/Check/finalProcedure',
            //     'post',
            //     {site_id: this.$store.state.projectId},
            //     // {site_id: 639949071041990},
            //     'application/x-www-form-urlencoded'
            // );
            // var standard_result = resultInfo(standard_request);
            // console.log(standard_result);
            // // 开工交底工序ID
            // this.$set(this.standard, 'startId', standard_result[0].id);
            // // 材料进场(辅材)验收工序ID
            // this.$set(this.standard, 'auxiliaryId', standard_result[1].id);
            // // 材料二次进场验收工序ID
            // this.$set(this.standard, 'materialId', standard_result[2].id);
            // // 电验收工序ID
            // this.$set(this.standard, 'electricId', standard_result[3].id);
            // // 水验收工序ID
            // this.$set(this.standard, 'waterId', standard_result[4].id);
            // // 木工验收工序ID
            // this.$set(this.standard, 'carpentryId', standard_result[5].id);
            // // 瓦工基础验收工序ID
            // this.$set(this.standard, 'bricklayerId', standard_result[6].id);
            // // 防水验收工序ID
            // this.$set(this.standard, 'waterproofId', standard_result[7].id);
            // // 中期验收工序ID
            // this.$set(this.standard, 'mediumId', standard_result[8].id);
            // // 工程增减变更单工序ID
            // this.$set(this.standard, 'projectId', standard_result[9].id);
            // // 油工验收工序ID
            // this.$set(this.standard, 'oilId', standard_result[10].id);
            // // 竣工验收工序ID
            // this.$set(this.standard, 'completeId', standard_result[11].id);
        },
        methods: {
            // 时间戳转换 Methods。
            formatDate (timestamp){
                var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                return Y+M+D;
            },
            _headerImgError(event) {
                event.target.src = require('./img/avatar.png');
            },
            _picError(event) {
                event.target.src = require('./img/no-image.png');
            },
            // 5.7 修改：将"工序"存入数组中。
            async standardInfo() {
                var loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                var standard_request = await requestInfo(
                    '/decorate/constructionSite/Check/finalProcedure',
                    'post',
                    {site_id: this.$store.state.projectId},
                    // {site_id: 639949071041990},
                    'application/x-www-form-urlencoded'
                );
                console.log(standard_request);
                var standard_result = resultInfo(standard_request);
                console.log(standard_result);
                loading.hide();
                if (!standard_result) return;
                for (let items of standard_result){
                    this.standardArr.push({
                        id: items.id,
                        name: items.name
                    });
                }
                console.log(this.standardArr);
                this.standardList();
            },
            async standardList() {
                var loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                var params = {
                    userId: this.$store.state.userId,
                    sessionId: this.$store.state.sessionId,
                    site_id: this.$store.state.projectId
                    // site_id: 639949071041990
                };
                console.log(params);
                var request = await requestInfo(
                    '/decorate/constructionSite/Process/getRecords',
                    'post',
                    params,
                    'application/x-www-form-urlencoded'
                );
                console.log(request);
                loading.hide();
                var result = resultInfo(request);
                console.log(result);
                if (!result) return;
                // 工程地址
                this.$set(this.site_dynamics, 'address', result.addressName);
                // 户型
                this.$set(this.site_dynamics, 'apartment', result.huxing);
                // 面积
                this.$set(this.site_dynamics, 'measure', result.acreage);
                // 房屋样式
                this.$set(this.site_dynamics, 'style', result.style);
                // 设计师
                this.$set(this.site_dynamics, 'designer', result.fzrName);
                // 承诺完工日期
                this.$set(this.site_dynamics, 'completion_date', result.finish_time);
                // 效果图(背景图)
                this.$set(this.site_dynamics, 'design_sketch', result.xg_pic);
                // 施工图(多图)
                this.$set(this.site_dynamics, 'construction_plans', result.sg_pic);

                // 5.7 修改：取消锚点定位。
                for (let len in result.record){
                    let pic = [];
                    for (let items of result.record[len].images){
                        pic.push({
                            img: items.pic
                        });
                    }
                    this.standardListArr.push({
                        id: result.record[len].gongxu,
                        // 用户头像。
                        headerImg: result.record[len].headimgUrl,
                        // 用户职能。
                        role: result.record[len].userType,
                        // 用户姓名。
                        name: result.record[len].userName,
                        // 验收内容。
                        content: result.record[len].content,
                        // 验收图片。
                        pic: pic,
                        // 拍摄地点
                        address: result.record[len].address,
                        // 创建日期
                        time: result.record[len].create_time,
                        // 房间名称
                        house_name: result.record[len].house_name,
                        // 当前列表所在的工序
                        title: result.record[len].title
                    });
                }
                console.log(this.standardListArr);
                this.$store.commit('setStandardList', this.standardListArr);
                // 5.7 修改。
                // for (var i = 0, lenI = result.record.length; i < lenI; i++){
                //     // 工序ID = 开工交底工序ID
                //     if (result.record[i].gongxu == this.standard.startId){
                //         var startPic = [];
                //         // 开工交底图片(工序)
                //         for (var start = 0, lenStart = result.record[i].images.length; start < lenStart; start++){
                //             startPic.push({
                //                 img: result.record[i].images[start].pic
                //             });
                //         }
                //         this.startArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: startPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 材料进场(辅助)验收工序ID
                //     if (result.record[i].gongxu == this.standard.auxiliaryId){
                //         var auxiliaryPic = [];
                //         // 材料进场(辅助)验收图片(工序)
                //         for (var auxiliary = 0, lenAuxiliary = result.record[i].images.length; auxiliary < lenAuxiliary; auxiliary++){
                //             auxiliaryPic.push({
                //                 img: result.record[i].images[auxiliary].pic
                //             });
                //         }
                //         this.auxiliaryArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: auxiliaryPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 材料二次进场验收工序ID
                //     if (result.record[i].gongxu == this.standard.materialId){
                //         var materialPic = [];
                //         // 材料二次进场验收图片(工序)
                //         for (var material = 0, lenMaterial = result.record[i].images.length; material < lenMaterial; material++){
                //             materialPic.push({
                //                 img: result.record[i].images[material].pic
                //             });
                //         }
                //         this.materialArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: materialPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 电验收工序ID
                //     if (result.record[i].gongxu == this.standard.electricId){
                //         var electricPic = [];
                //         // 电验收图片(工序)
                //         for (var electric = 0, lenElectric = result.record[i].images.length; electric < lenElectric; electric++){
                //             electricPic.push({
                //                 img: result.record[i].images[electric].pic
                //             });
                //         }
                //         this.electricArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: electricPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 水验收工序ID
                //     if (result.record[i].gongxu == this.standard.waterId){
                //         var waterPic = [];
                //         // 水验收图片(工序)
                //         for (var water = 0, lenWater = result.record[i].images.length; water < lenWater; water++){
                //             waterPic.push({
                //                 img: result.record[i].images[water].pic
                //             });
                //         }
                //         this.waterArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: waterPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 木工验收工序ID
                //     if (result.record[i].gongxu == this.standard.carpentryId){
                //         var carpentryPic = [];
                //         // 木工验收图片(工序)
                //         for (var carpentry = 0, lenCarpentry = result.record[i].images.length; carpentry < lenCarpentry; carpentry++){
                //             carpentryPic.push({
                //                 img: result.record[i].images[carpentry].pic
                //             });
                //         }
                //         this.carpentryArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: carpentryPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 瓦工验收工序ID
                //     if (result.record[i].gongxu == this.standard.bricklayerId){
                //         var bricklayerPic = [];
                //         // 瓦工验收图片(工序)
                //         for (var bricklayer = 0, lenBricklayer = result.record[i].images.length; bricklayer < lenBricklayer; bricklayer++){
                //             bricklayerPic.push({
                //                 img: result.record[i].images[bricklayer].pic
                //             });
                //         }
                //         this.bricklayerArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: bricklayerPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 防水验收工序ID
                //     if (result.record[i].gongxu == this.standard.waterproofId){
                //         var waterproofPic = [];
                //         // 防水验收图片(工序)
                //         for (var waterproof = 0, lenWaterproof = result.record[i].images.length; waterproof < lenWaterproof; waterproof++){
                //             waterproofPic.push({
                //                 img: result.record[i].images[waterproof].pic
                //             });
                //         }
                //         this.waterproofArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: waterproofPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 中期验收工序ID
                //     if (result.record[i].gongxu == this.standard.mediumId){
                //         var mediumPic = [];
                //         // 中期验收图片(工序)
                //         for (var medium = 0, lenMedium = result.record[i].images.length; medium < lenMedium; medium++){
                //             mediumPic.push({
                //                 img: result.record[i].images[medium].pic
                //             });
                //         }
                //         this.mediumArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: mediumPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 工程增减变更单工序ID
                //     if (result.record[i].gongxu == this.standard.projectId){
                //         var projectPic = [];
                //         // 工程增减变更单图片(工序)
                //         for (var project = 0, lenProject = result.record[i].images.length; project < lenProject; project++){
                //             projectPic.push({
                //                 img: result.record[i].images[project].pic
                //             });
                //         }
                //         this.projectArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: projectPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 油工验收工序ID
                //     if (result.record[i].gongxu == this.standard.oilId){
                //         var oilPic = [];
                //         // 油工验收图片(工序)
                //         for (var oil = 0, lenOil = result.record[i].images.length; oil < lenProject; oil++){
                //             oilPic.push({
                //                 img: result.record[i].images[oil].pic
                //             });
                //         }
                //         this.oilArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: oilPic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                //     // 工序ID = 竣工验收工序ID
                //     if (result.record[i].gongxu == this.standard.completeId){
                //         var completePic = [];
                //         // 竣工验收图片(工序)
                //         for (var complete = 0, lenComplete = result.record[i].images.length; complete < lenComplete; complete++){
                //             completePic.push({
                //                 img: result.record[i].images[complete].pic
                //             });
                //         }
                //         this.completeArr.push({
                //             // 用户头像。
                //             headerImg: result.record[i].headimgUrl,
                //             // 用户职能。
                //             role: result.record[i].userType,
                //             // 用户姓名。
                //             name: result.record[i].userName,
                //             // 验收内容。
                //             content: result.record[i].content,
                //             // 验收图片。
                //             pic: completePic,
                //             // 拍摄地点
                //             address: result.record[i].address,
                //             // 创建日期
                //             time: result.record[i].create_time
                //         });
                //     }
                // }
            },
            // 5.7 修改：点击工序查找当前工序的列表。
            _cliStandard(id) {
                console.log(id);
                if (id === 0){
                    this.$store.commit('setStandardList', this.standardListArr);
                    return;
                }
                let list = [];
                for (let len in this.standardListArr){
                    if (this.standardListArr[len].id === id){
                        let pic = [];
                        for (let items of this.standardListArr[len].pic){
                            pic.push({
                                pic: items.pic
                            });
                        }
                        list.push({
                            id: this.standardListArr[len].id,
                            // 用户头像。
                            headerImg: this.standardListArr[len].headerImg,
                            // 用户职能。
                            role: this.standardListArr[len].role,
                            // 用户姓名。
                            name: this.standardListArr[len].name,
                            // 验收内容。
                            content: this.standardListArr[len].content,
                            // 验收图片。
                            pic: this.standardListArr[len].pic,
                            // 拍摄地点
                            address: this.standardListArr[len].address,
                            // 创建日期
                            time: this.standardListArr[len].time,
                            // 房间名称
                            house_name: this.standardListArr[len].house_name,
                            // 当前施工列表所在的工序
                            title: this.standardListArr[len].title
                        });
                    }
                }
                this.$store.commit('setStandardList', list);
            },
            // // 点击开工交底工序进行锚点定位
            // _start() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.startId}`).scrollIntoView(true);
            // },
            // // 点击材料进场(辅材)验收工序进行锚点定位
            // _auxiliary() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.auxiliaryId}`).scrollIntoView(true);
            // },
            // // 点击材料二次进场验收工序进行锚点定位
            // _material() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.materialId}`).scrollIntoView(true);
            // },
            // // 点击电验收工序进行锚点定位
            // _electric() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.electricId}`).scrollIntoView(true);
            // },
            // // 点击水验收工序进行锚点定位
            // _water() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.waterId}`).scrollIntoView(true);
            // },
            // // 点击木工验收工序进行锚点定位
            // _carpentry() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.carpentryId}`).scrollIntoView(true);
            // },
            // // 点击瓦工基础验收工序进行锚点定位
            // _bricklayer() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.bricklayerId}`).scrollIntoView(true);
            // },
            // // 点击防水验收工序进行锚点定位
            // _waterproof() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.waterproofId}`).scrollIntoView(true);
            // },
            // // 点击中期验收工序进行锚点定位
            // _medium() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.mediumId}`).scrollIntoView(true);
            // },
            // // 点击工程增减变更单工序进行锚点定位
            // _project() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.projectId}`).scrollIntoView(true);
            // },
            // // 点击油工验收工序进行锚点定位
            // _oil() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.oilId}`).scrollIntoView(true);
            // },
            // // 点击竣工验收工序进行锚点定位
            // _complete() {
            //     var _self = this;
            //     document.querySelector(`#abc${_self.standard.completeId}`).scrollIntoView(true);
            // },
            // 点击图片放大查看
            _toImgDetail(src, srcArr) {
                var urls = [];
                for (var i = 0, len = srcArr.length; i < len; i++){
                    urls.push(srcArr[i].img);
                }
                wx.previewImage({
                    current: src,   // 当前显示图片的链接，不填则默认为 urls 的第一张
                    urls: urls      // 需要预览的图片链接列表
                });
            },
            _toImgDetailPic(srcArr) {
                wx.previewImage({
                    current: srcArr[0],   // 当前显示图片的链接，不填则默认为 urls 的第一张
                    urls: srcArr      // 需要预览的图片链接列表
                });
            }
            // 打开弹出层
            // openMask(index) {
            //     this.sendVal = true;
            // },
            // 点击取消按钮
            // clickCancel() {
            //     console.log('点击了取消');
            // },
            // 点击删除按钮
            // clickDanger() {
            //     console.log('这里是danger回调');
            // },
            // 点击确认按钮
            // clickConfirm(val) {
            //     console.log(val);
            //     console.log('点击了confirm');
            // }
        }
    }
</script>

<style scoped lang="less">
    @import "~static/css/minxin.less";
    .main {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #ffffff;
        .top {
            width: 100%;
            height: 400rem / @rootFontSize;
            position: relative;
            .top-bgc {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .bgc-color {
                width: 100%;
                height: 100%;
                position: absolute;
                background-color: #000000;
                opacity: 0.5;
            }
            .top-content {
                width: 100%;
                position: absolute;
                height: 220rem / @rootFontSize;
                margin: 90rem/@rootFontSize 0;
                display: flex;
                .center-left {
                    width: 220rem / @rootFontSize;
                    height: 220rem / @rootFontSize;
                    margin: 0 0 0 30rem/@rootFontSize;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .unit {
                        width: 50rem / @rootFontSize;
                        height: 40rem / @rootFontSize;
                        line-height: 40rem / @rootFontSize;
                        text-align: center;
                        border-radius: 40rem / @rootFontSize;
                        color: #ffffff;
                        background-color: rgba(0, 0, 0, .7);
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                }
                .center-right {
                    width: calc(100% - 280rem / @rootFontSize);
                    height: 180rem / @rootFontSize;
                    .font-dpr(14px);
                    color: #FFFFFF;
                    margin: 20rem/@rootFontSize auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .unit {
                        width: 100%;
                        height: 60rem / @rootFontSize;
                        line-height: 60rem / @rootFontSize;
                        overflow:hidden; //超出的文本隐藏
                        text-overflow:ellipsis; //溢出用省略号显示
                        white-space:nowrap; //溢出不换行
                        .txt {
                            .font-dpr(16px);
                        }
                    }
                }
            }
        }
        .center {
            height: 200rem / @rootFontSize;
            display: -webkit-box;
            overflow-x: auto;
            /*适应苹果*/
            -webkit-overflow-scrolling: touch;
            margin-bottom: 20rem / @rootFontSize;
            .standard-center {
                height: 100%;
                display: flex;
                align-items: center;
                padding: 0 30rem/@rootFontSize;
            }
            .all-box {
                width: 150rem / @rootFontSize;
                height: 150rem / @rootFontSize;
                line-height: 150rem / @rootFontSize;
                text-align: center;
                color: #1bafac;
                .font-dpr(18px);
                position: relative;
                .border(#1bafac);
                &:after{
                    content: "";
                    pointer-events: none; /* 防止点击触发 */
                    box-sizing: border-box;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    border-radius: 100%;
                    border:1px solid #1bafac;
                    -webkit-transform:scale(1);
                    -webkit-transform-origin: 0 0;
                    transform:scale(1);
                    transform-origin: 0 0;
                }
            }
            .items {
                width: 50rem / @rootFontSize;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .items-box {
                    width: 100%;
                    height: 3rem / @rootFontSize;
                    background-color: #1bafac;
                }
            }
            .box {
                width: 170rem / @rootFontSize;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                .list {
                    width: 120rem / @rootFontSize;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    .list-box {
                        width: 120rem / @rootFontSize;
                        height: 120rem / @rootFontSize;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 100%;
                        box-sizing: border-box;
                        position: relative;
                        .border(#1bafac);
                        .title-box {
                            display: flex;
                            flex-direction: column;
                            .top {
                                width: 100%;
                                height: 40rem / @rootFontSize;
                                color: #1bafac;
                                .font-dpr(14px);
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                            }
                            .footer {
                                width: 100%;
                                height: 40rem / @rootFontSize;
                                color: #1bafac;
                                .font-dpr(14px);
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                            }
                        }
                        &:after{
                            content: "";
                            pointer-events: none; /* 防止点击触发 */
                            box-sizing: border-box;
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            left: 0;
                            top: 0;
                            border-radius: 100%;
                            border:1px solid #1bafac;
                            -webkit-transform:scale(1);
                            -webkit-transform-origin: 0 0;
                            transform:scale(1);
                            transform-origin: 0 0;
                        }
                    }
                    .title {
                        width: 100%;
                        height: 30rem / @rootFontSize;
                        line-height: 30rem / @rootFontSize;
                        text-align: center;
                        .font-dpr(12px);
                        color: #1bafac;
                        position: absolute;
                        bottom: 0;
                        overflow:hidden; //超出的文本隐藏
                        text-overflow:ellipsis; //溢出用省略号显示
                        white-space:nowrap; //溢出不换行
                    }
                }
                .items {
                    width: 50rem / @rootFontSize;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .items-box {
                        width: 100%;
                        height: 3rem / @rootFontSize;
                        background-color: #1bafac;
                    }
                }
            }
        }
        .center::-webkit-scrollbar {
            display: none;
        }
        .content {
            width: 100%;
            height: calc(100% - 620rem/@rootFontSize);
            overflow: scroll;
            /*适应苹果*/
            -webkit-overflow-scrolling: touch;
            position: relative;
            .unit {
                width: 100%;
                height: 100%;
                .item {
                    width: 100%;
                    display: flex;
                    position: relative;
                    .border-bottom(#e5e6e7);
                    .header {
                        width: 100rem / @rootFontSize;
                        height: 100%;
                        .headerImg {
                            width: 80rem / @rootFontSize;
                            height: 80rem / @rootFontSize;
                            margin: 0 auto;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 100%;
                            }
                        }
                    }
                    .content {
                        width: calc(100% - 110rem / @rootFontSize);
                        height: 100%;
                        .userInfo {
                            width: 100%;
                            height: 50rem / @rootFontSize;
                            display: flex;
                            justify-content: space-between;
                            .name {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                .font-dpr(14px);
                                color: #5a77c1;
                            }
                        }
                        .comment {
                            width: 100%;
                            .font-dpr(14px);
                            p {
                                width: 100%;
                                line-height: 37rem / @rootFontSize;
                                padding: 10rem / @rootFontSize 0;
                            }
                        }
                        .pic {
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            .unit {
                                width: 155rem / @rootFontSize;
                                height: 155rem / @rootFontSize;
                                display: flex;
                                justify-content: center;
                                .show-img {
                                    width: 150rem / @rootFontSize;
                                    height: 150rem / @rootFontSize;
                                    .border-bottom(#e5e6e7);
                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }
                        }
                        .address {
                            width: 100%;
                            height: 50rem / @rootFontSize;
                            line-height: 50rem / @rootFontSize;
                            .font-dpr(12px);
                            color: #5a77c1;
                            display: flex;
                            justify-content: space-between;
                            .left-room {
                                width: 80rem / @rootFontSize;
                                height: 100%;
                                line-height: 50rem / @rootFontSize;
                            }
                            .right-room {
                                width: calc(100% - 80rem/@rootFontSize);
                                height: 100%;
                                line-height: 50rem / @rootFontSize;
                                overflow:hidden; //超出的文本隐藏
                                text-overflow:ellipsis; //溢出用省略号显示
                                white-space:nowrap; //溢出不换行
                            }
                            .left-address {
                                width: 120rem / @rootFontSize;
                                height: 100%;
                                line-height: 50rem / @rootFontSize;
                            }
                            .right-address {
                                width: calc(100% - 120rem/@rootFontSize);
                                height: 100%;
                                line-height: 50rem / @rootFontSize;
                                overflow:hidden; //超出的文本隐藏
                                text-overflow:ellipsis; //溢出用省略号显示
                                white-space:nowrap; //溢出不换行
                            }
                        }
                        .bottom {
                            display: flex;
                            justify-content: space-between;
                            height: 50rem / @rootFontSize;
                            line-height: 50rem / @rootFontSize;
                            .font-dpr(12px);
                            margin-bottom: 10rem / @rootFontSize;
                            .left {
                                width: 100%;
                                height: 100%;
                                line-height: 50rem / @rootFontSize;
                                .font-dpr(12px);
                                color: #999999;
                            }
                            .right {
                                width: 50rem / @rootFontSize;
                                height: 100%;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                    }
                }
            }
            .noDataAll {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                .font-dpr(16px);
                color: #797979;
            }
        }
        .noDataAll {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            .font-dpr(16px);
            color: #797979;
        }
    }
</style>
    
