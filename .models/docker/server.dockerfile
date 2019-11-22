FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache lighttpd

ADD ./configs/lighttpd.conf /etc/lighttpd/lighttpd.conf

ONBUILD COPY --from=builder /build/dist .

CMD [ "lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf" ]
