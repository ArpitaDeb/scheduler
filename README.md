# Interview Scheduler
![schedulerapp_feature.gif]
(https://github.com/ArpitaDeb/scheduler/blob/master/docs/schedulerapp_feature.gif?raw=true)
- Animated Gif of the functional scheduler app i.e. booking or cancelling an Interview, editing an appointment, and spots remaining feature.
![error_save.png]
(https://github.com/ArpitaDeb/scheduler/blob/master/docs/error_save.png?raw=true)
- whenever we receive an error from the server, error_save and error_delete mode is displayed respectively.
![error_delete.png]
(https://github.com/ArpitaDeb/scheduler/blob/master/docs/error_delete.png?raw=true)

## Project Description
- Interview Scheduler development focuses on a single page application (SPA) and built using React and latest tech stacks. Data is persisted by the API server using a PostgreSQL database.
- The state is managed using custom and built in hooks. The client application communicates with an API server over HTTP, using the axios (JSON format).
- Jest and Cypress tests are used through the development of the project.

## Behavioural Features
- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Project Stack

__Front-End:__ React, Axios, JSX, HTML, SASS, JavaScript

__Back-End:__ Express, Node.js, PostgreSQL

__Testing:__ Storybook, Webpack Dev Server, Jest, Cypress

## Dependencies
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts
## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```
## Running Jest Test Framework

```sh
npm test
```
## Running Storybook Visual Testbed

```sh
npm run storybook
```
