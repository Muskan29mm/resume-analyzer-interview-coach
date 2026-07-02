# Project Journey

## Overview

This document captures the development journey of the **Resume Analyzer & AI Interview Coach** project. It records the objectives, implementation details, outcomes, and progress at each stage of development.

The goal is to build an AI-powered application that helps users analyze their resumes, improve ATS compatibility, identify missing skills, and prepare for interviews through personalized AI-generated insights.

---

# Step 1 – Project Initialization

## Objective

Establish the project foundation by creating a clean directory structure and initializing version control.

## Implementation

- Created the project repository.
- Organized the project into backend, frontend, and documentation directories.
- Added a `.gitignore` file.
- Initialized Git for version control.

## Outcome

A structured project foundation was established, making future development organized and maintainable.

**Status:** ✅ Completed

---

# Step 2 – GitHub Integration

## Objective

Host the project on GitHub to enable version tracking and collaboration.

## Implementation

- Created a GitHub repository.
- Connected the local project using Git remote.
- Pushed the initial project structure to GitHub.

## Outcome

The project is now version-controlled and securely hosted on GitHub.

**Status:** ✅ Completed

---

# Step 3 – Backend Setup

## Objective

Prepare the backend environment for resume processing.

## Implementation

- Set up the Flask application.
- Enabled Cross-Origin Resource Sharing (CORS).
- Installed required Python libraries:
  - Flask
  - Flask-CORS
  - pdfplumber
  - python-docx
- Generated `requirements.txt`.

## Outcome

The backend environment is ready to receive and process client requests.

**Status:** ✅ Completed

---

# Step 4 – Resume Parsing Module

## Objective

Develop a reusable module capable of extracting text from different resume formats.

## Implementation

- Implemented PDF text extraction using `pdfplumber`.
- Implemented DOCX text extraction using `python-docx`.
- Created a reusable parser utility to automatically detect the uploaded file type and extract its contents.

## Outcome

The application can successfully extract textual content from both PDF and DOCX resumes.

**Status:** ✅ Completed

---

# Step 5 – Resume Upload API

## Objective

Allow users to upload resumes through a REST API and receive the extracted text.

## Implementation

- Developed the `/upload` endpoint using Flask.
- Accepted resume uploads via `multipart/form-data`.
- Stored uploaded files temporarily.
- Integrated the Resume Parser module.
- Returned the extracted resume text as a JSON response.
- Validated the endpoint using Postman.

## Outcome

The backend now supports complete resume upload and text extraction through a REST API.

**Status:** ✅ Completed

---
# Step 6– React Frontend Initialization

## Objective

Set up the frontend environment using React and Vite to build a modern, responsive user interface for the Resume Analyzer & AI Interview Coach application.

## Implementation

.Finalized React as the frontend framework instead of Streamlit.
. Upgraded Node.js to the latest compatible version using NVM.
. Initialized the React project using Vite.
. Installed project dependencies.
. Started the React development server.
. Explored the React project structure.
. Learned the fundamentals of React:
      * React
      * Vite
      * Components
      * JSX
      * Import and Export
. Created the first reusable components:
      * Header
      * Hero
. Fixed the first React debugging issue related to component exports.

## Outcome

The frontend development environment is successfully configured. The application now has a working React interface and a solid foundation for building the remaining UI.

**Status**: 🚧 In Progress

---

# Current Progress

| Step | Description | Status |
|------|-------------|--------|
| 1 | Project Initialization | ✅ Completed |
| 2 | GitHub Integration | ✅ Completed |
| 3 | Backend Setup | ✅ Completed |
| 4 | Resume Parsing Module | ✅ Completed |
| 5 | Resume Upload API | ✅ Completed |
| 6 | React Frontend Initialization | 🚧 In Progress
| 7 | AI Resume Analysis | ⏳ Upcoming |
| 8 | Interview Question Generator | ⏳ Upcoming |

---

# Key Milestones Achieved

- Established a well-structured project foundation.
- Configured a Flask-based backend.
- Implemented resume parsing for PDF and DOCX files.
- Developed and tested a resume upload API.
- Created professional project documentation.
- Initialized the React frontend using Vite.

---

# Next Milestone

## Step 7 – AI Resume Analysis

The next phase focuses on integrating the Google Gemini API to transform extracted resume text into meaningful insights.

The AI module will provide:

- ATS compatibility analysis
- Resume strengths
- Resume weaknesses
- Missing skills
- Resume improvement suggestions
- Personalized interview questions