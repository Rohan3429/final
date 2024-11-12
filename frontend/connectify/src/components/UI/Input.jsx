// frontend/src/components/UI/Input.jsx
import React from 'react';

export default function Input({ name, placeholder, type = "text", value, onChange }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="form-input"
    />
  );
}
