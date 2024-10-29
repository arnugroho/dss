import React, {useEffect, useRef, useState} from 'react';

import OperationTable from '@/components/Operation/OperationTable';
import { history } from '@@/exports';
import {
  ActionType,
  FooterToolbar,
  getPageTitle,
  ProColumns,
} from '@ant-design/pro-components';

import ModuleModalForm from '@/components/Container/ModuleModalForm';
import ModuleTableList from '@/components/Container/ModuleTableList';
import DrawerContainer from '@/components/Operation/DrawerContainer';
import {getAlternative, getAlternativeByUuid} from '@/services/api-app/api/alternative_api';
import {
  handleAddAlternative,
  handleRemoveAlternative,
  handleRemoveAlternativeList,
  handleUpdateAlternative,
} from '@/services/api-app/handle/alternative_handle';
import {DeleteFilled} from '@ant-design/icons';
import {Button, Col, Row, Space, Tooltip} from 'antd';
import StatisticDashboard from "@/pages/Alternative/components/StatisticDashboard";
import {getCriteriaChild} from "@/services/api-app/api/criteria_api";

export const columnsProDescriptionAlternative: ProColumns<API_TYPES.AlternativeListItem>[] = [
  {
    title: 'Nama Kriteria',
    dataIndex: 'alternativeName',
    valueType: 'text',
    copyable: true,
    sorter: true,
  },
  {
    title: 'Bobot',
    dataIndex: 'alternativeWeight',
    valueType: 'text',
    copyable: true,
    sorter: true,
  },
  {
    title: 'Tipe',
    dataIndex: 'alternativeType',
    valueType: 'text',
    copyable: true,
    sorter: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    valueType: 'textarea',
    copyable: true,
    sorter: true,
  },
];

