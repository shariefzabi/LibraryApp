# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


This project contains both front end and backend

frontEnd:

# `npm i`
Run npm i command  to install Node modules

## Available Scripts

In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

`steps to start the application Locally(FrontEnd)`:
run [npm i] in your terminal to install node_modules
run [npm start]  in your terminal to start the Application


Note : please do not include `[` and `]` while running the commands

after succesfully completing the above steps the application should start on port  3000 on your localhost

`steps to start the application Locally(backend)`:
run [npm i] in your terminal to install node_modules
run [npm start]  in your terminal to start the Application


Note : please do not include `[` and `]` while running the commands

after succesfully completing the above steps the application should start on port  3000 on your localhost

`steps to use the App`
we can use this as two types of users
By default we will see a normal Login page , In the page the we can see Links to "Login as Admin" and "sign up as user"  by clicking on links corresponding Pages will be rendered

1)sign up as user
  we can register as a  new user with a  valid username ,name, email,contact Number
   after sign up , we  will be redirected to "login as a user" page where we can login 

2)login  as user
  we can login  with our   valid username 
  after loggin in we can see two tabs 
    1) Books: here we can see the books assigne to the user
    2)Transactions: here we can see the transactions performed on the user


3)sign up as admin
  we can register as a  new Admin with a  valid username ,password ,name, email,contact Number
  after sign up as a admin , we will be redirected to login as a admin page where we can login as admin

4)login as admin
    1)  we can Login with our created username and password
    3)Alternately we can change password and can login in as a normal user
    4) after successfull login the we can see two tabs Issuse Book and Return Book
        1)Issue Book
          here admin can create a book, assign a book to a existing  user with a return date,  and can delete a book
               Note : to assign a book to normal user atleast one user should be created   
        2) Return Book:
             1) here user can see the return dates of books and return them , so they can be assigned to new users
    
1)register as a  new user with a  valid username  and password 
2) login with same email and password
3)after login it will redirects the user to add toDo page ,here the user can create a Todo 
3)after creating todo click on view Todo to view  and edit and delete  the created ToDos
5) the user can also sign in with different emails and password,todos are isolated between different users




`Deployment plan`
Great! Deploying a MERN (MongoDB, Express.js, React, Node.js) stack application involves specific considerations for each part of the stack. Here's an adjusted deployment plan specifically tailored for a MERN stack application:

Deployment Plan for MERN Stack Application on AWS
Cloud Service Provider Selection:

Provider: Choose AWS due to its comprehensive service offerings and compatibility with the MERN stack components.
Deployment Strategy:

Containerization: Utilize Docker to containerize the application components for consistent deployment and scalability.
Configuration for Cloud Environment:

AWS Setup: Configure AWS environment settings:
Set up EC2 instances for Node.js backend and React frontend.
Use Amazon S3 for storing static assets like images or files.
Configure AWS Elastic Load Balancer (ELB) for load balancing traffic between backend instances.
Securely manage environment variables using AWS Parameter Store or environment-specific configurations.
Database Setup:

MongoDB Atlas: Use MongoDB Atlas for a managed MongoDB instance:
Set up and configure a MongoDB Atlas cluster with appropriate security settings.
Migrate existing MongoDB data to MongoDB Atlas.
Deployment Steps:

Backend Deployment:
Set up Node.js environment on EC2 instances.
Deploy the Express.js backend using Docker containers.
Run the Node.js server with PM2 or Docker.
Frontend Deployment:
Build the React frontend locally.
Serve the static React build files from an S3 bucket or deploy it on another EC2 instance.
Continuous Integration/Continuous Deployment (CI/CD):

Pipeline Setup: Implement CI/CD using AWS CodePipeline:
Configure CodePipeline to automatically build, test, and deploy changes pushed to the Git repository for both backend and frontend.
Integrate testing stages to ensure quality assurance before deployment.
Monitoring and Scalability:

Monitoring Tools: Use AWS CloudWatch for monitoring:
Set up CloudWatch to monitor application logs, performance metrics, and resource utilization.
Implement alarms and notifications for critical events or performance issues.
Scalability: Leverage AWS Auto Scaling to manage instances based on traffic demands and load.
Backup and Recovery:

Backups: Use MongoDB Atlas automated backups for data backup.
Recovery Plan: Define procedures for restoring from backups in case of data loss or instance failure.
Documentation and Maintenance:

Documentation: Maintain detailed deployment instructions and configurations.
Maintenance: Schedule regular maintenance for updates, patches, and optimizations to ensure the application's performance and security.
Deploying a MERN stack application involves setting up and integrating various services to work together seamlessly. This plan outlines the steps required to deploy each component of the MERN stack on AWS, ensuring a robust and scalable deployment. Adjustments can be made based on specific requirements or preferences regarding tools and services within the AWS ecosystem.

`Have a good Day`