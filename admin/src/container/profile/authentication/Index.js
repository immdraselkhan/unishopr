import React from 'react';
import { Row, Col } from 'antd';

const AuthLayout = WraperContent => {
  return () => {
    return (
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <WraperContent />
        </Col>
      </Row>
    );
  };
};

export default AuthLayout;
