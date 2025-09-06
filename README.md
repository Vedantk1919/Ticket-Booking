
#  Seatify - A Modern Movie & Event Ticketing Web App

**Live Demo:** [https://seatify.netlify.app/](https://seatify.netlify.app/)

---

## About The Project

Seatify is a feature-rich, single-page web application for browsing movies and booking tickets. Built from the ground up with modern web technologies, it provides a seamless and responsive user experience, from searching for a show to selecting seats and completing the booking process.

This project was developed to showcase a complete user flow for a ticketing service, incorporating dynamic data from an external API, robust state management, and a fully interactive UI.

---

## Key Features

* **Browse & Discover:** View a dynamic list of popular shows fetched from the TVMaze API.
* **Powerful Search & Filtering:** Instantly search for shows by title or filter the entire list by genre.
* **Detailed Show Information:** Click on any show to view its details, summary, genres, and premiere date.
* **Dynamic Showtimes:** Select from a list of dynamically generated dates (the next 7 days) and mock showtimes.
* **Interactive Seat Selection:** A sleek modal overlay allows users to visually select their seats.
* **Shopping Cart:** Add multiple bookings to the cart, see the calculated total, and remove items.
* **Mock Checkout & Invoice:** A simulated checkout process leading to a dynamic invoice confirmation page.
* **Order History:** A dedicated "My Tickets" page that keeps a persistent history of all past orders.
* **Fully Responsive Design:** A mobile-first design that works beautifully on all devices, from phones to desktops.

---

## Tech Stack

This project is built with a modern and powerful frontend technology stack:

* **Framework:** React
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **State Management:** React Context API
* **Deployment:** Netlify

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine.
You can download them from [nodejs.org](https://nodejs.org).

### Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Vedantk1919/Ticket-Booking.git
```

Navigate into the project directory:

```bash
cd Ticketing-main
```

Install NPM packages:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The application will be running at: [http://localhost:5173](http://localhost:5173)

---

## Deployment

This application is deployed on **Netlify** and is connected to the `main` branch of the GitHub repository. Any push to the `main` branch will automatically trigger a new deployment.

The critical `public/_redirects` file is included to ensure that React Router's client-side routes work correctly on the Netlify platform.

