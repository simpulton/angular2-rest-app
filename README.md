# RESTful Angular 2 application

A RESTful master-detail application built using Angular 2.

## Prerequisites
You will need to have [Git](https://git-scm.com/) and [Node.js + NPM](http://nodejs.org) installed on your machine. You will also need to install the `typings` NPM package globally via `npm i -g typings`.

## Getting Started

There are two main parts to this application. The first is the server, for which we are using `json-server` to simulate a REST api. The second part is the Angular 2 application which we will use `webpack-dev-server` to display.  

To get started run the commands below.

```
# Download the code
$ git clone https://github.com/simpulton/angular2-rest-app.git
$ cd angular2-rest-app

# Install dependencies
$ npm i

# Install typescript definitions
$ typings install

# Build the app
$ npm start
```

Then navigate to [http://localhost:3001](http://localhost:3001) in your browser.
