# Team20: Study With Me
## Members:
1. Yifei Tang
2. Zhouyu Huang
3. Chen Liang
4. Hai Li

## Description
We made an app to help college students to find study buddies to study together, considering that college classes are no longer like in high school, where the class is small and everyone knows each other. 

Aside to finding study buddies, we are also providing a platform where you can find private tutors to help you with your questions in classes.

## Usage
Assume that you have yarn installed, if you don't, install yarn first.
```
yarn install
yarn run dev-server
```
Then see the output URL in the terminal: `localhost:xxxx`.

## Sign In
In the Sign In page should register as a new user, if you don't have an account already. Switch to Sign Up page at the bottom link. You can use "admin" in email input text area and password "admin" to log in Admin page.

## Admin
In the Admin page, there are one table to show all the users and their information which can be modified and delete. There are also a data graphically display page which includes user school distribution, user major distribution, number of new posts, number of new users and number of tutoring service.

## Header
In all pages expect Admin page, there are a header which can switch among home, posts, tutor, message page. There are also a setting button which have two dropdown button. One can display the information of user account and it is editable. The other one is to log out and switch to SignIn page. 
## Home
Here is the page where you find your own matches of study buddies. However, you need to answer a few questions so we can get better matches for you.

Then checkout a few matches by clicking on their profile button, and add some new friends.

## Tutor
The users can get private tutors on this page. Search the tutor by name or by course number. Talk to them before deciding you want this service, because this is a "paid" service, even though by virtual money.

## Posts
Post anything you like on the timeline will let your friends know you better. This is just like Twitter, but a minimal version. User can sort the post by its date, likes number and comments number.

## Message
In this page you can talk to your friends. Click on the "send" button, and send your message. Also you may talk to your tutors here.

## Call to Servers


### Sign In
1. Verify user account and password.

### Sign up
1. Collect information
2. Check if user email is registered already

### Home
1. Get matches information from database, based on certain matrics, such as major, school similarity.
2. Get user profile from database.
3. Send friends request.

### Tutor
1. Use the search bar to find matching tutors. The input in search bar could be tutor's name, course number, or majors.
2. Talk to tutors by clicking Chat Button.
3. Dismiss tutors you don't like by clicking the Dismiss button.

### Posts
1. Get all posts from database and display the name, date, post, comment number and likes number.
2. Get top 10 trending post from server.
3. Click comment number of the post can display all the comments and add more comment. Send new comment to database
4. Click new post button can add more post. Send new post to database.
### Message

1. Synchronize messages from senders and render them to receivers
2. Keep chat history.
