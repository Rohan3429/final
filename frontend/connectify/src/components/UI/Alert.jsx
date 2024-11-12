// frontend/src/components/UI/Alert.jsx
import React from 'react';

export default function Alert({ message, type = "error" }) {
  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
}
