# Team20: Study With Me
## Members:
1. Yifei Tang
2. Zhouyu Huang
3. Chen Liang
4. Hai Li

## How to use our App
### user
1. Sign in / Sign up. When users sign up, they need to fill a form with their basic information like school, major, gender, username and etc. After they click the "Sign up" button, there is a pop-up that let user to choose their avatar.
2. Then user will enter our home page. There are many cards in the recommendation part. These cards are other users of our app with their basic information. When we click "profile" button, there is a pop-up with more specific information about that user. In this pop-up, there is a button to send friend request if user want to make friend with this person. The friend request will be shown and choose to accept or denied on the yellow bell in the right top part of our app.
3. In the home page, there is a input text area that user can search person by major and school. After searching, the recommendation part will only show people that are involved. If user want to come back to original recommendation, they only need to clear the input text area and press "enter" button.
4. User can go to Post page to see their own posts and their friends' posts. The left part of post page have several button to change the content in the right part to all posts(inculde user and his friends), my posts(only user), friends posts(only friends). Below these button, there are users' friends list which can be clicked to change content to only that friend's posts. Above posts, there are a button that user can make new post and a button that user can choose the order of shown posts.
5. If user have friends, they can go to message page and have conversation with their friends. If user do not have any friends, the message will show a remind that you do not have friends and a link to the home page.
6. Every pages have the same header, left side of header are three buttons that let user to switch among home page, posts page and message page. The right side part includes a yellow bell which let user accept or deny the friend request. There is also a "Setting" button that has two choices: MyAccount and Logout. MyAccount can show a editable pop-up about user's information. Logout can redirect to signin page.


### admin
1. There are two tabs: Users and Data
2. Users: user's tab includes a table that contains all the users with information: avatar, username, email, school, major and created at (the date that the account is created). A button also included for view the corresponding account's all information and modify users information. Also, admin could delete the users account from the database.
3. Data: The data tab is doing the data visualization job. The two pie charts shows the percentage and the number of user's school distribution and users' major distribution. This data visualization is using Chart.js library. 

## Overview of the routes
### user
1. post http://localhost:5000/api/users/
   req body inculdes firstname, lastname, school, email, password, username, gender, major, avatar.
   usage: add user to database
2. get http://localhost:5000/api/users/all
   usage: get all users from database
3. put http://localhost:5000/api/users/user?:id
   usage: 
4. delete http://localhost:5000/api/users/user?:id
   usage: delete user by id
5. get http://localhost:5000/api/users/home
   usage: to get all users for home page
6. post http://localhost:5000/api/users/friend?:id
   usage:
7. post http://localhost:5000/api/users/resfriend?:id
   usage
### post
1. get http://localhost:5000/api/posts/
   usage: get all posts
2. post  http://localhost:5000/api/posts/add
   req body: name, text, createdAt, avatar
   usage: add a post to database
3. get  http://localhost:5000/api/posts/:id
   req param: id
   usage: get a post
4. get http://localhost:5000/api/posts/:id/allComment
   usage: get all comments of that post
5. post http://localhost:5000/api/posts/:id/allComment
### chat

### auth

## Deployed URL
https://csc309-team20-client.herokuapp.com/
https://csc309team20--server.herokuapp.com/