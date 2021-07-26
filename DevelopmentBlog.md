# Dev Blog

Hello, I am working on a MUD (Multi User Dungeon). It's a text-based online
multi player adventure game. Players can work alone or as part of a group to go
on grand adventures, epic quests, grind out skills or work together to acheive
something entirelly new.

## Player Accounts (Monday 26th July 2020)

This is a pretty big one. I'm writing this part ahead of doing any of the
development work. The main challenges here will be differentiating between user
inputs for an authenticated vs non-authenticated account and follong diverging
code paths. I want to make sure that whatever I end up implementing won't have
too dramatic of an impact on the way that the code works. It needs to be simple
and maintainable after all. In the past, as part of previous projects, I have
tried implementing this as a series of rooms that have custom behaviour. On the
whole, the system does work. But it's really clumsy. It's also a strange user
experience. For now, I plan to go with a more traditional approach.

One of my considerations is to ensure that the authentication is kept seperate
from the user interface. This is mainly because I want to have different methods
of authentication in the future. I'd really like to explore the option of a
magic link in the future for example where a QR code is rendered to the user and
they can scan it with their phone to login.

## System Logging (Saturday 24th July 2020)

Not a significant amout of development going on over the weekend but I managed
to add some logging to the system. Log coverage is a little sparse at the moment
but that's not really an issue with the system in such a large state of flux.
I went with Pino for logging. I usually would go with Winston, but felt that
this project would be a good opportunity to try out something a little
different. At the moment, i'm not completely sure if Pino is the right choice or
not, on paper, it should be totally fine though. I'll just have to wait and see.

I previously activated CodeQL on the project in Github. It scans all Pull
Requests and the develop branch for security vulnerabilities. When I first
activated this, it flagged a potential security risk with the command execution
code. I did implement a fix that would mitigate the issue however the analysis
tool did not seem to recognise the fix I put in place. At the time I tested to
make sure the vulnerability was patched and added a comment block to the code.
Finally, I told Github it was mistaken and ignored the warning.

When Adding logging code, I changed the system sufficiently enough that my
acknowledgement was no longer honoured and it began to re-flag the false error.
To get around this, I re-implemented the entire commandFactory. This actually
turned out to be a good thing as the new solution is a lot nicer. It will give
me a lot more control going forward over the way that commands work.


## Getting Testy & Daos (Wednesday 21st July 2021)

In implementing the unit tests for the player model, i've refactored the way the
command factory reaches the player model. Previously, the application would
directly import the factory, however this made unit testing quite difficult as
it's hard to stub the imported code. I instead opted to pass the factory object
through the application. This is possibly a little over kill but it would offer
me some interesting possibilities in the future. Having access to the list of
all commands may actually end up being quite useful. As an absolute minimum
example, the help command (which lists all commands) would be ale to use the
list directly.

I've started implementing the Rooms feature now. Room isn't a great name for
this, it's technically a representation of an area that multiple players can
occupy at any one time. A room could be a broom cupboard, or it could be a vast
desert. The word room does seem to be pretty standard amongst the MUD community
though, so for now at least, it's what i'm going with. If a better name comes up
in the future, i'll consider a rename.

Rooms also represent the first instance where something in this game has some
form of data. A noom nust at least have a name and a description. There will be
many more properties in the future, but we don't need to worry about thise at
the moment. Because rooms have data, we need some way of storing that data and
interacting with it. For the time being, rooms will be stored in-repo as a part
of the codebase. They may be broken out in the future, but the name of the game
here is to keep things simple.

Introducing the DAO pattern. DAO's (Data Access Object) provide us with an
interface to our data. They act as a separation between our business logic and
the data itself. This approach makes it incredibly simple to move our data at a
later date without needing to worry about breaking functionality. As long as the
interface that the DAO excposes remains the same, all ofther parts of the
codebase will contnue to function as normal. This use of Typescript in the
project will copmpound this pattern as the strict type checking will alert us to
any possible issues while developing as interfaces will no longer match up to
our expectations if we do end up chaging the interface.

My other main acheivement for today is to add in player movement. It is now
possible to navigate in 3d space as long as the rooms are mapped out correctly.
With the system implemented, it should theoretically be possible to create any
environment. The maion drawback to the current implementation is that there can
only be a single exit in each of the cardinal directions. In small spaces, such
as the inside of a building, it may be necessary to have mopre than one exit in
a single direction. I actually encounterd this when I was working on adding my
own house as an environment for development. I chose to comprimise by moving the
layout of the house around a little to accomodate but i'd like to re-visit this
in the future.

## Command Parsing (Tuesday 20th July 2021)

As the title suggests, the main effort today was in adding command parsing
capabilities. I've implemented a system that should make it pretty easy to add
more features over time. Commands essentially get the playerModel when the
command is executed. The code can access the Game instance from the player
object, because of this, we have the ability to perform actions not only on the
player, but on the entire game if we wish.

Implementing this feature required a fair bit of additional development work
too. I had to add the concept of a `player` to begin with. Up until now, there
has only been the connection. However, it's vital that the connection code is
kept doing just that, connections. By abstracting everything out, it leavs us
open int he future to add additional connection layers without having to
re-architect out codebase. It's one of those situations where it seems like
un-necessary effort at the beginning but as the codebase matures, it'll be clear
that this was the right choice. I speak from industry experience here so I'm
very confident of this.

As per the instructions of the github issue tied to this feature, I have
implemented the command `playerCount`. It's very likely that this will be
removed before the game goes live but it's a really useful command for testing /
demonstrating the capabilities of the command system. The command itself is
really quite simple. It calls into the game instance and fetches a list of
authenticated players. The command then performs a count of the length of the
array and boom.

Something else I added as part of my development was code coverage to the test
suite. Coverage is incredibly useful in development, it's easy to get false
positives, but when used properly it helps a lot to find gaps in test coverage.
I'm having some trouble with it though. My current set up is lifted from
previous projects that used javascript. After some time with Google I manage to
get it to understand typescript files, but it's not providing coverage for the
entire codebase, only the files that are included by the testing environment. I
gave up after around 30 mins of struggling with this, choosing instead to focus
on implementing the feature. I still have some tests to write to cover the
development work done so far, but the feature is largely done.

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
