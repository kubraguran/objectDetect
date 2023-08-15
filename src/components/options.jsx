import ToggleButton from "../common/toggleButton";

const Options = () => {
  return (
    <div className="bg-gray-900 text-white m-4 rounded-lg p-4">
      <div className="mr-10">
        <ul>
          <li className="flex justify-between items-center mb-2">
            <span>1. VIRTUAL FENCE</span>
            <ToggleButton name="virtual-fence" />
          </li>
          <li className="flex justify-between items-center mb-2">
            <span className="mr-4">2. PERSONAL PROTECTIVE EQUIPMENT</span>
            <ToggleButton name="ppe" />
          </li>
          <li className="flex justify-between items-center mb-2">
            <span>3. FACE RECOGNITION</span>
            <ToggleButton name="face-recognition" />
          </li>
          <li className="flex justify-between items-center mb-2">
            <span>4. PEOPLE COUNTING</span>
            <ToggleButton name="people-counting" />
          </li>
          <li className="flex justify-between items-center mb-2">
            <span>5. POSE ESTIMATION</span>
            <ToggleButton name="pose-estimation" />
          </li>
          <li className="flex justify-between items-center mb-2">
            <span>6. FALL DETECTION</span>
            <ToggleButton name="fall-detection" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Options;
