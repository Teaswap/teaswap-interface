<h1 align="center">部署 Bestswap 和 Bestswap Farm</h1>



## 环境准备

1. node 12+
2. git 1.1+，scree，vim
3. yarn 1.22+ 或者 npm 6.14+
4. Nginx 1.14+
5. CentOS 7.2+ / Debian 10 / Fedora 30+

## 安装步骤

1. 优先部署合约

2. 部署合约的地址在 https://github.com/nekomeowww/bestswap-contract

3. 部署合约的 IDE 地址在 https://remix.ethereum.org/

4. 部署合约后更新新的合约和 web3 RPC 地址到源代码并提交到新的分支 release

5. 初始化系统安装并安装 git 命令行工具, screen 多进程工具, node 环境和 yarn 包管理器，以及网站服务器 Nginx

6. 使用 yarn 全局安装 serve

7. 使用 git clone 命令同步指定的 Farm：https://github.com/KodamaSakuno/bestswap-pools-interface

8. 使用 git clone 命令同步指定的 Swap：https://github.com/KodamaSakuno/uniswap-interface

9. 进入到 各个 目录运行 yarn 安装依赖项目，并运行 yarn build 编译网站

10. 使用 serve 给网站建立端口，使用 Nginx 进行反代理操作

    

### 部署合约

合约编译可以在本地完成，也可以通过 https://remix.ethereum.org/ 进行，这里推荐使用本地编译 + 线上部署的方式。

使用 git 命令行工具或者 GitHub Desktop 将 https://github.com/nekomeowww/bestswap-contract 克隆到本地

```bash
git clone https://github.com/nekomeowww/bestswap-contract
```

使用 cd 命令进入到 bestswap-contract 文件夹

```
cd bestswap-contract
```

运行 yarn 安装所需依赖和 waffle 编译器

```bash
yarn
# 运行 yarn build 和 yarn flatten 来生成需要的合约
yarn build
yarn flatten
```

可供 https://remix.ethereum.org/ 网站使用的合约在 flatten 文件夹下，使用常规文本编辑器打开，复制全部内容，粘贴到网站即可。

