![](http://i.imgur.com/XFAzEuc.png)

## Installation

- Install NodeJS (LTS is preferred).
- `yarn` to install packages.
- `yarn start` to serve & bundle in local environment with HMR & Hot Reload.
- Browse to `localhost:5000`.

## Commands

- `yarn start:dev` to serve & bundle in development environment.
- `yarn run build` to bundle in development environment with source-map and non-minified files.
- `yarn run build:prod` to bundle in production environment with minified files (gzip is available).
- `yarn run slate` to remove and reinstall node_modules.

## Challenge Technologies
- React (View layer)
- Redux (State management)
- Lodash (Utils)
- Webpack (Bundling)
- Babel (ES6 Support)
- AntDesign (FrontEnd React Framework)

## Challenge Comments
- The app is responsive on the desktops screens only, Mobile support need to be added.
- It will be huge pain with large datasets, since there should be paging and server-side filters.
- The app doesn't have unit testing code to test the methods like `getDaysRange`.
- It will be nice to add UI testing with StoryBooks
- Challenge actual time estimate: 8~9 hours.

## Developer Challenge

Using the following endpoint : https://api.myjson.com/bins/tl0bp

Build an application to search and list hotels:

![Mock](http://res.cloudinary.com/divwiclgn/image/upload/v1501594231/code-assessment-mock_lauryh.png)

## Requirements and Output

- User select the date range to search hotels
- Display all hotels whose availability dates lies between the search dates.
- Display the total number of nights based on selected date range. (For example if user search from Aug 12, 2017 to Aug 17, 2017 than Total Number of Nights will be 5.)
- Display hotel price based on number of nights. (Price x Number of Nights)

### Features

- User is able to sort based on hotel name and price
- User is able to filter based on hotel name and price


## Conditions
- You should consume the api endpoint mention and not use it as internal json file
- You should build this application in ECMAScript 6 or later, you are free to use any javascript framework.


## What we are looking for

- **Simple, clear, readable code** How well structured it is? Clear separation of concerns? Can anyone just look at it and get the idea to
what is being done? Does it follow any standards?
- **Correctness** Does the application do what it promises? Can we find bugs or trivial flaws?
- **Memory efficiency** How will it behave in case of large datasets?
- **Testing** How well tested your application is? Can you give some metrics?


## Questions & Delivery

If you have any questions to this challenge, please do reach out to us.

The challenge should be delivered as a link to a public git repository (github.com or bitbucket.com are preferred).

## Checklist

Before submitting, make sure that your program

- [ ] Code accompanies the Unit Tests
- [x] Usage is clearly mentioned in the README file
- [x] Uses the endpoint directly

## Note

Implementations focusing on **quality over feature completeness** will be highly appreciated,  don’t feel compelled to implement everything and even if you are not able to complete the challenge, please do submit it anyways.
