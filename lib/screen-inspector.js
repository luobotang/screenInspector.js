/*
 * 监测屏幕宽度，根据配置切换 body 样式
 * e.g.
 * ScreenInspector.config({
 *   '-990': 'small', // 浏览器宽度小于等于 990px 时为 body 添加样式 "small"
 *   '990-1400': 'normal', // 宽度范围 (990px, 1400px] 时添加样式 "normal"
 *   '1400-': 'wide' // 宽度大于 1400px 时添加样式 "wide"
 * }).refresh();
 */

var domready = require('domready')
var extend = require('extend')
var eventie = require('eventie')
var classie = require('classie')

var setting = {} // {'start-end': 'className', ...}
var ranges = [] // [[startWidth, endWidth, className], ...]

var body
var inited = false

function config(options) {
	extend(setting, options);
	setting2ranges();
	return this;
}

// 将用户配置转为更便于使用的数组形式。
function setting2ranges() {
	ranges = [];
	for (var k in setting) {
		if (setting.hasOwnProperty(k)) {
			var range = key2widthRange(k);
			range.push(setting[k]);
			ranges.push(range);
		}
	}
}

function checkWidth(width) {
	for (var i = 0, range, len = ranges.length; i < len; i++) {
		range = ranges[i];
		if (width > range[0] && width <= range[1]) {
			classie.addClass(body, range[2]);
		} else {
			classie.removeClass(body, range[2]);
		}
	}
}

function key2widthRange(key) {
	if (!key || !key.indexOf || key.indexOf('-') < 0) {
		return [0, 0];
	}
	key = key.split('-');
	return [+key[0] || 0, +key[1] || Infinity];
}

function getWindowWidth() {
	// TODO get window width !!!!
	return window.innerWidth;
}

function refresh() {
	if (inited) {
		var width = getWindowWidth();
		checkWidth(width);
	}
}

function init() {
	inited = true;
	body = document.getElementsByTagName('body')[0]
	var t;
	eventie.bind(window, 'resize', function () {
		if (t) {
			clearTimeout(t);
		}
		t = setTimeout(function () {
			refresh();
			t = null;
		}, 100);
	});
	// 初始化后触发一次监测，确保在初始化前配置的参数得以应用。
	refresh();
}

// 页面加载后开始监测窗口宽度变化
domready(init)

module.exports = {
	config: config,
	refresh: refresh
}