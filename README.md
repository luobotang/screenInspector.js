screenInspector.js
==================

JavaScript 辅助工具，用于监测屏幕宽度，根据配置切换 body 样式，用于开发宽度自适应页面。

示例
----

```javascript
screenInspector.config({
   '-990': 'small', // 浏览器宽度小于等于 990px 时为 body 添加样式 "small"
   '990-1400': 'normal', // 宽度范围 (990px, 1400px] 时添加样式 "normal"
   '1400-': 'wide' // 宽度大于 1400px 时添加样式 "wide"
}).refresh();
```

依赖
----

jQuery （对，就是那个 jQuery....）

使用方法
--------

以全局变量 screenInspector 暴露方法，提供两个方法：

-  config(options)：配置要检测的宽度范围序列，以及对应要添加的样式
-  refresh()：手动触发一次宽度检测

宽度范围为 "start-end" 的形式，不包含 start，包含 end，也就是 (start, end]。
