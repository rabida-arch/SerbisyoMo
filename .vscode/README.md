# SerbisyoMo – Boac Local Service Finder

A static website (HTML, CSS, JavaScript) that helps residents of Boac, Marinduque find and request local home services.

Provider listings are fictional demo data. Service requests, accounts, favorites, and feedback are stored only in this browser (`localStorage`).

This project follows the same frontend-only idea as BPBuddy: open the folder and run the HTML pages—no build step and no backend required.

## Project structure

```
SerbisyoMo/
├── index.html                 Home
├── providers.html             Provider directory
├── profile.html               Provider profile
├── request.html               Service request form
├── requests.html              My Requests (resident)
├── favorites.html             Saved providers
├── account.html               Editable account profile
├── provider-dashboard.html    Provider workspace
├── login.html / signup.html   Role-aware accounts
├── css/style.css
├── js/
│   ├── storage.js             Versioned localStorage layer
│   ├── auth.js                Resident / provider auth
│   ├── common.js              Nav, toasts, offline status, SW
│   ├── data.js                Demo providers
│   ├── main.js                Directory, profile, requests, favorites
│   ├── provider-dashboard.js  Provider request management
│   └── account.js             Profile edit page
├── sw.js                      Offline app shell
├── manifest.webmanifest
├── README.md
└── AI_DISCLOSURE.md
```

## How to run

1. **File → Open Folder…** and select this `SerbisyoMo` folder.
2. Prefer a local server (Live Server, or `python -m http.server 8000`) so the service worker can register.
3. Open `index.html` in the browser.

## Features

### From the original build
- Browse 10 local service categories and 60 demo providers
- Filter, search, and sort providers
- View profiles with ratings, specialties, and feedback
- Submit service requests (saved in this browser)
- Leave feedback when logged in
- Cancel pending requests

### Added / improved 
- **Storage layer** (`storage.js`) with versioned keys and legacy migration
- **Role-aware accounts**: Resident and Provider
- **Provider dashboard**: update status, add quote amount and notes
- **Favorites** for residents
- **Requests linked to the signed-in account**: visitors who are not logged in cannot send requests or view My Requests; they are asked to log in or sign up first, and a resident only sees their own requests
- **Offline-first shell**: service worker + web app manifest
- **Connection status** and toast feedback
- **Seeded demo accounts**
- **Clearer module split**: storage, auth, common, page scripts
- **BPBuddy-style user menu**: Online status, avatar, dropdown (Profile, Favorites, Log out)
- **Account profile page**: edit name, contact, barangay; auto-fills service requests

## Demo accounts

Created automatically on first load:

| Role | Email | Password |
|------|-------|----------|
| Resident | `resident@serbisyomo.demo` | `Resident123!` |
| Provider | `provider@serbisyomo.demo` | `Provider123!` |

The demo provider is linked to listing **#1 — Ramon's Plumbing Services**, so requests sent to that profile appear on the provider dashboard.

## Suggested evaluation flow

1. Open the home page and browse providers.
2. Log in as the demo resident (or create an account).
3. Save a few favorites and submit a request to Ramon's Plumbing.
4. Open **My Requests** and confirm the request is listed.
5. Log out, then log in as the demo provider.
6. On the dashboard, quote the job, add a note, and set status to Accepted or Completed.
7. Log back in as the resident and confirm the status, quote, and note appear.
8. Turn off network (or use DevTools offline) to confirm the app shell still loads.

## Notes

- Accounts and requests are **not** sent to a server.
- Clearing site data for this origin removes demo logins, favorites, and saved requests.
- Do not enter real personal or sensitive information.
- Passwords are hashed in the browser (SHA-256 when available). This is still a demo, not production security.
