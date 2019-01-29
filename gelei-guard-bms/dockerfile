FROM 59.61.92.150:8888/gnw.nodejs:10.14.0 as nodejs
FROM 59.61.92.150:8888/gnw.supervisor:3.3.4
MAINTAINER by shemg (415355294@qq.com)

COPY --from=nodejs /data/ent /data/ent
#安装nodejs
RUN ln -s /data/ent/nodejs/node-v10.14.0-linux-x64/bin/npm /usr/local/bin/
RUN ln -s /data/ent/nodejs/node-v10.14.0-linux-x64/bin/node /usr/local/bin/
RUN ln -s /data/ent/nodejs/node-v10.14.0-linux-x64/bin/node /usr/bin/
RUN ln -s /data/ent/nodejs/node-v10.14.0-linux-x64/bin/npm /usr/bin/
RUN ln -s /data/ent/nodejs/node-v10.14.0-linux-x64/bin/cnpm /usr/local/bin/
RUN ln -s /data/ent/nodejs/node-v10.14.0-linux-x64/bin/cnpm /usr/bin/

RUN mkdir -p /data/project /data/logs/nodejs/gelei-guard-bms
ADD gelei-guard-bms.tar.gz /data/project

