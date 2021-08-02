# Dev Blog

Hello, I am working on a MUD (Multi User Dungeon). It's a text-based online
multi player adventure game. Players can work alone or as part of a group to go
on grand adventures, epic quests, grind out skills or work together to acheive
something entirelly new.

## Migration to NX (Sunday 1st August 2021)

I have decided to migrate the application to use the NX.dev workspace
environemnt. This is largely about future proofing at the moment and the vast
majority of the perceived benefits that come from such a migration are not used
at the moment. This mover however signifies my continued efforts to make this
into a project that I can get stuck into for a long time to come. I will likely
start to build additiona conponents into this repository over the coming weeks.
The first of which is probably going to be a browser based UI.

The migration process was pretty painless. The migration guide on the NX website
only really mentions Angular or React migration, but the process was pretty
painless. I began by creating a new NX workspace in a sub folder. I then moved
files into a new application within the workspace. When moving files, I was sure
to use the `git mv` command so that commit history was retained. It wouldn't be
very fun if I lost my commit history on the files I've been workin on so far.

The only casualty from the migration was the tests. NX uses Jest for it's
testing, mocking and assertions. I was previously using a combination of Mocha,
Sinon, and Chai. I have migrated tests in the past, there is even a handy
codemod these days to auto migrate the tests. I chose not to do this however. I
have just completed a fairly major refactor of the entire codebase and a large
number of the tests were broken anyway. This is a good opportunity to go through
the application again and ensure that there is adequate coverage. This will also
give me a great chance to go through the code an ensure that ther is adequate
logging and documentation. (I know there isn't, so it'll be good to get that
sorted).

## Some more thoughts on the screens concept (Sunday 1st August 2021)

I have finally completed my work to introduce the concept of screens. This is
mainly used right now for the authentication part, where the user is guided
through a series of steps to provide enough information to initiate
authentication. The system works, especially for the simple interface over a
telnet client. I am starting to think however that perhaps the screens
themselves should be a part of the telnet client, rather than an integral part
of the engine. For now, i'll leave things as they are, but as I start to explore
alternative user interfaces, such as a web or mobile client, I'll probably need
to take another look at this and see if I want to re-think it yet again.

## Authentication (Saturday 31st July 2021)

Work is underway for adding authentication to the game. I haven't had as much
time to work on this as I would have liked recently but it's given me a chance
to think over this a fair bit at least. I am still pretty sure that there are
going to be a few more large refactors over the next couple of feature additions
but I do feel like i am slowly getting toward the point where the codebase is
logical and extensible. My biggest trap to avoid now is making the code too
generic; After all, i am don't intend this codebase to be an engine that is used
to make games, in stead it is meant to be a game itself. I am certain that this
could be broken up into an engine and some game logic, but that can come later.
For now the main focus will continue to be the desire to create a game that is
fun to play.

I have begun talks with a possible partner to work on game design for this. I
will happily admit that for me, this project is much more about building the
game rather than having something to play at the end. This fact, combined with
the fact that I have no experience in game design means that the end product is
very likely to be pretty terrible. As such, I feel like partnering up with a
game designer will be a really good idea to make sure that this game is
something fun to play once all is said and done. I don't yet know if things will
work out with this person but I am hopeful. If things don't work out with this
person, i'll start looking again for someone else to help me out with this
project.

## Screens (Thursday 29th July 2021)

I've begun the process of introducing the concept of screens. The basic idea
behind this is to work in a similar way to routes in a more traditional web app.
We effectively establish a context to work in, a screen, and then process
commands within that context. Screens allow us to have context specific commands
and functionality. As I write this, the code is in a pretty big mess with a fair
amount of hacking to make things work, but that's all part of the development
process.

Up until now, commands have been running in the context of a player, but this
isn't always the case. The first think that a user will do when connecting is
either register an account or login to an existing one. Until this has happened,
there isn't a player at all. I would have benefited from thinking a little more
about this before I began initial development, but that's ok. This is all part
of the fun after all. I'm pretty confident that almost all of my tests will need
to be re-written though, oh well.

## Player Accounts (Monday 26th July 2021)

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

## System Logging (Saturday 24th July 2021)

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
