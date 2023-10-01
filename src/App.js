import { useEffect, useState } from 'react';
import './App.css';
import Toolbar from './Toolbar';
import { volumeRender } from './volumeRender';
import { Slider } from '@mui/material';

function App() {
  const [workstation, setWorkstation] = useState([]);
  const [axialPos, setAxialPos] = useState(0.5);
  const [coronalPos, setCoronalPos] = useState(0.5);
  const [sagitalPos, setSagitalPos] = useState(0.5);
  useEffect(()=>{
    const canvas = document.getElementById('volume-render-canvas');
    const tempWorkstation = new volumeRender(canvas);
    setWorkstation(tempWorkstation);
  }, [])

  const updateCoronalPos = (event, newVal) => {
    setCoronalPos(newVal)
    workstation.updateCoronalPos(newVal)
  }

  const updateAxialPos = (event, newVal) => {
    setAxialPos(newVal)
    workstation.updateAxialPos(newVal)
  }

  const updateSagitalPos = (event, newVal) => {
    setSagitalPos(newVal)
    workstation.updateSagitalPos(newVal)
  }

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    if (selectedFile) {
      document.getElementById("workstation-container").style.display = 'flex';
      reader.onload = function (e) {
        const binaryData = e.target.result;
        workstation.updateTexture(new Uint8Array(binaryData));
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  }
  return (
    <div className="App">
      <Toolbar onBrowse={handleFileChange} />
      <div id='workstation-container'>
        <div className='sliders-container'>
          <div className='slider'>
            Axial Slider
              <Slider min={0} max={1} step={0.01} value={axialPos} onChange={updateAxialPos}/>
          </div>
          <div className='slider'>
            Coronal Slider
            <Slider value={coronalPos} onChange={updateCoronalPos} min={0} max={1} step={0.01}/>
          </div>
          <div className='slider'>
            Sagital Slider
              <Slider min={0} max={1} step={0.01} value={sagitalPos} onChange={updateSagitalPos}/>
          </div>
        </div>
          <canvas id='volume-render-canvas' className="babylon-canvas"/>
      </div>
    </div>
  );
}

export default App;
