---
title: Next.js Routing mit Nginx
summary: Automatisch eine Nginx Routing-Konfiguration für statische Next.js
  Projekte generieren.
created: 2022-03-28
slug: next-nginx-routes
published: true
---
Seit letztem Jahr setzen wir bei geOps vermehrt auf das React-Framework [Next.js](https://nextjs.org/) als Basis für unsere Frontend-Anwendungen. Grund dafür sind der Funktionsumfang und eine bessere Erfahrung sowohl für Endnutzer als auch für Entwickler. Aus Sicht von Endnutzern ist die hohe Ladegeschwindigkeit durch automatisches *Code Splitting* zu nennen. Für Entwickler sind [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh) und Unterstützung für Tools wie [ESLint](https://nextjs.org/docs/basic-features/eslint) und [TypeScript](https://nextjs.org/docs/basic-features/typescript) interessant.

Um eine hohe Ladegeschwindigkeit und gleichzeitig ein stabiles und schnelles Deployment zu ermöglichen, verwenden wir den [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export). Zwar verlieren wir damit ein [paar Funktionen](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features) die einen Node.js Server erfordern, in der Regel werden diese aber von unseren Python-Backends abgedeckt. Damit werden beim Deployment in unserer CI statische HTML- und JavaScript-Dateien generiert, die von einem [Nginx-Server](https://nginx.org/en/) schnell und unkompliziert ausgeliefert werden.

Auf die Unterstützung von [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes) wollten wir allerdings nicht verzichten, daher haben wir ein [kleines NPM-Paket](https://www.npmjs.com/package/next-nginx-routes) erstellt um automatisiert eine Routing-Konfiguration für Nginx zu generieren. Die Informationen dafür basieren auf den Metadaten in `.next/routes-manifest.json` die beim Aufruf von `next build` erstellt werden.

Die Verwendung des NPM-Pakets ist in drei Schritten schnell erklärt:

1. Im Next.js Projekt das Paket installieren: `yarn add --dev next-nginx-routes`
2. Das Export NPM-Script ergänzen: `next build && next export && next-nginx-routes`
3. Die generierte Nginx-Konfigurationsdatei in der Haupt-Konfiguration einbinden.

Alle drei Schritte sind in einem [kleinen Beispiel-Projekt](https://github.com/geops/next-nginx-routes/tree/main/example) auf GitHub zu finden. 

Bisher haben wir diesen Ansatz erst in wenigen Projekten eingesetzt, daher sind nicht unbedingt alle Anwendungsfälle abgedeckt. In solchen Fällen freuen wir uns natürlich immer über Pull Requests.