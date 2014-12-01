screenInspector.js
==================

JavaScript 辅助工具，监测屏幕宽度的变化，根据配置切换 body 样式，用于开发宽度自适应页面。

示例
----

```javascript
screenInspector.config({
    '-900': 'small',
    '900-1800': 'normal',
    '1800-': 'big'
});
```

请打开 example.html 以查看效果。

依赖
----

-  jQuery （对，就是那个 jQuery....）

使用方法
--------

以全局变量 screenInspector 暴露方法，提供两个方法：

-  ```config(options)```：配置要检测的宽度范围序列，以及对应要添加的样式
-  ```refresh()```：手动触发一次宽度检测

宽度范围为 "start-end" 的形式，不包含 start，包含 end，也就是 (start, end]。
