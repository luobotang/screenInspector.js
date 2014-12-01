/*
 * 监测屏幕宽度，根据配置切换 body 样式
 * e.g.
 * screenInspector.config({
 *   '-990': 'small', // 浏览器宽度小于等于 990px 时为 body 添加样式 "small"
 *   '990-1400': 'normal', // 宽度范围 (990px, 1400px] 时添加样式 "normal"
 *   '1400-': 'wide' // 宽度大于 1400px 时添加样式 "wide"
 * }).refresh();
 *
 * 依赖：jQuery
 *
 * author: luobotang
 * version: 0.1
 * project: https://github.com/luobotang/screenInspector.js
 */
(function (factory) {

	window.screenInspector = factory(jQuery, window, document);

})(function ($, window, document) {

	var setting = {}, // {'start-end': 'className', ...}
		ranges = []; // [[startWidth, endWidth, className], ...]

	function config(options) {
		$.extend(setting, options);
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
				$('body').addClass(range[2]);
			} else {
				$('body').removeClass(range[2]);
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

	// 参考： http://www.javascripter.net/faq/browserw.htm
	function getWindowWidth() {
		var winW = 0;
		if (document.body && document.body.offsetWidth) {
			winW = document.body.offsetWidth;
		}
		if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
			winW = document.documentElement.offsetWidth;
		}
		if (window.innerWidth) {
			winW = window.innerWidth;
		}
		return winW;
	}

	function refresh() {
		var width = getWindowWidth();
		checkWidth(width);
	}

	function init() {
		var t;
		$(window).on('resize', function () {
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
	$(init);

	return {
		config: config,
		refresh: refresh
	};
});
