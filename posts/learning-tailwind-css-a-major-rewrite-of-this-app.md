---
title: "Learning Tailwind CSS: A major rewrite of this app"
tag: web tailwind css
time: "2021-11-26T16:39:28.521+08:00"
---

## Motivation

Shortly after [I finished this site](/posts/learning-next-js-part-2-building-this-blog-app),
I came across an article by one of Next.js's maintainer, [Lee Robinson](https://leerob.io),
about web designs:
[Everything I Know About Style Guides, Design Systems, and Component Libraries](https://leerob.io/blog/style-guides-component-libraries-design-systems).

Already slightly dissatisfied with the design of this blog app at the time, I
read the article very carefully, and followed various links inside it. One of
them would lead me to [How Should I Style My React Application?](https://leerob.io/blog/css-with-react),
which ultimately introduced me to [Tailwind CSS](https://tailwindcss.com).

As I tested my site more and more, I realised a lot of inconsistencies in its
design. That, to me, was and still is a fatal flaw that severely harms the
overall design of the application. Looking at Tailwind's website, I was
convinced it would be a suitable tool for me to finally put such design issues
to rest for good. And... especially when Tailwind offers dark mode variant
utilities, which meant I would be freed from the unmaintainable Sass mess that
I had to write to support the dark mode toggler. Just look at this &ndash; it is
how I supported dark mode for tags before Tailwind:

```scss
@use "sass:color";
@use "sass:map";
@import "../styles/variables";

.tag {
  padding: .15rem .4rem;
  border-radius: $border-radius;
}

@mixin manage-theme($name, $theme-map) {
  $background: map.get($theme-map, "background");
  $primary: map.get($theme-map, "primary");
  .tag.#{$name} {
    color: $primary;
    background: mix($primary, $background, 20%);
    transition: .15s ease-in-out;
    &:hover {
      background: $primary;
      color: white !important;
      text-decoration: none !important;
    }
  }
}

@include manage-theme(light, $light-theme);
@include manage-theme(dark, $dark-theme);
```

Not only is it so complicated for such a trivial task, it's also inefficient as
I have to load a lot of code, which consequently harmed my [FCP](https://web.dev/fcp)
and [LCP](https://web.dev/lcp).

Taken all of these into account, I decided to learn Tailwind and try to apply it
to the site. So I decided to remove Bootstrap and basically the whole design
system that I had built to the site.

## Strange syntax and massive learning curve

This is not new. Just look at this

```jsx
function TagSkeleton({ tag, big }) {
  return <>
    <Link href={`/tags/${tag}`}>
      <a className={`
        rounded no-underline
        ${big ? "text-4xl px-3 py-1" : "px-1.5 py-0.5"}
        bg-primary-100 text-primary-600
        hover:bg-primary-600 hover:text-gray-100
        dark:bg-primary-900 dark:text-primary-400
        dark:hover:bg-primary-400 dark:hover:text-gray-100
      `}>{tag}</a>
    </Link>
  </>;
}
```

Instead of using a lot of Sass, we use a lot of class names. I can't lie, it was
pretty discourageous for a new user. Luckily, Bootstrap is somewhat similar
(just that it's component-based rather than utility-based, so there are much
less class names to care about), so at least I wasn't too discouraged to
continue.

And then there came my misconception that Tailwind is simple CSS. No, it's not.
It's also some type of preprocessor like Sass, and inside `tailwind.config.js`
one can do a ton of customisation for that preprocessor. I realised that keeping
track of my primary and my code colour became so easy compared to before.

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#fcfcfa", // bg light
          200: "#eeeeec", // sidebar bg light
          300: "#e0e0df", // sidebar btn bg light
          400: "#b7b6b6",
          500: "#8d8b8c",
          600: "#636163",
          700: "#393639", // sidebar btn bg dark
          800: "#2d2b2d", // sidebar bg dark
          900: "#221f22", // bg dark
        },
        primary: {
          100: "#cfe5e6",
          200: "#a4dadf",
          300: "#79cfd8",
          400: "#21b1c1",
          500: "#1e9eac",
          600: "#1a8a97",
          700: "#1d5f68",
          800: "#204e55",
          900: "#223c42",
        },
        secondary: {
          light: "#e14e05",
          dark: "#fc9867"
        }
      }
    },
  }
}
```

So, although I did struggle at first with these completely new styling concepts,
it wasn't too bad. And `tailwind.config.js` is one of the reason why it's so
easy to customise in Tailwind, unlike Bootstrap:

> Because Tailwind is so low-level, it never encourages you to design the same
> site twice. Even with the same color palette and sizing scale, it's easy to
> build the same component with a completely different look in the next project.
>
> &ndash; **[Tailwind website](https://tailwindcss.com)**

## DeJavaScriptify

As I implemented the site with Tailwind, I realised there are many parts of the
website that can be implemented without any JavaScript &ndash; the navigation
bar toggler is one example.
[I had to use `<CSSTransition>`](/posts/learning-next-js-part-2-building-this-blog-app#css-transition)
for it in the previous implementation, but now it turned out it can actually be
written with pure CSS.

```jsx
<div className={`... ${navbarShown ? "h-112" : "h-0"} ...`}>
  <Sidebar {...{ dark, changeMode, versionInfo, sideLink }} />
</div>
```

Yes and it could also be implemented with Sass in the previous implementation
too *smh*...

And guess what? Since there are no complicated JavaScript behind the scenes, now
this issue with the dark mode toggler,

> It doesn't work perfectly, though. Right now, if you use a phone, try changing
> the theme from the navigation bar, then close the bar. You will see that the
> bar disappears immediately instead of transforming in a smooth transition
> effect. That's because changing the theme has effect on class names, which is
> precisely the thing I use in CSSTransition. I spent quite a while but couldn't
> find a good solution. Since the transition only takes 0.3 seconds, I think
> I'll just call it "good enough" for now.
>
> &ndash; **[Learning Next.js: Part 2: Building this blog app](/posts/learning-next-js-part-2-building-this-blog-app)**

it no longer appears! I didn't expect that at all, but this is one of those
circumstances when you accidentally fix a bug when fixing another seemingly
unrelated bug. I'll take it of course.

## Final result

And after two days, I finally rewrote the design part successfully.

Oh, and during that process, I decided to change to a more component-oriented
Markdown processor so that I can actually use React components inside Markdown
pages, and went for [`markdown-to-jsx`](https://github.com/probablyup/markdown-to-jsx).
And while it works perfectly, for some reasons I also accidentally fixed an
annoying bug that code block wraps on mobile... I can say I accidentally fixed
more things than I ever expected this time.

Now I can say the design of this site is pretty much final, and it's unlikely
that there will be another major rewrite in a long time. If I release this app
as normal software releases, the commit preceding this post really deserves a
major release for its own.
