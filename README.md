# What is this project about?

A web app to manage players during a sports (eg. badminton) club session when there are limited courts available.

# Who is this project for?

The final product is for sports club session managers and members during playing sessions.
The project itself is used as an example to teach and practice multi-tiered web-app development.

# Glossary of terms

1. **member** - a registered member of a club
2. **player** - a person that is eligible to play during a club session
3. **court** - a venue/location where players can play a game
4. **game** - a short match that is typically played by 2 or more players on a court
5. **group** - a group of players in a game
6. **challenge** - a mechanism for members to move up in their designated skill level
7. **skill level** - a categorization mechanism designed to help members select games that are competitive.

# Design

## Background

The [Cambridge Badminton Club](https://www.cambridgebadmintonclub.com/) has been using a board system to run their club session for many years with great success. It is a physical system with a magnetic whiteboard and magnetic name tags. This system has proven very efficient in creating competitive games and getting players on and off the courts quickly.

The objective of this project is to replicate this system digitally to make it more convenient for the club managers and to allow other clubs to adopt this system easily.

## Value proposition

### Target user/market

Board managers and club members who want to organize games and schedule them to play on courts/venues. These users typically consist of people from all genders, age, ethnicity, and technical-savviness.

### What do they want to do?

#### Player administration

1. Add new members
2. Change member profile, including activation/deactivation

#### Waiting queue

1. Add members to the waiting queue when they arrive
2. Remove players from the waiting queue when they leave
3. Rearrange the order of players in the waiting queue
4. Add guests (non-members) as a player in the waiting queue

#### On-deck queue

1. If there is space on the on-deck queue then notify the next player in waiting queue to select a group to play a game/match
2. Select players from the waiting queue to form a group that is then queued to play in the on-deck queue
3. Remove groups from the on-deck queue to cancel a game
4. Rearrange the order of groups in the on-deck queue

#### Courts

1. Move the next group in the on-deck queue to the next available court and notify the players in that group
2. Move the players coming off a court to the end of the waiting queue
3. Reserve courts to prevent regular play on them; for example, when there are leaks in the ceiling and water is dripping onto the courts or when courts are taken up by climbing walls every January >:(

#### Challenges

1. Initiate a challenge by a member, selecting n members at random from the available, incumbent level to be in the challenge
2. Clearly indicate which members are challenging or in a challenge
3. Remove the members in a challenge from the list of selectable players for regular games
4. Record challenge scores when a challenge game is completed
5. When the challenge is completed return the members in a challenge to the list of selectable players for regular games
6. Record the challenge result successful/unsuccessful
7. Change the challenger's skill level if their challenge is successful
8. Change the incumbent's skill level if they got bumped down (based on challenge rules)

### What are their pains (from most to least painful) with the current (physical board) system?

1. Players not aware that they are assigned to play on a court
2. Magnetic name tags are difficult to move on the board
3. Physical board tends to be bulky, heavy and require on-site storage
4. Log jam at the board when multiple groups come off the court around the same time
5. Challenge results are tracked in a book and require an administrator to record
6. Challenge incumbents who are selected but are currently playing on a court causes confusion if their names are removed for the challenge
7. Time consuming to change a member's skill level: new name tags need to be created with the new level indicator (color)
8. Player at the top of the waiting queue is unaware that it is their turn to select a game
9. Player's name tags falling off the board

### What are their pains (from most to least painful) in general with managing a club session?

1. TODO: need input from users

## Prototype

A Figma prototype can be [previewed here](https://www.figma.com/proto/7aTbnXOGmHze0HC74rLDUp/cbc-board-system?node-id=6-747&t=JuGjN68fyMp0S5d4-1&scaling=min-zoom&page-id=1%3A419&starting-point-node-id=6%3A747).

# Development

## Tools used

1. Package manager: [yarn](https://yarnpkg.com)
2. JS framework: [Vue](https://vuejs.org)
   1. State management: [Pinia](pinia.vuejs.org)
   2. Design language/lib: [Vuetify](https://vuetifyjs.com)
3. Programming language: [Typescript](https://typescriptlang.org)
4. Backend (data store): [Supabase](https://supabase.com)
5. Design tool: [Figma](https://figma.com)

## Suggested development tools

1. VS Code
   1. Prettier
   2. Code Spell Checker

## Architecture

### Backend

Data is persisted in a Postgresql database hosted by Supabase.com. Supabase provides a database management GUI via its website; as well as an web-API to access the database from apps. JS can apps access this API via the convenient `supabase-js` library/module. User profile management is also handled through Supabase.

The database holds data that needs to be persisted across playing sessions, including club and members hip information. Transient data like waiting and playing queues will be cached on the client side.

### Frontend

The user interface is a web-app built using VueJS.

## Environment setup

1. Clone this repository
2. Install software tools: latest version of nodejs, yarn, etc.
3. Optionally install the [supabase CLI](https://supabase.com/docs/guides/cli) for local development (without connecting to a remote supabase account)
4. The frontend Vue app is located in the [vueapp folder](./vueapp/), with its own documentation
