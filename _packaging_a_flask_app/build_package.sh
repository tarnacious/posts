# Setup build environment

apt-get update
apt-get install ruby1.8 rubygems git python-dev python-setuptools python-virtualenv ruby-dev curl
gem install fpm
gem install pleaserun

# Create virtualenv and install

git clone https://github.com/tarnacious/demosite.git demosite-src
virtualenv /usr/share/demosite
cd /home/vagrant/demosite-src
/usr/share/demosite/bin/python setup.py install

# Create initscript

pleaserun --user demosite --install --name demosite /home/vagrant/demosite/bin/gunicorn demosite:app

# Create defaults

cat > /etc/default/demosite << EOF
export DEMOSITE_CONFIG_PATH=/etc/demosite/config.cfg
export DEMOSITE_LOGGING_CONFIG_PATH=/etc/demosite/logging.conf
EOF

# Create application config

mkdir /etc/demosite
cat > /etc/demosite/config.cfg << EOF
TAGLINE="this is all so far"
EOF

# Create application logging config

cat > /etc/demosite/logging.cfg << EOF
[loggers]
keys = root, demosite

[handlers]
keys = root, demosite

[formatters]
keys = default

[formatter_default]
format = [%(asctime)s] - %(name)s - %(levelname)s - %(message)s
class = logging.Formatter

[logger_root]
level = DEBUG
qualname = root
handlers = root

[handler_root]
class = logging.handlers.RotatingFileHandler
formatter = default
args = ("/var/log/demosite/root.log",)

[logger_demosite]
level = DEBUG
qualname = demosite
handlers = demosite

[handler_demosite]
class = logging.handlers.RotatingFileHandler
formatter = default
args = ("/var/log/demosite/demosite.log",)
EOF

# Create postconfig

cat > postconifg << EOF
#!/bin/sh -e

action="$1"
oldversion="$2"

. /usr/share/debconf/confmodule
db_version 2.0

if [ "$action" != configure ]; then
    exit 0
fi

if ! getent passwd demosite >/dev/null; then
    adduser --quiet --system --no-create-home --home /home/vagrant/demosite --shell /usr/sbin/nologin demosite
fi

mkdir -p /var/log/demosite
chown demosite /var/log/demosite
/etc/init.d/demosite start
EOF

# Create preinst and prerm

echo `cat << EOF
#!/bin/sh
set -e

if [ -f /etc/init.d/demosite ]; then
    /etc/init.d/demosite stop
fi
EOF` | tee preinst >prerm

# Build the package

fpm -s dir \
    -t deb \
    -n demosite \
    -v 0.1 \
    --deb-init /etc/demosite \
    --before-install preinst \
    --after-install postinst \
    --before-remove prerm \
    -d "python" \
    /etc/demosite=/etc/demosite \
    /etc/default/demosite=/etc/default/demosite \
    /usr/share/demosite/=/usr/share/demosite 

# Copy the package back to the host machine

mkdir -p /vagrant/build
cp demosite_0.1_amd64.deb /vagrant/build/
