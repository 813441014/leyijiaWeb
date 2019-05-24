
let result=(result)=>{

    if(parseInt(result.code)===0) {
        return result.data || true
    }else{
        weui.alert(result.message);
        //错误逻辑

        //返回false
        return false
    }
}

export default result