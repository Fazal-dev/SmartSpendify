# 💸 AI-Powered Expense Tracker

A full-stack expense management application built with **Laravel** and **React**, featuring **Aiva** – a custom-built AI chat assistant that helps users manage their finances with ease. This app allows users to track expenses, set monthly budgets, view insightful statistics, and interact with an AI assistant for personalized financial guidance.

---

## 🚀 Features

### 🤖 Aiva – Your Personal AI Chat Assistant

-   Built-in custom chat assistant for smart budgeting help
-   Real-time financial tips and interaction through conversational UI

### 📊 Dashboard

-   **Drag-and-drop charts** to customize your data view
-   Dynamic statistics and summaries of monthly budgets and expenses

### 📄 Reports

-   Generate and **download expense reports as PDF**

### 🔍 Advanced Filtering

-   Filter transactions by **category**, **date range**, and **amount**

### 💡 User Experience

-   Fully **responsive UI** optimized for all devices
-   Clean, modern design with a focus on usability

---

## 🛠️ Tech Stack

-   **Frontend**: React, Axios, Chart.js, Bootstrap
-   **Backend**: Laravel, MySQL
-   **Other Tools**: Laravel Breeze, DomPDF (for PDF generation)

---

## 📦 Installation

### Backend (Laravel)

1. Clone the repository
    ```bash
    git clone https://github.com/Fazal-dev/SmartSpendify.git
    ```
2. Install dependencies

    ```bash
    composer install
    ```

3. Configure .env file

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. Run migrations

    ```bash
    php artisan migrate
    ```

5. Install node packages

    ```bash
    npm i
    ```

6. Build the React

    ```bash
    npm run dev
    ```

7. Start the server
    ```bash
    php artisan serve
    ```
