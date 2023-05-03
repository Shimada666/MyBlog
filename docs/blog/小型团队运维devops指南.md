---
title: 个人项目/小型团队运维devops指南
tags:

- 运维
- devops
- kubernetes

---

一直以来，我的个人项目部署都用的单机 + jenkins 的形式来实现 CICD，但使用时也渐渐发现不足。
如可移植性差、欠缺监控、部署麻烦等。且这一套过于传统，与现在先进的云原生技术有差距。
于是我决定对传统的服务方式来一个改造，跟上业界潮流，使用 kubernetes 来部署我的服务，以获得更好的体验。

## 项目简介

我的个人项目有前端项目、后端项目（java、python）等。在以往，前端项目是通过 jenkins 轮询代码仓库，触发流水线，
在机器上安装、构建，然后配置 nginx 来部署的。而后端项目通常用 docker 启动。做法一般是写 dockerfile 后，
到机器上去 build，然后再写个 docker-compose 文件，docker-compose down 后再 docker-compose up。
最后再在 nginx 上配个反向代理。这一套比较快，但也有些麻烦之处：

* 前端项目使用的包管理器、node 版本不一定相同，容易出现无法安装、构建的情况。而且还要生成 nginx 的 conf 文件，麻烦。方法也比较原始。
* 后端项目多了不容易记住开的是哪个端口，以前开了哪些端口，要配反代也麻烦，而且镜像没地方存，只能存机器上。

综上所述，我希望找到一个新的 devops 方式，来把提交代码 - 构建镜像 - 拉取镜像 - 部署这一套串起来，达到提交代码后自动更新服务的操作。

## kubernetes 集群搭建

搭建 kubernetes 集群有两个选择：rancher、kubesphere

在开始的时候，我使用的 rancher 搭建 k8s 集群。但是不知道哪里出了问题，
rancher 死活装不上集群，节点一直无法加入集群，试了好几个版本都不行，属实是浪费我时间了，另外 rancher
的文档、讨论什么的都是英文的，看的头大，于是我就把目光投向了 kubesphere。

kubesphere 安装倒是很顺利，这里必须夸一下 kubesphere 的文档，写的非常详细，直接按文档上 all in one 的方式，
一次就搭建成功了。kubesphere 自带监控报警等功能，且具有可视化的图形界面，自带 ui，白屏化的操作模式，
让我摆脱了不熟 kubectl 命令的窘迫，用起来属实是非常顺手。毕竟脱离运维有点久了，业务不熟了。

就这样，我成功把 kubernetes 集群搭建起来了，还配上了个对开发友好的 ui 界面，附带一堆功能，开箱即用，很舒服


## 新的 devops

在之前，其实一直想把流程做正规点，把 jenkins + k8s 那一套用起来，苦于当时认为网上各种实践都比较麻烦，就一直没搞。
在后面逛 v 站的时候，了解到 k8s 单节点有 rancher、kubesphere 这样很方便的平台可以一键式搭建 k8s 集群，于是就决定重新试一下。

对于个人项目，我期望的是操作是：

1. 提交代码
2. 检测到代码变动
3. 构建镜像
4. 推送镜像到镜像仓库
5. 拉取镜像
6. 进行部署
7. 配置域名反代

在原本我用的 jenkins 那一套，没有 5、6 的操作，这就导致难以多服务器部署。且配置反代也麻烦。

现在有了 kubesphere 这套方案，就可以很方便地将这些串到一起。下面讲一下每一步的细节

### 1.提交代码
提交代码，首先要有代码仓库。在这里只推荐 github。但是 github 也有一些问题，比如不挂梯子速度太慢、经常失败等。
所以为了解决这个问题，也可以用阿里云的 codeup，或者自建 gitlab 等方案，来保存我们的代码

### 2.检测代码变动
一般情况下，是可以配置 webhook 来触发流水线的。
但是，webhook 需要去 github 额外再配置一下，此外，那时候服务器刚好挂了怎么办？

所以为了解决这个问题，我还是配的流水线的定时扫描器，每一两分钟就扫描一下，发现不同了就触发流水线。

### 3.构建镜像
这步也是在流水线里做。流水线在拉取代码后，进行 docker build 操作。
我们可以构建镜像，然后为镜像打个 tag。

### 4.推送镜像
构建完镜像后，就可以推送镜像了。

但是，推送镜像到什么地方呢？有两个选择方案，一个是用公有云提供的镜像仓库，如腾讯云、阿里云的镜像仓库服务。
另一个就是自己自建 harbor 之类的镜像仓库。众所周知，自己搭建不仅麻烦，且 SLA 也无法保证，所以，
我直接选择了公有云提供的服务，毕竟，能上云的就上云，公有云提供的服务的稳定性不是个人自建所能比的。

在这一步，通过流水线里的命令，将镜像推送至腾讯云镜像仓库。

在这里还有个细节，我们一般希望保存每个构建的镜像，所以我们可以将此次构建出的镜像，再加个 latest 的 tag，
然后和原 tag 一起推送至镜像仓库。

### 5.拉取镜像
kubernetes 集群这时候会选择一台合适的服务器来部署服务。由于我们暂时只有一台机器，那么肯定就调度到这台机器上。
但是拉取镜像的行为还是要做的。我们一般会在服务里增加一个 kubernetes 配置文件，配置将拉取何镜像。
这里我们选择了使用变量的方式，使用之前的镜像名来拉取，所以我们配置文件中拉取镜像一项也要写变量名。这里要和 jenkinsfile 配合使用。
例如我就是这样的：