const defaultModal = [
  {
    title: 'Nama Alternative',
    dataIndex: 'alternativeName',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
    fieldProps: {
      style: {
        // width: '200px',
      },
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    valueType: 'textarea',
    formItemProps: {
      rules: [
        {
          required: false,
          message: 'This field is required',
        },
      ],
    },
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
    fieldProps: {
      style: {
        // width: '200px',
      },
    },
  },
  {
    title: 'Is Active',
    dataIndex: 'statusDelete',
    valueType: 'switch',
    formItemProps: {
      rules: [
        {
          required: false,
          message: 'This field is required',
        },
      ],
    },
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
    fieldProps: {
      style: {
        // width: '200px',
      },
    },
  }]

const BaseAlternative: React.FC<any> = ({ pathName }) => {
  const [currentRow, setCurrentRow] = useState<API_TYPES.AlternativeListItem>(
    {} as API_TYPES.AlternativeListItem,
  );
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const actionRefProTable = useRef<ActionType>();
  const actionRefCard = useRef<ActionType>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [selectedRowsState, setSelectedRows] = useState<any[]>([]);
  const [columnsModal, setColumnsModal] = useState<any>(defaultModal);


  const pathNameLoc = pathName ? pathName : location.pathname;

  const title = getPageTitle({
    pathname: pathNameLoc,
  });

  const reload = () => {
    actionRefProTable.current?.reload();
    actionRefCard.current?.reload();
    setShowDrawer(false);
  };

  const columnsProTable: ProColumns<API_TYPES.AlternativeListItem>[] = [
    {
      title: 'Operation',
      dataIndex: 'option',
      valueType: 'option',
      render: (_text, record, _, action) => {
        return (
          <OperationTable
            action={action}
            reload={reload}
            handleRemove={() => {
              handleRemoveAlternative(record.uuid).then((value) => {
                if (value) {
                  reload();
                }
              });
            }}
            handleDetail={() => {
              history.push(`${pathNameLoc}/${'menuDataItem.key'}`);
            }}
            menuDataItem={{key:record.uuid}}
          />
        );
      },
    },
    {
      title: 'Nama Alternative',
      dataIndex: 'alternativeName',
      valueType: 'text',
      sorter: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDrawer(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      copyable: true,
      sorter: true,
    },
    {
      title: 'Is Active',
      dataIndex: 'statusDelete',
      valueType: 'switch',
      search:false,
      render: (dom, entity) => {
        return (
          <> {entity.statusDelete? 'YA' : 'TIDAK'} </>


        );
      },
      copyable: true,
      sorter: true,
    }
  ];

  const [columnsTable, setColumnsTable] = useState<any>(columnsProTable);


  useEffect(() => {
    const options = { };
    const params = {
      current: 1,
      pageSize: 200,
    };

    getCriteriaChild(params, options).then(value => {
      let criteria = value.data as [];
      criteria.forEach(cr  => {
        let jsonCr = {
          title: cr.description,
          dataIndex: cr.criteriaName,
          valueType: 'digit',
          formItemProps: {
            rules: [
              {
                required: true,
                message: 'This field is required',
              },
            ],
          },
          width: 'md',
          colProps: {
            xs: 24,
            md: 12,
          },
          fieldProps: {
            style: {
              // width: '200px',
            },
          },
        };

        let jsonTable = {
            title: cr.description,
            dataIndex: cr.criteriaName,
            valueType: 'digit',
            search:false,
          }

          setColumnsTable((prevState: any) => {
            return [
              ...prevState,
              jsonTable

            ];
          });

        setColumnsModal((prevState: any) => {
          return [
            ...prevState,
            jsonCr

          ];
        });
      })
    })

  }, []);





  const [display, setDisplay] = useState('List');

  return (
    <>
      <Row gutter={18} justify="end" style={{ marginBottom: 10 }}>
        {/* <Col>
                            <Typography.Title style={{ paddingInlineStart: 23 }} level={5}>
                              Items
                            </Typography.Title>
                          </Col> */}
        <Col>
          {/*<Segmented*/}
          {/*  options={[*/}
          {/*    {*/}
          {/*      value: 'List',*/}
          {/*      icon: <TableOutlined />,*/}
          {/*      title: 'Table View',*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: 'Card',*/}
          {/*      icon: <AppstoreOutlined />,*/}
          {/*      title: 'Card View',*/}
          {/*    },*/}
          {/*    // {*/}
          {/*    //   value: 'Calendar',*/}
          {/*    //   icon: <CalendarOutlined />,*/}
          {/*    //   title: 'Calendar View',*/}
          {/*    // },*/}
          {/*    // {*/}
          {/*    //   value: 'Gantt',*/}
          {/*    //   icon: <BarsOutlined />,*/}
          {/*    //   title: 'Gantt View',*/}
          {/*    // },*/}
          {/*    // {*/}
          {/*    //   value: 'Kanban',*/}
          {/*    //   icon: <ProjectOutlined />,*/}
          {/*    //   title: 'Kanban View',*/}
          {/*    // },*/}
          {/*    // {*/}
          {/*    //   value: '3D',*/}
          {/*    //   icon: <CodepenOutlined />,*/}
          {/*    //   title: '3D View',*/}
          {/*    // },*/}
          {/*  ]}*/}
          {/*  size="large"*/}
          {/*  onChange={(value) => {*/}
          {/*    setDisplay(value as any);*/}
          {/*  }}*/}
          {/*/>*/}
        </Col>
      </Row>
      {display === 'List' && (
        <ModuleTableList
          setCurrentRow={setCurrentRow}
          setShowDrawer={setShowDrawer}
          actionRef={actionRefProTable}
          columnsProTable={columnsTable}
          handleModalOpen={handleModalOpen}
          setIsNew={setIsNew}
          handleUpdate={(data: API_TYPES.AlternativeListItem) => {
            handleUpdateAlternative(data).then((value) => {
              if (value) {
                reload();
              }
            });
          }}
          handleRemove={(uuid: string) => {
            handleRemoveAlternative(uuid).then((value) => {
              if (value) {
                reload();
              }
            });
          }}
          loadPaged={getAlternative}
          setSelectedRows={setSelectedRows}
          title={title}
        />
      )}

      {display === 'Statistic' && (
        <StatisticDashboard responsive={true}/>
      )}

      <DrawerContainer
        showDetail={showDrawer}
        setShowDetail={setShowDrawer}
        currentRow={currentRow}
        isDrawer={true}
        reload={reload}
        columns={columnsTable}
        handleRemove={() => {
          handleRemoveAlternative(currentRow.uuid).then((value) => {
            if (value) {
              reload();
            }
          });
        }}
        handleDetail={() => {
          history.push(`${pathNameLoc}/${currentRow.uuid}`);
        }}
        imageType="INDIVIDUAL"
        parentImageUuid={currentRow.uuid}
      />

      <ModuleModalForm
        createModalOpen={createModalOpen}
        handleModalOpen={handleModalOpen}
        isNew={isNew}
        handleUpdate={(data: API_TYPES.AlternativeListItem) => {
          handleUpdateAlternative(data).then((value) => {
            if (value) {
              reload();
              handleModalOpen(false);
            }
          });
        }}
        handleAdd={(data: API_TYPES.AlternativeListItem) => {
          handleAddAlternative({ ...data }).then((value) => {
            if (value) {
              reload();
              handleModalOpen(false);
            }
          });
        }}
        loadData={() => {
          return getAlternativeByUuid(currentRow.uuid);
        }}
        uuid={currentRow.uuid}
        title={title}
        columnsModalForm={columnsModal}
      />

      {selectedRowsState.length > 0 && (
        <FooterToolbar
          style={{
            right: 150,
            width: `calc(40%)`,
            fontSize: 14,
          }}
          extra={
            <Space size={25}>
              <span>
                Selected <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> item
              </span>
              <span>
                <Button type="dashed" onClick={reload}>
                  Cancel Selection
                </Button>
              </span>
              <span>Number of selected items: {selectedRowsState.length} </span>
            </Space>
          }
        >
          <Tooltip trigger={'hover'} placement={'top'} title="Delete">
            <Button
              shape="circle"
              danger
              onClick={() => {
                handleRemoveAlternativeList(selectedRowsState).then((value) => {
                  if (value) {
                    setSelectedRows([]);
                    reload();
                  }
                });
              }}
              icon={<DeleteFilled />}
            ></Button>
          </Tooltip>
        </FooterToolbar>
      )}
    </>
  );
};

export default BaseAlternative;
