# Emojify

An emojipasta generator trained with the posts from /r/emojipasta!

[Live site](https://emojify.net)

#### Features

 - Emoji density is adjustable
 - Can filter out inappropriate emojis

## Overview

### data

I generated the [dataset](src/data/emoji-data.json) by finding a bunch of examples of "emojipasta" online and then processing them with a very simple algorithm:
- Find all instances of emoji (or groups of emoji) with a regex.
- For each emoji string, grab the word that came before it
- Build a nested dict in the form `{<word> -> {<emoji string> -> <frequency>}}`

Then I dumped that data into `emoji-data.json`.

### frontend

When the user converts some text, we do the following:
- split the input string into words
- for each word, decide if we should add emoji to it based on a random number and the emoji density chosen by the user
  - if we're adding emoji to the word, choose a random emoji string that is associated with that word in the dataset, where the probability of choosing a given emoji string is determined by its frequency value.
- combine all the strings and show the user

## Developing

To run locally, install dependencies with `yarn` and then run the dev server with `yarn start`.
