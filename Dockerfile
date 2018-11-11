FROM openjdk:11-jre

ENV DEBIAN_FRONTEND noninteractive
ENV OUT_DIR /usr/lib/node_modules/webdriver-manager/selenium

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
  apt-get install -y --no-install-recommends nodejs

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update && \
  apt-get -y install google-chrome-stable

RUN apt-get -y --no-install-recommends install xvfb gtk2-engines-pixbuf && \
  apt-get -y --no-install-recommends install xfonts-cyrillic xfonts-100dpi xfonts-75dpi xfonts-base xfonts-scalable && \
  apt-get -y --no-install-recommends install imagemagick x11-apps

RUN npm install -g webdriver-manager nightwatch@1.0.11 && \
  webdriver-manager update ---versions.chrome 2.43 --versions.standalone 3.14.0 --gecko false

RUN touch /usr/bin/docker-entrypoint && { \
  echo '#!/bin/bash'; \
  echo 'echo "Starting tests..."'; \
  echo 'Xvfb -ac :99 -screen 0 1280x1024x16 &'; \
  echo 'export DISPLAY=:99'; \
  echo 'bash -c "$@"'; \
  } > /usr/bin/docker-entrypoint && \
  chmod +x /usr/bin/docker-entrypoint

WORKDIR /opt/tests
ENTRYPOINT ["docker-entrypoint"]
CMD ["bash"]
