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
    "loglevel": "error"
  },
  "routing": {
    "domainStrategy": "IPOnDemand",
    "rules": [
      {
        "type": "field",
        "ip": [
          "geoip:private",
          "geoip:cn"
        ],
        "outboundTag": "block"
      },
      {
        "type": "field",
        "protocol": [
          "bittorrent"
        ],
        "outboundTag": "block"
      }
    ]
  },
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
        "domainStrategy": "AsIs"
      },
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "tag": "block"
    }
  ]
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
$DOMAIN1, $DOMAIN2 {
  tls $EMAIL

  # 静态资源
  root * /srv
  file_server
  encode gzip

  # 日志更详细
  log {
    output file /etc/caddy/caddy.log {
      roll_size 10mb
      roll_keep 10
      roll_keep_for 720h
    }
    format single_field common_log
  }

  # WebSocket 转发给 xray
  @xray_websocket {
    path /$PATH
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
## 一键脚本
```shell
#!/usr/bin/env bash
set -e
echo "close ipv6"

cat <<EOF >> /etc/sysctl.conf
# Disable IPv6
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
EOF

# 立即生效
sysctl -p /etc/sysctl.conf

domain=$1
uuid=${2:-$(uuidgen)}
port=${3:-8089}
ws_path=${uuid##*-}
email=${uuid%%-*}

echo "Using UUID: $uuid"
echo "Using Port: $port"
echo "Using ws_path: $ws_path"
echo "Using domain: $domain"
echo "Using email: $email"

echo "setup timezone..."
timedatectl set-timezone Asia/Shanghai

echo "setup speedtest..."
wget https://raw.github.com/sivel/speedtest-cli/master/speedtest.py
chmod a+rx speedtest.py
mv speedtest.py /usr/local/bin/speedtest
chown root:root /usr/local/bin/speedtest

ln -sf /usr/bin/python3  /usr/bin/python

wget -O tcp.sh "https://git.io/coolspeeda" && chmod +x tcp.sh

echo "install docker..."
apt remove docker docker-engine docker.io containerd runc || true

apt update --yes

apt install apt-transport-https ca-certificates curl gnupg lsb-release --yes

curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update --yes

apt install docker-ce docker-ce-cli containerd.io --yes

systemctl enable --now docker

echo "setup xray..."
mkdir -p /docker/xray && touch /docker/xray/config.json

cat <<EOF >  /docker/xray/config.json
{
  "log": {
    "loglevel": "error"
  },
  "routing": {
    "domainStrategy": "IPOnDemand",
    "rules": [
      {
        "type": "field",
        "ip": [
          "geoip:private",
          "geoip:cn"
        ],
        "outboundTag": "block"
      },
      {
        "type": "field",
        "protocol": [
          "bittorrent"
        ],
        "outboundTag": "block"
      }
    ]
  },
  "inbounds": [
    {
      "port": $port,
      "listen": "0.0.0.0",
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": "$uuid"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "ws",
        "security": "none",
        "wsSettings": {
          "path": "/$ws_path"
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {
        "domainStrategy": "AsIs"
      },
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "tag": "block"
    }
  ]
}
EOF
echo "install xray of docker..."
docker rm -f xray || true
docker run -d -p $port:$port --name xray --restart=always -v /docker/xray:/etc/xray -v /etc/localtime:/etc/localtime teddysun/xray

echo "setup caddy..."

mkdir -p /docker/caddy/html
mkdir -p /docker/caddy/data
touch /docker/caddy/Caddyfile

cat <<EOF >  /docker/caddy/Caddyfile
$domain {
  tls $email@gmail.com

  # 静态资源
  root * /srv
  file_server
  encode gzip

  # 日志更详细
  log {
    output file /etc/caddy/caddy.log {
      roll_size 10mb
      roll_keep 10
      roll_keep_for 720h
    }
  }

  # WebSocket 转发给 xray
  @xray_websocket {
    path /$ws_path
  }
  reverse_proxy @xray_websocket 127.0.0.1:$port
}
EOF

docker rm -f caddy || true

docker run -d --network=host \
    -v /docker/caddy/html:/srv \
    -v /docker/caddy/data:/data \
    -v /docker/caddy/Caddyfile:/etc/caddy/Caddyfile \
    -v /etc/localtime:/etc/localtime \
    --name caddy caddy


docker update --restart=always $(docker ps -qa)

echo "setup forward..."

iptables -t nat -A PREROUTING -p tcp --dport 40000:50000 -j REDIRECT --to-ports 443

mkdir -p /etc/iptables
iptables-save > /etc/iptables/forward.rules

# 每次开机加载
cat <<EOF > /etc/systemd/system/iptables-forward.service
[Unit]
Description=Restore iptables port forwarding
After=network.target

[Service]
Type=oneshot
ExecStart=/sbin/iptables-restore < /etc/iptables/forward.rules
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

# 启用开机自启
systemctl daemon-reload
systemctl enable iptables-forward
systemctl start iptables-forward

echo "setup web..."

git clone https://github.com/star574/camouflage_html.git /docker/caddy/html

echo "done"

echo "domain: $domain"
echo "port: $port" 
echo "uuid: $uuid" 
echo "ws_path: $ws_path" 

```
