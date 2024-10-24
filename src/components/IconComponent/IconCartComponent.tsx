import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';

const IconShoppingComponent: React.FC<any> = ({ isCart }) => {
  return (
    <>
      {isCart === true ? (
        <ShoppingCartOutlined style={{ color: '#52c41a' }} />
      ) : (
        <ShoppingCartOutlined />
      )}
    </>
  );
};

export default IconShoppingComponent;
