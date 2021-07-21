# OpenMud

OpenMud is a freely available and fully open source text-based MMO game. It's a
passion project of mine and something that I intend to do to keep me entertained
in my spare time. I have some pretty grand ideas for how I'd like to develop
this game, but at first I will be starting small. During development, I will do
my best to keep a development blog outlining what my plans are and how I
approach problems.

## Development

### Getting Started

Running the application:

1. Clone Repo
2. Install deps `npm i`
3. run `npm start`

Running tests:

`npn test` to run once. `npm run watch:test` to run the tests on save.

### Branches

The main branch for the repository is `develop`. All branches for feature work
are to be created from `develop` and merged back to `develop`. the `main` branch
is to represent the production environment.

### Comments in code

There are somme pretty strong opinions on either side of the fence when it comes
to comments in codebases. In my opinion, they are incredibly important. Comments
exist to provide context to code where it otherwise doesn't exist or isn't
clear. Comments should always be added wherever it is importnat to explain why a
piece of code works in a particular way, they should not describe what the code
is doing.

As a general rule of thumb, you should always assume that whoever is reading
your code (including yourself in 6 months when you've forgotten all about it)
knows how to code and understands what the code is doing. Your comments should
explain **why** it's done in that particular way.

The main exception to this rule is when adding comments to abstractions, such as
functions or classes. Comments in these situations acts like documentation to
your code. It describes to another programmer what your function does and how to
use it.

## World Building

I am not a writer, nor am I a world builder. It's very likely that the world I
build for this game will be un-inspired and a littel cliché. That being said,
i'll always do my best; hopefully along the way i'll get the attention of some
passionate world-builders who want to help me out in my endeavour.