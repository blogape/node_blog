const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');

// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({})
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toSting();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return;
            }
            resolve(JSON.parse(postData));
        })

    })
    return promise;
}




const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');
    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];
    // 解析 query
    req.query = querystring.parse(url.split('?')[0]);
    //处理postdata
    getPostData(req).then(postData => {
        req.body = postData;
        // 处理blog 路由
        const blogData = handleBlogRouter(req, res);

        if (blogData) {
            res.end(
                JSON.stringify(blogData)
            )
            return;
        }

        // 处理User 路由
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }

        // 未找到路由  返回404

        res.writeHeader(404, {
            "Content-Type": "text/plain"
        })
        res.write('404 NOTFOUND')
        res.end();
    })


}


module.exports = serverHandle;