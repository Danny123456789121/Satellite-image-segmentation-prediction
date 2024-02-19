# Satellite Image Segmentation Prediction

This project is a web application for a satellite image segmentation prediction. It uses a variety of technologies including TypeScript, JavaScript, React, Python, and Docker.

## Setup

### 1. Clone the repository:
``` 
git clone https://github.com/Danny123456789121/Satellite-image-segmentation-prediction.git --recursive 
```

If you forgot the `--recursive` flag during the clone you can navigate into the model_Classify_Backend folder and run:
``` 
git submodule update --init in the 
```

### 2. Run web app
You can either choose to run the web app locally to make changes or via Docker.

### 2.1 Run via Docker

> Prerequisite: Docker

Build and run the docker-compose from root
```
docker-compose up --build
```

### 2.1 Run local

> Prerequisite: python 3.10, NodeJs 20.11.1

##### Run backend on localhost:8000

Navigate into the backend and then install the Python dependencies
```
pip install -r requirements.txt
```

Run backend on localhost
```
uvicorn app:app --host 0.0.0.0 --port 8000
```

##### Run frontend on localhost:3000
Navigate into the frontend and then install the JavaScript dependencies:
```
npm install
```

Start the frontend in a dev environment
```
npm run dev
```

### 3. Usage

Open your web browser and navigate to `http://localhost:3000`.
