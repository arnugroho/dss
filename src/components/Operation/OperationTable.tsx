import { EditOutlined, LoginOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Tooltip } from 'antd';
import React from 'react';

const actionButtonStatusDefault = {
  editable: true,
  showDetail: true,
  star: false,
  pin: true,
  duplicateHidden: false,
  deleteHidden: false,
  cart: false,
  export: false,
  print: false,
};
const OperationTable: React.FC<any> = ({
  action,
  menuDataItem,
  handleDetail,
  handlePrint,
  actionButtonStatus = actionButtonStatusDefault,
}) => {
  return (
    <Space size={0}>
      {actionButtonStatus.editable === false ? (
        <></>
      ) : (
        <Tooltip trigger={'hover'} placement={'bottom'} title="Edit">
          <Button
            type="text"
            key="editConfig"
            onClick={() => {
              action?.startEditable?.(menuDataItem.key);
            }}
            icon={<EditOutlined />}
          ></Button>
        </Tooltip>
      )}
      {actionButtonStatus.showDetail === false ? (
        <></>
      ) : (
        <Tooltip trigger={'hover'} placement={'bottom'} title="Detail">
          <Button
            type="text"
            key="detailConfig"
            onClick={() => {
              handleDetail();
            }}
            icon={<LoginOutlined />}
          ></Button>
        </Tooltip>
      )}
      <Divider
        style={{
          height: 20,
        }}
        type="vertical"
      />

      {!actionButtonStatus.print ? (
        <></>
      ) : (
        <Tooltip trigger={'hover'} placement={'bottom'} title="Print">
          <Button
            type="text"
            onClick={() => {
              handlePrint();
            }}
            icon={<PrinterOutlined />}
          ></Button>
        </Tooltip>
      )}
      <Divider
        style={{
          height: 20,
        }}
        type="vertical"
      />
      {/*{actionButtonStatus.editable ? (*/}
      {/*<TableDropdown*/}
      {/*  key="actionGroup"*/}
      {/*  menus={[*/}
      {/*    {*/}
      {/*      key: 'duplicate',*/}
      {/*      name: 'Duplicate',*/}
      {/*      icon: <CopyOutlined />,*/}
      {/*      hidden: actionButtonStatus.duplicateHidden,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      key: 'delete',*/}
      {/*      name: 'Delete',*/}
      {/*      hidden: actionButtonStatus.deleteHidden,*/}
      {/*      danger: true,*/}
      {/*      icon: <DeleteFilled />,*/}
      {/*      onClick: () => {*/}
      {/*        handleRemove();*/}
      {/*      },*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}
    </Space>
  );
};

export default OperationTable;
