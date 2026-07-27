# Payment Gateway Backend

A backend project demonstrating **Razorpay Payment Gateway** integration using **Node.js** and **Express.js**. This project creates Razorpay Payment Links, serves a simple frontend, and verifies payment webhooks.

## Features

* Create Razorpay Payment Links
* Dynamic payment amount support
* Express.js REST API
* Webhook signature verification
* Static frontend served by Express
* Environment variable configuration using `.env`

## Tech Stack

* Node.js
* Express.js
* Razorpay API
* JavaScript
* HTML
* CSS

## Project Structure

```text
payment-gateway-backend/
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── check-payment.html
│   ├── check-payment.js
│   └── success.html
│
├── server.js
├── package.json
├── .env
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/payment-gateway-backend.git
```

Navigate to the project directory:

```bash
cd payment-gateway-backend
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
WEBHOOK_SECRET=your_webhook_secret
```

## Run the Project

Start the server:

```bash
node server.js
```

ngrok :
ngrok http 3000

The application will be available at:

```
http://localhost:3000
```

## API Endpoints

### Create Payment Link

**POST**

```
/payment-link
```

Creates a new Razorpay Payment Link and returns the payment URL.

### Webhook

**POST**

```
/webhook
```

Receives Razorpay webhook events and verifies the webhook signature.

## How It Works

1. User opens the frontend.
2. User enters an amount.
3. Frontend sends a request to the backend.
4. Backend creates a Razorpay Payment Link.
5. User is redirected to the Razorpay payment page.
6. Razorpay sends webhook events to the backend after payment.
7. The backend verifies the webhook signature before processing the event.

## Future Improvements

* MongoDB integration
* User authentication
* Payment history
* Order management
* Payment status tracking
* Dashboard for transactions
* Deployment to a cloud platform

## License

This project is intended for learning and educational purposes.
