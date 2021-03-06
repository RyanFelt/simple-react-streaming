import React from 'react';
import 'App.css';
import { Spinner } from 'react-bootstrap';
import './index.css';

export const LoadingSpinner = () => {
  return (
    <div className="full-page">
      <div className="center-of-page">
        <Spinner animation="border" />
      </div>
    </div>
  );
};
