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

Build and run the docker-compose from the root (this might take a while the first time)
```
docker-compose up --build
```

### 2.1 Run locally 

> Prerequisite: python 3.10, NodeJs 20.11.1

Navigate into the backend and then install the Python dependencies
```
pip install -r requirements.txt
```

Run backend
```
uvicorn app:app --host 0.0.0.0 --port 8000
```

Navigate into the frontend and then install the JavaScript dependencies:
```
npm install
```

Start the frontend in a dev environment
```
npm run dev
```

### 3. Links

When run via **docker**, navigate to `http://localhost`.\
When run **locally**, navigate to `http://localhost:3000/sis-frontend/`.

### 4. Usage

This Tool uses the Google Maps Static API to fetch images for making a prediction. \
Therefore you need to make a [Google Maps Platform](https://developers.google.com/maps) account and generate an API Key that can be used for the Maps Static API

#### 1. Fetch the desired image for the segmentation prediction 
- Enter a valid Google Maps Static API key
- Enter the Latitude of the place
- Enter the Longitude of the place
- Select a zoom level for the image (for optimal result aim between 16-19)

#### 2. Prediction
Click on the button to predict the segmentation mask for the retrieved satellite image.\
The legend indicates how much area is covered by the corresponding category.
