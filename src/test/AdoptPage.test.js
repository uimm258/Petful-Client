import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AdoptPage from '../AdoptPage/AdoptPage';

describe('Article Page', () => {
    it('renders without crashing', () => {
      const div = document.createElement('root');
      ReactDOM.render(
        <BrowserRouter>
          <AdoptPage />
        </BrowserRouter>,
        div
      );
    });
  });
  