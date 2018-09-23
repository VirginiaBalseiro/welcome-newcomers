module.exports = (app) => {
  // - probot detects that the user commented on a certain issue (let's call it "invite issue") and then sends a collaborator invite so the next step can happen
  app.on('issue_comment.created', async context => {
    //app.log(context)
    if (context.payload.issue.number === 1 || context.payload.issue.title == "How to start collaborating? Start here!") {
      var userName = context.payload.comment.user.login;
      var repoName = context.payload.repository.name;
      var repoOwner = context.payload.repository.owner.login;
      return context.github.repos.addCollaborator({owner: repoOwner, repo: repoName, username: userName});
    }
  });
  // - probot detects that there was a fork and CREATES an Issue on the Repo with a list of ToDo items - [ ] and assigns it to the person, with a deadline of 7 days from opening
  app.on('fork', async context => {
    var repoName = context.payload.repository.name;
    var repoOwner = context.payload.repository.owner.login;
    var forker = context.payload.forkee.owner.login;
      var forkeeName = context.payload.forkee.name;
    //app.log(context)
      var date = new Date();
      date.setDate(date.getDate() + 7);
      var issueText = "# Hi " + forker + "!!! \n# Welcome to :sparkles:" + repoName + ":sparkles: !\n## Here's something to get started: :nerd_face: \nComplete each task and watch this issue's comment for rewards! :trophy:\nPlease keep this issue open as a guide, and also to get your rewards in the comments!\n- [ ] Add your name to the README.md file :pencil:\n\n- Open the README.md file and click the pencil button to edit the file. \n- Make your changes.\n- Scroll down and click Commit Changes (leave \"Commit directly to the <code>master</code> branch\" selected\n- Go to pull requests and click \"new pull request\". Right under the title \"Compare changes\", click the link that says \"compare across forks\"\n- Make sure that you're comparing base fork: original repo / master and head fork: your repo / master, and click \"Create pull request\". If you get \"there isn\'t anything to compare\", click \"try switching the base\" and then create pull request. On the next page, click give your PR a title and optional comment and \"create pull request\" again. If everything went well, you'll make a mythological animal very happy :heart:\n- On the next page, click \"Merge pull request\" and again \"Confirm merge\". You can do this merge yourself because you're a collaborator, and collaborators have push rights. If you weren't a collaborator, you would still be able to make a pull request, but the you'd have to wait for the owner of the repo to merge your changes. If everything went right, you'll get a cookie down below :smile: \n - [ ] Add a new .md file :file_folder: \n- Go to the \"Code\" section of your forked repo and click \"Create new file\".\n- Use \"your-name.md\" as the file name and fill it with a short introduction (you can include where you're from, your likes and dislikes, etc.)\n- Scroll down and click \"Commit new file\", just as you did in the previous task.\n- Follow all the steps in the previous tasks again: make a PR, merge, compare across forks, PR, and merge. If everything went well, you\'ll have another cookie and another happy unicorn.\n- [ ] Close this issue :raising_hand:\n- Scroll down to the bottom of this issue and click \"Close issue\". You\'ll get another reward! :star: \n### Have fun!";
      context.github.issues.createMilestone({owner: repoOwner, repo: repoName, title: 'Deadline: ' + date, due_on: date}).then((result)=>{
        const params = context.issue({owner: repoOwner, repo: repoName, title: 'Welcome ' + forker, body: issueText, milestone: result.data.number, assignees: [forker]})
        return context.github.issues.create(params)
      });
  });

  //listen on user actions from checklist - comment with a funny message (as a comment to the issue?)
  //listen for push: add or edit file
  
  app.on('push', async context => {
    var repoName = context.payload.repository.name;
    var repoOwner = context.payload.repository.owner.login;
    var pusher = context.payload.pusher.name;
    var assignee = pusher;
    var repoFullName = context.payload.repository.full_name;
      var rp = require('request-promise');
      var options = {
          uri: 'http://api.github.com/search/issues?q=assignee:'+assignee+'+repo:'+repoFullName+'+state:open&sort=created&order=asc',
          headers: {
              'User-Agent': 'hello-world-virginia'
          },
          json: true // Automatically parses the JSON string in the response
      };
      
      rp(options)
          .then(function (info) {
           var issueNumber =  info.items[0].number;
           console.log(issueNumber)

          app.log("push happened");
          //app.log(repoName, repoOwner, pusher)
          return context.github.issues.createComment({owner: repoOwner, repo: repoName, number: issueNumber, body: 'Well pushed ' + pusher + '! Here\'s a cookie :cookie:'});
          })
          .catch(function (err) {
              app.log('API call failed...', err)
          });

  });
  
  //this works well for PRs:
  app.on('pull_request.opened', async context => {
    var repoName = context.payload.repository.name;
    var repoOwner = context.payload.repository.owner.login;
    var prUser = context.payload.sender.login;
    var assignee = prUser;
    var repoFullName = context.payload.repository.full_name;
    var rp = require('request-promise');
      var options = {
          uri: 'http://api.github.com/search/issues?q=assignee:'+assignee+'+repo:'+repoFullName+'+state:open&sort=created&order=asc',
          headers: {
              'User-Agent': 'hello-world-virginia'
          },
          json: true // Automatically parses the JSON string in the response
      };
      
      rp(options)
          .then(function (info) {
           var issueNumber =  info.items[0].number;
           console.log(issueNumber)

            app.log("PR happened");
            //app.log(context)
            //app.log(repoName, repoOwner, prUser)
            return context.github.issues.createComment({owner: repoOwner, repo: repoName, number: issueNumber, body: 'Excellent PR, ' +prUser + '! You made the unicorn smile :unicorn:'});
          })
          .catch(function (err) {
              app.log('API call failed...', err)
          });
  });
  
  app.on('issues.closed', async context => {
      var repoName = context.payload.repository.name;
      var repoOwner = context.payload.repository.owner.login;
      var issueCloser = context.payload.sender.login;
      var assignee = context.payload.issue.assignee.login;;
      var issueTitle = "Welcome " + issueCloser;
      var issueNumber = context.payload.issue.number;
      //app.log(issueTitle == context.payload.issue.title);
    if (issueCloser === assignee && issueTitle == context.payload.issue.title){
      //app.log('passes')
      return context.github.issues.createComment({owner: repoOwner, repo: repoName, number: issueNumber, body: 'Good job, ' + issueCloser + '! You\'re all done! :star2: Congratulations! :fireworks:'});
    }
    });
// //alternative that listens to every event the app is subscribed to:
//     app.on(`*`, async context => {
//     context.log({event: context.event, action: context.payload.action})
//       //app.log(context)
// //       if (context.event == 'pull_request' || context.event == 'push') {
// //         app.log('ok')
        
//         //return context.github.issues.createComment({owner: 'VirginiaBalseiro', repo: 'test-probot', number: 20, body: 'Yay! Brownie points for you!'})
//       //}
//     })
  
}
// - gave VirginiaBalseiro collaborator access to the public GitHub repo 
//          https://github.com/1millionwomentotech/gentle-intro-to-github/
// - README.md says please FORK me by hitting fork on the top right corner
// - probot detects that there was a fork and CREATES an Issue on the Repo with a list of ToDo items - [ ] and assigns it to the person, with a deadline of 7 days from opening
// - each todo item is a small GitHub action that we can detect and reward with a funny message: e.g. add your name to the README.md, add a new .md file