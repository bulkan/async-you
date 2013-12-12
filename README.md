# async-you

**I see you**

[![NPM](https://nodei.co/npm/async-you.png?downloads=true&stars=true)](https://nodei.co/npm/async-you/) [![NPM](https://nodei.co/npm-dl/async-you.png?months=3)](https://nodei.co/npm/async-you/)

## Introduction

Learn to use the popular package [async](https://github.com/caolan/async) via this interactive workshop.

Hopefully by the end this workshop you will understand the main functions that _async_ provides.

## Installation

1. Install [Node.js](http://nodejs.org/)
2. Run `sudo npm install async-you -g`
3. Run `async_you`

## Usage

#### 1. Selecting a problem to work on

Once the workshop is installed, run `async_you` to print a menu
where you can select a problem to work on.

```
$ async_you
```

Problems are listed in rough order of difficulty. You are advised to complete them in order, as later problems
will build on skills developed by solving previous problems.

#### 2. Writing your solution

Once you have selected a problem, the workshop will remember which problem you are working on. 
Using your preferred editor, simply create a file to write your solution in.

#### 3. Testing your solution

Use the workshop's `run` command to point the workshop at your solution file. Your solution will loaded 
and passed the problem input. This usually won't perform any validation, it will only show the program output.

```
$ async_you run mysolution.js
```
 
#### 4. Verifying your solution

Your solution will be verified against the output of the 'official' solution. 
If all of the output matches, then you have successfully solved the problem!

```
$ async_you verify mysolution.js
```

## Stuck?

Feedback and critisism is welcome, please log your troubles in [issues](https://github.com/bulkan/async-you).

## Resources

## Thanks rvagg

This tutorial was built using rvagg's [workshopper](https://github.com/rvagg/workshopper) framework.

## Licence
MIT
