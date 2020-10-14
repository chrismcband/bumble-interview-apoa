# Bumble twitter test

Completed the following test:

## Task

### Goal

Build an auto-updating twitter-like feed.

### Feature Requirements

I want to run an auto-updating twitter like feed. Here is a rough mockup of the expected UI. 

![Mock-up](https://www.dropbox.com/s/v597kaxjhr9rhh4/twitter-interview-feed.png?dl=0)
 
1.	The app should show the latest tweets after the first request
2.	The list of tweets should update automatically every two seconds
3.	The older tweets must be pushed down in the page
4.	The newer tweets should come at the top
5.	There should be no duplicate tweets on the page
6.	There should be no skipped or missed tweets on the page
7.	In case of any failure conditions the tweet updates can pause or stop, but no error messages should be shown to the user.

### API Specification

We have a virtual twitter server hosted on - bumble-twitter-interview.herokuapp.com/apoa-falby
API Info
1.	There are several API endpoints at your disposal. You have to pick the most suitable one for your architecture decisions.
2.	The API returns a JSON response and supports CORS
3.	The JSON response contains the username, id, time stamp, image and text
4.	The tweets will max out after 10,000 entries. After which you need to reset the database.
5.	The API is designed to fail randomly with HTTP 500 and you must handle this in your code. If it fails just try to fetch the updates again.
6.	The server responses are always sorted with latest id on top
7.	The API parameter count is optional (defaults to 20) and can be between 1 and 50
API Endpoints
1.	/api?count=X
Returns the latest X tweets
2.	/api?count=X&afterId=ID
Returns X tweets created after the id ID
3.	/api?count=X&beforeId=ID
Returns X tweets created before the id ID
4.	/api?count=X&id=ID&direction=(-1 OR 1)
Returns X tweets with the ID and the direction in time (-1 for past, 1 for future)
5.	/api?count=X&afterTime=TS
Returns X tweets created after the timestamp TS
6.	/api?count=X&beforeTime=TS
Returns X tweets created before the timestamp TS
7.	/api?count=X&time=TS&direction=(-1 OR 1)
Returns X tweets with timestamp TS  and the direction in time (-1 for past, 1 for future)
8.	/reset
This resets the database back to 100 entries. You can use it for your testing purposes.

## Completed list of functionality

1. Twitter feed UI
2. Fetch 20 latest tweets on load
3. Handle errors
4. Fetch latest tweets every 2 seconds (update one at a time so the feed doesn't jump too much)
5. Reset database and twitter feed when it maxes out (10,000 tweets)

## Create-React-App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br/>

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. <br/>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. <br/>
You will also see any lint errors in the console.

