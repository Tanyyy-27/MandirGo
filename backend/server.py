"""
MandirGo Crowd Detection Backend
----------------------------------
Runs YOLOv8 (yolo8.pt) on 3 video files simultaneously.
Streams live people counts to the frontend via WebSocket.

Install deps:
    pip install fastapi uvicorn ultralytics opencv-python websockets

Run:
    uvicorn server:app --host 0.0.0.0 --port 8000 --reload
"""

import asyncio
import cv2
import json
import threading
from pathlib import Path

import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO

# ── Config ────────────────────────────────────────────────────────────────────
MODEL_PATH   = "models/yolov8m.pt"  # your model file
CONFIDENCE   = 0.25
IOU          = 0.40
IMG_SIZE     = 640                 # lower = faster for live video

# Map camera IDs → video file paths (update these to your actual files)
VIDEO_SOURCES = {
    "gate-a":    "videos/gate_a.mp4",
    "main-area": "videos/main_area.mp4",
    "gate-b":    "videos/gate_b.mp4",
}

INFERENCE_INTERVAL = 0.5           # seconds between inferences per camera
# ─────────────────────────────────────────────────────────────────────────────

app = FastAPI(title="MandirGo Crowd API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # tighten in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shared state: latest counts per camera
latest_counts: dict[str, int] = {k: 0 for k in VIDEO_SOURCES}
counts_lock = threading.Lock()

# ── YOLO Worker (one per camera, runs in a background thread) ─────────────────

def camera_worker(camera_id: str, video_path: str, model: YOLO):
    """
    Continuously reads frames from a video file (loops at end),
    runs YOLO inference, and updates latest_counts.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"[{camera_id}] ERROR: Cannot open video: {video_path}")
        return

    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    skip_frames = max(1, int(fps * INFERENCE_INTERVAL))  # only infer every N frames
    frame_idx = 0

    print(f"[{camera_id}] Started — {video_path}  (inference every {skip_frames} frames)")

    while True:
        ret, frame = cap.read()
        if not ret:
            # Loop video
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            frame_idx = 0
            continue

        frame_idx += 1
        if frame_idx % skip_frames != 0:
            continue  # skip this frame

        # Run inference
        results = model(
            frame,
            conf=CONFIDENCE,
            iou=IOU,
            imgsz=IMG_SIZE,
            classes=[0],       # class 0 = person in COCO
            verbose=False,
        )

        # Count people
        count = 0
        for result in results:
            count += sum(1 for cls in result.boxes.cls if int(cls) == 0)

        with counts_lock:
            latest_counts[camera_id] = count

        # Small sleep so the thread doesn't peg the CPU
        import time
        time.sleep(0.01)

    cap.release()


# ── Startup: load model + launch worker threads ───────────────────────────────

@app.on_event("startup")
def startup_event():
    print(f"Loading model: {MODEL_PATH}")
    model = YOLO(MODEL_PATH)

    for cam_id, vid_path in VIDEO_SOURCES.items():
        if not Path(vid_path).exists():
            print(f"[{cam_id}] WARNING: video not found at '{vid_path}' — counts will stay 0")
        t = threading.Thread(
            target=camera_worker,
            args=(cam_id, vid_path, model),
            daemon=True,
        )
        t.start()

    print("All camera workers started.")


# ── REST endpoint: latest snapshot ───────────────────────────────────────────

@app.get("/counts")
def get_counts():
    with counts_lock:
        data = dict(latest_counts)
    data["total"] = sum(data.values())
    return data


# ── WebSocket endpoint: push updates every second ────────────────────────────

@app.websocket("/ws/counts")
async def websocket_counts(ws: WebSocket):
    await ws.accept()
    print("WebSocket client connected")
    try:
        while True:
            with counts_lock:
                data = dict(latest_counts)
            data["total"] = sum(data.values())
            data["timestamp"] = asyncio.get_event_loop().time()
            await ws.send_text(json.dumps(data))
            await asyncio.sleep(1)          # push update every 1 second
    except WebSocketDisconnect:
        print("WebSocket client disconnected")
    except Exception as e:
        print(f"WebSocket error: {e}")