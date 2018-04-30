# Bumbo
Bumbo is a simple blog engine based on files.

## Getting Started on Linux
```
git clone https://github.com/SzymonLisowiec/Bumbo.git
cd Bumbo
npm i
mv .env.example .env
node index
```

## Demo with frontend:
https://blog.kysune.me (polish language)

## Routing

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

## Optional post's metadata
```
keywords: comma-separated keywords for SEO
description: article descritpion for SEO
author: 
```
and you can add more nothing significant metadata like `author`.

## TODO
- [] hiding posts
- [] planning posts

## License
MIT License

Copyright (c) 2018 Kysune

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.