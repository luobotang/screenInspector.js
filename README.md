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
