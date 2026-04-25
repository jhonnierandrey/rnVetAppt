# VetApp - Veterinary Appointment App

As seen in [React Native - Crea aplicaciones para Android y iOS c/ React by Juan Pablo De la torre Valdez](https://www.udemy.com/course/react-native-crea-aplicaciones-para-android-y-ios-con-react/) TypeScript and migration to Expo by personal preference.

![VetApp Preview](https://github.com/jhonnierandrey/rnVetAppt/blob/main/src/assets/vetapp-preview.png?raw=true)

A minimal and modern **React Native + Expo** application for managing veterinary appointments locally on device storage.

This project is a refreshed version of the original `rnVetAppt` app, rebuilt with Expo to provide a cleaner development experience, updated dependencies, Expo Router navigation, local persistence, and automatic light/dark mode support across iOS, Android, and Web.

## Overview

`rnVetAppt` allows users to create, view, edit, and delete pet appointment records. Each appointment stores the pet name, owner's name, owner's email, owner's phone number, appointment date, and optional notes.

The app is intentionally simple, lightweight, and portfolio-friendly.

## Features

- Create new pet appointments
- View scheduled appointments
- Edit existing appointment records
- Delete appointments
- Store data locally using AsyncStorage
- Automatic light/dark mode based on device settings
- Works on iOS, Android, and Web
- Built with Expo Router file-based navigation
- Minimal, clean, modern UI

## Tech Stack

- React Native
- Expo SDK 54
- TypeScript
- Expo Router
- AsyncStorage
- React Native StyleSheet

## Project Structure

```txt
app/
  _layout.tsx
  index.tsx
  appointment-form.tsx

src/
  components/
    AppointmentCard.tsx
  constants/
    theme.ts
  storage/
    appointments.ts
  types/
    appointment.ts
```

## Requirements

Before running the project, make sure you have installed:

- Node.js
- npm
- Expo Go app on your iOS or Android device

## Installation

Clone the repository:

```bash
git clone https://github.com/jhonnierandrey/rnVetAppt.git
cd rnVetAppt
```

Install dependencies:

```bash
npm install
```

Install Expo-compatible AsyncStorage if needed:

```bash
npx expo install @react-native-async-storage/async-storage
```

## Running the App

Start the Expo development server:

```bash
npx expo start
```

Then choose one of the available options:

- Scan the QR code with Expo Go on iOS or Android
- Press `i` to open the iOS simulator
- Press `a` to open the Android emulator
- Press `w` to open the Web version

## Local Storage

Appointments are stored locally using AsyncStorage under the following key:

```txt
rnVetAppt:appointments
```

Data remains available after app reloads, but it can be cleared if the app is uninstalled or local storage is reset.

## Appointment Data Model

```ts
type Appointment = {
  id: string;
  petName: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  appointmentDate: string;
  notes?: string;
  createdAt: string;
};
```

## Current Scope

This version focuses on the core CRUD experience:

- Appointment listing
- Appointment creation
- Appointment editing
- Appointment deletion
- Local persistence
- Automatic theme detection

A native date picker may be added in a future version.

## Screens

The app includes two main screens:

- **Home Screen** — lists all scheduled appointments
- **Appointment Form** — creates or edits an appointment

## Development Notes

This project was intentionally rebuilt as a clean Expo app instead of migrating legacy React Native code line by line. The goal was to modernize the structure, simplify maintenance, and make the project easier to expand in the future.

## Author

Developed by **JAES Made It**  
Portfolio: [https://www.jaesmadeit.com](https://www.jaesmadeit.com)

## License

This project is available for personal and portfolio use.
