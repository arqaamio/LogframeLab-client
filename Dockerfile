# Base Image
FROM centos:7

# YUM packages
RUN yum install -y epel-release
RUN yum update -y && yum install -y \   
    nginx \
    locales \
    ca-certificates \
    openssl \
    sudo \
    wget \
    bzip2 \
    jq \
    python3
# Setup Files
ENV NGINX_HOME /etc/nginx 
RUN mkdir -p /var/log/nginx

# Add tini to the container
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /usr/local/bin/tini
RUN chmod +x /usr/local/bin/tini

# Update Nginx
COPY nginx/nginx.conf $NGINX_HOME/nginx.conf
COPY nginx/nginx.htpasswd $NGINX_HOME/nginx.htpasswd
COPY dist/client/ /usr/share/nginx/html

# Forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
STOPSIGNAL SIGTERM
ENTRYPOINT ["tini", "--"] 
CMD ["nginx", "-g", "daemon off;"]
