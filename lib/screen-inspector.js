/*
 * 监测屏幕宽度，根据配置切换 body 样式
 * e.g.
 * ScreenInspector({
 *   '-990': 'small', // 浏览器宽度小于等于 990px 时为 body 添加样式 "small"
 *   '990-1400': 'normal', // 宽度范围 (990px, 1400px] 时添加样式 "normal"
 *   '1400-': 'wide' // 宽度大于 1400px 时添加样式 "wide"
 * })
 */

var domready = require('domready')
var extend = require('extend')
var eventie = require('eventie')
var ClassList = require('luobotang-classlist')
var getWindowSize = require('get-window-size')

/*
 * {'min-max': 'className', ...}
 */
var setting = {}
/*
 * {RangeObject[]}
 */
var ranges = []

/*
 * @type RangeObject
 * @property {number} min
 * @property {number} max
 * @property {string} className
 */

var TIME_DELAY_SIZE_CHANGE = 100
var MIN_MIN = 0
var MAX_MAX = Infinity

var bodyClassList
var inited = false

// 将用户配置转为更便于使用的数组形式。
function reset(options) {
	extend(setting, options)
	ranges = []
	var range
	var className
	for (range in setting) {
		if (setting.hasOwnProperty(range)) {
			className = setting[range]
			range = makeRange(range, className)
			if (range) {
				ranges.push(range)
			}
		}
	}
}

/*
 * @param {string} rangeStr - 'min-max'
 * @param {string} className
 * @returns {RangeObject} 
 */
function makeRange(rangeStr, className) {
	var idx = rangeStr.indexOf('-')
	if (idx === -1) return null
	var min = parseInt(rangeStr.slice(0, idx), 10) || MIN_MIN
	var max = parseInt(rangeStr.slice(idx + 1), 10) || MAX_MAX
	return {
		min: min,
		max: max,
		className: className
	}
}

function refresh() {
	var width = getWindowSize().width
	var i = 0
	var len = ranges.length
	var range
	var min
	var max
	for (; i < len; i++) {
		range = ranges[i]
		// (range.min, range.max]
		if (width > range.min && width <= range.max) {
			bodyClassList.add(range.className)
		} else {
			bodyClassList.remove(range.className)
		}
	}
}

function init() {
	bodyClassList = ClassList(document.getElementsByTagName('body')[0])

	// 初始化后触发一次监测，确保在初始化前配置的参数得以应用。
	refresh();

	// 延迟刷新，降低运算频率
	var timer
	eventie.bind(window, 'resize', function () {
		if (timer) clearTimeout(timer)
		timer = setTimeout(function () {
			timer = null;
			refresh();
		}, TIME_DELAY_SIZE_CHANGE)
	});
}

function config(options) {
	reset(options)
	if (!inited) {
		inited = true
		// 页面加载后开始监测窗口宽度变化
		domready(init)
	} else {
		refresh()
	}
}

module.exports = config