Aplikaciu mozno spustit v Dockeri.
Je potrebne prejst do priecinka s aplikaciou, zbuildit docker image a sputit kontajner.
docker build -t app1 .
docker run -p [cisloPortu:cisloPortu] app1
