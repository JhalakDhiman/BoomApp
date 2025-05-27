BoomApp is a full-stack social streaming platform that combines short-form and long-form video content. It enables user authentication, video uploads, monetization via gifting, access control for premium content, and interactive comments.

---------------------------------------------------------Tech Stack----------------------------------------------------------------------

### Frontend
- **React.js** – UI development
- **React Router DOM** – Routing
- **Axios** – API handling
- **Tailwind CSS** – Styling
- **Context API** – Global state management

### Backend
- **Node.js** & **Express.js** – Server-side development
- **MongoDB** & **Mongoose** – Database
- **JWT** – Authentication
- **Multer** – File upload handling
- **dotenv** – Environment configuration
- **CORS** – Cross-origin requests

 Installation & Setup Instructions:
git clone https://github.com/JhalakDhiman/BoomApp.git
cd BoomApp

----------------------------------------------------setup---------------------------------------------------------------------------

**Backend Setup**
  cd backend
  npm install
  
  for running (add script in package.json like :
  "dev":"nodemon index.js"
  )
  
  **command**: npm run dev

**Frontend Setup**
  cd frontend
  npm install
  **command** : npm start

---------------------------------------------------Folder sturcture------------------------------------------------------------------------

**Folder Structure**
BoomApp/
├── frontend/        # React frontend
└── backend/          # Express backend


-------------------------------------API Documentation------------------------------------------------------------------------

**Auth Routes**
POST /api/v1/auth/signup – Register new user

POST /api/v1/auth/login – Login existing user

**Video Routes**
POST /api/v1/videos/uploadVideo – Upload a video

POST /api/v1/videos/purchaseVideo/:videoId – purchase

GET /api/v1/videos/getVideo – Fetch a particular videos

**Feed Routes**
GET /api/v1/feed/getFeed – get all videos

**Gift Routes**
POST /api/v1/gift/createGift/:videoId – Send gift to creator

**Comment Routes**
GET /api/v1/comments/getComments/:videoId – Get all comments for a video (sorted latest first)
POST /api/v1/comments/postComment/:videoId – Post a comment
