const state={
    userId: '',
    list: []
}

const mutations={
    setUserId: function (state, val){
        state.userId = val;
    },
    setRegister: function (state, val){
        state.userId = val.userId;
        state.sessionId = val.sessionId;
        state.projectId = val.projectId;
        state.bindStatus = true;
    },
    setStandardList: function (state, val){
        state.list = [];
        for (let items of val){
            state.list.push({
                id: items.id,
                // 用户头像。
                headerImg: items.headerImg,
                // 用户职能。
                role: items.role,
                // 用户姓名。
                name: items.name,
                // 验收内容。
                content: items.content,
                // 验收图片。
                pic: items.pic,
                // 拍摄地点
                address: items.address,
                // 创建日期
                time: items.time,
                // 房间名称
                house_name: items.house_name,
                title: items.title
            });
        }
        console.log(state.list);
    }
}

const actions={}

export default {
    state,mutations,actions
}