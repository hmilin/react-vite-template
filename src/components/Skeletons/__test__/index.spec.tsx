import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Skeletons from '..';

describe('testing skeleton group rendered', () => {
  test('4 papagraphs', () => {
    render(<Skeletons count={4} sm={24} />);

    const container = screen.queryByTestId('skeleton-group');

    const list = container?.querySelectorAll('.ant-skeleton');
    const titleEle = list?.[0]?.querySelector('.ant-skeleton-title');
    const paragraphEle = list?.[0]?.querySelector('.ant-skeleton-paragraph');

    expect(list?.length).toBe(4);
    expect(titleEle).toBeTruthy();
    expect(paragraphEle).toBeTruthy();
  });

  test('2*4 cards', () => {
    render(
      <Skeletons
        count={8}
        sm={6}
        title={{ width: '100%', style: { height: 200 } }}
        paragraph={false}
      />,
    );

    const container = screen.queryByTestId('skeleton-group');

    const list = container?.querySelectorAll('.ant-skeleton');
    const titleEle = list?.[0]?.querySelector('.ant-skeleton-title');
    const paragraphEle = list?.[0]?.querySelector('.ant-skeleton-paragraph');

    expect(list?.length).toBe(8);
    expect(titleEle).toBeTruthy();
    expect(paragraphEle).toBeNull();
  });

  test('loading state', () => {
    const { unmount } = render(<Skeletons loading={true} count={2} sm={6} />);

    const container = screen.queryByTestId('skeleton-group');
    const skeleton = container?.querySelector('.ant-skeleton');
    expect(skeleton).toBeTruthy();

    unmount();
    render(<Skeletons loading={false} count={2} sm={6} />);

    const container1 = screen.queryByTestId('skeleton-group');
    const skeleton1 = container1?.querySelector('.ant-skeleton');
    expect(skeleton1).toBeNull();
  });
});
