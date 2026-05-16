# README.md

# Movie SPA Assignment 2

## Student Information
- Module: Enterprise Web Development
- Assignment: Assignment 2
- Student Name: Fahamidul Hasan

---

# Project Overview

This project is a Movie Single Page Application (SPA) developed using React and TypeScript, and deployed to AWS CloudFront.

The baseline version of the application was initially developed by following the lab instructions. After completing the baseline application, the project was extended with additional features and functionality required for Assignment 2.

The application integrates with the TMDB API to provide movie and actor related information.

Additional features implemented beyond the baseline lab application include:

- Actors list page
- Actor details page
- Favourite actors feature
- Favourite actors page
- Actor movie credit hyperlinking
- Movie pagination
- Actor pagination
- Multi-criteria filtering and sorting
- Release year filtering
- Sorting by rating, title, and release date
- Fantasy movie creation form
- Protected/private routes
- Login page (Stored using localstorage for the purpose of demonstrating protected routes)
- React Context API state management
- React Query server state caching
- AWS S3 and CloudFront deployment
- SPA routing configuration for CloudFront deployment

---

# Technologies Used

- React
- TypeScript
- React Router
- React Query
- Material UI
- TMDB API
- AWS S3
- AWS CloudFront

---

# Features Implemented

## Core Movie Features
- View discover movies
- View movie details
- View movie reviews
- Add movie reviews
- Favourite movies
- Movie filtering and sorting
- Movie pagination
- React Query caching

## Actor Features
- Popular actors page
- Actor details page
- Actor movie credits
- Favourite actors feature
- Favourite actors page
- Actor pagination
- Actor detail hyperlinking

## Search and Filtering Features
- Search movies by title
- Filter by genre
- Filter by release year
- Sort by title
- Sort by release date
- Sort by rating
- Multi-criteria search functionality

## Fantasy Movie Feature
Users can create their own fantasy movie using:
- Title
- Overview
- Genres
- Release Date
- Runtime
- Production Company

Fantasy movie data is stored using browser localStorage.

## Authentication / Route Protection
A simple login system was implemented using localStorage.

Protected route:
- /fantasy-movie

Public routes:
- Home page
- Actors page
- Movie details

## Context API Usage
React Context API was implemented for:
- Favourite movies management
- Favourite actors management
- Shared global state

## Server State Caching
React Query was used for server state caching.

Caching was implemented for:
- Movies
- Actors
- Actor details
- Pagination results
- Favourite actors queries

## AWS Deployment
The frontend application was deployed using:
- AWS S3
- AWS CloudFront

CloudFront was configured with:
- SPA routing support
- Cache invalidation
- CDN distribution

# Routing

## Routes Implemented

- /
- /movies/:id
- /reviews/:id
- /actors
- /actors/:id
- /actors/favourites
- /movies/favourites
- /fantasy-movie
- /login

---

# Server State Caching

React Query was used for server state caching.

Caching was implemented for:
- Movies
- Actors
- Actor details
- Pagination results
- Favourite actors queries

---

# AWS Deployment

The frontend application was deployed using:
- AWS S3
- AWS CloudFront

CloudFront was configured with:
- SPA routing support
- Cache invalidation
- CDN distribution

---

# Running the Application

## Install dependencies

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build project

```bash
npm run build
```

---

# CloudFront Deployment Steps

1. Run production build using:

```bash
npm run build
```

2. Upload the contents inside the dist folder to AWS S3.

3. Configure AWS CloudFront distribution.

4. Configure SPA routing using:
- 403 → /index.html
- 404 → /index.html

5. Create invalidation:

```txt
/*
```

---

# GitHub Repository

Add your GitHub repository URL here.

---

# CloudFront Deployment URL

Add your CloudFront URL here.

---

# AI Usage Documentation

## AI Tools Used

- ChatGPT

## How AI Was Used

AI assistance was used for:
- Debugging TypeScript errors
- Explaining React Query implementation
- React Router setup guidance
- CloudFront deployment guidance
- Improving component structure
- Assistance with filtering and pagination logic
- General troubleshooting

## Academic Integrity

All generated code was reviewed, modified, tested, and integrated manually.

---

# assignment2.txt

GitHub Repository URL:

[https://github.com/MarSsyy/movie-spa-assignment-2]

YouTube Demonstration URL:

[https://youtu.be/KhehG0NNtSE]


