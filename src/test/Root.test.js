import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../root/Root'
import { BrowserRouter } from 'react-router-dom';

it('renders Root component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Root />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
