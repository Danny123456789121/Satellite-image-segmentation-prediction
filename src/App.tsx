import InputForm from './components/InputForm.tsx';
import { useState } from 'react';
import { Store } from 'antd/lib/form/interface';
import cropImage from './script/cropImage.ts';
import { Col, Divider, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import Prediction from './components/Prediction.tsx';

const App = () => {
  const [imageURL, setImageURL] = useState<string | undefined>();
  const [imageFile, setimageFile] = useState<File | undefined>();
  const onCustomFinish = async (values: Store) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/staticmap?center=${values.Latitude},${values.Longitude}&zoom=${values.Zoom}&size=2048x2048&maptype=satellite&key=${values.key}`,
    );
    let blob = await response.blob();
    blob = await cropImage(blob, 20);
    setImageURL(URL.createObjectURL(blob));
    setimageFile(new File([blob], 'image.png', { type: blob.type }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={1}>Satellite Image Segmentation Prediction</Title>
      <Divider />
      <Row gutter={[16, 16]} align="top" justify="space-between">
        <Col xs={24} sm={12}>
          <Title level={4}>1. Fetch Image for Prediction</Title>
          <Paragraph>
            To use this application, you must enter a Google Static API key, the
            latitude and longitude of the desired location. For the best
            prediction, select a zoom level between 16-18.
          </Paragraph>
          <InputForm onCustomFinish={onCustomFinish} />
        </Col>
        {imageURL && (
          <Col xs={24} sm={12}>
            <img
              src={imageURL}
              width="512px"
              height="512px"
              style={{ border: '0px', borderRadius: '8px' }}
              alt=""
            />
          </Col>
        )}
      </Row>
      <Row gutter={[16, 16]} align="top" justify="space-between">
        <Col xs={24} sm={12}>
          <Title level={4}>2. Generate prediction from Image</Title>
          <Paragraph>
            {!imageURL
              ? 'Please fetch an Image first'
              : 'Click the button below to generate a prediction from the image above'}
          </Paragraph>
          {imageFile && <Prediction imageFile={imageFile} />}
        </Col>
      </Row>
    </div>
  );
};

export default App;
