# MediQueue

MediQueue is a smart clinic queue management system designed to reduce waiting room anxiety and improve clinic operations.

## Features

- **Landing Page**: Premium marketing page with problem/solution breakdown and social proof.
- **Patient Web App**: Mobile-first experience for patients to join the queue remotely, track their status in real-time, and receive alerts.
- **Clinic Dashboard**: Management interface for receptionists and doctors to control the queue, toggle availability, and view analytics.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (Premium Custom Design System)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM

## How to Run

1. **Install Node.js**: Ensure you have Node.js installed.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Development Server**:
   ```bash
   npm run dev
   ```
4. **Build for Production**:
   ```bash
   npm run build
   ```

## Project Structure

- `src/pages`: Contains the main views (Landing, Patient, Clinic).
- `src/context`: Contains the `QueueContext` for managing application state.
- `src/index.css`: Contains the global design system (variables, utilities).
