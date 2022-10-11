import{_ as e,r,o as p,c as l,b as a,d as t,a as s}from"./app.416b6403.js";const i={},o=s(`<h1 id="docker-\u5F00\u53D1\u73AF\u5883\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#docker-\u5F00\u53D1\u73AF\u5883\u914D\u7F6E" aria-hidden="true">#</a> docker \u5F00\u53D1\u73AF\u5883\u914D\u7F6E</h1><h2 id="\u7981\u6B62ping" tabindex="-1"><a class="header-anchor" href="#\u7981\u6B62ping" aria-hidden="true">#</a> \u7981\u6B62ping</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vim</span> /etc/sysctl.conf
<span class="token assign-left variable">net.ipv4.icmp_echo_ignore_all</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">apt-get</span> remove <span class="token function">docker</span> docker-engine docker.io containerd runc
<span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token punctuation">\\</span>
    apt-transport-https <span class="token punctuation">\\</span>
    ca-certificates <span class="token punctuation">\\</span>
    <span class="token function">curl</span> <span class="token punctuation">\\</span>
    gnupg <span class="token punctuation">\\</span>
    lsb-release

<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/debian/gpg <span class="token operator">|</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /usr/share/keyrings/docker-archive-keyring.gpg

<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://mirrors.ustc.edu.cn/docker-ce/linux/debian/gpg <span class="token operator">|</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /usr/share/keyrings/docker-archive-keyring.gpg

<span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>
  <span class="token string">&quot;deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \\
  <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> stable&quot;</span> <span class="token operator">|</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">&gt;</span> /dev/null
<span class="token comment"># \u4E2D\u79D1\u5927</span>
<span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>
  <span class="token string">&quot;deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.ustc.edu.cn/docker-ce/linux/debian \\
  <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> stable&quot;</span> <span class="token operator">|</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">&gt;</span> /dev/null

<span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io

<span class="token comment"># \u6362\u6E90</span>
<span class="token function">vim</span> /etc/docker/daemon.json
<span class="token punctuation">{</span>
  <span class="token string">&quot;registry-mirrors&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;https://docker.mirrors.ustc.edu.cn/&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> docker-compose</h2><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>curl <span class="token operator">-</span>L <span class="token string">&quot;https://github.com/docker/compose/releases/download/$(curl https://github.com/docker/compose/releases | grep -m1 &#39;&lt;a href=&quot;</span><span class="token operator">/</span>docker<span class="token operator">/</span>compose<span class="token operator">/</span>releases<span class="token operator">/</span>download<span class="token operator">/</span><span class="token string">&#39; | grep -o &#39;</span>v<span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span>:<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span>&#39;<span class="token punctuation">)</span><span class="token operator">/</span>docker<span class="token operator">-</span>compose<span class="token operator">-</span>$<span class="token punctuation">(</span>uname <span class="token operator">-</span>s<span class="token punctuation">)</span><span class="token operator">-</span>$<span class="token punctuation">(</span>uname <span class="token operator">-</span>m<span class="token punctuation">)</span>&quot; <span class="token operator">-</span>o <span class="token operator">/</span>usr<span class="token operator">/</span><span class="token keyword">local</span><span class="token operator">/</span>bin<span class="token operator">/</span>docker<span class="token operator">-</span>compose
sudo chmod <span class="token operator">+</span>x <span class="token operator">/</span>usr<span class="token operator">/</span><span class="token keyword">local</span><span class="token operator">/</span>bin<span class="token operator">/</span>docker<span class="token operator">-</span>compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="portainer" tabindex="-1"><a class="header-anchor" href="#portainer" aria-hidden="true">#</a> portainer</h2><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>docker run <span class="token operator">-</span>p <span class="token number">9000</span>:<span class="token number">9000</span> <span class="token operator">-</span>p <span class="token number">8000</span>:<span class="token number">8000</span> <span class="token comment">--name portainer \\</span>
<span class="token comment">--restart=always \\</span>
<span class="token operator">-</span>v <span class="token operator">/</span>var<span class="token operator">/</span>run<span class="token operator">/</span>docker<span class="token punctuation">.</span>sock:<span class="token operator">/</span>var<span class="token operator">/</span>run<span class="token operator">/</span>docker<span class="token punctuation">.</span>sock \\
<span class="token operator">-</span>v <span class="token operator">/</span>docker<span class="token operator">/</span>portainer<span class="token operator">/</span>:<span class="token operator">/</span><span class="token keyword">data</span> \\
<span class="token operator">-</span>d portainer<span class="token operator">/</span>portainer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nacos" tabindex="-1"><a class="header-anchor" href="#nacos" aria-hidden="true">#</a> nacos</h2><p><strong>custom.properties \u5DF2\u4E0D\u518D\u4F7F\u7528</strong><strong>\u6302\u8F7D application.properties</strong></p><p>nacos_config\u5BFC\u5165mysql5.x\u6570\u636E\u5E93\u5931\u8D25\uFF08\u7D22\u5F15\u957F\u5EA6\u6EA2\u51FA\uFF09</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span>  run <span class="token parameter variable">--name</span> nacos <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8848</span>:8848 <span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">-e</span> <span class="token assign-left variable">JVM_XMS</span><span class="token operator">=</span>128m <span class="token parameter variable">-e</span> <span class="token assign-left variable">JVM_XMX</span><span class="token operator">=</span>128m <span class="token parameter variable">-e</span> <span class="token assign-left variable">MODE</span><span class="token operator">=</span>standalone <span class="token parameter variable">-e</span> <span class="token assign-left variable">PREFER_HOST_MODE</span><span class="token operator">=</span>hostname <span class="token parameter variable">-v</span> /usr/local/docker/nacos/logs:/home/nacos/logs <span class="token parameter variable">-v</span> /usr/local/docker/nacos/application.properties:/home/nacos/conf/application.properties nacos/nacos-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/docker/mysql/conf/conf.d
<span class="token function">sudo</span> <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/docker/mysql/mysql-files:/var/lib/mysql-files <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/docker/mysql/conf:/etc/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/docker/mysql/logs:/var/log/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/docker/mysql/data:/var/lib/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123</span><span class="token punctuation">..</span>. <span class="token punctuation">\\</span>
mysql
<span class="token comment"># \u7531\u4E8Emysql\u5BB9\u5668\u4E2D /etc/my.cnf\u4E2D\u5BFC\u5165\u4E86\u81EA\u5B9A\u4E49\u914D\u7F6E\u6587\u4EF6\u76EE\u5F55/etc/mysql/conf.d \u6240\u4EE5\u6302\u8F7D/etc/mysql/\u4E4B\u524D \u9700\u8981 \u521B\u5EFA /etc/mysql/conf.d \u5BF9\u5E94\u6302\u8F7D\u76EE\u5F55 \u5426\u5219\u62A5\u9519 mysqld: Can&#39;t read dir of &#39;/etc/mysql/conf.d/&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="postgresql" tabindex="-1"><a class="header-anchor" href="#postgresql" aria-hidden="true">#</a> postgresql</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/docker/postgresql
<span class="token function">docker</span> run <span class="token parameter variable">-i</span> <span class="token parameter variable">--rm</span> postgres <span class="token function">cat</span> /usr/share/postgresql/postgresql.conf.sample <span class="token operator">&gt;</span> /usr/local/docker/postgresql/postgresql.conf
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> postgres <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span>  /usr/local/docker/postgresql/postgresql.conf:/etc/postgresql/postgresql.conf <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/docker/postgresql/data:/var/lib/postgresql/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span><span class="token number">123</span><span class="token punctuation">..</span>.<span class="token punctuation">\\</span>
postgres <span class="token parameter variable">-c</span> <span class="token string">&#39;config_file=/etc/postgresql/postgresql.conf&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rabbitmq" tabindex="-1"><a class="header-anchor" href="#rabbitmq" aria-hidden="true">#</a> rabbitmq</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">1883</span>:1883 <span class="token parameter variable">-p</span> <span class="token number">4369</span>:4369 <span class="token parameter variable">-p</span> <span class="token number">5671</span>:5671 <span class="token parameter variable">-p</span> <span class="token number">5672</span>:5672 <span class="token parameter variable">-p</span> <span class="token number">15672</span>:15672 <span class="token parameter variable">-p</span> <span class="token number">25672</span>:25672 <span class="token parameter variable">-p</span> <span class="token number">61613</span>:61613 <span class="token parameter variable">-p</span> <span class="token number">61614</span>:61614 <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_DEFAULT_USER</span><span class="token operator">=</span>root <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_DEFAULT_PASS</span><span class="token operator">=</span>luoshiheng574 <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/rabbitmq/conf:/etc/rabbitmq <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/rabbitmq/data:/var/lib/rabbitmq <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rabbitmq rabbitmq:management

<span class="token function">chmod</span> <span class="token number">600</span>  /docker/rabbitmq/data/.erlang.cookie

<span class="token comment"># \u9ED8\u8BA4\u6CA1\u6709\u5F00\u542F\u53EF\u89C6\u5316\u7BA1\u7406\u754C\u9762</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> rabbitmq /bin/bash
rabbitmq-plugins <span class="token builtin class-name">enable</span> rabbitmq_management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> redis</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/docker/redis/data/
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/docker/redis/conf/
<span class="token function">touch</span> /usr/local/docker/redis/conf/redis.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;requirepass=xxxxxxxxx&quot;</span> <span class="token operator">&gt;</span> /usr/local/docker/redis/conf/redis.conf

<span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/docker/redis/data:/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /usr/local/docker/redis/conf/redis.conf:/etc/redis/redis.conf <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> redis redis-server /etc/redis/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sonarqube" tabindex="-1"><a class="header-anchor" href="#sonarqube" aria-hidden="true">#</a> sonarqube</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">--name</span> sonarqube <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">9099</span>:9000 <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/sonarqube/data:/opt/sonarqube/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/sonarqube/logs:/opt/sonarqube/logs <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/sonarqube/extensions:/opt/sonarqube/extensions <span class="token punctuation">\\</span>
sonarqube
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jenkins" tabindex="-1"><a class="header-anchor" href="#jenkins" aria-hidden="true">#</a> jenkins</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> jenkins <span class="token parameter variable">--user</span> root <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8088</span>:8080  <span class="token parameter variable">-v</span> /usr/bin/docker:/usr/bin/docker <span class="token parameter variable">-v</span> /etc/localtime:/etc/localtime <span class="token parameter variable">-v</span> /var/run/docker.sock:/var/run/docker.sock <span class="token parameter variable">-v</span> /docker/jenkins/jenkins_home:/var/jenkins_home  jenkins/jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5BC6\u7801</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> log jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--network</span><span class="token operator">=</span>host  <span class="token parameter variable">--name</span> nginx <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/nginx/html:/usr/share/nginx/html <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/nginx/logs:/var/log/nginx <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/nginx/conf:/etc/nginx <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> nginx:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="frp" tabindex="-1"><a class="header-anchor" href="#frp" aria-hidden="true">#</a> frp</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span>  <span class="token parameter variable">--restart</span> always  <span class="token parameter variable">--name</span> frps  <span class="token parameter variable">-p</span> <span class="token number">7000</span>:7000  <span class="token parameter variable">-p</span> <span class="token number">7500</span>:7500  <span class="token parameter variable">-p</span> <span class="token number">10080</span>:10080 <span class="token parameter variable">-v</span> /docker/frp/frps.ini:/etc/frp/frps.ini  snowdreamtech/frps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="elasticsearch" tabindex="-1"><a class="header-anchor" href="#elasticsearch" aria-hidden="true">#</a> Elasticsearch</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 9200\u662F\u7528\u6237\u4EA4\u4E92\u7AEF\u53E3 9300\u662F\u96C6\u7FA4\u5FC3\u8DF3\u7AEF\u53E3</span>
<span class="token comment"># -e\u6307\u5B9A\u662F\u5355\u9636\u6BB5\u8FD0\u884C</span>
<span class="token comment"># -e\u6307\u5B9A\u5360\u7528\u7684\u5185\u5B58\u5927\u5C0F\uFF0C\u751F\u4EA7\u65F6\u53EF\u4EE5\u8BBE\u7F6E32G</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> elasticsearch <span class="token parameter variable">-p</span> <span class="token number">9200</span>:9200 <span class="token parameter variable">-p</span> <span class="token number">9300</span>:9300 <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span>  <span class="token string">&quot;discovery.type=single-node&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">ES_JAVA_OPTS</span><span class="token operator">=</span><span class="token string">&quot;-Xms256m -Xmx1024m&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">ELASTIC_PASSWORD</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>password<span class="token variable">\`</span></span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /docker/elasticsearch/data:/usr/share/elasticsearch/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span>  /docker/elasticsearch/plugins:/usr/share/elasticsearch/plugins <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> elasticsearch:7.4.2 

<span class="token comment"># \u8BBE\u7F6E\u5F00\u673A\u542F\u52A8elasticsearch</span>
<span class="token function">docker</span> update elasticsearch <span class="token parameter variable">--restart</span><span class="token operator">=</span>always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kibana" tabindex="-1"><a class="header-anchor" href="#kibana" aria-hidden="true">#</a> kibana</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> kibana <span class="token parameter variable">-e</span> <span class="token assign-left variable">ELASTICSEARCH_HOSTS</span><span class="token operator">=</span>http://192.168.2.88:9200 <span class="token parameter variable">-v</span> /docker/kibana/config:/usr/share/kibana/config <span class="token parameter variable">-p</span> <span class="token number">5601</span>:5601 <span class="token parameter variable">-d</span> kibana:7.4.2

<span class="token function">docker</span> run <span class="token parameter variable">--name</span> kibana <span class="token parameter variable">--link</span> elasticsearch:elasticsearch <span class="token parameter variable">-v</span> /docker/kibana/config:/usr/share/kibana/config <span class="token parameter variable">-p</span> <span class="token number">5601</span>:5601 <span class="token parameter variable">-d</span> kibana:7.4.2

<span class="token function">docker</span> update kibana <span class="token parameter variable">--restart</span><span class="token operator">=</span>always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>server.name: kibana
server.host: <span class="token string">&quot;0.0.0.0&quot;</span>
elasticsearch.hosts: <span class="token punctuation">[</span> <span class="token string">&quot;http://{IpAddress}:9200&quot;</span> <span class="token punctuation">]</span>
monitoring.ui.container.elasticsearch.enabled: <span class="token boolean">true</span>
elasticsearch.username: <span class="token string">&quot;elastic&quot;</span>
elasticsearch.password: <span class="token string">&quot;password&quot;</span>
i18n.locale: <span class="token string">&quot;zh-CN&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),c={href:"https://www.cnblogs.com/lwc1st/p/14060309.html",target:"_blank",rel:"noopener noreferrer"},d=s(`<h2 id="zipkin" tabindex="-1"><a class="header-anchor" href="#zipkin" aria-hidden="true">#</a> Zipkin</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--restart</span> always <span class="token parameter variable">-p</span> <span class="token number">9411</span>:9411 <span class="token parameter variable">--name</span> zipkin openzipkin/zipkin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5F00\u673A\u81EA\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#\u5F00\u673A\u81EA\u542F\u52A8" aria-hidden="true">#</a> \u5F00\u673A\u81EA\u542F\u52A8</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> update <span class="token parameter variable">--restart</span><span class="token operator">=</span>always  <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-qa</span><span class="token variable">)</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53D6\u6D88\u5F00\u673A\u81EA\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#\u53D6\u6D88\u5F00\u673A\u81EA\u542F\u52A8" aria-hidden="true">#</a> \u53D6\u6D88\u5F00\u673A\u81EA\u542F\u52A8</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> update <span class="token parameter variable">--restart</span><span class="token operator">=</span>no  <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-qa</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,6);function u(k,v){const n=r("ExternalLinkIcon");return p(),l("div",null,[o,a("p",null,[a("a",c,[t(n)])]),d])}const b=e(i,[["render",u],["__file","index.html.vue"]]);export{b as default};
