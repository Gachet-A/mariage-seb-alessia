# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML/CSS/JS, no build step. RSVP form posts to Web3Forms (https://web3forms.com), which emails each reply to alessia-sebastien@protonmail.com. The access key lives in one constant in `script.js`.

## Users

Wedding guests of Alessia & Sébastien (friends and family, French-speaking, mixed ages), opening the link from an invitation, often on a phone. Their jobs: learn when/where, plan travel and the overnight stay, and reply to the RSVP.

## Product Purpose

Single-page wedding site replacing the original Odoo site (https://spar-20260921.odoo.com/). Success = every guest finds the practical info and submits the RSVP with the details the couple needs to book rooms and plan the meal.

## Operating Context

- Wedding: 29 & 30 May 2027, Hôtel Schloss Hünigen, Freimettigenstrasse 9, 3510 Konolfingen (train stop: Stalden i.E.).
- The couple books hotel rooms themselves based on RSVP answers.
- A "last-minute announcements" area is updated by the couple.

## Capabilities and Constraints

- Content (text and images) must match the original site verbatim; only the design changes.
- RSVP fields and their conditional logic match the original form: name, email, companions, attendance (both days / 29 only / 30 only / absent), diet & allergies (shown when attending the 29th), overnight stay (shown unless absent), room type and child beds (shown when staying overnight), comment.
- Dress code text is still a placeholder in the original ("Nous vous invitons à porter...").

## Brand Commitments

Names: Alessia & Sébastien. Language: French. Photos by Jeremy Sauterel (civil ceremony photo).

## Evidence on Hand

Images in `images/` downloaded from the original site: hero (civil wedding photo), couple in the meadow, château park, access plan, train route, gravel square and its location.

## Product Principles

1. Practical info first-class: date, place, schedule and RSVP are never more than one tap away.
2. Warm and personal, never generic wedding-template.
3. Phone-first: most guests open it from a message.
