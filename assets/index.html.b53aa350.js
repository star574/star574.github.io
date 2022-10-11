import{_ as n,o as s,c as a,a as e}from"./app.416b6403.js";const i={},l=e(`<h1 id="docker-caddy-vless-xray-ws-tls" tabindex="-1"><a class="header-anchor" href="#docker-caddy-vless-xray-ws-tls" aria-hidden="true">#</a> docker+caddy+vless+xray+ws+tls</h1><h2 id="\u51C6\u5907\u9636\u6BB5" tabindex="-1"><a class="header-anchor" href="#\u51C6\u5907\u9636\u6BB5" aria-hidden="true">#</a> \u51C6\u5907\u9636\u6BB5</h2><ul><li>\u670D\u52A1\u5668\u4E00\u53F0</li><li>\u57DF\u540D\u4E00\u4E2A</li><li>\u57DF\u540D\u5DF2\u89E3\u6790\u5230\u670D\u52A1\u5668</li></ul><h2 id="\u524D\u7F6E\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u524D\u7F6E\u64CD\u4F5C" aria-hidden="true">#</a> \u524D\u7F6E\u64CD\u4F5C</h2><ul><li>\u4FEE\u6539\u4E3B\u673A\u540D\uFF08\u975E\u5FC5\u987B\uFF09</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>hostnamectl set-hostname debain
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
        &quot;loglevel&quot;: &quot;warning&quot;
    },
    &quot;api&quot;: null,
    &quot;routing&quot;: {
        &quot;domainStrategy&quot;: &quot;IPOnDemand&quot;,
        &quot;rules&quot;: [
            {
                &quot;type&quot;: &quot;field&quot;,
                &quot;ip&quot;: [
                    &quot;geoip:private&quot;,
		    &quot;0.0.0.0/8&quot;,
                    &quot;10.0.0.0/8&quot;,
                    &quot;100.64.0.0/10&quot;,
                    &quot;127.0.0.0/8&quot;,
                    &quot;169.254.0.0/16&quot;,
                    &quot;172.16.0.0/12&quot;,
                    &quot;192.0.0.0/24&quot;,
                    &quot;192.0.2.0/24&quot;,
                    &quot;192.168.0.0/16&quot;,
                    &quot;198.18.0.0/15&quot;,
                    &quot;198.51.100.0/24&quot;,
                    &quot;203.0.113.0/24&quot;,
                    &quot;::1/128&quot;,
                    &quot;fc00::/7&quot;,
                    &quot;fe80::/10&quot;
                ],
                &quot;outboundTag&quot;: &quot;blocked&quot;
            },
	    {
                &quot;type&quot;: &quot;field&quot;,
                &quot;protocol&quot;: [
                    &quot;bittorrent&quot;
                ],
                &quot;outboundTag&quot;: &quot;blocked&quot;
            }
        ]
    },
    &quot;policy&quot;: {},
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
                &quot;domainStrategy&quot;: &quot;UseIP&quot;
            },
            &quot;tag&quot;: &quot;direct&quot;
        },
        {
            &quot;protocol&quot;: &quot;blackhole&quot;,
            &quot;tag&quot;: &quot;block&quot;
        }
    ],
    &quot;transport&quot;: {},
    &quot;stats&quot;: null,
    &quot;reverse&quot;: {}
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5B89\u88C5xray <ul><li>\u6620\u5C04 \u4E0A\u9762\u7684 PORT</li></ul></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token variable">$PORT</span><span class="token builtin class-name">:</span><span class="token variable">$PORT</span> <span class="token parameter variable">--name</span> xray <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">-v</span> /docker/xray:/etc/xray <span class="token parameter variable">-v</span> /etc/localtime:/etc/localtime teddysun/xray
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="caddy" tabindex="-1"><a class="header-anchor" href="#caddy" aria-hidden="true">#</a> caddy</h2><ul><li>\u51C6\u5907\u6620\u5C04\u7684\u6587\u4EF6\u8DEF\u5F84\uFF08html\u53EF\u4EE5\u7528\u4E8E\u4F2A\u88C5\u7F51\u7AD9\uFF09</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mkdir -p /docker/caddy/html
mkdir -p /docker/caddy/data
touch /docker/caddy/Caddyfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5199\u5165\u914D\u7F6E\u6587\u4EF6 <ul><li>NAME \u7528\u4E8E\u94FE\u63A5\u5230xray</li><li>EMAIL \u7528\u4E8E\u7533\u8BF7\u8BC1\u4E66\u7684\u90AE\u7BB1</li><li>DOMAIN \u53EF\u4EE5\u914D\u7F6E\u591A\u4E2A</li></ul></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span>  /docker/caddy/Caddyfile</span>
<span class="token variable">$DOMAIN1</span> <span class="token variable">$DOMAIN2</span> {
  tls <span class="token variable">$EMAIL</span> 
  file_server
  root * /srv
  log {
        output file /etc/caddy/caddy.log
  }
  @xray_websocket {
        path /<span class="token environment constant">$PATH</span>
        header Connection Upgrade
        header Upgrade websocket
   }
   reverse_proxy @xray_websocket <span class="token variable">$NAME</span>:<span class="token variable">$PORT</span>
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5B89\u88C5caddy</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-p</span> <span class="token number">443</span>:443 <span class="token parameter variable">-p</span> <span class="token number">443</span>:443/udp <span class="token punctuation">\\</span>
	<span class="token parameter variable">--link</span> <span class="token variable">$NAME</span>:xray <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /docker/caddy/html:/srv <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /docker/caddy/data:/data <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /docker/caddy/Caddyfile:/etc/caddy/Caddyfile <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /etc/localtime:/etc/localtime <span class="token punctuation">\\</span>
    <span class="token parameter variable">--name</span> caddy caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5F00\u673A\u81EA\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#\u5F00\u673A\u81EA\u542F\u52A8" aria-hidden="true">#</a> \u5F00\u673A\u81EA\u542F\u52A8</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> update <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-qa</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u4F2A\u88C5\u7F51\u7AD9" tabindex="-1"><a class="header-anchor" href="#\u4F2A\u88C5\u7F51\u7AD9" aria-hidden="true">#</a> \u4F2A\u88C5\u7F51\u7AD9</h2><ul><li>\u9759\u6001\u7F51\u7AD9\u653E\u5728html\u76EE\u5F55\u5C31\u884C</li></ul>`,34),t=[l];function d(o,c){return s(),a("div",null,t)}const u=n(i,[["render",d],["__file","index.html.vue"]]);export{u as default};
