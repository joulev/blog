---
title: "CG1111A: A look back"
tag: nus
time: "2021-11-28T09:47:18.887+08:00"
---

## General information

* **Module:** [Engineering Principles and Practice I](https://nusmods.com/modules/CG1111A)
* **Taken in:** AY2021-2022 Semester 1
* **Professor:** Ravi S/O Suppiah (mainly)
* **Expected grade:** B+ &rarr; A&minus;
* **Actual grade:** as expected

## Module review

The module teaches about the most basic of computer engineering: electronics,
computer-aided systems and engineering principles related to it. So, basically,
we studied about circuits, electrical components (resistors, capacitors and
inductors), some computer chips, some basic sensors, and finally constructed an
mBot based on Arduino Uno code and all the stuff mentioned above.

Overall, it was a very fun ride. Since this is a lab-based module, you can study
and play around with the components at the same time &ndash; that is very fun
while also makes it very easy to remember things. But also since it's lab-based,
sometimes experimental problems (broken wires, resistors stopping working, etc.)
can cause you a lot of headache as things don't go the way you expect it to,
while you can't find any mistakes in your circuit. (Yes it happened to me at
least twice.)

However, since a lot of concepts and formulas are taught, some may find the
workload to be very high. For reference, we would be going from the simple
Ohm's Law to dealing with chips during the span of a few weeks. Since I knew a
bit about those before in high school, I could keep up, but I can imagine many
people struggling before each quiz (they were worth 30% in total and unlike
labs, they were definitely not fun).

Since it's during (or just after) the COVID pandemic, university life for
freshmen may be very tough as it's hard to meet people. However, in this module,
especially during the mBot project, you can meet, talk with, collaborate with
and befriend a lot of people *face to face*. If you're reading this long after
the pandemic, probably you won't find it very important, but this module is a
massive chance for me to form early relationships in university, and I value
that a lot.

## Notable events

### Online versus offline

Since I'm an international student and it was during the pandemic, I was
required to quarantine for 2 weeks (SHN) on arrival to Singapore. Then another
1-week quarantine (LOA) was imposed by NUS. Cross-border traveling was also
very complicated, so basically I couldn't take offline lessons until Week 5.

CG1111A is a heavily lab-based module, so it makes sense I couldn't take it
properly in the first half. No labs, no circuit constructing experiences &ndash;
I was legit thinking about S/U-ing at the time. However we were allowed to take
the Zoom sessions of the lab instead, so knowledge-wise I wasn't behind by much.
In fact since I only had the theoretical stuff to care about, I could finish
the content of a 3-hour lab within 1 hour, and could actually do very well in
studio reports and Quiz 1.

So that brought me to a question of whether I should really attend the labs
physically. If I continued remote learning, I could still study well and get
good grades, I would only miss out on real life experiments. It would take me
another two weeks and a couple of emails with Prof to finally make my mind up
and start offline learning.

Luckily, somehow a reading week popped out of nowhere at the exact time I was
starting face-to-face labs, so I spent that whole week to reproduce all
experiments I had missed (provided they're safe enough to be conducted at home
unsupervised of course). So, thanks to that unexpected fortunate event, I could
still catch up with my classmates about the breadboard thing when I came to the
lab.

### Project disaster

Anyone who have taken CG1111A before would probably tell that the project was
one of the most memorable moments of the whole module. The project, taking a
whooping 50% of the module's grade, can be considered the first major project
in computer engineering at NUS. It's also very memorable for me too personally,
but not for a good reason. It was an absolutely horrible disaster for my group.

Things actually went well at first. We actually had good progress and pace, and
during the final studio the mBot could solve a sample maze very well (with one
or two bumps here and there, though). That's probably one of the reasons why we
were pretty confident, probably a bit over-confident, before the final
evaluation. It was costly.

During the actual evaluation, after solving two colour challenges successfully,
the mBot mysteriously considered everything else as white, so every time the
mBot got to a colour challenge, it considered it the end of the maze. It was
really puzzling how the mBot could work very well during the first part of the
maze (turning perfectly, always keeping at centerline), yet failed so miserably
in the rest.

Since we couldn't solve more than half of the challenges, we were allowed a
second attempt. But since we couldn't find a true cause, it wasn't better &ndash;
in fact it was worse. We would consider incorrect colour calibration to be the
cause, performed a bunch of recalibration, only to get very unpredictable and
weird results at times. And the retry was even worse than the first try: we
could only solve one challenge! Absolutely horrible for a team who was talking
and laughing all the way just two hours before that.

A TA had a look and considered the problem to probably be a short circuit in
the light-dependent resistor (LDR). He said that probably at the start of the
maze, the circuit was working well, but after one or two turns, the LDR got
shifted a bit and might have touched some wires it shouldn't have. If that's the
case, then it's really a trivial yet devastating problem.

I would never see the mBot another time, and being in an expectedly bad mood at
the time, I didn't even want to look to see what was wrong anymore &ndash; I was
just absolutely tired and utterly destroyed. The TA also said "probably", so
the true cause of it was never found. But the short circuit was the most
sensible explanation, so I will take that. Probably from now on, as I build
things, I will never allow myself to forget to check for short circuits.
