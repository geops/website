---
title: GraphQL - Hackathon 2022
summary: "Members from the geOps developer team explore GraphQL in an internal
  hackathon to discover its potential for geOps projects. "
author: Friedjoff Trautwein & Daniel Marsh-Hunn
cover: /images/blog/graphql-hackathon-2022/graphql_logo.png
created: 2023-01-30
slug: graphql-hackathon
tags:
  - developers
published: true
---
![](/images/blog/graphql-hackathon-2022/graphql.png)

At geOps, developers are constantly exploring cutting edge technologies to ensure applications use the most modern web technology standards. Therefore, it goes without saying that [GraphQL](https://graphql.org/) has been a frequent topic during development. GraphQL is a powerful API query language that has earned a reputation in recent years as a flexible and feature-rich alternative to RESTful APIs. This moved geOps towards making use of it in recent projects and to explore its full potential.

In 2022 members from the geOps developer team decided to organise an internal, collaborative coding event. It was aimed at discovering the possibilities, tools and libraries focused on GraphQL and applying them to existing geOps projects by re-engineering specific components. Thus, the GraphQL-Hackathon was brought to life.

A team of seven developers took part, including backend and frontend engineers. A full day was planned as a time frame for the hackathon. The event started out with the main motivators providing a brief insight into the core principles of GraphQL, how the query language works and what benefits are gained by its usage. Then the team discussed which component from which project could be implemented using GraphQL considering the limited time frame. It was concluded that the geOps-developed [Live Map of the S-Bahn Munich](https://s-bahn-muenchen-live.de) would be a suitable project to experiment on, since it requires standard data requests as well as real-time data subscriptions, which are essential in many geOps projects. The team started to develop a departure board for a station, including backend and frontend.

Based on a limited feature set, a minimal GraphQL schema was defined and provided common ground for a frontend and backend team to work in parallel. The backend team focused on getting to know the [Strawberry](https://strawberry.rocks/) library and hit the ground running with our existing station finder API and real-time database. At lunch a prototype was already available to the frontend team. In the meantime the frontend team decided to try out different GraphQL browser libraries with a focus on support for GraphQL subscriptions. The results were mixed and will provide valuable insights for further endeavours into GraphQL frontend territory. In the end we had two different prototypes which implemented a simple user interface to find stations and display real-time information about incoming and outgoing trains.

The whole team was pretty excited about the benefits and possibilities GraphQL has to offer. The quick progress by the backend team was especially promising and everybody was looking forward to a follow-up hackathon.