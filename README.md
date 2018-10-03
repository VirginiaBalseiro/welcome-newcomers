Welcome Newcomers
=========================

This is a probot app that welcomes new users to a repo by guiding them through a series of tasks.

When a user comments on a particular issue (a "get started here" issue), an invitation is sent for them to become a collaborator. 

Then, after accepting the invitation, when the user forks the repo, a new issue is created on the original repo that is assigned to the user. 

Each action that is listed in the issue triggers an event (push, pull request, close issue), and the user gets a "reward" in the form of a funny comment on their issue. 

This is a fun way of gently introducing newbies to GitHub in an easy and entertaining way.


---

## Getting Started

To use this "Welcome newcomers" bot on your repo, follow these steps:
 
1 - Choose a repo or start a new one where you want to use the app. The repository __cannot__ be empty, so feel free to populate it with a README.md file containing the User Steps guide below.

2 - Go to [this link](https://github.com/apps/welcome-newcomers) and install the app. You have the option to install it in all your repositories or only select ones. Give permissions: 

3 - Create an issue that will serve as the starting point for your newcomers: this is the issue they need to comment in order to get an invitation to collaborate. 

__IMPORTANT:__ Your "get started here" issue should either or both:

- Be your first issue (issue # 1). This is preferable if your repo is new.

- Have this as a title: "How to start collaborating? Start here!" __Be careful__ not to add any extra spaces and/or capital letters, punctuation, etc. It's recommended to copy and paste it from this guide (without quotes). 

4 - That's it from your end! Your user will now have to go through the steps outlined below (see User Steps).

_Notes:_
- Make sure to mute the "get started" issue by clicking the "mute the thread" link in your e-mail notifications. This i to avoid unnecessary notifications each time a user comments.


## User Steps
Feel free to use this User steps guide as the text in your "get started" issue.

Each user will have to go through the following steps in order to complete their welcome journey successfully:

1 - Add a comment to the issue with the title "How to start collaborating? Start here!". 

2 - You will get an invitation to become a collaborator. Please accept it in order to continue with the remaining steps.

3 - Now that you're a collaborator, fork the repo. You do that by clicking the __Fork__ button in the upper right corner.

4 - A issue with the title "Welcome (Your name)" will be created and assigned to you. You can either follow the link in your e-mail confirmation or look for the issue by going to the original repo (not your fork, but the repo where you started off) and clicking the Issues tab. There you can filter by Assignee -> Your name.

5 - In this issue you will find instructions with the tasks you need to complete. __Have fun!__ 

_This bot was created by Virginia Balseiro ([GitHub](https://github.com/VirginiaBalseiro), [LinkedIn](https://www.linkedin.com/in/virginia-balseiro)) at the request and specifications of Ilona Budapesti ([GitHub](http://github.com/ilonabudapesti/), [LinkedIn](http://linkedin.com/in/ilonabudapesti)) as part of Volunteer Cohort #2 of 1 Million Women To Tech ([GitHub](https://github.com/1millionwomentotech), [Learn to Code](https://memberportal.1millionwomentotech.com/diy), [Mentor](https://github.com/1millionwomentotech/toolkitten/blob/master/howto/become-mentor.md)) a Silicon Valley based global educational 501(c)3 recognized nonprofit with the mission to offer free coding education to 1 million women and enbies by 2020._