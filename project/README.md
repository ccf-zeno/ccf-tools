# 使用说明
***
配置文件放在config/local.config.js里面     
***
# 最基础的umi框架
集成  
eslint        代码检测工具  
prettier      代码格式化  
antd.v4          UI框架
lodash        JS快捷组件库
# 项目结构
config  配置  
src  
&emsp;&emsp;-assets&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;公共静态资源，各个页面都会用到的那种  
&emsp;&emsp;-components&emsp;&emsp;&emsp;&emsp;&emsp;公共组件，各个页面都会用到的那种  
&emsp;&emsp;-pages&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;全部的页面  
&emsp;&emsp;-demo&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;页面的名字  
&emsp;&emsp;&emsp;-assets&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;私有静态资源，只有demo才用的  
&emsp;&emsp;&emsp;-components&emsp;&emsp;&emsp;&emsp; 私有组件，只有demo才用的  
&emsp;&emsp;&emsp;-services&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 私有请求路径，只有demo才用的  
&emsp;&emsp;&emsp;-utils&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;私有方法，只有demo才用的  
&emsp;&emsp;-services&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 公共的请求路径，各个页面都会用到的那种  
&emsp;&emsp;-utils&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;公共的方法，各个页面都会用到的那种  

# 更新说明：
2020 4 27：更新UMI3X版本,ANTD4X版本全部切换到最新