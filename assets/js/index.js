$(function () {
  getUserInfo()
})
// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers 就是请求头配置对象 请求权限
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }
      console.log(res);
      renderAvatar(res.data)

    },
    // 请求返回后执行，不管成功还是失败都会执行complete函数
    // complete: function (res) {
    //   // console.log(res);
    //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 强制清空
    //     localStorage.removeItem('token')
    //     // 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }
  })
}



// 渲染用户的头像
function renderAvatar(user) {
  // 获取用户名称 (昵称/登录名)
  var name = user.nickname || user.username;
  //   设置欢迎文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 按需求渲染用户头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    // 文字头像隐藏
    $('.text-avatar').hide()
  }
  // 图片头像隐藏
  $('.layui-nav-img').hide()
  // 文字头像显示
  var first = name[0].toUpperCase()
  $('.text-avatar').html(first).show()
}


$('#btn_logout').on('click', function () {
  // 是否确认退出
  layer.confirm('是否确认退出?', { icon: 3, title: '提示' },
    // index是你弹出层的id号  直接套用 
    function (index) {
      //do something
      // 1.清空本地存储的token
      localStorage.removeItem('token')
      // 2.跳转到登录页
      location.href = '/login.html'
      layer.close(index);
    });
})