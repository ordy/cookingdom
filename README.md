# Cookingdom

![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/ordy/cookingdom/dev/@angular/cli?color=%2308f&label=Angular&logo=angular) ![GitHub deployments](https://img.shields.io/github/deployments/ordy/cookingdom/production?label=vercel&logo=vercel)

Cookingdom is a web app that will help you manage your food inventory at home and search for recipes based on your available ingredients.

[Cookingdom Demo](https://cookingdom-demo.vercel.app)

## About the project

Initially Cookingdom was supposed to be a personal tool to help me find what I was going to cook for dinner, without having to go through hundreds of recipes suggesting me to use ingredients I've never heard of. I then decided it could be good learning base for an Angular project and would serve as my introduction to the ever growing ecosystem of web development.

# Angular

> To use the application and have an access to the database, new users will have to create an account or use a Google/Facebook account.

![cookingdom login form](https://github.com/ordy/github-assets/blob/master/cookingdom/capture_004.jpg?raw=true)

> They will then be asked to choose a username (required) before getting redirected to the home page.

![cookingdom homepage](https://github.com/ordy/github-assets/blob/master/cookingdom/capture_005.jpg?raw=true)

> The web app comes with three main components. A search bar to add new ingredients to the user's respective inventory, a list of available recipes based on the available ingredients in the current inventory and an inventory manager to edit or remove ingredients.

#### Ingredients search

![ingredients search](https://github.com/ordy/github-assets/blob/master/cookingdom/capture_001.jpg?raw=true)

#### Available recipes

![available recipes](https://github.com/ordy/github-assets/blob/master/cookingdom/capture_002.jpg?raw=true)

#### Ingredients inventory

![ingredients inventory](https://github.com/ordy/github-assets/blob/master/cookingdom/capture_003.jpg?raw=true)

## Requirements

To locally build and run an Angular project, you will have to setup the development environements which requires the Angular CLI and a compatible Node.js version.

First follow the instructions on [nodejs.org](https://nodejs.org/en/download/) to install Node.js on your operating system.

You can then use the npm package manager that comes with Node.js to install the Angular CLI.

`npm install -g @angular/cli`

This project was first generated using [Angular CLI](https://github.com/angular/angular-cli) version

8.3.19

and has been update overtime to

![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/ordy/cookingdom/dev/@angular/cli?color=%233C434D&label=%20)

## Clone the repository

`git clone https://github.com/ordy/cookingdom`

Instructions if you need to install git: [git-scm](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Building the project

In your cookingdom directory, run:

`ng build`

This will fetch all the dependencies from package.json and build the files to run the application.

## Run a development server

Run `ng serve` to run the app on a local dev server. Then navigate to `http://localhost:4200/` to load the app. The page will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Karma has been configured to run the test using Firefox as a test broswer, but feel free to edit `karma.conf.js` to use a different browser.

Make sure to set `autoWatch: false, singleRun: true` in karma.conf.js if you are going to run the tests on a Continous Itergration service.
