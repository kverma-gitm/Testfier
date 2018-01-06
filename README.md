# Testifier- Online test taking system
 

### Admin Account Requirements
    ```
Just Create an account with username Admin.
    ```
## Features

```
    
    1). User Management System -
    
            a) User can sign up using Email, Gmail and Facebook.
            b) User can login to the system through email and password combination or using Gmail/Facebook
            c) Forgot password functionality to reset password.
            
    2). User Testing management system -
    
            a) Once the user logs into the system, He will  see a dashboard containing the statistics of all tests he has taken. The statistics may include the number of tests taken, average score and percentage growth etc.
            b) Dashboard also contains the lists of tests.
            c) There is a “take a test” option in menu from which user can go to test taking page.
            d) On test taking page, user can see a list of tests he can appear for along with a button to start that test.

   3).  User test taking system -
   
              a) Once user starts the test, he will first see an instructions screen containing. It  also contains the rules of the test.
              b) Once the user reads the instructions and accepts the rules (single accept button), The test timer will start and the screen should display the test questions and options associated with it.
              c) User can choose only one option as answer for every question.
              d) The test  have a time limit. The test window will automatically close once the timeout occurs irrespective of how many questions have been answered. The system  submits the answers automatically.
              e) If the user completes the test before the time ends, he can see submit window which will submit his all answers. In case of timeouts, this window appear automatically.
              f) The system  keeps a track of how much time a user is taking for answering each question.
              g) On submission of test, shows the result to User.

    4).Test listing Admin -
    
            a) Admin can create tests in the system
            b) Each test will have a set of questions, each question containing at least 4 options and overall time limit of the test.
            c) Admin can  create, edit, delete and view any tests, question or option.
            d) While creating options for any question, admin can  set a correct answer. This answer (flag) will actually help in automating the test evaluation process.

    5).User analytics in admin
    
          a) Admin can view details of users registered in the system
          b) Admin can view overall performance of the user in all his tests.

 ```

## Prerequisites

Git

NodeJs

NPM

MongoDB

## Running

  running mongodb:
```
    1). Open Command Prompt and change directory to where mongodb is installed in bin folder.
    2). then type mongod in command prompt 
    3). press enter database server will start.
```
  unzipping and installing dependencies:
```
    1). Unzip the downloaded file.
    2). Open the extracted folder.
    3). Type Command : npm install and press enter. This will install all dependencies shown in package.json file.
    4). If terminal says can't find module then install other dependencies using npm install 'dependency name' command
    note:dependency name is the name of dependency prompt by terminal
```
  running project:
```
    Install all dependencies by : npm install, Then go to server folder and run node app.js


```
## Built With

OS : Windows 10

API Tool : Postman

Editor : SubmileText

Frontend Technologies allowed - HTML 5, CSS, Javascript , Jquery and AngularJS

Backend Technologies allowed - NodeJs, ExpressJS, MongoDB


##
