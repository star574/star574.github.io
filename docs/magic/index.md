---
lang: zh-CN
title: docker+caddy+vless+xray+ws+tls
description: 科学上网搭建
---
# docker+caddy+vless+xray+ws+tls
## 准备阶段
- 服务器一台
- 域名一个
- 域名已解析到服务器
## 前置操作
- 修改主机名（非必须）
```shell
hostnamectl set-hostname debain
```

- speedtest 脚本（用于测试网络速度）

```shell
wget https://raw.github.com/sivel/speedtest-cli/master/speedtest.py
chmod a+rx speedtest.py
mv speedtest.py /usr/local/bin/speedtest
chown root:root /usr/local/bin/speedtest
```

- traceroute 回城路由测试脚本

```shell
# CentOS：
yum -y update && yum install traceroute -y
# Debian/Ubuntu：
apt update -y && apt-get install traceroute -y
```

- 更换内核脚本

```shell
不卸载内核版本
wget -O tcpx.sh "https://git.io/JYxKU" && chmod +x tcpx.sh
卸载内核版本
wget -O tcp.sh "https://git.io/coolspeeda" && chmod +x tcp.sh 
```

- 设置时区

```shell
timedatectl set-timezone Asia/Shanghai
```

- docker

```shell
apt-get remove docker docker-engine docker.io containerd runc
apt-get update
apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install docker-ce docker-ce-cli containerd.io
systemctl enable --now docker
```

## 安装xray

- 创建配置文件

```shell
mkdir -p /docker/xray && touch /docker/xray/config.json
```

- 写入配置文件
  - PORT换成自己想用的端口
  - PATH 代表websocket请求路径
  - UUID 任意uuid

```shell
cat <<EOF >  /docker/xray/config.json
{
    "log": {
        "loglevel": "warning"
    },
    "api": null,
    "routing": {
        "domainStrategy": "IPOnDemand",
        "rules": [
            {
                "type": "field",
                "ip": [
                    "geoip:private",
		    "0.0.0.0/8",
                    "10.0.0.0/8",
                    "100.64.0.0/10",
                    "127.0.0.0/8",
                    "169.254.0.0/16",
                    "172.16.0.0/12",
                    "192.0.0.0/24",
                    "192.0.2.0/24",
                    "192.168.0.0/16",
                    "198.18.0.0/15",
                    "198.51.100.0/24",
                    "203.0.113.0/24",
                    "::1/128",
                    "fc00::/7",
                    "fe80::/10"
                ],
                "outboundTag": "blocked"
            },
	    {
                "type": "field",
                "protocol": [
                    "bittorrent"
                ],
                "outboundTag": "blocked"
            }
        ]
    },
    "policy": {},
    "inbounds": [
        {
            "port": $PORT, 
            "listen": "0.0.0.0",
            "protocol": "vless",
            "settings": {
                "clients": [
                    {
                        "id": "$UUID"
                    }
                ],
                "decryption": "none"
            },
            "streamSettings": {
                "network": "ws",
                "security": "none",
                "wsSettings": {
                    "path": "/$PATH"
                }
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "UseIP"
            },
            "tag": "direct"
        },
        {
            "protocol": "blackhole",
            "tag": "block"
        }
    ],
    "transport": {},
    "stats": null,
    "reverse": {}
}
EOF
```

- 安装xray
  -  映射 上面的 PORT

```shell
docker run -d -p $PORT:$PORT --name xray --restart=always -v /docker/xray:/etc/xray -v /etc/localtime:/etc/localtime teddysun/xray
```

## caddy

- 准备映射的文件路径（html可以用于伪装网站）

```
mkdir -p /docker/caddy/html
mkdir -p /docker/caddy/data
touch /docker/caddy/Caddyfile
```

- 写入配置文件
  - NAME 用于链接到xray
  - EMAIL 用于申请证书的邮箱
  - DOMAIN 可以配置多个

```shell
cat <<EOF >  /docker/caddy/Caddyfile
$DOMAIN1 $DOMAIN2 {
  tls $EMAIL 
  file_server
  root * /srv
  log {
        output file /etc/caddy/caddy.log
  }
  @xray_websocket {
        path /$PATH
        header Connection Upgrade
        header Upgrade websocket
   }
   reverse_proxy @xray_websocket $NAME:$PORT
}
EOF
```

- 安装caddy

```shell
docker run -d -p 80:80 -p 443:443 -p 443:443/udp \
	--link $NAME:xray \
    -v /docker/caddy/html:/srv \
    -v /docker/caddy/data:/data \
    -v /docker/caddy/Caddyfile:/etc/caddy/Caddyfile \
    -v /etc/localtime:/etc/localtime \
    --name caddy caddy
```

## 开机自启动

```shell
docker update --restart=always $(docker ps -qa)
```

## 伪装网站
```shell
iptables -t nat -A PREROUTING -p tcp --dport 40000:50000 -j REDIRECT --to-ports 443
git clone https://github.com/star574/camouflage_html.git .
```

