var count = 0

var booking_cache = {}


function popNotification() {
  if (Notification.permission == "granted") {
    var notification = new Notification("抢单提示", {
        body: '成功帮您抢到一个单子, 快去看看',
        icon: 'images/icon48.png'
    })

    notification.onclick = () => {
        window.open('http://vbooking.ctrip.com/dingzhi/OrderProcess/index')
        notification.close()
    }
  }
}

// 请求通知
if (!(Notification.permission == "granted" || Notification.permission == "denied")) {
  Notification.requestPermission((permission) => {})
}

// 禁用alert防止干扰
var deniedAlert = (() => {
  var box = document.createElement('div')
  box.style.cssText = 'display:none'
  box.innerHTML = `<input style="display:none" onclick="window.alert=function(msg){console.log(msg)}" value="禁用alert" type="button">`
  document.body.insertBefore(box, document.body.children[0])
  box.querySelector('input').click()
})()

//刷新数据代理
var refreshProxy = (() => {
  var box = document.createElement('div')
  box.style.cssText = 'line-height:30px;background:lightyellow;color:#fc0;padding-left:5px;'
  box.innerHTML = `自动刷单程序已经启动！上次刷新后已经自动预定<span id="helper_count" style="color:red;font-size:16px;"> ${count} </span>单<input style="display:none" onclick="loadData()" value="刷新数据" type="button">`
  document.body.insertBefore(box, document.body.children[0])
  return box.querySelector('input')
})()

var info = document.querySelector('#helper_count')
//3s刷新一下数据
setInterval(() => {
  refreshProxy.click();
}, CONF_REFRESH_FREQUENCE * 1000)

//1s检查一次是否有可以抢单的，这样更快
setInterval(() => {
  document.querySelectorAll('.tb_ebooking_list tr').forEach(row => {
    //有抢单按钮, 点击下抢单按钮
    var id = row.id
    var qdBtn = row.querySelector('a[name=robRequire]')
    if (!booking_cache[id] && qdBtn) {
      booking_cache[id] = 1
      qdBtn.click()
      info.innerHTML = ++count
      // 显示通知
      popNotification()
    }
    //测试代码
    //var robStatus = 0; 可以抢单，页面代码如下
    // var id = row.id
    // var tpl = '<a name="robRequire" href="javascript:void(0)" onclick="RobRequire(\'' + id + '\')">抢单</a>'
    // var qdBtn = row.querySelector('.bqd')
    // if (qdBtn) {
    //   info.innerHTML = ++count
    //   qdBtn.innerHTML = tpl
    //   qdBtn.querySelector('a').click()
    // }
  })
}, CONF_BOOKING_FREQUENCE * 1000)
