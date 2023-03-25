import { render, screen } from '@testing-library/react';
import Avatar from '..';

describe('test avatar', () => {
  it('test avatar nickName rendered', () => {
    render(<Avatar nickname={'啊'} />);

    // act
    const avatar = screen.getByTestId('avatar');

    const textDom = avatar.querySelector('.ant-avatar-string');

    expect(textDom?.textContent).toBe('A');
  });
});
