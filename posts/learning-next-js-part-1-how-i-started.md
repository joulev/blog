---
title: "Learning Next.js: Part 1: How I started"
tag: web nextjs react js
time: "2021-11-17T17:32:51.091+08:00"
---

## Start with normal HTML&ndash;CSS&ndash;JavaScript

I have been interested in web development for a long time.

In grade 10, I was taught JavaScript and the well-known drawing library
[p5.js](https://p5js.org) for the first time. Although at the time, I was taught
absolutely nothing about web development in general (yes, not even a word about
HTML!), I was curious how the drawing could appear in my browser, so I dived a
bit into it. Gradually I'd expose myself to CSS, [jQuery](https://jquery.com),
[Bootstrap](https://getbootstrap.com), and one year after that, I was able to
produce a minimal website for my web development class. (For some reason I was
exempt from taking that class, yet had to submit a website as an assignment).

Then I would be exposed to [Jekyll](https://jekyllrb.com) and some other static
site generators. I would be able to make a couple of websites in Jekyll, and
even contributed to a Jekyll website (only as a translator though *lol*):
[LearnLaTeX](https://learnlatex.org).

I'm still developing and maintaining a website right now with this good old
HTML&ndash;CSS&ndash;JS combo in a group. Would love to put the link here too, but I can't
for various reasons.

## React and Next.js

In grade 12, I was first introduced about [React](https://reactjs.org). One of
my seniors told me his group was about to build a web app, and asked if I'd like
to join. He mentioned about the library. Of course, not knowing anything about
the library, I had to decline. But afterwards I heard the name of React being
mentioned quite a few times, and I saw React proficiency was one of the most
wanted skills in developers. I thought, "so this library is that important?"

Then I was told about [Next.js](https://nextjs.org). Actually I was looking for
GH Pages alternatives, and found [Vercel](https://vercel.com) (and others;
[Netlify](https://www.netlify.com), for example). The Vercel website caught my
eyes &ndash; my design requirements are pretty strict yet the website satisfied
all of them.

Of course, when one came to the Vercel website, knowing about Next.js is
inevitable. Once again, I saw the word "React". But more importantly, since
HTML&ndash;CSS&ndash;JS that I knew was all client-side, I was looking for more server-side
tools, and I saw the word "server rendering". It settled it. I determined that
Next.js was a tool I must learn.

### Next.js Conf October 2021

Then one day I was recommended [this video](https://youtu.be/lRQ5z7i7pxE) by
Fireship about Next.js 12. Needless to say, I was extremely impressed even
though I didn't know a word about either React or Next.js at the time.
Incidentally it also fell to a period when I was relatively free.

Moreover, I was maintaining a Jekyll site for my learning journals for a module
at university, and really wanted to rewrite it using a different tool due to
[the annoying Jekyll number sorting bug](https://stackoverflow.com/q/36382505).

My university's computer science club also hold a session to introduce React
during that time:
[NUS Hackers &ndash; Hackerschool &ndash; Introduction to ReactJS](https://youtu.be/kzEiZ2oLOUU).

So, all reasons combined, as if all stars aligned that day, I decided to start
a new page in my web development path: it was time to learn React and Next.js.

### Learning React

Since I attended the Hackerschool, although I was far from being able to use
React myself, I at least got a good overview of the fundamental working of the
library, and how it differs from the traiditional HTML&ndash;CSS&ndash;JS method. So,
when I started [the official React tutorial](https://reactjs.org/tutorial/tutorial.html),
I could study it pretty quickly.

Because of that, and also because the journal website's functionalities were
pretty simple, I would be able to build the new learning journal website within
a day. You can view the website [here](https://laj2203.joulev.dev).
[The source code](https://github.com/joulev/laj2203) for the website is also
available.

Oh, and if you want to view the source of the website *before* the rewrite,
[luckily GitHub saved it for me](https://github.com/joulev/laj2203/tree/16d12452648a5d7810cae960d65881fe0d1f8c40).

### The need for a blog site

A couple of days after that, as the first semester at university was drawing to
a close, I thought, how about writing what I thought about the modules I took
here? Something like [NUSMods](https://nusmods.com) module review, but I host it
myself?

Then the site would be a blog site wouldn't it? Storing articles and nothing
else, that's literally a blog site.

Then it was also time to learn Next.js after React. I was wondering for which
should my Next.js app be written for. This need for a blog site came at exactly
the right moment. Let's write a blog web app, I thought.

### Learning Next.js

It was so convenient that the example in
[the official Next.js tutorial](https://nextjs.org/learn) was also to build a
blog app.

But it seemed I basically threw that convenience away. I basically read through
the tutorial, could understand all of the code, but I was too lazy to type them
to my code. And you know what happens when people copy and paste instead of
typing manually: they forget instantly.

After the tutorial, I could say I understood a bit of how it works. Next.js
could help me do automatic file-system-based routing, and that was really
helpful, as I could arrange files like in the traditional HTML&ndash;CSS&ndash;JS format,
compared to React's manual routers. (Argh!)

Controlling document metadata was also pretty straightforward with `next/head`,
and I could make easy hyperlinks with `next/link`. All of that wasn't so easy
in the case of React.

Well, that was all good. But other than that? I barely remembered anything.
And to build the blog app, which is the same web app you are seeing right now,
I had to go around the tutorial again several time.

Shouldn't copy and paste anything from now onwards.

---

You can read part 2 of this article here:

<LinkBtn href="/posts/learning-next-js-part-2-building-this-blog-app" text="Go to Part 2" />
