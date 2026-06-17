# MandirGo Backend — Crowd Detection Service

A FastAPI service that runs YOLOv8 on live/recorded video feeds and streams
people-count data to the frontend over WebSocket.

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

## Structure

```
backend/
├── server.py           FastAPI app + YOLOv8 inference loop
├── models/
│   └── yolov8m.pt       YOLOv8 model weights
├── videos/
│   └── 1.mp4             Sample video feed
├── requirements.txt
└── README.md
```

## Known issue to address

`VIDEO_SOURCES` in `server.py` expects three files (`gate_a.mp4`, `main_area.mp4`,
`gate_b.mp4`) but only one sample video (`1.mp4`) is currently included.
Add the missing files under `videos/`, or update `VIDEO_SOURCES` to match what
you actually have.
