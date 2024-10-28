import React, { useRef, useState } from 'react';

import OperationTable from '@/components/Operation/OperationTable';
import { history } from '@@/exports';
import {
  ActionType,
  FooterToolbar,
  getPageTitle,
  ProColumns,
  ProDescriptionsItemProps,
  type ProFormColumnsType, ProFormDigit, ProFormSelect,
} from '@ant-design/pro-components';

import ModuleCard from '@/components/Container/ModuleCard';
import ModuleModalForm from '@/components/Container/ModuleModalForm';
import ModuleTableList from '@/components/Container/ModuleTableList';
import DrawerContainer from '@/components/Operation/DrawerContainer';
import {getCriteria, getCriteriaByUuid, getCriteriaParent} from '@/services/api-app/api/criteria_api';
import {
  handleAddCriteria,
  handleRemoveCriteria,
  handleRemoveCriteriaList,
  handleUpdateCriteria,
} from '@/services/api-app/handle/criteria_handle';
import { AppstoreOutlined, DeleteFilled, TableOutlined } from '@ant-design/icons';
import {Button, Col, Drawer, Row, Segmented, Space, Tooltip} from 'antd';
import StatisticDashboard from "@/pages/Criteria/components/StatisticDashboard";

export const columnsModalFormCriteria: ProFormColumnsType[] = [
  {
    title: 'Nama Kriteria',
    dataIndex: 'criteriaName',
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
    title: 'Criteria Parent',
    width: 'md',
    colProps: {
      md: 12,
      xs: 24,
    },
    dataIndex: 'criteriaParentId',
    renderFormItem: () => {
      return (
        <ProFormSelect
          showSearch
          request={async () => {
            const options = { };
            const params = {
              current: 1,
              pageSize: 20,
            };

            const result = await getCriteriaParent(params, options);
            return result.data.map((item: { id: any; criteriaName: any }) => ({
              label: item.criteriaName,
              value: item.id,
            }));
          }}
        />
      );
    },
  },
  {
    title: 'Memiliki Sub',
    width: 'md',
    colProps: {
      md: 12,
      xs: 24,
    },
    dataIndex: 'hasChild',
    renderFormItem: () => {
      return (
        <ProFormSelect
          valueEnum={{
            YA: 'YA',
            TIDAK: 'TIDAK',
          }}
        />
      );
    },
    formItemProps: {
      rules: [
        {
          message: 'This field is required',
          required: true,
        },
      ],
    },
  },
  {
    title: 'Bobot',
    dataIndex: 'criteriaWeight',
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    renderFormItem: (item, { defaultRender, ...rest }, form) => {
      const hasChild = form.getFieldValue('hasChild');
      if (hasChild==='YA'){
        form.setFieldsValue({ criteriaWeight: 0 });
      }
      return (
        hasChild==='TIDAK' ? <ProFormDigit required={true}/>: <ProFormDigit disabled={true} placeholder={"0"}/>
      );
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
    title: 'Tipe',
    width: 'md',
    colProps: {
      md: 12,
      xs: 24,
    },
    dataIndex: 'criteriaType',
    renderFormItem: () => {
      return (
        <ProFormSelect
          valueEnum={{
            COST: 'COST',
            BENEFIT: 'BENEFIT',
          }}
        />
      );
    },
    formItemProps: {
      rules: [
        {
          message: 'This field is required',
          required: true,
        },
      ],
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
      md: 24,
    },
    fieldProps: {
      style: {
        // width: '200px',
      },
    },
  },
];

export const columnsProDescriptionCriteria: ProColumns<API_TYPES.CriteriaListItem>[] = [
  {
    title: 'Nama Kriteria',
    dataIndex: 'criteriaName',
    valueType: 'text',
    copyable: true,
    sorter: true,
  },
  {
    title: 'Bobot',
    dataIndex: 'criteriaWeight',
    valueType: 'text',
    copyable: true,
    sorter: true,
  },
  {
    title: 'Tipe',
    dataIndex: 'criteriaType',
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

const BaseCriteria: React.FC<any> = ({ pathName }) => {
  const [currentRow, setCurrentRow] = useState<API_TYPES.CriteriaListItem>(
    {} as API_TYPES.CriteriaListItem,
  );
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const actionRefProTable = useRef<ActionType>();
  const actionRefCard = useRef<ActionType>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [selectedRowsState, setSelectedRows] = useState<any[]>([]);

  const pathNameLoc = pathName ? pathName : location.pathname;

  const title = getPageTitle({
    pathname: pathNameLoc,
  });

  const columnsCardDescription = [
    {
      title: 'Nama Kriteria',
      dataIndex: 'email',
      valueType: 'text',
      copyable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      valueType: 'text',
      copyable: true,
    },
  ] as ProDescriptionsItemProps[];

  const metasCard = {
    title: {
      title: 'Nama',
      dataIndex: 'name',
    },
    subTitle: {
      title: 'title',
      dataIndex: 'title',
    },
    description: {
      title: 'Lastname',
      dataIndex: 'lastname',
    },
    content: {
      title: 'Phone',
      dataIndex: 'phone',
    },
  };

  const reload = () => {
    actionRefProTable.current?.reload();
    actionRefCard.current?.reload();
    setShowDrawer(false);
  };

  const columnsProTable: ProColumns<API_TYPES.CriteriaListItem>[] = [
    {
      title: 'Nama Kriteria',
      dataIndex: 'criteriaName',
      valueType: 'text',
      editable: false,
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
      title: 'Parent',
      dataIndex: ['criteriaParent','criteriaName'],
      valueType: 'text',
      editable: false,
      sorter: true,
    },
    {
      title: 'Bobot',
      dataIndex: 'criteriaWeight',
      valueType: 'digit',
      copyable: true,
      sorter: true,
    },
    {
      title: 'Tipe',
      dataIndex: 'criteriaType',
      valueType: 'textarea',
      editable: false,
      sorter: true,
    },
    {
      title: 'Memiliki Sub',
      dataIndex: 'hasChild',
      valueType: 'text',
      editable:false,
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      copyable: true,
      sorter: true,
    },{
      title: 'Is Active',
      dataIndex: 'statusDelete',
      valueType: 'switch',
      render: (dom, entity) => {
        return (
          <> {entity.statusDelete? 'YA' : 'TIDAK'} </>


        );
      },
      copyable: true,
      sorter: true,
    },
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
              handleRemoveCriteria(record.uuid).then((value) => {
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
  ];

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
          columnsProTable={columnsProTable}
          handleModalOpen={handleModalOpen}
          setIsNew={setIsNew}
          handleUpdate={(data: API_TYPES.CriteriaListItem) => {
            handleUpdateCriteria(data).then((value) => {
              if (value) {
                reload();
              }
            });
          }}
          handleRemove={(uuid: string) => {
            handleRemoveCriteria(uuid).then((value) => {
              if (value) {
                reload();
              }
            });
          }}
          loadPaged={getCriteria}
          setSelectedRows={setSelectedRows}
          title={title}
        />
      )}
      {display === 'Card' && (
        <ModuleCard
          setCurrentRow={setCurrentRow}
          setShowDrawer={setShowDrawer}
          actionRef={actionRefCard}
          loadPaged={getCriteria}
          handleModalOpen={handleModalOpen}
          setIsNew={setIsNew}
          setSelectedRows={setSelectedRows}
          handleRemove={(uuid: string) => {
            handleRemoveCriteria(uuid).then((value) => {
              if (value) {
                reload();
              }
            });
          }}
          handleDetail={(uuid: string) => {
            history.push(`${pathNameLoc}/${uuid}`);
          }}
          reload={reload}
          columnsCardDescription={columnsCardDescription}
          metasCard={metasCard}
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
        columns={columnsProDescriptionCriteria}
        handleRemove={() => {
          handleRemoveCriteria(currentRow.uuid).then((value) => {
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

      {/*<Drawer title="Basic Drawer" open={true}>*/}
      {/*  <p>Some contents...</p>*/}
      {/*  <p>Some contents...</p>*/}
      {/*  <p>Some contents...</p>*/}
      {/*</Drawer>*/}

      <ModuleModalForm
        createModalOpen={createModalOpen}
        handleModalOpen={handleModalOpen}
        isNew={isNew}
        handleUpdate={(data: API_TYPES.CriteriaListItem) => {
          handleUpdateCriteria(data).then((value) => {
            if (value) {
              reload();
              handleModalOpen(false);
            }
          });
        }}
        handleAdd={(data: API_TYPES.CriteriaListItem) => {
          handleAddCriteria({ ...data }).then((value) => {
            if (value) {
              reload();
              handleModalOpen(false);
            }
          });
        }}
        loadData={() => {
          return getCriteriaByUuid(currentRow.uuid);
        }}
        uuid={currentRow.uuid}
        title={title}
        columnsModalForm={columnsModalFormCriteria}
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
                handleRemoveCriteriaList(selectedRowsState).then((value) => {
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

export default BaseCriteria;
