const getList=(author,keyword)=>{
    // 先返回假数据 （格式是正确的）
    return [
        {
            id:1,
            title:'标题A',
            createTime:1546610491112,
            author:'zhangsan'
        },{
            id:2,
            title:'标题B',
            createTime:1546610491112,
            author:'lisi'
        }
    ]

}


const getDetail=(id)=>{
    // 先返回假数据
    return {
        id:1,
        title:'标题A',
        createTime:1546610491112,
        author:'zhangsan'
    }
}



module.exports={
    getList,
    getDetail
}