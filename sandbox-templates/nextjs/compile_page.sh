#!/bin/bash

# This script runs during building the sandbox template
# and makes sure the Next.js app is (1) running and (2) the `/` page is compiled
# 该脚本在构建沙箱模板时运行，确保 Next.js 应用 (1) 正在运行 且 (2) `/` 页面已编译
function ping_server() {
	counter=0
	response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	while [[ ${response} -ne 200 ]]; do
	  let counter++
	  if  (( counter % 20 == 0 )); then
        echo "Waiting for server to start..."
        sleep 0.1
      fi

	  response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	done
}

ping_server &
# Start dev server with pnpm (使用 pnpm 启动开发服务器)
cd /home/user && pnpm dev --turbopack --hostname 0.0.0.0 --port 3000