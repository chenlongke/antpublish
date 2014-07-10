#蚂蚁发布 README

##1. 概述
###1.1 工具目标
1. 蚂蚁发布期望建立一种快捷简洁的代码自动化发布工具，减少在上线环节出错的可能性
2. 目前仅支持Linux，未来将支持Windows 7及以上操作系统
3. 先期功能比较有限，

###1.2 获得方式
此工具，源码放在github上，fork地址 https://github.com/seamanjiang/antpublish
```
git clone https://github.com/seamanjiang/antpublish.git
```

###1.3 用的不爽，新需求
- 直接改造，然后通过fork/pull-request把代码发来，一起维护
- 开issue，提意见给我，我来改造

##2. 工具运行

###2.1 直接运行
在build目录下，直接运行`grunt`命令会给出一些提示，大致讲述grunt有的两个命令
- `grunt build` 编译命令
- `grunt cdn` 上传阿里云发布到cdn服务器

```
localhost:build seaman$ grunt
Running "default" task

Usage: grunt <command>

grunt build			编译代码
grunt cdn			上传到cdn服务器

使用前先配置 gruntfile.js 和 package.json
本工具会自动使用当前的日期标记版本，注意跨00:00使用cdn/lua命令时，务必先build

Done, without errors.
```
###2.2 grunt build 编译
以数据为例 `grunt build` 是这样的，大家可以看到

- 所有的js文件大幅压缩了大小，压缩比在50%以上
- 所有的图片压缩了大小，压缩比也有20%
- 所有的css文件也进行了压缩
- HTML文件已经从预发上拉下来了，且进行了替换
- HTML文件进行了压缩，压缩比也有20%-30%
- 所有编译工作完成

```
localhost:build seaman$ grunt build
Running "uglify:build" (uglify) task
File ../cdn/v20140710/js/udp-pc-v2.js created: 23.56 kB → 10.48 kB
File ../cdn/v20140710/js/udp-mobile-v2.js created: 41.73 kB → 16.91 kB

Running "imagemin:build" (imagemin) task
✔ ../www/public/images/logo.jpg (saved 835 B - 13%)
✔ ../www/public/images/logopc.png (saved 2.34 kB - 44%)
✔ ../www/public/images/logo.png (saved 4.03 kB - 16%)
Minified 3 images (saved 7.2 kB)

Running "copy:build" (copy) task
Created 1 directories, copied 10 files

Running "cssmin:build" (cssmin) task
File ../cdn/v20140710/css/index.css created: 911 B → 648 B
File ../cdn/v20140710/css/common.css created: 1.4 kB → 1.05 kB
File ../cdn/v20140710/css/trade.css created: 400 B → 287 B
File ../cdn/v20140710/css/pccommon.css created: 1.12 kB → 802 B
File ../cdn/v20140710/css/pcindex.css created: 470 B → 349 B

Running "curl-dir:build" (curl-dir) task
Files "../cdn/v20140710/mobile/index", "../cdn/v20140710/mobile/trade", "../cdn/v20140710/mobile/more" created.

Running "replace:build" (replace) task
Replace ../cdn/v20140710/mobile/index → ../cdn/v20140710/mobile/index
Replace ../cdn/v20140710/mobile/trade → ../cdn/v20140710/mobile/trade
Replace ../cdn/v20140710/mobile/more → ../cdn/v20140710/mobile/more

Running "htmlmin:build" (htmlmin) task
Minified ../cdn/v20140710/mobile/index 3.86 kB → 2.57 kB
Minified ../cdn/v20140710/mobile/trade 5.41 kB → 3.4 kB
Minified ../cdn/v20140710/mobile/more 3.96 kB → 2.94 kB

Done, without errors.

```

###2.3 grunt cdn 发布
运行`grunt cdn`可以发布到cdn服务器，以数据为例

- 他自动识别了文件了类型，如HTML/JSON
- 他自动探测了内嵌文件夹
- 他发布了整个目录，到oss服务器上

```
localhost:build seaman$ grunt cdn
Running "exec:cdn" (exec) task
1. text/css Upload file {../cdn/v20140710/css/common.css } successful..
2. text/css Upload file {../cdn/v20140710/css/index.css } successful..
3. text/css Upload file {../cdn/v20140710/css/pccommon.css } successful..
4. text/css Upload file {../cdn/v20140710/css/pcindex.css } successful..
5. text/css Upload file {../cdn/v20140710/css/ratchet.min.css } successful..
6. text/css Upload file {../cdn/v20140710/css/theme.less } successful..
7. text/css Upload file {../cdn/v20140710/css/trade.css } successful..
8. application/octet-stream Upload file {../cdn/v20140710/fonts/iconfont.eot } successful..
9. image/svg+xml Upload file {../cdn/v20140710/fonts/iconfont.svg } successful..
10. application/octet-stream Upload file {../cdn/v20140710/fonts/iconfont.ttf } successful..
11. application/octet-stream Upload file {../cdn/v20140710/fonts/iconfont.woff } successful..
12. application/octet-stream Upload file {../cdn/v20140710/fonts/ratchicons.eot } successful..
13. image/svg+xml Upload file {../cdn/v20140710/fonts/ratchicons.svg } successful..
14. application/octet-stream Upload file {../cdn/v20140710/fonts/ratchicons.ttf } successful..
15. application/octet-stream Upload file {../cdn/v20140710/fonts/ratchicons.woff } successful..
16. image/jpeg Upload file {../cdn/v20140710/images/logo.jpg } successful..
17. image/png Upload file {../cdn/v20140710/images/logo.png } successful..
18. image/png Upload file {../cdn/v20140710/images/logopc.png } successful..
19. application/x-javascript Upload file {../cdn/v20140710/js/udp-mobile-v2.js } successful..
20. application/x-javascript Upload file {../cdn/v20140710/js/udp-pc-v2.js } successful..
21. application/octet-stream Upload file {../cdn/v20140710/mobile/index } successful..
22. application/octet-stream Upload file {../cdn/v20140710/mobile/more } successful..
23. application/octet-stream Upload file {../cdn/v20140710/mobile/trade } successful..

Done, without errors.

```
###2.4 uploadcdn 命令

