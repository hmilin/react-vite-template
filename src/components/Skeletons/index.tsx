import { Col, ColProps, Row, Skeleton, SkeletonProps } from 'antd';
import { PropsWithChildren, ReactNode } from 'react';

type GridColProps = Pick<ColProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>;

type SkeletonsProps = SkeletonProps &
  GridColProps & {
    count?: number;
    spacing?: number;
    wrapperWidth?: number | string;
    /** use custom Skeleton Node */
    custom?: ReactNode;
    loading?: boolean;
  };

/** 一组骨屏架 */
const Skeletons: React.FC<PropsWithChildren<SkeletonsProps>> = ({
  wrapperWidth,
  count = 1,
  custom,
  children,
  spacing = 24,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  loading = true,
  ...props
}) => {
  const containerStyle = {
    width: wrapperWidth,
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle} data-testid="skeleton-group">
      {loading ? (
        <Row
          style={{
            marginBottom: -spacing,
          }}
          gutter={spacing}
          justify="center"
        >
          {Array.from({ length: count }).map((_, idx) => (
            <Col style={{ marginBottom: spacing }} key={idx} {...{ xs, sm, md, lg, xl, xxl }}>
              {custom ? custom : <Skeleton {...props} />}
            </Col>
          ))}
        </Row>
      ) : (
        children
      )}
    </div>
  );
};

export default Skeletons;
