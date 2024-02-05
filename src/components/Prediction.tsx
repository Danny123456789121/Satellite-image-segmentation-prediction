import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

interface PredictionProps {
  imageFile: File;
}

interface PredictionResponse {
  original_image: string;
  mask: string;
  color_percentages: Record<string, number>;
}
const Prediction: React.FC<PredictionProps> = ({ imageFile }) => {
  const [loading, setLoading] = useState(false);
  const [predictionResponse, setPredictionResponse] =
    useState<PredictionResponse>();

  async function fetchPrediction() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch('http://localhost:8000/classify', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });

      setPredictionResponse(await response.json());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(predictionResponse);
  }, [predictionResponse]);

  return (
    <>
      <Button onClick={fetchPrediction} type="primary" loading={loading}>
        {loading ? 'Predicting' : 'Predict'}
      </Button>

      {predictionResponse && (
        <>
          <img
            src={`data:image/png;base64, ${predictionResponse.original_image}`}
            alt="Original Image"
          />
          <img
            src={`data:image/png;base64, ${predictionResponse.mask}`}
            alt="Mask Image"
          />
          <div>
            Color Percentages:{' '}
            {JSON.stringify(predictionResponse.color_percentages)}
          </div>
        </>
      )}
    </>
  );
};

export default Prediction;