使用本命令，可以快速的把一个目录，传递到cdn上。
使用方法：

```
./uploadcdn <bucketname> <localdir> <ossdir>
```

例如，在数据中这么用，把mobile目录快速上传
```
./uploadcdn qniyong /srv/udp.loveapp.cn/cdn/v20140709/mobile udp/v20140709/mobile
```

##3. 准备环境
要使用这个工具，是需要进行一些改造的的
1. 工程目录按照要求改造（新添加 build/cdn目录）
2. 第三方依赖按照要求安装

###3.1 基础工程目录
```
/
|---build (必须：编译工具及脚本)
|   |---package.json(nodejs项目配置，不需要动)
|   |---Gruntfile.js(Grunt配置文件)
|   |---README.md(本文件)
|---cdn (必须：每次发布到CDN的版本及说明)
|   |---v20140610
|   |---v20140701
|---conf (可选：项目所用配置文件如mysql或redis或nginx配置)
|   |---redis.conf
|   |---udp.zzgdapp.com
|---sql (可选：数据库脚本、升级patch、备份)
|---lua (可选：lua脚本)
|   |---adder.lua
|---log (可选：nginx/lua等运行过程中产生log的统一配置)
|   |---access.log
|   |---error.log
|   |---lua.log
|---www (可选：php站点目录)
|   |---.....
|---proxy （用于手机项目的nodejs代理）
```

###3.2 第三方软件依赖包

1. NodeJS
```
sudo apt-get install nodejs
```
2. GruntJS
```
npm install -g grunt-cli
```
3. GruntJS插件 CSS压缩、HTML压缩等
有些兄弟npm 安装时需要sudo ，那就sudo 吧，属于人品不好的范畴
```
cd /srv/udp.loveapp.cn/build <= 切换到你的build 目录
npm install grunt --save-dev
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-copy --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-contrib-htmlmin --save-dev
npm install grunt-contrib-imagemin --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-nodeunit --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-curl --save-dev
npm install grunt-exec --save-dev
npm install grunt-remove --save-dev
npm install grunt-replace --save-dev
```

##4. 工具配置
工具有且仅有两个配置文件
- `uploadcdn` 配置阿里云oss的appkey等
- `package.json` 主要配置全局的参数
- `Gruntfile.js` 主要配置要处理的css/js/html的名字

###4.1 配置uploadcdn文件

这两行中的参数换成自己的。

```
define('OSS_ACCESS_ID', '');
define('OSS_ACCESS_KEY', '');
```

###4.2 配置package.json
```
{
  "name": "udp",  <== 配置项目的名字，例如数据叫做udp，对应oss上是udp目录
  "version": "2.0.0",
  "preserverurl": "http://udptest.zzgdapp.com", <== 配置预发服务器的地址，用以抓取发布用的HTML
  "bucket": "qniyong", <== 配置oss bucket名字
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-contrib-concat": "^0.4.0",
    "grunt-contrib-copy": "^0.5.0",
    "grunt-contrib-cssmin": "^0.10.0",
    "grunt-contrib-htmlmin": "^0.3.0",
    "grunt-contrib-imagemin": "^0.7.1",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-nodeunit": "~0.3.3",
    "grunt-contrib-uglify": "^0.5.0",
    "grunt-curl": "^2.0.2",
    "grunt-exec": "^0.4.5",
    "grunt-remove": "^0.1.0",
    "grunt-replace": "^0.7.8"
  }
}
```

