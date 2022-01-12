---
title: CORS in Django für Entwicklungsumgebung konfigurieren
summary: In diesem Beitrag geht es darum, wie man ein Django-Projekt so aufbaut,
  dass es nur im DEBUG-Modus CORS-Requests zuläst, auch wenn diese einen Login
  im Backend erfordern. Bei uns hat sich das als hilfreich herausgestellt um
  Frontendanpassungen an der internen Dev-Umgebung zu testen ohne dafür das
  Backend lokal starten zu müssen.
created: 2022-01-12
slug: cors-in-django-fuer-entwicklungsumgebung-konfigurieren
published: true
---
In diesem Beitrag geht es darum, wie man ein Django-Projekt so aufbaut, dass es nur im DEBUG-Modus CORS-Requests zuläst, auch wenn diese einen Login im Backend erfordern. Bei uns hat sich das als hilfreich herausgestellt um Frontendanpassungen an der internen Dev-Umgebung zu testen ohne dafür das Backend lokal starten zu müssen.

Es geht hier also um Projekte, bei denen in Produktion *kein* CORS verwendet wird, da Backend und Frontend hinter der gleichen Domain per Reverse-Proxy vereint werden.

## Was ist CORS?

Ohne spezielle HTTP-Header weigern sich alle modernen Browser, Daten einer Seite an einen Server mit einer anderen Domain zu schicken. Der Mechanismus um das explizit zu freizuschalten nennt sich "Cross Origin Resource Sharing", kurz CORS. Mit dem Standardverhalten, also erst mal alles zu blocken, werden Phishing-Attacken erschwert, da das Formular zur Eingabe sensibler Daten bei der gleichen Domain gehostet werden muss, bei der die Daten empfangen werden.

Auch bei Cookies, also insbesondere dem Session-Cookie, muss man explizit dazu sagen, wenn es über unterschiedliche Seiten hinweg gültig sein soll.

## Was tun?

Dieses Standardverhalten für öffentlich erreichbare Instanzen wollen wir nicht ändern. Mit der vorgeschlagenen Konfiguration vergrößert sich die Angriffsfläche zwar nur minimal, für den produktiven Einsatz dennoch unerwünscht.

Stattdessen verwenden wir die DEBUG-Flag, um die Zugriffe von 127.0.0.1 und localhost zu ermöglichen. Die Annahme ist dabei natürlich, dass DEBUG nur bei internen Instanzen gesetzt ist.

Um die CORS-Header zu setzen verwenden wir [django-cors-headers](https://github.com/adamchainz/django-cors-headers) (muss also installiert sein).

Wenn es produktiv keine APIs gibt, die CORS unterstützen sollen, sieht die Konfiguration so aus:

```python
if DEBUG:
    CSRF_COOKIE_SECURE = False
    CORS_REPLACE_HTTPS_REFERER = True
    CSRF_COOKIE_DOMAIN = None
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_HTTPONLY = False
    CORS_ALLOW_CREDENTIALS = True
    SESSION_COOKIE_SAMESITE = "None"
    CSRF_COOKIE_SAMESITE = "None"
    CORS_ALLOWED_ORIGIN_REGEXES = [
        r"^null$",
        r"^http://localhost:[0-9]+$",
        r"^http://127\\.0\\.0\\.1:[0-9]+$",
        r"^https://localhost:[0-9]+$",
        r"^https://127\\.0\\.0\\.1:[0-9]+$",
    ]
    INSTALLED_APPS = ["corsheaders"]
    MIDDLEWARE = ["corsheaders.middleware.CorsMiddleware"]
else:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    INSTALLED_APPS = []
    MIDDLEWARE = []
 
INSTALLED_APPS += [
    ...
]
 
MIDDLEWARE += [
    ...
]
```

Bei älteren Django-Versionen (<=3) braucht es zusätzlich noch einen [Workaround](https://github.com/zvyn/django-samesite-none) um das "None" an den Cookies auch wirklich zu setzen.

Mit öffentlichen APIs mit CORS-Support macht die Unterscheidung der CORS- und Cookie-Settings weiterhin Sinn, aber die INSTALLED_APPS und MIDDLEWARE könnte man wieder zusammenlegen:

```python
if DEBUG:
    CSRF_COOKIE_SECURE = False
    CORS_REPLACE_HTTPS_REFERER = True
    CSRF_COOKIE_DOMAIN = None
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_HTTPONLY = False
    CORS_ALLOW_CREDENTIALS = True
    SESSION_COOKIE_SAMESITE = "None"
    CSRF_COOKIE_SAMESITE = "None"
    CORS_ALLOWED_ORIGIN_REGEXES = [
        r"^null$",
        r"^http://localhost:[0-9]+$",
        r"^http://127\\.0\\.0\\.1:[0-9]+$",
        r"^https://localhost:[0-9]+$",
        r"^https://127\\.0\\.0\\.1:[0-9]+$",
    ]
else:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    # just an example:
    CORS_ORIGIN_ALLOW_ALL = True
    CORS_URLS_REGEX = r'^/api/.*$'
 
INSTALLED_APPS += [
    "corsheaders",
    ...
]
 
MIDDLEWARE += [
    "corsheaders.middleware.CorsMiddleware"
    ...
]
```

Je nach Anwendung kann das natürlich auch alles noch variieren, aber hoffentlich ist mit den Code-Schnipseln oben schon mal ein Anfang gegeben.

## Frontendanpassungen

Um die CORS-Funktionalität zu verwenden muss im Frontend noch (hier dann nur lokal, bzw. über Umgebungsvariablen) der Request angepasst werden.

Beispiel für fetch:

```python
const fetchResponsePromise = fetch(resource, {"mode": "cors", "credentials": "include"})
```

Oder graphql-request:

```python
const graphQLClient = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors',
})
```