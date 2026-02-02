# 二手手机 ERP Monorepo

本仓库提供一个从 0 到 1 的二手手机 ERP MVP，实现微信/抖音小程序双端 + 统一后端 + 管理后台，并带有 Prisma schema、迁移/种子数据、Swagger 文档与基础测试。

## 目录结构

```
backend/            # NestJS + Prisma + PostgreSQL + Redis
admin-web/          # React + Vite + Ant Design
miniapp/            # Taro 3 + React (微信/抖音双端)
packages/           # 共享包（platform-adapter）
docs/               # 文档与演示流程
```

## 环境要求

- Node.js >= 18
- Docker（可选，用于一键启动 Postgres/Redis）
- pnpm 或 npm（本仓库示例使用 npm）

## 一键启动（Docker）

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run docker:up
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

Swagger: http://localhost:3000/api

## 本地启动（非 Docker）

确保本机有 PostgreSQL 与 Redis，并根据 `backend/.env.example` 配置。

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

## 管理后台启动

```bash
cd admin-web
npm install
npm run dev
```

## 小程序端启动

```bash
cd miniapp
npm install
npm run dev:weapp   # 微信
npm run dev:tt      # 抖音
```

## 测试账号

- 用户名：admin
- 密码：Admin@123

## 关键设计决策

- **NestJS + Prisma**：统一模块化结构，易扩展与测试，Prisma 便于迁移与多租户字段约束。
- **设备状态机 + 状态日志**：以设备（device）为“真相源”，驱动库存流水和业务单据流转。
- **platform-adapter**：封装扫码、上传、存储、请求等差异，确保业务层复用 ≥80%。
- **RBAC + 数据范围**：支持多门店/仓库的数据隔离与权限点控制。

## 可扩展点

- 引入队列与定时任务实现锁定超时释放、库存推送。
- 接入第三方检测与估价服务，自动生成质检与报价。
- 多渠道销售同步（电商平台/直播间）。

## 已知限制

- 小程序端目前为 MVP UI 与流程演示，图像上传为本地占位。
- 未接入微信支付/抖音支付，仅预留订单支付字段。

详见 `docs/demo-flow.md`。
