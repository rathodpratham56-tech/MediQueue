# MediQueue Setup Guide

It seems that **Node.js** is not currently installed or configured in your system's PATH. MediQueue requires Node.js to run the Development Server.

## 1. Install Node.js
1. Visit the [Node.js Official Website](https://nodejs.org/).
2. Download the **LTS (Long Term Support)** version for Windows.
3. Run the installer. **Important**: specific "Add to PATH" if asked (it is usually checked by default).
4. Restart your terminal (or VS Code) implementation verify installation:
   ```powershell
   node --version
   npm --version
   ```

## 2. Install Dependencies
Once Node.js is ready, open a terminal in the project folder `c:\Users\admin\MediQueue` and run:

```powershell
npm install
```

## 3. Run the Application
Start the simulator:

```powershell
npm run dev
```

This will launch the app (usually at `http://localhost:5173`).

- **Landing Page**: `/`
- **Patient View**: `/patient` (Use mobile view in browser dev tools for best experience)
- **Clinic Dashboard**: `/clinic` (Desktop view)

## 4. Set up Git
To push your code to GitHub, you need Git installed.

1.  Download [Git for Windows](https://git-scm.com/download/win).
2.  Install it (default settings are fine).
3.  Restart your terminal.
4.  Verify with:
    ```powershell
    git --version
    ```
5.  Once installed, you can run the commands to push your code.
