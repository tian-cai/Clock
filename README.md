# Clock
### 说明
该插件使用canvas实现可配置，可拖拽时钟，对于不支持canvas的浏览器来说，无法使用该插件。无其他依赖项，体积小，使用简单方便。

### 快速上手
1. 只需下载Clock.js文件到本地，将文件引入到html页面，示例如下：

   `<script src="Clock.js"></script>`

2. 具体用法：
   ```js
   //html页面
   <canvas id='clock' width='200' height='200'></canvas>
   //js页面
    var clock = new Clock({id:'clock'})
   ```
3. 构造函数参数说明：
   
   Clock构造函数的参数是可配置化的一个对象，有很多参数，说明如下：
   
   ```js
   {
       id：'clock',                //字符串类型，元素canvas的id
       hourColor: '#4C3FFC',       //字符串类型，时针颜色
       minuteColor: '#5073FF',     //字符串类型，分针颜色
       secondColor: 'red',         //字符串类型，秒针颜色
       clockBorderColor: '#BAC8FC',//字符串类型，时钟边框颜色
       dateColor: '#8299FF',       //字符串类型，日期颜色 
       numberColor: '#1905C9',     //字符串类型，时钟表盘数字颜色
       dotOfhmsColor: '#fff',      //字符串类型，时针分针秒针交织点颜色
       dotColor: '#ccc',           //字符串类型，表盘数字旁边点的颜色
       dotIntColor: '#01071F'      //字符串类型，表盘数字旁边整点的颜色
   }
   //参数id是必传项，其余参数是可选项

   ```
4. 效果图展示与说明：

   ![image.png](http://upload-images.jianshu.io/upload_images/7077173-efc06260a4294c1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
   
>如有不足之处，欢迎指出
