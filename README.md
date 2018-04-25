# Bumbo
Bumbo is a simple blog engine based on files.

## Getting Started
```
git clone https://github.com/SzymonLisowiec/Bumbo.git
cd Bumbo
npm i
node index
```

## Demo with frontend:
https://blog.kysune.me (polish language)

## ROUTING

### /posts[?from=0&limit=10&tags=hello,world]
- from - count of posts to skip for pagination
- limit - count of posts on page
- tags - comma-separated tags

### /post/ID
- ID - post's id, it is also name of file. For example, if we named post file `hello-world.md`, his id will be `hello-world`

## Creating a post
Only need to create `.md` file in `posts` catalog, start off:
```markdown
---
title: Hello World
time: 2018-04-25 22:20:00
tags: offtop
---

Post's content
```
and runned Bumbo in background will detect a new post.