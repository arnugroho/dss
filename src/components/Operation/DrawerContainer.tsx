import {
  CopyOutlined,
  DeleteFilled,
} from '@ant-design/icons';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  Col,
  Divider as DividerAntd,
  Drawer,
  MenuProps,
  Row,

} from 'antd';
import React, { useEffect } from 'react';

const DrawerContainer: React.FC<any> = ({
  showDetail,
  setShowDetail,
  currentRow,
  columns,
  handleRemove,
  handleDetail,
}) => {
  const items: MenuProps['items'] = [
    {
      key: 'duplicate',
      label: 'Duplicate',
      icon: <CopyOutlined />,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteFilled />,
      danger: true,
      onClick: () => {
        handleRemove();
      },
    },
  ];

  useEffect(() => {}, [currentRow]);

  return (
    <Drawer
      width={600}
      open={showDetail}
      onClose={() => {
        // setCurrentRow({});
        setShowDetail(false);
      }}
      closable={false}
    >
      <>
        {/*<Row justify="space-between" align="middle" style={{ paddingTop: 0, paddingBottom: 35 }}>*/}
        {/*  <Col>/!* <h3>{currentRow.accountName}</h3> *!/</Col>*/}
        {/*  <Col>*/}
        {/*    <Space size={0}>*/}
        {/*      <Space size={5}>*/}
        {/*        <Tooltip trigger={'hover'} placement={'bottom'} title="Detail">*/}
        {/*          <Button*/}
        {/*            type="primary"*/}
        {/*            shape="circle"*/}
        {/*            key="detailConfig"*/}
        {/*            icon={<LoginOutlined />}*/}
        {/*            onClick={() => {*/}
        {/*              handleDetail();*/}
        {/*            }}*/}
        {/*          ></Button>*/}
        {/*        </Tooltip>*/}
        {/*      </Space>*/}
        {/*      <Divider*/}
        {/*        style={{*/}
        {/*          height: 20,*/}
        {/*        }}*/}
        {/*        type="vertical"*/}
        {/*      />*/}
        {/*      <Space size={5}>*/}
        {/*        <Tooltip trigger={'hover'} placement={'bottom'} title="Starred">*/}
        {/*          <Button type="text" shape="default" icon={<StarOutlined />}></Button>*/}
        {/*        </Tooltip>*/}
        {/*      </Space>*/}
        {/*      <Divider*/}
        {/*        style={{*/}
        {/*          height: 20,*/}
        {/*        }}*/}
        {/*        type="vertical"*/}
        {/*      />*/}
        {/*      <Space size={5}>*/}
        {/*        <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>*/}
        {/*          <Button type="text" shape="default" icon={<EllipsisOutlined />} />*/}
        {/*        </Dropdown>*/}
        {/*      </Space>*/}
        {/*    </Space>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row>
          <Col span={24}>
            <ProDescriptions
              title="Description"
              column={2}
              layout="vertical"
              size={'small'}
              bordered
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.uuid,
              }}
              columns={columns as ProDescriptionsItemProps[]}
            />
          </Col>
        </Row>
        <DividerAntd
          orientation="center"
          style={{ marginTop: 100, marginBottom: 70 }}
        ></DividerAntd>
        {/*<Row>*/}
        {/*  <Col>*/}
        {/*    <h3>Gallery</h3>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </>
    </Drawer>
  );
};

export default DrawerContainer;
