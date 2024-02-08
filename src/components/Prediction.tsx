import React, { useState } from 'react';
import { Button, Col, Flex, Image, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';

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

  const colorMap: Record<string, string> = {
    Water: '#0000ff',
    Land: '#ffff00',
    Road: '#ff0000',
    Building: '#00ff00',
    Vegetation: '#00ffff',
    Unlabeled: '#808080',
  };

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

  return (
    <>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Button onClick={fetchPrediction} type="primary" loading={loading}>
          {loading ? 'Predicting' : 'Predict'}
        </Button>
        {predictionResponse && (
          <Flex>
            <Image
              src={`data:image/png;base64, ${predictionResponse.mask}`}
              style={{ border: '0px', borderRadius: '8px', maxWidth: '512px' }}
            />
            <Col span={12} style={{ paddingLeft: '20px' }}>
              <Row align="top">
                <Title level={5}> Color Percentages: </Title>{' '}
              </Row>
              {Object.entries(predictionResponse.color_percentages).map(
                ([index, percentage]) => {
                  const color = Object.keys(colorMap)[parseInt(index)];
                  return (
                    <Row key={index}>
                      <div
                        style={{
                          backgroundColor: colorMap[color],
                          width: '20px',
                          height: '20px',
                          marginRight: '8px',
                          marginBottom: '8px',
                          border: '0px',
                          borderRadius: '4px',
                        }}
                      ></div>
                      {color}: {percentage}%
                    </Row>
                  );
                },
              )}
            </Col>
          </Flex>
        )}
      </Space>
    </>
  );
};

export default Prediction;
