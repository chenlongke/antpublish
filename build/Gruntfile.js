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
