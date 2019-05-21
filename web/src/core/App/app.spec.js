import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('<App />', () => {
  it('renders 1 <App /> component', () => {
    const component = shallow(<App loggedIn={false} loading={false} />);
    expect(component).toHaveLength(1);
  });
});
