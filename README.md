# Cookingdom

Cookingdom is a web app that will help you manage your food inventory at home and search for recipes based on your available ingredients.

## About the project

Initially Cookingdom was supposed to be a personal tool to help me find what I was going to cook for dinner, without having to go through hundreds of recipes suggesting me to use ingredients I've never heard of. I then decided it could be good learning base for an Angular project and would serve as my introduction to the ever growing ecosystem of web development.

## Requirements

To locally build and run an Angular project, you will have to setup the development environements which requires the Angular CLI and a compatible Node.js version.

First follow the instructions on [nodejs.org](https://nodejs.org/en/download/) to install Node.js on your operating system.

You can then use the npm package manager that comes with Node.js to install the Angular CLI.

`npm install -g @angular/cli`

This project was first generated using [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19 and has been update overtime to 10.0.4.

## Clone the repository

`git clone https://github.com/ordy/cookingdom`

Instructions if you need to install git: [git-scm](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Building the project

In your cookingdom directory, run:

`ng build`

This will fetch all the dependencies from package.json and build the files to run the application.

Use `ng build --prod --build-optimizer` to generate a production build.

## Run a development server

Run `ng serve` to run the app on a local dev server. Then navigate to `http://localhost:4200/` to load the app. The page will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Make sure to set `autoWatch: false, singleRun: true` in karma.conf.js if you are going to run the tests on a Continous Itergration service.

## Development notes

### Firestore structure and reads limitation

### Firebase structure and systemstore (local cache), why

### Login service

### Firestore environments config and security rules

# Heroku