![](https://i.loli.net/2020/10/22/9F1kpLKnCEJxUoc.png)

注意这里选中第二个图标进入编译模式，选择 0.6.12 即可，记得勾选 Enable Optimization（开启优化）

完成编译后点选第三个图标进入部署模式

![](https://i.loli.net/2020/10/22/JxPqAKo9phH2Ewu.png)

注意 Binance 网络需要 在第一个选项中选择 Injected Web3，然后你可以看到你的账户名，注意在 Deploy 按钮上方选择我们要部署的合约，部署完成后即可。

### 服务器准备

#### CentOS / Fedora 以及 REHL 

准备服务器环境

```bash
sudo yum install epel-release
sudo yum update
```

使用以下命令安装所需要的 git, screen, node，需要管理员权限

```bash
sudo yum install git screen vim
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install nodejs
sudo yum install gcc-c++ make
```

运行以下命令安装 yarn，需要管理员权限

```bash
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum install yarn
```

运行以下命令安装 Nginx，需要管理员权限

```bash
sudo yum install nginx
```

运行以下命令安装 serve

```bash
yarn global add serve
```

#### Debian / Ubuntu 以及 Debian 系列

使用以下命令安装所需要的 git, screen, node，需要管理员权限

```bash
sudo apt update
sudo apt upgrade
sudo apt install git screen vim
```

##### Debian 安装 Node 以及 Yarn

```bash
sudo su
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs
sudo apt-get install gcc g++ make
# yarn
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo \"deb https://dl.yarnpkg.com/debian/ stable main\" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

##### Ubuntu 安装 Node 以及 Yarn

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
# yarn
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo \"deb https://dl.yarnpkg.com/debian/ stable main\" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

运行以下命令安装 Nginx
```bash
sudo apt install nginx
```

运行以下命令安装 serve

```bash
yarn global add serve
```

### 证书准备

在申请证书前请把服务器 IP 指向你需要的域名地址。

#### CentOS / Fedora 以及 REHL 使用以下命令安装 certbot

```bash
sudo yum install certbo
```

使用以下命令申请 bestswap 的通配符证书

```
sudo certbot certonly -d bestswap.com -d *.bestswap.com --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```

#### Debian / Ubuntu 以及 Debian 系列使用以下命令安装 certbot

```bash
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot 
```

使用以下命令申请 bestswap 的通配符证书

```bash
sudo certbot certonly -d bestswap.com -d *.bestswap.com --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```

### 为两个网站编译

这里省略了合约地址填写的部分，在编译前，请确保已经提交新的合约地址到源码

使用以下命令克隆网站到目录

```bash
# Swap
git clone https://github.com/KodamaSakuno/uniswap-interface swap
# Pool
git clone https://github.com/KodamaSakuno/bestswap-pools-interface pool
```

现在当前文件夹下有两个目录，分别是 swap 和 pool

#### 设置 Swap

进入第一个文件夹 swap

```bash
cd swap
# 切换到 release 分支
git checkout release
```

运行 yarn 来安装以及 yarn build 来生成网站的编译版本

```
yarn
yarn build
```

使用 screen 新建一个 **多窗口模式** 的命令行，swap-web 是标识符，将来可以通过 screen -r swap-web 返回到这个窗口

关于 screen 命令的更多信息可以前往：https://www.runoob.com/linux/linux-comm-screen.html

```bash
screen -S swap-web
```

此时新的窗口已建立。

运行一个新的 serve 进程来给网站提供一个服务器端口， -s 代表这个网站是 SPA 模式，-l 是指本地端口，也可以指定到其他端口

```bash
serve -s ./build -l 3000
```

要切出当前激活的 swap-web 窗口，按住 Ctrl + A 再按下 D 来完成脱离操作。

#### 设置 Pool

进入到第二个文件夹 pool

```bash
cd pool
# 切换到 release 分支
git checkout release
```

运行 yarn 来安装以及 yarn build 来生成网站的编译版本

```
yarn
yarn build
```

使用 screen 新建一个 **多窗口模式** 的命令行，pool-web 是标识符，将来可以通过 screen -r pool-web 返回到这个窗口

关于 screen 命令的更多信息可以前往：https://www.runoob.com/linux/linux-comm-screen.html

```bash
screen -S pool-web
```

此时新的窗口已建立。

运行一个新的 serve 进程来给网站提供一个服务器端口， -s 代表这个网站是 SPA 模式，-l 是指本地端口，也可以指定到其他端口

```bash
serve -s ./build -l 3001
```

要切出当前激活的 swap-web 窗口，按住 Ctrl + A 再按下 D 来完成脱离操作。

### Nginx 外网访问准备

使用下面的命令来新建一个 Nginx 配置文件

```bash
sudo vim /etc/nginx/conf.d/bsc.bestswap.com.conf
```

因为使用的是 vim，在输入前我们需要按下字母 I 键激活输入模式，此时您就可以输入了，我们把下面的配置文件填进去：

```nginx
server {
        listen 80;
        server_name bsc.bestswap.com;
        return 301 https://$host$request_uri;
}
server {
        listen 443 ssl http2;
        # listen [::]:443 ssl;

        server_name bsc.bestswap.com;

        ssl on;
        ssl_certificate /etc/letsencrypt/live/bestswap.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/bestswap.com/privkey.pem;
        ssl_prefer_server_ciphers on;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS !RC4";
        keepalive_timeout 70;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        add_header Strict-Transport-Security max-age=63072000;
        # add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;

        location /swap/ {
                proxy_pass http://127.0.0.1:3000/;
        }

        location /farm/ {
                proxy_pass http://127.0.0.1:3001/;
  			}
}
```

复制粘贴进去后按下 ESC 按键来取消输入模式，当前在命令模式，我们输入

```vim
:wp
```

冒号 wp 来保存文件，w 表示保存，q 表示退出编辑器。

### 运行当前配置好的服务

CentOS / Fedora / Debian / Ubuntu 运行下面的命令即可

##### 设置 nginx 开机自启

```bash
systemctl enable nginx
```

##### 设置 nginx 启动

```bash
systemctl start nginx
```

## 大功告成了。