###4.3 配置Gruntfile.js
```
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          //这里配置需要压缩和混淆的js 复制行，加入名字即可
          '../cdn/v<%= grunt.template.today("yyyymmdd") %>/js/udp-pc-v2.js': ['../www/public/js/udp-pc-v2.js'],
          '../cdn/v<%= grunt.template.today("yyyymmdd") %>/js/udp-mobile-v2.js': ['../www/public/js/udp-mobile-v2.js']
        }
      }
    },
    //配置需要压缩的css 复制行，加入名字即可
    cssmin: {
        build: {
             files: {
                 '../cdn/v<%= grunt.template.today("yyyymmdd") %>/css/index.css': "../www/public/css/index.css",
                 '../cdn/v<%= grunt.template.today("yyyymmdd") %>/css/common.css': "../www/public/css/common.css",
                 '../cdn/v<%= grunt.template.today("yyyymmdd") %>/css/trade.css': "../www/public/css/trade.css",
                 '../cdn/v<%= grunt.template.today("yyyymmdd") %>/css/pccommon.css': "../www/public/css/pccommon.css",
                 '../cdn/v<%= grunt.template.today("yyyymmdd") %>/css/pcindex.css': "../www/public/css/pcindex.css",
             }
         }
     },
     //直接拷贝就可以用的css/js/less，用于已经min完的js，推荐放在pubcdn上 复制行，加入名字即可
     copy: {
       build: {
         files: [
           {src: '../www/public/css/ratchet.min.css',dest:  '../cdn/v<%= grunt.template.today("yyyymmdd") %>/css/ratchet.min.css'},
           {src: '../www/public/css/theme.less',dest:  '../cdn/v<%= grunt.template.today("yyyymmdd") %>/css/theme.less'},
           {expand: true, cwd: '../www/public/fonts/', src: ['**'], dest: '../cdn/v<%= grunt.template.today("yyyymmdd") %>/fonts/'},
         ]
       }
     },
     // 合并CSS，如有项目有需求，按照这里注视的代码修改一下
     // concat: {
     //      // css: {
     //      //     src: ['../www/public/css/ratchet.min.css','build/css/*.min.css'],
     //      //     dest: 'build/css/udp-mobile.min.css'
     //      // },
     //      js: {
     //          src: ['../www/public/js/*.min.js','build/js/udp-mobile-v2.min.js'],
     //          dest: 'build/js/udp-mobile-v2.min.js'
     //      }
     //  },
     //配置需要从预发上复制下来的文件及本地目标目录 复制行，加入名字即可 //如果要抓两个目录，那需要配置build1 build2那两个build，然后在registerTask处进行配置，比较麻烦
     'curl-dir': {
       build: {
         src:[
           '<%= pkg.preserverurl%>/mobile/index',
           '<%= pkg.preserverurl%>/mobile/trade',
           '<%= pkg.preserverurl%>/mobile/more',
         ],
         dest:'../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/'
       }
     },
     //下载下的HTML需要替换把预发服务器地址替换成正式CDN服务器地址
     replace: {
      build: {
        options: {
          patterns: [
            {
              match: '<%=pkg.preserverurl%>',
              replacement: 'http://cdn.zzgdapp.com/<%=pkg.name%>/v<%= grunt.template.today("yyyymmdd") %>'
            }
          ],
          usePrefix: false
        },
        files: [
          {expand: true, flatten: true,
            src: ['../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/index','../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/trade','../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/more'], dest: '../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/'}
        ]
      }
     },
     //把HTML压缩一下，配置一下需要压缩的HTML页面
     htmlmin: {                                     // Task
      build: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          '../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/index': '../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/index',     // 'destination': 'source'
          '../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/trade': '../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/trade',     // 'destination': 'source'
          '../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/more': '../cdn/v<%= grunt.template.today("yyyymmdd") %>/mobile/more',     // 'destination': 'source'
        }
      }
    },
    //压缩一下图片，配置需要压缩的图片目录
    imagemin: {                          // Task
      build: {
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: '../www/public/images/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '../cdn/v<%= grunt.template.today("yyyymmdd") %>/images/'                  // Destination path prefix
        }]
      }
    },
    //上传CDN，无需配置
    exec: {
      cdn: {
        command: './uploadcdn <%= pkg.bucket%> ../cdn/v<%= grunt.template.today("yyyymmdd") %> <%= pkg.name%>/v<%= grunt.template.today("yyyymmdd") %>',
        stdout: true,
        stderr: true
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-remove');
  grunt.loadNpmTasks('grunt-exec');

  // Default task(s).
  grunt.registerTask('build',['uglify:build','imagemin:build','copy:build','cssmin:build','curl-dir:build','replace:build','htmlmin:build']);
  grunt.registerTask('cdn',['exec:cdn']);
  grunt.registerTask('lua',[]);
  grunt.registerTask('luarevert',[]);

  grunt.registerTask('default', '',function(){
    grunt.log.writeln("");
    grunt.log.writeln("Usage: grunt <command>");
    grunt.log.writeln("");
    grunt.log.writeln("grunt build\t\t\t编译代码");
    grunt.log.writeln("grunt cdn\t\t\t上传到cdn服务器");
    //grunt.log.writeln("grunt lua\t\t\t发布到lua并重启服务");
    //grunt.log.writeln("grunt luarevert v20140610\tlua回滚到v20140610版本");
    grunt.log.writeln("");
    grunt.log.writeln("使用前先配置 gruntfile.js 和 package.json");
    grunt.log.writeln("本工具会自动使用当前的日期标记版本，注意跨00:00使用cdn/lua命令时，务必先build");
  });

};

```