```yaml
# deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  # 部署名字
  name: pzblog
  namespace: corgi-project
spec:
  replicas: 1
  # 用来查找关联的 Pod，所有标签都匹配才行
  selector:
    matchLabels:
      app: pzblog
  # 定义 Pod 相关数据
  template:
    metadata:
      labels:
        app: pzblog
    spec:
      imagePullSecrets:
        - name: txcloud-docker-registry  # 提前在项目下配置访问腾讯云的账号密码
      # 定义容器，可以多个
      containers:
        - name: pzblog # 容器名字
          image: $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$GIT_COMMIT # 配合 jenkins 使用的镜像
          imagePullPolicy: Always
```

### 6.进行部署
在拉取完镜像之后，我们就要开始部署。一般情况下，云原生的部署方式是用 argo cd 这样的 cd 工具来完成部署，
但是个人项目不用搞这么花里胡哨，再加上 kubesphere 集成的持续部署功能还有待完善，于是我们还是使用最传统的
kubectl 来完成部署。

一般我希望在项目下有一个 deployments 文件夹，里面有 deployment、service、ingress 三个 yml 来部署服务。
deployment 刚刚已经贴过，是用来启动容器（工作负载）的，而 service 是用来给容器暴露网络的，但是一般暴露的网络，
只能在 kubernetes 集群内访问。而 ingress 则是用来暴露域名访问的。在 ingress 文件里我们会配置一个域名，
转发域名到指定的服务上，从而完成外网的访问。这里我们贴一下 service.yml、ingress.yml 的配置
```yaml
# service.yml
apiVersion: v1
kind: Service
metadata:
  namespace: corgi-project
  labels:
    app: pzblog-svc
  name: pzblog-svc
spec:
  sessionAffinity: None
  selector:
    app: pzblog
  ports:
    - name: http-80
      protocol: TCP
      targetPort: 80
      port: 80
```

```yaml
# ingress.yml
kind: Ingress
apiVersion: networking.k8s.io/v1
metadata:
  name: pzblog
  namespace: corgi-project
  annotations:
    kubesphere.io/creator: admin
spec:
  rules:
    - host: shimada666.corgi.plus
      http:
        paths:
          - path: /
            pathType: ImplementationSpecific
            backend:
              service:
                name: pzblog-svc
                port:
                  number: 80
```

而对于部署环节，我们流水线的命令是
```shell
envsubst < deployments/deployment.yml | kubectl apply -f -
envsubst < deployments/service.yml | kubectl apply -f -
envsubst < deployments/ingress.yml | kubectl apply -f -
```
这会自动将我们 yml 文件的变量占位符替换成流水线中指定的变量，从而进行部署。

### 7.配置域名反代
在从前，我们还要手动开反代。而现在，在部署环节，我们已经配置了 ingress，来自动将对应域名转发到我们的服务上。

至此，一个服务部署就结束了，全程都是自动作业，以后开一个新项目，只需要为项目拷贝一份 jenkinsfile 与
kubernetes 部署文件，简单修改一下，再到 kubesphere 配置一下，即可完成整套自动化构建部署的操作。

## 小结
这一套部署方案目前已经在好几个人项目里用上了。非常舒适。理论上，云原生部署最好结合 argo cd 来做，
而现在 jenkins 一手包办了整个 CICD 流程。最好的这一套流程大概是：
1. 提交代码
2. jenkins 做 ci，完成镜像构建、推送
3. 工具修改部署镜像等信息
4. argo cd 来做 cd，监测到 kubernetes 配置文件发生变化，自动拉取最新镜像部署。

但是 kubesphere 集成的 argo cd 目前还不完善，加上个人项目没那么多讲究，所以就先这样跑着了。
集成 argo cd 的方式，还在继续探索中，希望未来能用上。

## 附录
### jenkinsfile
```groovy
pipeline {
  agent {
    node {
      label 'base'
    }

  }
  stages {
    stage('clone code') {
      agent none
      steps {
        container('base') {
          git(url: 'git@github.com:Shimada666/MyBlog.git', changelog: true, poll: false, credentialsId: 'pz-github-ssh', branch: 'master')
        }

      }
    }

    stage('build & push') {
      steps {
        container('base') {
          sh 'docker build -f Dockerfile -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$GIT_COMMIT .'
          withCredentials([usernamePassword(credentialsId : 'txcloud-docker-registry' ,passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,)]) {
            sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
            sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$GIT_COMMIT'
          }

        }

      }
    }

    stage('push latest') {
      steps {
        container('base') {
          sh 'docker tag  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$GIT_COMMIT $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
          sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
        }

      }
    }

    stage('deploy to production') {
      agent none
      steps {
        container('base') {
          withCredentials([kubeconfigContent(credentialsId : 'kubeconfig' ,variable : 'KUBECONFIG_CONFIG' ,)]) {
            sh 'mkdir -p ~/.kube/'
            sh 'echo "$KUBECONFIG_CONFIG" > ~/.kube/config'
            sh '''envsubst < deployments/deployment.yml | kubectl apply -f -
envsubst < deployments/service.yml | kubectl apply -f -
envsubst < deployments/ingress.yml | kubectl apply -f -'''
          }

        }

      }
    }

  }
  environment {
    KUBECONFIG_CREDENTIAL_ID = 'kubeconfig'
    REGISTRY = 'ccr.ccs.tencentyun.com'
    DOCKERHUB_NAMESPACE = 'corgi_project'
    APP_NAME = 'pzblog'
  }
  parameters {
    string(name: 'TAG_NAME', defaultValue: '', description: '')
  }
}
```
