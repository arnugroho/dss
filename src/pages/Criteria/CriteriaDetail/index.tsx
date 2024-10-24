/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getPageTitle,
  ProDescriptionsItemProps,
  PageContainer,
  ProDescriptions,
  ProCard,
  ActionType,
} from '@ant-design/pro-components';
import {
  Row,
  Col,
  Button,
  Space,
  MenuProps,
  Tooltip,
  Divider,
  Dropdown,
  Breadcrumb,
  message,
  QRCode,
  Input,
  Typography,
} from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import {
  EditOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteFilled,
  ExportOutlined,
  PrinterOutlined,
  EllipsisOutlined,
  ReloadOutlined,
  ColumnHeightOutlined,
  ExpandOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { history, useModel } from '@@/exports';
import ModuleModalForm from '@/components/Container/ModuleModalForm';
import * as AntdIcons from '@ant-design/icons';
import {
  handleAddCriteria,
  handleGetCriteriaByUuid,
  handleRemoveCriteria,
  handleUpdateCriteria,
} from '@/services/api-app/handle/criteria_handle';
import BaseCriteria, {
  columnsModalFormCriteria,
  columnsProDescriptionCriteria,
} from '@/pages/Criteria/components/BaseCriteria';
import { useLocalStorageState } from 'ahooks';
import copy from 'copy-to-clipboard';

const ResponsiveGridLayout = WidthProvider(Responsive);
const availableHandles = ['sw', 'se'];
const availableHandlesMobile = ['s'];
const layout = {
  md: [
    {
      i: 'qrcode',
      x: 0,
      y: 0,
      w: 8,
      h: 5,
      minW: 8,
      minH: 5,
      resizeHandles: availableHandles,
    },
    {
      i: 'gallery',
      x: 0,
      y: 6,
      w: 8,
      h: 6,
      minW: 8,
      minH: 5,
      resizeHandles: availableHandles,
    },
    {
      i: 'description',
      x: 10,
      y: 0,
      w: 16,
      h: 11,
      minW: 16,
      minH: 11,
      resizeHandles: availableHandles,
    },
    {
      i: 'criteriaEntryList',
      x: 0,
      y: 12,
      w: 24,
      h: 11,
      minW: 16,
      minH: 11,
      resizeHandles: availableHandles,
    },
  ],
  xs: [
    {
      i: 'qrcode',
      x: 0,
      y: 0,
      w: 24,
      h: 6,
      maxW: 24,
      minH: 6,
      resizeHandles: availableHandlesMobile,
    },
    {
      i: 'gallery',
      x: 0,
      y: 7,
      w: 24,
      h: 6,
      maxW: 24,
      minH: 6,
      resizeHandles: availableHandlesMobile,
    },
    {
      i: 'description',
      x: 0,
      y: 5,
      w: 24,
      h: 8,
      maxW: 24,
      minH: 8,
      resizeHandles: availableHandlesMobile,
    },
    {
      i: 'criteriaEntryList',
      x: 0,
      y: 28,
      w: 24,
      h: 12,
      minW: 24,
      minH: 8,
      resizeHandles: availableHandles,
    },
  ],
};

const CustomIcon = (type: string) => {
  // @ts-ignore
  const AntdIcon = AntdIcons[type]; // not AntdIcons[iconDetails.render] as @Cea mention;
  return <AntdIcon />;
};
const CriteriaDetail: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [isNew, setIsNew] = useState<boolean>(true);
  const [display] = useState('List');
  const uuid = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1);
  const [density, setDensity] = useState<any>('small');
  const [currentRow, setCurrentRow] = React.useState<API_TYPES.CriteriaListItem>(
    {} as API_TYPES.CriteriaListItem,
  );
  const { initialState } = useModel('@@initialState');
  const pathNameLoc = `/${location.pathname.split('/')[1]}`;
  const actionRef = useRef<ActionType>();
  const [criteriaLayout, setCriteriaLayout] = useLocalStorageState('criteriaLayout');
  const [messageApi, contextHolder] = message.useMessage();
  const [isReload, setIsReload] = useState(true);

  const copyToClipboard = () => {
    const text = document.getElementById('linkText').value;
    copy(text);
    messageApi.info('Text Copied!');
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const title = getPageTitle({
    pathname: pathNameLoc,
  });

  useEffect(() => {
    let requestData = handleGetCriteriaByUuid(uuid);
    requestData.then((value) => {
      setCurrentRow(value.data);
      if (value.data) {
        actionRef.current?.reload();
        setIsReload(!isReload);
      }
    });
  }, [uuid]);

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
      onClick: async () => {
        handleRemoveCriteria(uuid).then((value) => {
          if (value) {
            history.back();
          }
        });
      },
    },
  ];

  const densityDropdown: MenuProps['items'] = [
    {
      key: 'small',
      label: 'Small',
      onClick: () => {
        setDensity('small');
      },
    },
    {
      key: 'middle',
      label: 'Middle',
      onClick: () => {
        setDensity('middle');
      },
    },
    {
      key: 'large',
      label: 'Large',
      onClick: () => {
        setDensity('default');
      },
    },
  ];

  return (
    <RcResizeObserver>
      {contextHolder}
      <PageContainer
        breadcrumbRender={() => {
          // setAttr(props)
          let item: any[] = [];

          return <Breadcrumb style={{ paddingBlockStart: 18 }} items={item} />;
        }}
        header={{
          title: title ? title : currentRow.name,
        }}
        tabList={[
          {
            tab: 'Overview',
            key: 'overview',
            children: (
              <Row>
                <Col span={24}>
                  <ResponsiveGridLayout
                    className="layout"
                    // layout={layout}
                    // cols={12}
                    layouts={criteriaLayout || (layout as any)}

                    cols={{
                      // xxl:24, xl:24, lg: 24,
                      md: 24,
                      // sm: 24,
                      xs: 24,
                      // xxs: 24
                    }}
                    breakpoints={{
                      // xxl:1600, xl:1200, lg: 992,
                      md: 768,
                      // sm: 576,
                      xs: 480,
                      // xxs: 0
                    }}
                    rowHeight={50}
                    margin={[isTabletOrMobile ? 0 : 18, 18]}
                    useCSSTransforms={true}
                    // width={1200}
                    autoSize={true}
                    isDraggable={true}
                    isResizable={true}
                    allowOverlap={false}
                    preventCollision={false}
                    isDroppable={true}
                    isBounded={false}
                    draggableHandle=".react-grid-dragHandleExample"
                  >
                    <Row key="qrcode">
                      <Col span={24}>
                        <ProCard
                          title={currentRow.nomenklatur}
                          style={{ width: '100%', height: '100%' }}
                        >
                          <Space direction="vertical" align="center" style={{ width: '100%' }}>
                            <div id="myqrcode">
                              <QRCode
                                size={150}
                                value={`https://nusantarasoft.com${history.location.pathname}`}
                              />
                            </div>

                            <Space direction="horizontal">
                              <Input
                                placeholder="-"
                                maxLength={60}
                                value={`https://nusantarasoft.com${history.location.pathname}`}
                                id="linkText"
                                // onChange={(e) => setText(e.target.value)}
                              />
                              <Button
                                icon={<CopyOutlined></CopyOutlined>}
                                onClick={copyToClipboard}
                              ></Button>
                              <Button
                                type="primary"
                                icon={<AntdIcons.DownloadOutlined></AntdIcons.DownloadOutlined>}
                                onClick={downloadQRCode}
                              ></Button>
                            </Space>
                          </Space>
                          <Space style={{ position: 'absolute', bottom: 8, right: 14 }} size={5}>
                            <Tooltip trigger={'hover'} placement={'bottom'} title="Move">
                              <Button
                                size="small"
                                className="react-grid-dragHandleExample"
                                key="1"
                                icon={<ExpandOutlined />}
                                type="default"
                                shape="circle"
                              ></Button>
                            </Tooltip>
                            <Tooltip trigger={'hover'} placement={'bottom'} title="Remove">
                              <Button
                                size="small"
                                key="3"
                                icon={<CloseOutlined />}
                                type="primary"
                                shape="circle"
                              ></Button>
                            </Tooltip>
                          </Space>
                        </ProCard>
                      </Col>
                    </Row>
                    {/*<Row key="gallery">*/}
                    {/*  <Col span={24}>*/}
                    {/*    <ProCard title="Gallery" style={{ width: '100%', height: '100%' }}>*/}
                    {/*      <ImageUpload*/}
                    {/*        parentUuid={currentRow.uuid}*/}
                    {/*        imageType="INDIVIDUAL"*/}
                    {/*        isDrawer={false}*/}
                    {/*      />*/}
                    {/*      <Space style={{ position: 'absolute', bottom: 8, right: 14 }} size={5}>*/}
                    {/*        <Tooltip trigger={'hover'} placement={'bottom'} title="Move">*/}
                    {/*          <Button*/}
                    {/*            size="small"*/}
                    {/*            className="react-grid-dragHandleExample"*/}
                    {/*            key="1"*/}
                    {/*            icon={<ExpandOutlined />}*/}
                    {/*            type="default"*/}
                    {/*            shape="circle"*/}
                    {/*          ></Button>*/}
                    {/*        </Tooltip>*/}
                    {/*        <Tooltip trigger={'hover'} placement={'bottom'} title="Remove">*/}
                    {/*          <Button*/}
                    {/*            size="small"*/}
                    {/*            key="3"*/}
                    {/*            icon={<CloseOutlined />}*/}
                    {/*            type="primary"*/}
                    {/*            shape="circle"*/}
                    {/*          ></Button>*/}
                    {/*        </Tooltip>*/}
                    {/*      </Space>*/}
                    {/*    </ProCard>*/}
                    {/*  </Col>*/}
                    {/*</Row>*/}
                    <Row key="description">
                      <Col span={24}>
                        <ProCard style={{ width: '100%', height: '100%' }}>
                          <ProDescriptions
                            title="Description"
                            layout="vertical"
                            actionRef={actionRef}
                            editable={{
                              onSave: async (_key, record) => {
                                return handleUpdateCriteria(record as any);
                              },
                            }}
                            columns={columnsProDescriptionCriteria as ProDescriptionsItemProps[]}
                            request={async () => {
                              return handleGetCriteriaByUuid(uuid);
                            }}
                            column={isTabletOrMobile ? 1 : 2}
                            size={density}
                            bordered
                            // loading
                            extra={
                              <>
                                <Space size={10}>
                                  <Space size={0}></Space>
                                  <Space size={5}>
                                    <Button
                                      type="default"
                                      icon={<EditOutlined />}
                                      onClick={() => {
                                        handleModalOpen(true);
                                        setIsNew(false);
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    <Button type="text" icon={<ReloadOutlined />}></Button>
                                    <Dropdown
                                      menu={{ items: densityDropdown }}
                                      arrow={{ pointAtCenter: true }}
                                    >
                                      <Button type="text" icon={<ColumnHeightOutlined />}></Button>
                                    </Dropdown>
                                  </Space>
                                </Space>
                              </>
                            }
                          ></ProDescriptions>
                          <Space style={{ position: 'absolute', bottom: 8, right: 14 }} size={5}>
                            <Tooltip trigger={'hover'} placement={'bottom'} title="Move">
                              <Button
                                size="small"
                                className="react-grid-dragHandleExample"
                                key="1"
                                icon={<ExpandOutlined />}
                                type="default"
                                shape="circle"
                              ></Button>
                            </Tooltip>
                            <Tooltip trigger={'hover'} placement={'bottom'} title="Remove">
                              <Button
                                size="small"
                                key="3"
                                icon={<CloseOutlined />}
                                type="primary"
                                shape="circle"
                              ></Button>
                            </Tooltip>
                          </Space>
                        </ProCard>
                      </Col>
                    </Row>
                    <Row key="criteriaEntryList">
                      <Col span={24}>
                        <Row>
                          <Col>
                            <Typography.Title style={{ paddingInlineStart: 23 }} level={5}>
                              Criteria Entry
                            </Typography.Title>
                          </Col>
                          <Col md={24} xs={24}>
                            <BaseCriteria
                              display={display}
                              pathName="/criteriaentry"
                              hiddenOperation="true"
                              criteriaUuid={uuid}
                              isReload={isReload}
                            />
                          </Col>
                        </Row>
                        <Space style={{ position: 'absolute', bottom: 8, right: 14 }} size={5}>
                          <Tooltip trigger={'hover'} placement={'bottom'} title="Move">
                            <Button
                              size="small"
                              className="react-grid-dragHandleExample"
                              key="1"
                              icon={<ExpandOutlined />}
                              type="default"
                              shape="circle"
                            ></Button>
                          </Tooltip>
                          <Tooltip trigger={'hover'} placement={'bottom'} title="Remove">
                            <Button
                              size="small"
                              key="3"
                              icon={<CloseOutlined />}
                              type="primary"
                              shape="circle"
                            ></Button>
                          </Tooltip>
                        </Space>
                      </Col>
                    </Row>
                  </ResponsiveGridLayout>
                </Col>
              </Row>
            ),
          },
          {
            tab: 'Statistic',
            key: 'statistic',
            children: 'Under Construction',
          },
          // {
          //   tab: '3D View',
          //   key: '3dview',
          //   children: <SpaceViewer />,
          // },
        ]}
        extra={
          <>
            <Space size={0}>
              <Space size={5}>
                <Tooltip trigger={'hover'} placement={'bottom'} title="Export">
                  <Button key="4" icon={<ExportOutlined />} type="primary" shape="default">
                    Export
                  </Button>
                </Tooltip>
                <Tooltip trigger={'hover'} placement={'bottom'} title="Print">
                  <Button key="1" icon={<PrinterOutlined />} type="text" shape="default"></Button>
                </Tooltip>
              </Space>
              <Divider
                style={{
                  height: 20,
                }}
                type="vertical"
              />
              <Space size={5}>
                <Tooltip trigger={'hover'} placement={'bottom'} title="Starred">
                  <Button key="3" icon={<StarOutlined />} type="text" shape="default"></Button>
                </Tooltip>
                <Tooltip trigger={'hover'} placement={'bottom'} title="Pinned">
                  <Button
                    type="text"
                    onClick={() => {

                    }}
                  ></Button>
                </Tooltip>
              </Space>
              <Divider
                style={{
                  height: 20,
                }}
                type="vertical"
              />
              <Space size={5}>
                <Dropdown menu={{ items }}>
                  <Button type="text" shape="default" icon={<EllipsisOutlined />} />
                </Dropdown>
              </Space>
            </Space>
          </>
        }
      >
        {currentRow.uuid ? (
          <ModuleModalForm
            createModalOpen={createModalOpen}
            handleModalOpen={handleModalOpen}
            isNew={isNew}
            handleUpdate={(data: API_TYPES.CriteriaListItem) => {
              handleUpdateCriteria(data).then((value) => {
                if (value) {
                  actionRef.current?.reload();
                  setIsReload(!isReload);
                  handleModalOpen(false);
                }
              });
            }}
            handleAdd={(data: API_TYPES.CriteriaListItem) => {
              handleAddCriteria(data).then((value) => {
                if (value) {
                  actionRef.current?.reload();
                  setIsReload(!isReload);
                  handleModalOpen(false);
                }
              });
            }}
            loadData={() => {
              return handleGetCriteriaByUuid(currentRow.uuid);
            }}
            uuid={currentRow.uuid}
            title={title}
            columnsModalForm={columnsModalFormCriteria}
          />
        ) : (
          <></>
        )}
      </PageContainer>
    </RcResizeObserver>
  );
};

export default CriteriaDetail;
