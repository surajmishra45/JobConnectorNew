# 💼 Job Portal

*Job Portal* is a full-stack MERN web application designed to bridge the gap between *job seekers* and *recruiters*. The platform allows job seekers to create profiles, search, and apply for jobs, while recruiters can post jobs and manage applications.

---

## 📚 Table of Contents

1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Frontend Routing](#frontend-routing)
4. [Backend Server Setup](#backend-server-setup)
5. [API Endpoints](#api-endpoints)
6. [Running the Project](#running-the-project)
7. [Features](#features)
8. [Future Scope](#future-scope)

---

## 🛠 Technologies Used

### Frontend

- React.js v19.0.0  
- React Router DOM v7.4.0  
- Tailwind CSS v4.0.17  
- Axios v1.8.4  

### Backend

- Node.js  
- Express.js v4.21.2  
- MongoDB (Mongoose v8.13.0)  
- JWT (jsonwebtoken v9.0.2)  
- CORS v2.8.5  
- dotenv v16.4.7  
- bcrypt / bcryptjs  

---

## 📁 Project Structure

### Frontend (/src)
src/
├── pages/
│ ├── JobPortal.js
│ ├── JobSeekerLogin.js
├── component/
│ ├── SeekerProfile.js
│ ├── ProviderProfile.js
│ ├── RecruiterProfile.js
│ ├── AllJobSeeker.js
│ ├── AllRecruiterFind.js
│ ├── Jobs.js
│ ├── AllAppliedJob.js
│ └── ProviderPostJob.js
└── App.js


### Backend (/backend)

backend/
├── routes/
│ ├── jobSeekerRoute.js
│ ├── recruiterRoute.js
│ ├── jobRoute.js
│ ├── applicationRoutes.js
│ ├── LoginRoute.js
│ └── ProviderRoute.js
├── database/
│ └── database.js
├── .env
└── server.js


---

## 🧭 Frontend Routing

### Dashboard & Entry Point

```jsx
<Route path="/" element={<JobPortal />} />
Main landing page

Flow: Click "JobConnector" → Select Role → Redirect to login/signup

Authentication
<Route path="/jobseeker-login" element={<JobSeekerLogin />} />
<Route path="/jobprovider-login" element={<JobProviderLogin />} />  // (Suggested)

Profiles
<Route path="/seeker-profile" element={<SeekerProfile />} />
<Route path="/profile-provider/:id" element={<ProviderProfile />} />  // (Corrected path)
<Route path="/recruiter-profile" element={<RecruiterProfile />} />

Data Listing
<Route path="/alljobseeker" element={<AllJobSeeker />} />
<Route path="/allrecruiter" element={<AllRecruiterFind />} />
<Route path="/alljobs" element={<Jobs />} />
<Route path="/allappliedjob" element={<AllAppliedJob />} />
<Route path="/job-list/:recruiterId" element={<ProviderPostJob />} />


⚙ Backend Server Setup
 import jobSeekerRouter from './routes/jobSeekerRoute.js'; 
import RecruiterRouter from './routes/recruiterRoute.js';
import jobRoute from './routes/jobRoute.js';
import Applicationrouter from './routes/applicationRoutes.js';
import LoginRouter from './routes/LoginRoute.js';
import ProviderRouter from './routes/ProviderRoute.js';

API Endpoints :

 Authentication

POST /api/auth/signup – Job Seeker Signup

POST /api/auth/login – Job Seeker Login

POST /api/authprovider/signup – Provider Signup

POST /api/authprovider/login – Provider Login

Recruiter

POST /api/recruiter/recruiterjob – Create Recruiter Job

PUT /api/recruiter/:id – Update Recruiter Profile

DELETE /api/recruiter/:recruiterId – Delete Recruiter and Jobs

GET /api/recruiter/ – Get All Recruiters

Job Seeker

POST /api/user/createjob – Create Seeker Profile

PUT /api/user/:id – Update Seeker Profile

DELETE /api/user/:id – Delete Seeker

GET /api/user/ – Get All Seekers

Jobs

POST /api/job/:recruiterId – Create Job

PUT /api/job/:jobId – Update Job

GET /api/job/allJobs – Get All Jobs

DELETE /api/job/:id – Delete Job

GET /api/job/search – Search Jobs

Applications

POST /api/apply/applications – Apply for Job

GET /api/apply/applications – Get All Applications

Running the Project 
Frontend
cd frontend
npm install
npm run dev

Backend
cd backend
npm install
node server.js

✨ Features
Secure user authentication with JWT
Recruiter and job seeker registration/login
Profile management for both users
Recruiters can create, update, and delete job posts
Job seekers can search and apply for jobs
Admin-level control for user/job management

🔮 Future Scope
Add job recommendations based on seeker profile
Implement resume upload & job matching algorithm
Admin dashboard with analytics
Email notifications for applications & approvals

