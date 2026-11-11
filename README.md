# Language / Idioma: [Português](README.pt-BR.md) | [English](README.md)

# CarCompare

<img width="1280" height="696" alt="image" src="https://github.com/user-attachments/assets/156d7ea7-cbe0-4f51-9c84-5fe616c26299" />


**CarCompare** is a full-stack web application for comparing specifications of different vehicle models.  
The goal is to allow car seekers to view and compare technical data such as power, torque, weight, drivetrain, top speed, fuel type, and price.

The system is fully containerized using Docker Compose, integrating frontend, backend, and a MySQL database.

## Architecture Overview

The application follows a **modular and decoupled architecture**, composed of:

- **Frontend**: React (Single Page Application)
- **Backend**: Node.js + Express (REST API)
- **Database**: MySQL 8
- **Infrastructure**: Docker and Docker Compose

## My contribution

I came up with the idea, chose the stack for the project, created the first draft of the frontend, added endpoints and routes and fixed the Docker compose.

## Features

- Vehicle catalog with detailed specifications
- Vehicle filtering by brand and category
- Individual vehicle detail view
- Vehicle comparison
- Trip and consumption calculator (fuel / electric)
- Light and dark theme support
- Full system execution with a single Docker command

## Backend

- Developed with **Node.js and Express**
- REST API consumed by the frontend
- MySQL connection via environment variables
- Structure prepared for future expansion (new routes and filters)

### Main Endpoints

- `GET /cars` → returns the complete list of vehicles  
- `GET /cars/:id` → returns details of a specific vehicle by `id`

## Frontend (Temporary Docker Setup)

- Developed with **React**
- Navigation using **React Router**
- Component-based architecture
- Theme management using **Context API**
- Fully decoupled from the backend

The frontend is built with **React** using **Create React App (CRA)**.  
Currently, there is a temporary way to run only the frontend using Docker, **without installing Node, npm, or dependencies locally**.  
In the future, the entire project will run using **Docker Compose**, integrating frontend, backend, and the MySQL database.

### Main Routes

- `/` → General vehicle catalog
- `/catalog/:brand` → Vehicle catalog filtered by brand
- `/compare` → Vehicle comparison
- `/brands` → Brand listing
- `/viagem` → Trip calculator

## Database

- **MySQL 8**
- Automatic schema initialization via Docker
- Table structured with real-world automotive attributes
- Support for combustion, hybrid, and electric vehicles

### Example Attributes

- Power (HP), torque (Nm), weight (kg)
- Drivetrain type (FWD, RWD, AWD)
- Fuel type and efficiency
- Price and category

## Docker and Docker Compose

The entire system is orchestrated using **Docker Compose**, including:

- MySQL database
- Backend API
- Frontend application

### How to Run the Project

```bash
docker compose up --build
```

## Serviços disponíveis:
    Frontend → http://localhost:8080
    Backend → http://localhost:3000
    Database → MySQL on port 3306


## Technologies Used

    - React
    - Node.js
    - Express
    - MySQL 8
    - Docker
    - Docker Compose
    - JavaScript (ES6+)
    - REST API
    - Relational database modeling 

