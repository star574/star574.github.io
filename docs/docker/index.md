---
lang: zh-CN
title: docker 开发环境配置
description: 常用开发环境配置
---

# docker 开发环境配置

## 禁止ping

```bash
vim /etc/sysctl.conf
net.ipv4.icmp_echo_ignore_all=1
sysctl -p
```

## docker

```bash

apt-get remove docker docker-engine docker.io containerd runc
apt-get update
apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
# 中科大
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.ustc.edu.cn/docker-ce/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install docker-ce docker-ce-cli containerd.io

# 换源
vim /etc/docker/daemon.json
{
  "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn/"]
}

sudo systemctl restart docker
```

## docker-compose

```sql
curl -L "https://github.com/docker/compose/releases/download/$(curl https://github.com/docker/compose/releases | grep -m1 '<a href="/docker/compose/releases/download/' | grep -o 'v[0-9:].[0-9].[0-9]')/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## portainer

```sql
docker run -p 9000:9000 -p 8000:8000 --name portainer \
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /docker/portainer/:/data \
-d portainer/portainer
```

## nacos

**custom.properties 已不再使用**
**挂载 application.properties**

nacos_config导入mysql5.x数据库失败（索引长度溢出）
```bash
docker  run --name nacos -d -p 8848:8848 --privileged=true --restart=always -e JVM_XMS=128m -e JVM_XMX=128m -e MODE=standalone -e PREFER_HOST_MODE=hostname -v /usr/local/docker/nacos/logs:/home/nacos/logs -v /usr/local/docker/nacos/application.properties:/home/nacos/conf/application.properties nacos/nacos-server
```

## mysql

```bash
mkdir -p /usr/local/docker/mysql/conf/conf.d
sudo docker run -d -p 3306:3306 --name mysql \
-v /usr/local/docker/mysql/mysql-files:/var/lib/mysql-files \
-v /usr/local/docker/mysql/conf:/etc/mysql \
-v /usr/local/docker/mysql/logs:/var/log/mysql \
-v /usr/local/docker/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123... \
mysql
# 由于mysql容器中 /etc/my.cnf中导入了自定义配置文件目录/etc/mysql/conf.d 所以挂载/etc/mysql/之前 需要 创建 /etc/mysql/conf.d 对应挂载目录 否则报错 mysqld: Can't read dir of '/etc/mysql/conf.d/'
```

## postgresql

```bash
mkdir -p /usr/local/docker/postgresql
docker run -i --rm postgres cat /usr/share/postgresql/postgresql.conf.sample > /usr/local/docker/postgresql/postgresql.conf
docker run -d --name postgres \
-p 5432:5432 \
-v  /usr/local/docker/postgresql/postgresql.conf:/etc/postgresql/postgresql.conf \
-v /usr/local/docker/postgresql/data:/var/lib/postgresql/data \
-e POSTGRES_PASSWORD=123...\
postgres -c 'config_file=/etc/postgresql/postgresql.conf'
```

## rabbitmq

```bash
docker run -d -p 1883:1883 -p 4369:4369 -p 5671:5671 -p 5672:5672 -p 15672:15672 -p 25672:25672 -p 61613:61613 -p 61614:61614 \
-e RABBITMQ_DEFAULT_USER=root \
-e RABBITMQ_DEFAULT_PASS=luoshiheng574 \
-v /docker/rabbitmq/conf:/etc/rabbitmq \
-v /docker/rabbitmq/data:/var/lib/rabbitmq \
--name rabbitmq rabbitmq:management

chmod 600  /docker/rabbitmq/data/.erlang.cookie

# 默认没有开启可视化管理界面
docker exec -i -t rabbitmq /bin/bash
rabbitmq-plugins enable rabbitmq_management
```

## redis

```bash
mkdir -p /usr/local/docker/redis/data/
mkdir -p /usr/local/docker/redis/conf/
touch /usr/local/docker/redis/conf/redis.conf
echo "requirepass=xxxxxxxxx" > /usr/local/docker/redis/conf/redis.conf

docker run -p 6379:6379 --name redis \
-v /usr/local/docker/redis/data:/data \
-v /usr/local/docker/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf
```

## sonarqube

```bash
docker run -d --restart=always --name sonarqube \
-p 9099:9000 \
-v /docker/sonarqube/data:/opt/sonarqube/data \
-v /docker/sonarqube/logs:/opt/sonarqube/logs \
-v /docker/sonarqube/extensions:/opt/sonarqube/extensions \
sonarqube
```

## jenkins

```bash
docker run --name jenkins --user root -d -p 8088:8080  -v /usr/bin/docker:/usr/bin/docker -v /etc/localtime:/etc/localtime -v /var/run/docker.sock:/var/run/docker.sock -v /docker/jenkins/jenkins_home:/var/jenkins_home  jenkins/jenkins
```

密码

```bash
docker log jenkins
```

## nginx

```bash
docker run --network=host  --name nginx --restart=always \
-v /docker/nginx/html:/usr/share/nginx/html \
-v /docker/nginx/logs:/var/log/nginx \
-v /docker/nginx/conf:/etc/nginx \
-d nginx:latest
```

## frp

```bash

docker run -d  --restart always  --name frps  -p 7000:7000  -p 7500:7500  -p 10080:10080 -v /docker/frp/frps.ini:/etc/frp/frps.ini  snowdreamtech/frps
```

## Elasticsearch

```bash
# 9200是用户交互端口 9300是集群心跳端口
# -e指定是单阶段运行
# -e指定占用的内存大小，生产时可以设置32G
docker run --name elasticsearch -p 9200:9200 -p 9300:9300 \
-e  "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms256m -Xmx1024m" \
-e ELASTIC_PASSWORD=`password` \
-v /docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
-v /docker/elasticsearch/data:/usr/share/elasticsearch/data \
-v  /docker/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-d elasticsearch:7.4.2 

# 设置开机启动elasticsearch
docker update elasticsearch --restart=always
```

## kibana

```bash
docker run --name kibana -e ELASTICSEARCH_HOSTS=http://192.168.2.88:9200 -v /docker/kibana/config:/usr/share/kibana/config -p 5601:5601 -d kibana:7.4.2

docker run --name kibana --link elasticsearch:elasticsearch -v /docker/kibana/config:/usr/share/kibana/config -p 5601:5601 -d kibana:7.4.2

docker update kibana --restart=always
```

```bash
server.name: kibana
server.host: "0.0.0.0"
elasticsearch.hosts: [ "http://{IpAddress}:9200" ]
monitoring.ui.container.elasticsearch.enabled: true
elasticsearch.username: "elastic"
elasticsearch.password: "password"
i18n.locale: "zh-CN"
```

[](https://www.cnblogs.com/lwc1st/p/14060309.html)

##  Zipkin

```bash
docker run -d --restart always -p 9411:9411 --name zipkin openzipkin/zipkin
```

## 开机自启动

```bash
docker update --restart=always  $(docker ps -qa)

```

## 取消开机自启动

```bash
docker update --restart=no  $(docker ps -qa)
```