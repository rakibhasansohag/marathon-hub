# 🏃‍♂️ MarathonHub

**MarathonHub** is a dynamic web application that enables runners and enthusiasts to discover, register, and manage marathons with ease. From marathon exploration to secure registrations and profile tracking — it’s a one-stop hub for all your running goals.

This project is built using **React 19**, **Tailwind CSS 4**, **ShadCN UI**, and **Firebase Auth**, powered by **Vite** for blazing-fast performance.

---

## 🌐 Live Site

Check it out live:

- 🔗 [MarathonHub on Netlify]( https://marathon-managment-by-rakib.netlify.app/)
- 🔗 [MarathonHub on Surge](marathon-managment-by-rakib.surgh.sh/)

---

## 📸 Screenshots

All screenshots are stored in the `/public` folder. Here are some of the key pages:

- **🏠 Home Page**  
  ![Home](../client/public/home_hero.png)

- **🏠 Home FAQ**  
  ![Home || FAQ](../client/public/home_faq.png)

- **🏠 Home PRICINGe**  
  ![Home](../client/public/home_pricing.png)

- **📋 Marathon List**  
  ![MarathonList](../client/public/marathons.png)

- **🔍 Marathon Detail Page**  
  ![MarathonDetail](../client/public/marathon_details.png)

- **🧾 Registration Page**  
  ![Register](../client/public/register.png)

- **🧾 Login Page**  
  ![Login](../client/public/login.png)

- **🧑‍💼 Profile Dashboard**  
  ![Profile](../client/public/profile_page.png)

- **🧑‍💼 My Marathon List**  
  ![My Marathon ](../client/public/dashboard_my_marathons.png)

- **🧑‍💼 My Apply List**  
  ![My Apply List](../client/public/dashboard_my_apply_list.png)

- **🧑‍💼 Dashboard Add Marathon**  
  ![Add Marathon](../client/public/dashboard_add_marathon.png)

- **📬 Forgot Password Page**  
  ![ForgotPassword](../client/public/forgotpassword.png)

- **🚫 404 Not Found**  
  ![NotFound](../client/public/notfound.png)


---

## ✨ Key Features

- 🏃 Browse All Upcoming Marathons
- 📅 Register For Events with Auto-filled Forms
- 👤 User Dashboard with My Marathons & Apply List
- 🔐 Protected Routes using Firebase Auth
- ✏️ Profile Update with Bio, Blood Group, and More
- 📈 Real-time Registration Count with Visual Feedback
- 🎉 Animations and Sliders using Lottie & Swiper
- 🔎 Search, Filter, Sort on Apply List
- 🌓 Dark/Light Mode with Theme Toggle

---

## 🧩 Tech Stack

### Frontend
* **React 19** – Modern UI library with latest features.
* **React Router 7** – Advanced client-side routing.
* **Tailwind CSS 4** – Utility-first CSS framework.
* **ShadCN** – Beautiful Tailwind component library.
* **Motion** – Powerful animation library (formerly Framer Motion).
* **Firebase Auth** – Secure authentication system.
* **Vite** – Lightning-fast build tool.
* **React Tooltip** – Interactive tooltips.
* **React Icons** – Comprehensive icon library.
* **Swiper** – Modern touch slider.
* **Lottie React** – High-quality animations.
* **Moment.js** – Date and time formatting.
* **React Datepicker** – For Getting the date from a range.

### Libraries Used
- `react-toastify`, `clsx`, `axios`, `lucide-react`, `@radix-ui`, `motion`, `tailwind-merge`, and more

---

## 🏗️ Project Structure 
```
client/
├── public/  
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable UI components
│   │   ├── AbsoluteLoader.jsx
│   │   ├── GoBackButton.jsx
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx
│   │   ├── Table.jsx
│   │   └── UpdateMarathonModal.jsx
│   ├── context/         # Context providers
│   │   ├── AuthContext.jsx
│   │   └── PrivateRoute.jsx
│   ├── firebase/        # Firebase configuration
│   ├── layouts/         # Layout components
│   │   ├── DashboardLayout.jsx
│   │   └── HomeLayout.jsx
│   ├── lib/             # Utility functions
│   │   ├── useAxiosSecure.js
│   │   └── utils.jsx
│   ├── pages/           # Route components
│   │   ├── AddMarathon.jsx
│   │   ├── Dashboard/Index.jsx
│   │   ├── EditProfilePage.jsx
│   │   ├── MarathonDetail.jsx
│   │   ├── MarathonList.jsx
│   │   ├── MyApplyList.jsx
│   │   ├── MyMarathonsList.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── Profile.jsx
│   │   └── RegistrationForm.jsx
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
└── README.md
```

---

## 📦 Installation

### Client Setup

1. **Clone the client repository**:
   ```bash
   git clone https://github.com/rakibhasansohag/marathon-hub.git
   cd marathon-hub
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or yarn install
   ```

3. **Set up environment variables**:
   * Create a `.env` file in the project root.
   * Add your Firebase config:
     ```env
     VITE_FIREBASE_API_KEY=YOUR_API_KEY
     VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
     VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
     VITE_FIREBASE_APP_ID=YOUR_APP_ID
     ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or yarn dev
   ```

## 🚀 Deployment

### Client Deployment

**Netlify**:
1. Push your code to GitHub.
2. Connect your repo to Netlify and set build command `npm run build`.
3. Add the same environment variables in Netlify's dashboard.

**Surge**:
1. Install Surge globally: `npm install -g surge`
2. Build the app: `npm run build`
3. Deploy: `surge ./dist`

### Server Deployment
Deploy your Node.js server to platforms like Heroku, Railway, or Vercel, ensuring environment variables are properly configured.

---

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request to help improve GardenHub and make it even more useful for the gardening community.

---

## 👨‍💻 Author

**Rakib Hasan Sohag**
- GitHub: [@rakibhasansohag](https://github.com/rakibhasansohag)

---

*This project is for learning purposes and aims to create a thriving community for marathons enthusiasts worldwide.*
