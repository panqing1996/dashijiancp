// 每次调用$.ajax()石都会先调用ajaxPrefilter这个函数，在这个函数中可以拿到我们给ajax题干的配置对象
// 这样以后我们都不要再去写域名了
$.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url
    // 统一为有权限的接口设置headers请求头（当url中包含/my/时调用这个请求头）
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }
    // 全局挂载complete函数
    options.complete= function(res) {
        // console.log(res);
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})