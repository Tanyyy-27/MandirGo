# MandirGo

Divine peace, managed intelligently. MandirGo helps temple administrations
manage crowds, share live updates, and give devotees a safer, smoother
darshan experience.

Founded by Tanmay Yenpure.

## Project structure

```
MandirGo/
├── frontend/        React + Parcel web app
│   └── src/
│       ├── assets/      Images and other static media
│       ├── components/  Reusable UI pieces (Header, AdminLogin, features)
│       ├── pages/        Route-level pages (Home, About, Booking, etc.)
│       ├── utils/        Helper modules
│       ├── legacy/       Older/unused draft files kept for reference
│       ├── App.jsx       Router + top-level layout
│       └── index.jsx     React entry point
├── backend/         FastAPI + YOLOv8 crowd-detection service
│   ├── server.py
│   ├── models/
│   └── videos/
└── README.md
```

## Getting started

### Frontend

```bash
cd frontend
npm install
npm start        # local dev server
npm run build    # production build
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

See `backend/README.md` for backend-specific notes and a known issue with
the sample video files.

## Social

Follow MandirGo on [Instagram](https://www.instagram.com/mandirgo_official?igsh=MTRpeTB0NXZrMWo3dg==).
