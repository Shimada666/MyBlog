---
title: 两种CICD实现方式-传统与新派
tags:

- 运维
- devops
- kubernetes

---

传统的 CICD 方式是通过 Jenkins 等工具实现，而新派的 CICD 方式是通过 GitOps 实现。本文将对两种方式进行对比。

## 什么是 CICD
CICD 是 Continuous Integration and Continuous Delivery 的缩写，即持续集成和持续交付。
* 持续集成(CI)是指开发人员将代码提交到代码仓库后，会自动触发编译、单元测试、集成测试等一系列流程。
* 持续交付(CD)是指持续集成的基础上，将代码部署到测试环境、预发环境、生产环境等一系列流程。
