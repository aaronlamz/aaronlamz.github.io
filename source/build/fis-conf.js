/**
 * fis 配置文件
 * Created by Lyzh on 2016-07-16
 */
var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours()].join(''));
fis.config.merge({
	project: {
		charset: 'utf8',
		md5Length: 7,
		md5Connector: '-',
		fileType: {
			text: 'tpl, shtml'
		}
	},
	modules: {
		parser: {
			html: 'swig',
			// 设置后缀名为less的文件使用fis-parser-less进行编译
			less: ['less']
		}
	},
	roadmap: {
		ext: {
			shtml: 'html',
			less: 'css',
			tmpl: 'js'
		},
		domain: {
			'**.css': 'http://www.lyzh.tech',
			'**.js': 'http://www.lyzh.tech',
			'image': 'http://www.lyzh.tech'
		},
		path: [{
			reg: /.*\.html/i,
			isHtmlLike: true
		}, {
			reg: '/assets/css/**.css',
			query: '?t=${timestamp}',
			useHash: false,
			release: '$&',
			url: '$&'
		}, {
			reg: '/assets/js/**.js',
			query: '?t=${timestamp}',
			useHash: false,
			release: '$&',
			url: '$&'
		}]
	},
	pack: {
		'/assets/css/style.min.css': [
			'/assets/less/reset.less',
			'/assets/less/index.less'
		]
	},
	deploy: {
		// 本地开发环境
		dev: {
			to: './dist/'
		},
		// 线上部署环境
		prd: {
			to: '../'
		}
	}
});