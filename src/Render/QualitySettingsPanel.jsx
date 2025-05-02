import '../style.css';
import { useState } from 'react';
import settingsIcon from '/MyOffice/assets/Settings.svg';

export default function QualitySettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Balanced');
  const options = ['Performance', 'Balanced', 'Ultra'];

  return (
    <div
      className="quality-panel-container"
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onPointerMove={(e) => e.stopPropagation()}
    >
      <button
        className="gear-button"
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
      >
        <img src={settingsIcon} alt="Settings" className="gear-icon" />
      </button>

      {isOpen && (
        <div className="quality-panel">
          <h3 className="quality-title">QUALITY OPTIONS</h3>
          <div className="quality-options">
            {options.map((option) => (
              <label
                key={option}
                className={`quality-option ${selected === option ? 'selected' : ''}`}
                onClick={() => setSelected(option)}
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