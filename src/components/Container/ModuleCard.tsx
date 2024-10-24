import IconShoppingComponent from '@/components/IconComponent/IconCartComponent';
import {
  AppstoreOutlined,
  CopyOutlined,
  DeleteFilled,
  EyeOutlined,
  LoginOutlined,
  PlusOutlined,
  ReloadOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { ProDescriptions, ProList, TableDropdown } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Button, Col, Divider, Dropdown, Image, Row, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const ModuleCard: React.FC<any> = ({
  setCurrentRow,
  setShowDrawer,
  actionRef,
  handleModalOpen,
  setIsNew,
  loadPaged,
  handleRemove,
  handleDetail,
  reload,
  columnsCardDescription,
  metasCard,
  showCart = false,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [ghost] = useState<boolean>(true);

  const [ellipsis] = useState(true);

  const [cardColumn, setCardColumn] = useState<any>(4);

  const cardColumnDropdown: MenuProps['items'] = [
    {
      key: '1',
      label: '1',
      onClick: () => {
        setCardColumn(1);
      },
    },
    {
      key: '2',
      label: '2',
      onClick: () => {
        setCardColumn(2);
      },
    },
    {
      key: '3',
      label: '3',
      onClick: () => {
        setCardColumn(3);
      },
    },
    {
      key: '4',
      label: '4',
      onClick: () => {
        setCardColumn(4);
      },
    },
  ];

  return (
    <>
      <Row gutter={18}>
        <Col span={24}>
          <ProList<any>
            rowKey="uuid"
            actionRef={actionRef}
            ghost={ghost}
            itemCardProps={{
              ghost,
            }}
            toolBarRender={() => {
              return [
                <>
                  <Space size={10}>
                    <Space size={0}></Space>
                    <Space size={5}>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          handleModalOpen(true);
                          setIsNew(true);
                        }}
                      >
                        New
                      </Button>
                      <Button type="text" icon={<ReloadOutlined />}></Button>
                      {isTabletOrMobile ? (
                        ''
                      ) : (
                        <Dropdown
                          menu={{ items: cardColumnDropdown }}
                          arrow={{ pointAtCenter: true }}
                        >
                          <Button type="text" icon={<AppstoreOutlined />}></Button>
                        </Dropdown>
                      )}
                    </Space>
                  </Space>
                </>,
              ];
            }}
            search={{
              filterType: 'query',
              searchText: 'Search',
              labelWidth: 'auto',
              style: {
                borderRadius: 6,
              },
            }}
            pagination={{
              defaultPageSize: 8,
              showSizeChanger: true,
            }}
            showActions="hover"
            showExtra="hover"
            itemLayout="vertical"
            grid={{ gutter: 16, column: isTabletOrMobile ? 1 : cardColumn }}
            onItem={() => {
              return {
                onMouseEnter: () => {
                  // console.log(record);
                },
                onClick: () => {
                  // console.log(record);
                },
              };
            }}
            request={loadPaged}
            metas={{
              title: {
                title: metasCard.title.title,
                dataIndex: metasCard.title.dataIndex,
                render: (_, row) => {
                  return (
                    <>
                      <Row align={'top'}>
                        <Col>
                          <Typography.Text
                            // level={5}
                            style={
                              ellipsis
                                ? { maxWidth: 120, marginInline: 15, marginBlock: 7 }
                                : undefined
                            }
                            ellipsis={
                              ellipsis ? { tooltip: row[metasCard.title.dataIndex] } : false
                            }
                          >
                            {row[metasCard.title.dataIndex]}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </>
                  );
                },
              },
              subTitle: {
                title: metasCard.subTitle.title,
                dataIndex: metasCard.subTitle.dataIndex,
                render: () => {
                  return <></>;
                },
              },
              description: {
                title: metasCard.description.title,
                dataIndex: metasCard.description.dataIndex,
                render: () => {
                  return <></>;
                },
              },
              content: {
                title: metasCard.content.title,
                dataIndex: metasCard.content.dataIndex,
                render: (_, row) => {
                  let src = `${API_URL}/itemImage/file/newest/item/${row.itemUuid}`;
                  return (
                    <>
                      <div
                        style={{
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            marginBlock: 0,
                          }}
                        >
                          <Row justify="end">
                            <Col>
                              <Tag
                                color="blue"
                                style={
                                  ellipsis
                                    ? {
                                        maxWidth: 120,
                                        marginBlockStart: 0,
                                        marginBlockEnd: 15,
                                        marginInline: 0,
                                      }
                                    : undefined
                                }
                                key={row.uuid}
                              >
                                {row[metasCard.subTitle.dataIndex]}
                              </Tag>
                            </Col>
                          </Row>
                          <Row justify="center" style={{ marginBottom: 15 }}>
                            <Col span={24}>
                              <Image
                                width="100%"
                                src={src}
                                fallback="data:image/png;base64,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"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <ProDescriptions<any>
                                column={2}
                                layout="vertical"
                                size={'small'}
                                bordered
                                request={async () => ({
                                  data: row || {},
                                })}
                                params={{
                                  id: row?.uuid,
                                }}
                                columns={columnsCardDescription}
                              />
                            </Col>
                          </Row>
                          <Row justify="center">
                            <Col span={24}>
                              <Divider
                                style={{
                                  width: '100%',
                                  marginBottom: 15,
                                  marginTop: 30,
                                }}
                                type="horizontal"
                              ></Divider>
                            </Col>
                          </Row>
                          <Row justify="center">
                            <Col>
                              <Space direction="horizontal" size={0}>
                                <Tooltip
                                  key="peekConfig"
                                  trigger={'hover'}
                                  placement={'bottom'}
                                  title="Peek"
                                >
                                  <Button
                                    type="text"
                                    onClick={() => {
                                      setCurrentRow(row);
                                      setShowDrawer(true);
                                    }}
                                    icon={<EyeOutlined />}
                                  ></Button>
                                </Tooltip>
                                <Divider
                                  style={{
                                    height: 20,
                                  }}
                                  type="vertical"
                                />
                                <Tooltip
                                  key="detailConfig"
                                  trigger={'hover'}
                                  placement={'bottom'}
                                  title="Detail"
                                >
                                  <Button
                                    type="text"
                                    onClick={() => {
                                      handleDetail(row.uuid);
                                    }}
                                    icon={<LoginOutlined />}
                                  ></Button>
                                </Tooltip>
                                <Divider
                                  style={{
                                    height: 20,
                                  }}
                                  type="vertical"
                                />
                                <TableDropdown
                                  key="actionGroup"
                                  menus={[
                                    { key: 'duplicate', name: 'Duplicate', icon: <CopyOutlined /> },
                                    {
                                      key: 'delete',
                                      name: 'Delete',
                                      danger: true,
                                      icon: <DeleteFilled />,
                                      onClick: () => {
                                        handleRemove(row.uuid);
                                      },
                                    },
                                  ]}
                                />
                                <Divider
                                  style={{
                                    height: 20,
                                  }}
                                  type="vertical"
                                />
                                {!showCart ? (
                                  <></>
                                ) : (
                                  <Tooltip trigger={'hover'} placement={'bottom'} title="Cart">
                                    <Button
                                      type="text"
                                      onClick={() => {
                                        reload();
                                      }}
                                      icon={<IconShoppingComponent />}
                                    ></Button>
                                  </Tooltip>
                                )}
                              </Space>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </>
                  );
                },
              },
              // extra: {
              //   render: (_, row) => {
              //     return <></>;
              //   },
              // },
              actions: {
                cardActionProps: 'extra',
                render: (_, row) => {
                  return (
                    <>
                      <Row style={{ marginInline: 0, maxWidth: '100%' }}>
                        <Col>
                          <Tooltip
                            key="starred"
                            trigger={'hover'}
                            placement={'bottom'}
                            title="Starred"
                          >
                            <Button type="text" icon={<StarOutlined />}></Button>
                          </Tooltip>
                          <Tooltip
                            key="pinned"
                            trigger={'hover'}
                            placement={'bottom'}
                            title="Pinned"
                          >
                            <Button
                              type="text"
                              onClick={() => {
                                reload();
                              }}
                            ></Button>
                          </Tooltip>
                        </Col>
                      </Row>
                      <Row>
                        <Col></Col>
                      </Row>
                    </>
                  );
                },
              },
            }}
            // headerTitle="Account"
            // rowSelection={{
            //   onChange: (_, selectedRows) => {
            //     setSelectedRows(selectedRows);
            //   },
            //   // selections: [Table.SELE
            // }}
            tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
              return (
                <Space size={24}>
                  <span>
                    Selected {selectedRowKeys.length} item
                    <Button
                      type="dashed"
                      style={{ marginInlineStart: 12 }}
                      onClick={onCleanSelected}
                    >
                      Cancel Selection
                    </Button>
                  </span>
                  <span>{`Number of selected items: ${selectedRows.length} `}</span>
                </Space>
              );
            }}
            tableAlertOptionRender={() => {
              return (
                <Space>
                  <Tooltip trigger={'hover'} placement={'bottom'} title="Delete">
                    <Button shape="circle" icon={<DeleteFilled />} danger></Button>
                  </Tooltip>
                </Space>
              );
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default ModuleCard;
