import './App.css';
import InputForm from './components/InputForm.tsx';
import { useState } from 'react';
import { Store } from 'antd/lib/form/interface';
import cropImage from './script/cropImage.ts';

const App = () => {
  const [imageURL, setImageURL] = useState<string | undefined>();

  const onCustomFinish = async (values: Store) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/staticmap?center=${values.Latitude},${values.Longitude}&zoom=${values.Zoom}&size=2048x2048&maptype=satellite&key=${values.key}`,
    );
    let blob = await response.blob();
    blob = await cropImage(blob, 20);
    setImageURL(URL.createObjectURL(blob));
  };

  return (
    <>
      <InputForm onCustomFinish={onCustomFinish} />
      {imageURL && (
        <img
          src={imageURL}
          width="512px"
          height="512px"
          style={{ border: '0px' }}
          alt=""
        />
      )}
    </>
  );
};

export default App;
