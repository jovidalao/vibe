# You can use most Debian-based base images
FROM node:21-slim

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*
 
# Enable corepack and activate pnpm for package management (启用 corepack 并激活 pnpm 作为包管理器)
RUN corepack enable && corepack prepare pnpm@9.9.0 --activate

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Install dependencies and customize sandbox
WORKDIR /home/user/nextjs-app

# Use pnpm dlx to scaffold Next.js app (使用 pnpm dlx 创建 Next.js 应用)
RUN pnpm dlx create-next-app@15.4.6 . --yes --use-pnpm

# Initialize and add all shadcn/ui components with pnpm (使用 pnpm 初始化并添加 shadcn/ui 组件)
RUN pnpm dlx shadcn@2.6.3 init --yes -b neutral --force
RUN pnpm dlx shadcn@2.6.3 add --all --yes

# Copy the Next.js app (including hidden files and node_modules) then cleanup
# 复制 Next.js 应用（包含隐藏文件与 node_modules）并清理临时目录
RUN cp -a /home/user/nextjs-app/. /home/user/ && rm -rf /home/user/nextjs-app