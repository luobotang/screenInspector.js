# screenInspector.js

监测屏幕宽度的变化，根据配置切换 body 样式，用于开发宽度自适应页面。

## 示例

```javascript
screenInspector({
    '-900': 'small',
    '900-1800': 'normal',
    '1800-': 'big'
})
```

宽度范围为 "start-end" 的形式，不包含 start，包含 end，也就是 (start, end]。
