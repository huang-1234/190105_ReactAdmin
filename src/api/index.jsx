

import ajax from './ajax';
import jsonp from 'jsonp'
import {message} from 'antd'

const BASE = ''
// 登录
export const reqLogin = (username, password) => ajax(BASE +'/login', { username, password }, 'POST');

// 添加用户
export const reqAddUser = (user) => ajax(BASE +'/manage/user/add', user, 'POST');


/*
json请求的接口请求函数
 */
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log("jsonp()", err, data);
      // 如果成功了
      if (!err && data.status === "success") { 
        // 取出需要的数据
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({ dayPictureUrl, weather });
      } else {
        // 如果失败了
        message.error("获取天气信息失败!");
      }
    });
  });
};
// reqWeather('北京')
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */
