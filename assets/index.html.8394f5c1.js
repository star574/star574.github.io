import{_ as n,o as s,c as a,a as e}from"./app.3ba3e4b9.js";const i={},l=e(`<h1 id="docker-caddy-vless-xray-ws-tls" tabindex="-1"><a class="header-anchor" href="#docker-caddy-vless-xray-ws-tls" aria-hidden="true">#</a> docker+caddy+vless+xray+ws+tls</h1><h2 id="\u51C6\u5907\u9636\u6BB5" tabindex="-1"><a class="header-anchor" href="#\u51C6\u5907\u9636\u6BB5" aria-hidden="true">#</a> \u51C6\u5907\u9636\u6BB5</h2><ul><li>\u670D\u52A1\u5668\u4E00\u53F0</li><li>\u57DF\u540D\u4E00\u4E2A</li><li>\u57DF\u540D\u5DF2\u89E3\u6790\u5230\u670D\u52A1\u5668</li></ul><h2 id="\u524D\u7F6E\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u524D\u7F6E\u64CD\u4F5C" aria-hidden="true">#</a> \u524D\u7F6E\u64CD\u4F5C</h2><ul><li>\u4FEE\u6539\u4E3B\u673A\u540D\uFF08\u975E\u5FC5\u987B\uFF09</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>hostnamectl set-hostname debain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>speedtest \u811A\u672C\uFF08\u7528\u4E8E\u6D4B\u8BD5\u7F51\u7EDC\u901F\u5EA6\uFF09</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">wget</span> https://raw.github.com/sivel/speedtest-cli/master/speedtest.py
<span class="token function">chmod</span> a+rx speedtest.py
<span class="token function">mv</span> speedtest.py /usr/local/bin/speedtest
<span class="token function">chown</span> root:root /usr/local/bin/speedtest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>traceroute \u56DE\u57CE\u8DEF\u7531\u6D4B\u8BD5\u811A\u672C</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># CentOS\uFF1A</span>
yum <span class="token parameter variable">-y</span> update <span class="token operator">&amp;&amp;</span> yum <span class="token function">install</span> <span class="token function">traceroute</span> <span class="token parameter variable">-y</span>
<span class="token comment"># Debian/Ubuntu\uFF1A</span>
<span class="token function">apt</span> update <span class="token parameter variable">-y</span> <span class="token operator">&amp;&amp;</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">traceroute</span> <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u66F4\u6362\u5185\u6838\u811A\u672C</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u4E0D\u5378\u8F7D\u5185\u6838\u7248\u672C
<span class="token function">wget</span> <span class="token parameter variable">-O</span> tcpx.sh <span class="token string">&quot;https://git.io/JYxKU&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x tcpx.sh
\u5378\u8F7D\u5185\u6838\u7248\u672C
<span class="token function">wget</span> <span class="token parameter variable">-O</span> tcp.sh <span class="token string">&quot;https://git.io/coolspeeda&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x tcp.sh 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u8BBE\u7F6E\u65F6\u533A</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>timedatectl set-timezone Asia/Shanghai
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>docker</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">apt-get</span> remove <span class="token function">docker</span> docker-engine docker.io containerd runc
<span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token punctuation">\\</span>
    apt-transport-https <span class="token punctuation">\\</span>
    ca-certificates <span class="token punctuation">\\</span>
    <span class="token function">curl</span> <span class="token punctuation">\\</span>
    gnupg <span class="token punctuation">\\</span>
    lsb-release
    
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/debian/gpg <span class="token operator">|</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /usr/share/keyrings/docker-archive-keyring.gpg

<span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>
  <span class="token string">&quot;deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \\
  <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> stable&quot;</span> <span class="token operator">|</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">&gt;</span> /dev/null

<span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io
systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B89\u88C5xray" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5xray" aria-hidden="true">#</a> \u5B89\u88C5xray</h2><ul><li>\u521B\u5EFA\u914D\u7F6E\u6587\u4EF6</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /docker/xray <span class="token operator">&amp;&amp;</span> <span class="token function">touch</span> /docker/xray/config.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u5199\u5165\u914D\u7F6E\u6587\u4EF6 <ul><li>PORT\u6362\u6210\u81EA\u5DF1\u60F3\u7528\u7684\u7AEF\u53E3</li><li>PATH \u4EE3\u8868websocket\u8BF7\u6C42\u8DEF\u5F84</li><li>UUID \u4EFB\u610Fuuid</li></ul></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span>  /docker/xray/config.json</span>
{
  &quot;log&quot;: {
    &quot;loglevel&quot;: &quot;error&quot;
  },
  &quot;routing&quot;: {
    &quot;domainStrategy&quot;: &quot;IPOnDemand&quot;,
    &quot;rules&quot;: [
      {
        &quot;type&quot;: &quot;field&quot;,
        &quot;ip&quot;: [
          &quot;geoip:private&quot;,
          &quot;geoip:cn&quot;
        ],
        &quot;outboundTag&quot;: &quot;block&quot;
      },
      {
        &quot;type&quot;: &quot;field&quot;,
        &quot;protocol&quot;: [
          &quot;bittorrent&quot;
        ],
        &quot;outboundTag&quot;: &quot;block&quot;
      }
    ]
  },
  &quot;inbounds&quot;: [
    {
      &quot;port&quot;: <span class="token variable">$PORT</span>,
      &quot;listen&quot;: &quot;0.0.0.0&quot;,
      &quot;protocol&quot;: &quot;vless&quot;,
      &quot;settings&quot;: {
        &quot;clients&quot;: [
          {
            &quot;id&quot;: &quot;<span class="token variable">$UUID</span>&quot;
          }
        ],
        &quot;decryption&quot;: &quot;none&quot;
      },
      &quot;streamSettings&quot;: {
        &quot;network&quot;: &quot;ws&quot;,
        &quot;security&quot;: &quot;none&quot;,
        &quot;wsSettings&quot;: {
          &quot;path&quot;: &quot;/<span class="token environment constant">$PATH</span>&quot;
        }
      }
    }
  ],
  &quot;outbounds&quot;: [
    {
      &quot;protocol&quot;: &quot;freedom&quot;,
      &quot;settings&quot;: {
        &quot;domainStrategy&quot;: &quot;AsIs&quot;
      },
      &quot;tag&quot;: &quot;direct&quot;
    },
    {
      &quot;protocol&quot;: &quot;blackhole&quot;,
      &quot;tag&quot;: &quot;block&quot;
    }
  ]
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5B89\u88C5xray <ul><li>\u6620\u5C04 \u4E0A\u9762\u7684 PORT</li></ul></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token variable">$PORT</span><span class="token builtin class-name">:</span><span class="token variable">$PORT</span> <span class="token parameter variable">--name</span> xray <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">-v</span> /docker/xray:/etc/xray <span class="token parameter variable">-v</span> /etc/localtime:/etc/localtime teddysun/xray
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="caddy" tabindex="-1"><a class="header-anchor" href="#caddy" aria-hidden="true">#</a> caddy</h2><ul><li>\u51C6\u5907\u6620\u5C04\u7684\u6587\u4EF6\u8DEF\u5F84\uFF08html\u53EF\u4EE5\u7528\u4E8E\u4F2A\u88C5\u7F51\u7AD9\uFF09</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mkdir -p /docker/caddy/html
mkdir -p /docker/caddy/data
touch /docker/caddy/Caddyfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5199\u5165\u914D\u7F6E\u6587\u4EF6 <ul><li>NAME \u7528\u4E8E\u94FE\u63A5\u5230xray</li><li>EMAIL \u7528\u4E8E\u7533\u8BF7\u8BC1\u4E66\u7684\u90AE\u7BB1</li><li>DOMAIN \u53EF\u4EE5\u914D\u7F6E\u591A\u4E2A</li></ul></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span>  /docker/caddy/Caddyfile</span>
<span class="token variable">$DOMAIN1</span>, <span class="token variable">$DOMAIN2</span> {
  tls <span class="token variable">$EMAIL</span>

  # \u9759\u6001\u8D44\u6E90
  root * /srv
  file_server
  encode gzip

  # \u65E5\u5FD7\u66F4\u8BE6\u7EC6
  log {
    output file /etc/caddy/caddy.log {
      roll_size 10mb
      roll_keep 10
      roll_keep_for 720h
    }
    format single_field common_log
  }

  # WebSocket \u8F6C\u53D1\u7ED9 xray
  @xray_websocket {
    path /<span class="token environment constant">$PATH</span>
  }
  reverse_proxy @xray_websocket <span class="token variable">$NAME</span>:<span class="token variable">$PORT</span>
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5B89\u88C5caddy</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-p</span> <span class="token number">443</span>:443 <span class="token parameter variable">-p</span> <span class="token number">443</span>:443/udp <span class="token punctuation">\\</span>
	<span class="token parameter variable">--link</span> <span class="token variable">$NAME</span>:xray <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /docker/caddy/html:/srv <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /docker/caddy/data:/data <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /docker/caddy/Caddyfile:/etc/caddy/Caddyfile <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /etc/localtime:/etc/localtime <span class="token punctuation">\\</span>
    <span class="token parameter variable">--name</span> caddy caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5F00\u673A\u81EA\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#\u5F00\u673A\u81EA\u542F\u52A8" aria-hidden="true">#</a> \u5F00\u673A\u81EA\u542F\u52A8</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> update <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-qa</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u4F2A\u88C5\u7F51\u7AD9" tabindex="-1"><a class="header-anchor" href="#\u4F2A\u88C5\u7F51\u7AD9" aria-hidden="true">#</a> \u4F2A\u88C5\u7F51\u7AD9</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">40000</span>:50000 <span class="token parameter variable">-j</span> REDIRECT --to-ports <span class="token number">443</span>
<span class="token function">git</span> clone https://github.com/star574/camouflage_html.git <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4E00\u952E\u811A\u672C" tabindex="-1"><a class="header-anchor" href="#\u4E00\u952E\u811A\u672C" aria-hidden="true">#</a> \u4E00\u952E\u811A\u672C</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;close ipv6&quot;</span>

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/sysctl.conf</span>
# Disable IPv6
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
EOF</span>

<span class="token comment"># \u7ACB\u5373\u751F\u6548</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span> /etc/sysctl.conf

<span class="token assign-left variable">domain</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token assign-left variable">uuid</span><span class="token operator">=</span><span class="token variable">\${2<span class="token operator">:-</span>$(uuidgen)}</span>
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token variable">\${3<span class="token operator">:-</span>8089}</span>
<span class="token assign-left variable">ws_path</span><span class="token operator">=</span><span class="token variable">\${uuid<span class="token operator">##</span>*-}</span>
<span class="token assign-left variable">email</span><span class="token operator">=</span><span class="token variable">\${uuid<span class="token operator">%%</span>-*}</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Using UUID: <span class="token variable">$uuid</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Using Port: <span class="token variable">$port</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Using ws_path: <span class="token variable">$ws_path</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Using domain: <span class="token variable">$domain</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Using email: <span class="token variable">$email</span>&quot;</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;setup timezone...&quot;</span>
timedatectl set-timezone Asia/Shanghai

<span class="token builtin class-name">echo</span> <span class="token string">&quot;setup speedtest...&quot;</span>
<span class="token function">wget</span> https://raw.github.com/sivel/speedtest-cli/master/speedtest.py
<span class="token function">chmod</span> a+rx speedtest.py
<span class="token function">mv</span> speedtest.py /usr/local/bin/speedtest
<span class="token function">chown</span> root:root /usr/local/bin/speedtest

<span class="token function">ln</span> <span class="token parameter variable">-sf</span> /usr/bin/python3  /usr/bin/python

<span class="token function">wget</span> <span class="token parameter variable">-O</span> tcp.sh <span class="token string">&quot;https://git.io/coolspeeda&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x tcp.sh

<span class="token builtin class-name">echo</span> <span class="token string">&quot;install docker...&quot;</span>
<span class="token function">apt</span> remove <span class="token function">docker</span> docker-engine docker.io containerd runc <span class="token operator">||</span> <span class="token boolean">true</span>

<span class="token function">apt</span> update <span class="token parameter variable">--yes</span>

<span class="token function">apt</span> <span class="token function">install</span> apt-transport-https ca-certificates <span class="token function">curl</span> gnupg lsb-release <span class="token parameter variable">--yes</span>

<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/debian/gpg <span class="token operator">|</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /usr/share/keyrings/docker-archive-keyring.gpg

<span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>
  <span class="token string">&quot;deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \\
  <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> stable&quot;</span> <span class="token operator">|</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">&gt;</span> /dev/null

<span class="token function">apt</span> update <span class="token parameter variable">--yes</span>

<span class="token function">apt</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io <span class="token parameter variable">--yes</span>

systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> <span class="token function">docker</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;setup xray...&quot;</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /docker/xray <span class="token operator">&amp;&amp;</span> <span class="token function">touch</span> /docker/xray/config.json

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span>  /docker/xray/config.json</span>
{
  &quot;log&quot;: {
    &quot;loglevel&quot;: &quot;error&quot;
  },
  &quot;routing&quot;: {
    &quot;domainStrategy&quot;: &quot;IPOnDemand&quot;,
    &quot;rules&quot;: [
      {
        &quot;type&quot;: &quot;field&quot;,
        &quot;ip&quot;: [
          &quot;geoip:private&quot;,
          &quot;geoip:cn&quot;
        ],
        &quot;outboundTag&quot;: &quot;block&quot;
      },
      {
        &quot;type&quot;: &quot;field&quot;,
        &quot;protocol&quot;: [
          &quot;bittorrent&quot;
        ],
        &quot;outboundTag&quot;: &quot;block&quot;
      }
    ]
  },
  &quot;inbounds&quot;: [
    {
      &quot;port&quot;: <span class="token variable">$port</span>,
      &quot;listen&quot;: &quot;0.0.0.0&quot;,
      &quot;protocol&quot;: &quot;vless&quot;,
      &quot;settings&quot;: {
        &quot;clients&quot;: [
          {
            &quot;id&quot;: &quot;<span class="token variable">$uuid</span>&quot;
          }
        ],
        &quot;decryption&quot;: &quot;none&quot;
      },
      &quot;streamSettings&quot;: {
        &quot;network&quot;: &quot;ws&quot;,
        &quot;security&quot;: &quot;none&quot;,
        &quot;wsSettings&quot;: {
          &quot;path&quot;: &quot;/<span class="token variable">$ws_path</span>&quot;
        }
      }
    }
  ],
  &quot;outbounds&quot;: [
    {
      &quot;protocol&quot;: &quot;freedom&quot;,
      &quot;settings&quot;: {
        &quot;domainStrategy&quot;: &quot;AsIs&quot;
      },
      &quot;tag&quot;: &quot;direct&quot;
    },
    {
      &quot;protocol&quot;: &quot;blackhole&quot;,
      &quot;tag&quot;: &quot;block&quot;
    }
  ]
}
EOF</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;install xray of docker...&quot;</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> xray <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token variable">$port</span><span class="token builtin class-name">:</span><span class="token variable">$port</span> <span class="token parameter variable">--name</span> xray <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">-v</span> /docker/xray:/etc/xray <span class="token parameter variable">-v</span> /etc/localtime:/etc/localtime teddysun/xray

<span class="token builtin class-name">echo</span> <span class="token string">&quot;setup caddy...&quot;</span>

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /docker/caddy/html
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /docker/caddy/data
<span class="token function">touch</span> /docker/caddy/Caddyfile

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span>  /docker/caddy/Caddyfile</span>
<span class="token variable">$domain</span> {
  tls <span class="token variable">$email</span>@gmail.com

  # \u9759\u6001\u8D44\u6E90
  root * /srv
  file_server
  encode gzip

  # \u65E5\u5FD7\u66F4\u8BE6\u7EC6
  log {
    output file /etc/caddy/caddy.log {
      roll_size 10mb
      roll_keep 10
      roll_keep_for 720h
    }
  }

  # WebSocket \u8F6C\u53D1\u7ED9 xray
  @xray_websocket {
    path /<span class="token variable">$ws_path</span>
  }
  reverse_proxy @xray_websocket 127.0.0.1:<span class="token variable">$port</span>
}
EOF</span>

<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> caddy <span class="token operator">||</span> <span class="token boolean">true</span>

<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--network</span><span class="token operator">=</span>host <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /docker/caddy/html:/srv <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /docker/caddy/data:/data <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /docker/caddy/Caddyfile:/etc/caddy/Caddyfile <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /etc/localtime:/etc/localtime <span class="token punctuation">\\</span>
    <span class="token parameter variable">--name</span> caddy caddy


<span class="token function">docker</span> update <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-qa</span><span class="token variable">)</span></span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;setup forward...&quot;</span>

iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">40000</span>:50000 <span class="token parameter variable">-j</span> REDIRECT --to-ports <span class="token number">443</span>

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/iptables
iptables-save <span class="token operator">&gt;</span> /etc/iptables/forward.rules

<span class="token comment"># \u6BCF\u6B21\u5F00\u673A\u52A0\u8F7D</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/systemd/system/iptables-forward.service</span>
[Unit]
Description=Restore iptables port forwarding
After=network.target

[Service]
Type=oneshot
ExecStart=/sbin/iptables-restore &lt; /etc/iptables/forward.rules
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF</span>

<span class="token comment"># \u542F\u7528\u5F00\u673A\u81EA\u542F</span>
systemctl daemon-reload
systemctl <span class="token builtin class-name">enable</span> iptables-forward
systemctl start iptables-forward

<span class="token builtin class-name">echo</span> <span class="token string">&quot;setup web...&quot;</span>

<span class="token function">git</span> clone https://github.com/star574/camouflage_html.git /docker/caddy/html

<span class="token builtin class-name">echo</span> <span class="token string">&quot;done&quot;</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;domain: <span class="token variable">$domain</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;port: <span class="token variable">$port</span>&quot;</span> 
<span class="token builtin class-name">echo</span> <span class="token string">&quot;uuid: <span class="token variable">$uuid</span>&quot;</span> 
<span class="token builtin class-name">echo</span> <span class="token string">&quot;ws_path: <span class="token variable">$ws_path</span>&quot;</span> 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),t=[l];function c(o,r){return s(),a("div",null,t)}const p=n(i,[["render",c],["__file","index.html.vue"]]);export{p as default};
