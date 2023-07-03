#!/bin/sh

# 启动WWeb主流程

echo
echo "* Web starting..."
echo

# 定义配置文件变量替换时使用的环境变量信息
echo "* Using envsubst configuration:"
echo
envstr="$envstr\${SERVER_HOST} "
echo $envstr
echo

envsubst '$SERVER_HOST ' < conf/conf.d/default.conf.template > conf/conf.d/default.conf

# 打印环境变量
echo "* Show exports:"
echo
export
echo

nginx -p $PWD -c conf/nginx.conf -g 'daemon off;'
echo
