import '../style.css';
import { useState } from 'react';
import settingsIcon from '/assets/Settings.svg';

export default function QualitySettingsPanel({ quality, onQualityChange, isInDefaultView }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['Performance', 'Balanced', 'Ultra'];

  const handleOptionClick = (option, e) => {
    e.stopPropagation();
    onQualityChange(option);
  };

  return (
    <div
      className={`quality-panel-container ${!isInDefaultView ? 'hidden' : ''}`}
      onClick={(e) => e.stopPropagation()} // Changed from onPointerDown to onClick
    >
      <button
        className="gear-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <img src={settingsIcon} alt="Settings" className="gear-icon" />
      </button>

      {isOpen && (
        <div className="quality-panel" onClick={(e) => e.stopPropagation()}>
          <h3 className="quality-title">QUALITY OPTIONS</h3>
          <div className="quality-options">
            {options.map((option) => (
              <label
                key={option}
                className={`quality-option ${quality === option ? 'selected' : ''}`}
                onClick={(e) => handleOptionClick(option, e)} // Use the new handler
              >
                <span className="option-label">{option}</span>
                <span className="radio-indicator" />
              </label>
            ))}
          </div>
          <p className="quality-footer">
            ⚠ A reload will be necessary to apply changes
          </p>
        </div>
      )}
    </div>
  );
}