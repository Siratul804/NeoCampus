# **All-in-One University App** for the **NEOFETCH Hackathon**:

### 🚀 **Core Features to Implement**

1️⃣ **Cafeteria Menu & Meal Schedules**

- Display real-time daily meal menus with pricing.
- Add a **pre-ordering system** to save time.
  2️⃣ **University Bus Routes & Schedules**

- Provide **real-time bus tracking** for students.
- Send **notifications for delays & schedule changes**.
  3️⃣ **Class Schedules & Faculty Contacts**

- Show **personalized class schedules with reminders**.
- Track **assignment deadlines & exams** as To-dos.
  4️⃣ **Event & Club Management**

- Display the **university event calendar with RSVPs & reminders**.
- List **student clubs & activities**.
- 🔥 **Bonus:** An AI-powered **event recommender** based on student interests.
  5️⃣ **Campus Navigation & AR Map**

- Provide **real-time campus maps** to help students find locations.
- **AR wayfinding:** Allow students to point their camera at a building for location details.

---

### ⚙️ **Technical Implementation**

✅ **Platform**: Web (React.js, Next.js) or Mobile (React Native, Flutter).

✅ **Database**: Firebase, MongoDB, MySQL, PostgreSQL.

✅ **Deployment**: Web (Vercel, Netlify, Firebase) or Mobile (.apk).

✅ **State Management**: Redux, Zustand, or Riverpod.

✅ **Optional Authentication**: Can be added for user profiles.

---

### 🎯 **Hackathon Scoring Focus**

🎨 **UI/UX (20%)** → Clean, responsive, and user-friendly design.

⚡ **Feature Implementation (40%)** → Ensure core features work smoothly.

💡 **Innovation (10%)** → AI, ML, automation, or accessibility enhancements.

👨‍💻 **Team Collaboration (10%)** → Use GitHub, Trello, or similar tools.

📢 **System Presentation (20%)** → Ensure a stable, well-documented app.

🔥 **Bonus:** Extra 10% for **exceptional AI, security, or accessibility improvements**!

---

### 🏆 **Winning Edge Ideas**

- 🧠 **AI Chatbot** for answering student queries.
- 🎙️ **Voice Commands** for searching schedules, bus info, etc.
- 📍 **Live Crowd Tracking** in the cafeteria to avoid long queues.
- 🔔 **Smart Notifications** for class schedule changes & deadlines.
- 🌐 **Multilingual Support** for accessibility.

### .env

```
# database
MONGO_PASS=oIVOympTPF0RoMLp
MONGO=mongodb+srv://23201128:oIVOympTPF0RoMLp@neofetch.nq8ec.mongodb.net/?retryWrites=true&w=majority&appName=NeoFetch

# auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlYXItbGFyay01NC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_JomSl6FHkCn6HNZ2m5rygO6Y7NnRERHxUWFCxYtskS
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ai models
GROQ_API_KEY=
```
