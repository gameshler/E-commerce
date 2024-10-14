# Ecommerce Website

A comprehensive ecommerce platform built using MERN stack, Tailwind CSS, Shadcn, and ECharts.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)

## About

This repository showcases a comprehensive ecommerce application built using the MERN stack. The dashboard provides administrators with a user-friendly interface to manage various aspects of the ecommerce platform, including product listings, orders, analytics, and more.

## Features

- Responsive UI built with Tailwind CSS
- Data visualization using ECharts
- Data management capabilities
- Powerful backend API
- Multiple pages for various administrative tasks

## Prerequisites

- Node.js (version 14.x or higher)
- MongoDB
- npm (Node Package Manager) or pnpm

## Setup

To set up this project locally, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/gameshler/E-commerce.git

```

2. Install Dependencies:

```sh
npm install
```

3. Create a ".env" file in both frontend & backend:

Frontend:

```
VITE_SERVER_URL = insert your api url
```

Backend: Insert the Required Strings

```
PORT
MONGO_URI
SALT_ROUNDS
TOKEN
JWT_SECRET
SESSION_SECRET
NODE_ENV
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

4. Start Both Server & Client:

```sh
npm run dev
npm run start:dev
```

## Usage

Once the server and frontend are running concurrently.

Explore the `/frontend/` directory to understand the UI components and data visualizations. Refer to the code in the `/backend/` directory to grasp the API endpoints and data handling.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or issues.
