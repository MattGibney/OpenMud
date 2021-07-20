# Dev Blog

Hello, I am working on a MUD (Multi User Dungeon). It's a text-based online
multi player adventure game. Players can work alone or as part of a group to go
on grand adventures, epic quests, grind out skills or work together to acheive
something entirelly new.

## Development work begins (Monday 19th July 2021)

I've started development now. The primary focus to begin with is to get
something that's functional. It isn't going to be amazing by any standards but
it is a starting point. The primary focus with development right now is to
define clear interfaces. For example, I have implemented the telnet connection
support, I did this in a way that abstracts the connection from the game logic.
It would be trivial to switch out the telnet connection for something else. It
should also be possible to run multiple connection servers at the same time,
allowing players with different connections to share the same game server.

I don't feel like there is too much to talk about yet. It's mostly just been
busy work. A lot of the configs are pulled directly from other projects I've
worked on in the past. This is going to one of my first big projecvts using
Typescript. Until now, I have mostly focused on pure NodeJs. Why switch to
Typescript now? I won't lie, a considerable chunk of it is me jumping on the
bandwagon. JSDoc and VS Code already game me a pretty decent way of typing my
codebase and caught a heck of a lot of bugs before they became problems.
Typescript is nice becaue it's actually scrict about this, but other than that,
I haven't rteally come across a reason to use it.

It would probably be a good idea to talk very briefly about the addition of a
file called `modelFactory.ts`. As the name may suggest, it's a factory for
models. I think that the factory pattern is particularly strong, it has served
me well over the years and makes writing testable code much easier. This
particular factory is incredibly simple. It doesn't really do anything, I could
just as easily import the models directly if I wanted to. The main benefit to
using a factory is that I avoid the circular dependancy issue where in the
future, I could have models requiring each other in an edless loop. It's caught
me out before. As I've already said, it also makes testing a lot easier.

The Factory pattern will be very powerful over time, especially as the
application gains complexity. I'll save more specific descriptions for either in
code documentation or a future blog post.

## Introduction (Friday 16th July 2021)

Honestly, I have no idea at this point how many times I have started to work on
a project like this. I really want to make a MUD but I really don't know what
the best way is to approach this from. I've had a go at some of the traditional
telnet based approaches. I've tried websockets and fancy browser UIs. The issue
has never really been in getting the technology to work, that's easy. I have
always struggled to get the feeling right.

Ultimately, whatever game I make, it's never going to be played by a lot of
people. Text-based games are already a really niche area and there are plenty of
big games that have been around for a really long time with decades of content.
No, these projects have always been about me experimenting with new ways of
approaching the problem and all have had the pros and cons. I'd happily write
something in the future describing my different approaches if there is interest,
so let me know.

So what about this project? Why am I making this one? What is the goal? As
stated above, my promary motivation has historically been about the technology.
I had an idea and wanted to know how it would work. This time is different. This
time, I want to actually make a game. I want to produce something that can
actually be played and enjoyed. I don't really have a grand vision for a game at
the moment, I don't even have a theme. All I really have at this point is a
desire to create something that's fun to play for myself, and hopefully others
too.

One thing that I feel sets this game apart from many others is that I will be
keeping 100% of the game open source. The code will be freely available forever.
I have no intention of ever making any money from this project, it's strictly a
passion project. By being open source, I hope that other developers can find my
implementation of features interesting. I will also be heavily encouraging
players to make improvements or bug fixes to the code if they feel comfortable
doing so.

To begin with, I will be working on what I consider to be a minimum viable
product. The features will be incredibly limited, but they will be a good
starting point for me to build from. I have created a series of "issues" within
Github to represent the required development work for this MVP
[Milestone](https://github.com/Moppler/OpenMud/milestone/1).
