---
title: Impressions from PyCon DE & PyData 2026 in Darmstadt
summary: Our developer Tobias attended PyCon DE & PyData 2026 in Darmstadt and
  returned with plenty of insights on AI agents, security, and modern
  development workflows.
author: Tobias Kronauer
cover: /images/blog/impressions-from-pycon-de-pydata-2026-in-darmstadt/1777024891340.jpg
created: 2026-05-07
slug: pycon2026
frontpage: true
frontpageImage: /images/blog/impressions-from-pycon-de-pydata-2026-in-darmstadt/1777024891340.jpg
frontpageWeight: 1
published: true
---
In April, I, Tobias, attended PyCon DE & PyData 2026 in Darmstadt. Between talks, discussions, and spontaneous conversations during lunch breaks, one thing quickly became clear: AI agents have officially arrived in everyday software development.

As someone with a background in mechanical engineering, the conference venue “darmstadtium” immediately reminded me of materials science lectures from university. The conference halls are named after chemical elements, which made the atmosphere feel oddly familiar. After all, Darmstadt is widely regarded as one of Germany’s leading hubs for materials science, while KIT, where I studied myself, remains the eternal runner-up.

![](/images/blog/impressions-from-pycon-de-pydata-2026-in-darmstadt/dein-abschnittstext-2-.png)

## AI Agents Everywhere

One topic appeared throughout almost every talk and panel discussion: AI agents are changing the way software is built.

One particularly interesting panel featured developers and tech leads openly discussing how they already integrate AI into their daily workflows and what opportunities and risks they see for the future.

What stood out most was that there is still no clear, standardized workflow. Teams are experimenting, testing different tools, and figuring out their own approaches to AI-assisted development. Especially for data-intensive or highly complex tasks, many developers still intentionally prefer manual implementation.

Another interesting trend was the increasing use of Markdown for defining requirements. Requirements and implementation are moving closer together. This is something we have also observed at geOps, and we are currently adapting our own processes accordingly.

## Between Productivity and Security Concerns

Alongside the excitement around productivity gains, security was one of the conference’s recurring themes.

Mistakes when using AI tools often happen unintentionally and almost casually: sensitive information ends up in prompts, gets processed externally, or is stored without developers fully realizing it. At the same time, AI-generated code can introduce new vulnerabilities when outputs are accepted without proper review.

One question kept surfacing repeatedly:

> *Who can I actually trust?*

Not only the tools themselves, but also their generated results need to be critically evaluated. Trust is becoming less of a default assumption and more of a conscious decision within the development process.

Another strong takeaway was that today, virtually every company can become a target of automated attacks. The old assumption that “nobody would bother attacking us anyway” no longer applies. Automated attacks scale effortlessly and do not differentiate between large enterprises and small projects.

## Security Still Requires Humans

Another talk focused specifically on security in the age of coding agents.

AI can help identify vulnerabilities faster, analyze code more efficiently, and generate tests automatically. Especially in testing, many teams see enormous potential for accelerating quality assurance.

Still, one thing remained undisputed: it is not only important *that* something gets tested, but *what* gets tested. The strategy behind testing remains a fundamentally human responsibility.

## Conversations Between Insurance and Industry

Some of the most interesting insights for me came from conversations during lunch breaks. I spoke with developers from both the insurance sector and industrial manufacturing.

Everyone was already using AI in some form, but at very different levels of adoption. While some mainly relied on intelligent tab completion, others were already generating large portions of their code using coding agents.

This naturally led to an interesting discussion:

For which types of projects do coding agents currently provide the greatest value?

The general consensus was: primarily for greenfield projects with relatively few existing interface constraints. As soon as complex API or UI dependencies come into play, the coordination and validation effort increases significantly.

## Returning Home with New Ideas

Inspired and full of motivation for our upcoming AI Hackday, I eventually headed back home with plenty of new ideas.

One final question, however, stayed with me:

Would AI have helped discover the element “Darmstadtium” as well?