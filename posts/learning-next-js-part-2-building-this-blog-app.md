---
title: "Learning Next.js: Part 2: Building this blog app"
tag: web nextjs react
time: "2021-11-18T00:10:40.176+08:00"
---

## Summary

Whenever we look at something good, we often feel an urge to reproduce something
that should at least work as good. The same happened to me as in the case of
the Vercel website &ndash; the design is so good that when I started building
the blog app, I decided I would take great care about the design as well. And as
you could have noticed, the design of this site does have a lot of similarities
with the Vercel website, as I was greatly inspired by it.

So, after one hour of planning, I came to the decision that the app should have
all functionalities that I'd love to have in a blog app: good design, light/dark
toggler, article topics (which I call "tags" here &ndash; an idea taken from
[the StackOverflow website](https://stackoverflow.com)), and a search box for
the articles (with a keyword to search for tags too). Of course, the ability to
render from Markdown instead of HTML.

Although the time taken for me to come to a version that I like is, of course,
far longer than the time I needed to build
[my first React app](https://laj2203.joulev.dev) (it has been three days
already, and I'm still finding new features to add to the site), right now,
looking back at the three days I spent all of my power nurturing the app (I
literally coded at least 12 hours each day), and looking at the current app, I
can finally say this,

> I have built something that I am really proud of.

Same thing happened when I built [the `tategaki` app](https://tategaki.joulev.dev);
after spending a whole afternoon working on it nonstop, I came to a code that
to be fair I could stare and "enjoy" it all day long, but I feel this time's
effort and the end product are far better. I can probably even say that the last
three days have been a major moment in my university time, and probably even
my career.

## Old React versus new React

[The official React tutorial](https://reactjs.org/tutorial/tutorial.html) uses
a somewhat "oldstyle" React, where to make a component with its own props, it's
necessary to make a new `class` which `extends React.Component`. In the new
React and Next.js, however, we don't need to deal with classes, as now we have
React hooks: `useState` and friends. Compare this

```jsx
export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProp = "initial value"
    }
  }
  render() {
    return <><div>{this.props.parentProp}</div><div>{this.state.myProp}</div></>;
  }
}
```

and this

```jsx
export default function MyComponent(props) {
  const [myProp, setMyProp] = useState("initial value");
  return <><div>{props.parentProp}</div><div>{myProp}</div></>;
}
```

It's clear which is better, right?

However, since I was used to the the first way as I was taught in the tutorial,
it did take a while for me to get used to the second way (with a lot of testing
too!). In recently-made components, I don't normally use classes anymore, but
you can still see `class extends React.Component` in many older components.
Well, after this site is stable, I do plan to replace them. For now they work
though, so let's focus on new features first.

## CSS Transition

Another thing that bugged me a lot was how to make CSS smooth transitions
working with state change. Especially for the case of the left panel, which
happens to become a "top panel" navigation bar on mobile &ndash; I want it to
slide down and up on state change just like `$.slideDown()` and `$.slideUp()`
in jQuery.

It's such a hard time for a frequent jQuery user to migrate to React. I know I
can use jQuery in React, but everyone knows that isn't how React is supposed to
be used.

It literally took me a whole afternoon and at least 5 online guides to at least
have an image of how `CSSTransition` of `react-transition-group` works. Now
thinking back I realised it just works like `25%`, `50%` keyframes in CSS, yet
for some reasons I just couldn't gasp the meanings of things like `enter`,
`enterActive`, `exit`, etc. at the time.

## Dark theme

A feature I have wanted to be able to implement for long, as a dark theme lover,
yet I hadn't been able to. So, for this app, I decided to give it a serious try.

And it tortured me for a whole day.

Firstly, I thought of using CSS variables, just like you would naturally think
and just like most tutorials suggest. The problem here is, I use Bootstrap and
SCSS for this site, and, well, the CSS is built directly at build time. There is
no way I could use any CSS variables. (Or there is some way but I haven't been
able to find it.)

Then, I looked for using different SCSS files for respective themes. My general
idea was that, for each component `Component` that I need to provide the dark
and the light theme for, instead of using just a `component.module.scss` file,
I made three files: `component.common.module.scss` for styles that aren't
theme-related, and `component.dark.module.scss` and `component.light.module.scss`
for dark theme and light theme respectively. Then I used dynamic import to get
the needed SCSS file.

It looked pretty good to me, and I was so dead serious about implementing it
that I literally spent three attempts to make a whole bunch of SCSS files inside
my `components` directory. I got as close as getting the theme working by
changing the top-level `dark` prop. But unfortunately, the theme switcher
couldn't work, because after switching themes, new SCSS file was loaded *but*
the old SCSS file wasn't unloaded, so two themes clashed and you got a result
nowhere near satisfactory.

So, just like that, all three attempts was for naught. It was `rm`'d without
any commits.

Only in the third idea did I finally get it working, and it is the current theme
system in this site. That is, to make `.dark` and `.light` class variants for
each theme-affected component to update the colour of that component. Starting
from the top-level `body`, down to things as small as a simple `<a>` link.

It turned out to be quite easy. I didn't have to do any dynamic importing, which
saved me from `async`/`await` hell. The code also became relatively simple: I
only needed to add the necessary class to the element,

```jsx
<MyComponent className={`${styles.nonThemeClass} ${props.dark ? "dark" : "light"}`}>
  {props.content}
</MyComponent>
```

Since we load both themes at the same time, the switcher works too: I don't need
to worry about theme clashes as they are separated by two class names that are
guaranteed to never be called together.

It doesn't work perfectly, though. Right now, if you use a phone, try changing
the theme from the navigation bar, then close the bar. You will see that the bar
disappears immediately instead of transforming in a smooth transition effect. That's because
changing the theme has effect on class names, which is precisely the thing I
use in `CSSTransition`. I spent quite a while but couldn't find a good solution.
Since the transition only takes 0.3 seconds, I think I'll just call it
"good enough" for now.

## Searching page

### Only search when user stops typing

Although searching algorithms were pretty straightforward &ndash; it just boils
down to searching for strings inside another string, the searching function
might take some time when the number of articles grows larger. I don't want to
burn user's hardware just to do simple searching. So I decided that the app
should only perform searching when the user has stopped typing for a given
amount of time (currently 500ms).

It sounds kinda complicated, but this is one of the rare satisfying cases where
things just work on first try. That feeling of "wait, that works?" is so
satisfying, I can't lie. Although it did take me some props, one of the props
being a time out callback function that, to be fair, I'd like to avoid as much
as possible.

And it does look more of a hack to me, I can't lie…

```jsx
const [query, setQuery] = useState("");
const [stillTyping, setStillTyping] = useState(true);
const [currentTimeout, setCurrentTimeout] = useState(null);
const [postsFiltered, setPostsFiltered] = useState([]);
const updateQuery = query => {
  setQuery(query);
  clearTimeout(currentTimeout);
  setStillTyping(true);
  setCurrentTimeout(setTimeout(() => {
    setStillTyping(false);
    setPostsFiltered(filterPosts(props.posts, query));
  }, 500));
};
```

### Handling URL query

For any search page, we would like to reference a particular search query with
a hyperlink, right? So I wanted to implement a query `q` in the URL such that,
if the page loads with the following URL, for example,

```
https://blog.joulev.dev/search?q=hello%20world
```

the search engine should search for the query `hello world` instead of waiting
for user input. In that way, it also makes sense to update the URL dynamically
as user types in search query, so I decided to implement that too.

Next.js has `next/router` which is pretty convenient. However, for some reasons,
when I use something like

```jsx
const router = useRouter();
useState(() => {
  setQuery(decodeURIComponent(router.query.q));
}, []); // on page load
```

it looks like the `router` wasn't "connected" to the browser quick enough,
and `router.query.q` just returned `null`. And it looks like it was dependent
on my computer's speed too: when my computer is fast, `router.query.q` might
work, and when my computer is slow, it might not work. In short, this behaves
pretty randomly in my browser.

After some time investigating without any positive results, I decided this is
just processing the URL, I'm gonna do it myself.

Yes, that "Fine, I'll do it myself" meme. I was exactly in that position.

And, eventually, I came up with this, which is still being used in the site.

```jsx
const getQuery = () => {
  const urlArr = window.location.href.split("?");
  if (urlArr.length === 1) return "";
  const paramArr = urlArr[1].split("&");
  for (let i = 0; i < paramArr.length; i++) {
    if (paramArr[i].split("=")[0] === "q")
      return decodeURIComponent(paramArr[i].split("=")[1]);
  }
  return "";
};
```

I can't say it's as bug-free and polished as `router.query.q` or some other
libraries, but it works, and after a lot of testing I haven't been able to find
a bug for it. So that's fine I guess.

## Conclusion

Next.js [describes itself as a "pit of success"](https://nextjs.org/learn/basics/create-nextjs-app).
After learning it, although just the basic part of it, I can see that when the
developers behind Next.js call the framework that way, they really mean it. It
has been addicting to learn it and build things with it, to say the least.

I rarely skip two days without any anime. The last four days, because of Next.js,
I didn't even think of watching anything. Everyday I got up at 10:30am, went to
Facebook a bit, went to Twitter a bit, then had lunch. From that point until
early morning of the next day, about 2am to 4am, it would be a fully focused
coding session that only got interuppted by dinner and shower (and I even forgot
to take shower one day haha). I have rarely felt such motivation to code before.
Sure, motivation is good and all, but one may actually think this level of
motivation is a bit unhealthy.

That's how Next.js has impressed me so far. And I haven't even touched the
advanced stuff yet. The things that first impressed me &ndash; the new
features introduced in the new Next.js Conf &ndash; I haven't even tried them
yet. That's how good Next.js is, as I currently perceive it to be.

Probably it will be the default format for all new sites that I build from now
on.
