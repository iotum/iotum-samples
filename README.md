# Steps to open one of the sample web apps:
- Each branch in this repository has the code for a different sample app
- The url for any sample app is https://iotum.github.io/iotum-samples/[nameOfBranch]

# Steps to run a sample app on your local computer: 
1. Change the hostname on your local computer 
    (You will need to modify your system's hosts file and add the followng line: "127.0.0.1  localhost.callbridge.com")
2. Install [Node.js](https://nodejs.org/en)
3. Install [Git](https://git-scm.com/downloads) if you are on Windows
4. Type git clone https://github.com/iotum/iotum-samples.git
5. Each branch represents a different sample app. Git checkout to the branch of the sample app you want to work on
7. Type npm install into the Terminal/Git Bash 
8. To run the web app, type "npm start"

# Steps to publish a sample app to Github pages 
1. Inside the branch with the sample app you want to publish, do an "npm run build"
2. Copy the contents of the build
3. Inside the gh-pages branch, create a folder with the name of the sample app, and paste the contents of the build into that folder 

# Troubleshooting Guide: 
-If some of the widgets are not loading, you may need to run "HTTPS=true npm start"


