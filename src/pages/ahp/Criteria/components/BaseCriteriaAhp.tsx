import React, { useEffect, useRef, useState } from 'react';

import OperationTable from '@/components/Operation/OperationTable';
import { history } from '@@/exports';
import {
  ActionType,
  getPageTitle,
  ProColumns,
  ProDescriptionsItemProps,
  ProFormSelect,
  type ProFormColumnsType,
} from '@ant-design/pro-components';

import ModuleCard from '@/components/Container/ModuleCard';
import ModuleModalForm from '@/components/Container/ModuleModalForm';
import DrawerContainer from '@/components/Operation/DrawerContainer';
import {
  getCriteria, getCriteriaAllTree,
  getCriteriaByUuid,
  getCriteriaParent,
  getCriteriaTree, getSumWeightAll,
} from '@/services/api-app/api/criteria_api';
import {
  handleAddCriteria,
  handleRemoveCriteria, handleRemoveCriteriaAhp,
  handleUpdateCriteria,
} from '@/services/api-app/handle/criteria_handle';
import { DownOutlined } from '@ant-design/icons';
import { Col, Drawer, Row, Tree, TreeDataNode } from 'antd';
import ModuleTableListCriteriaAhp from "@/components/Container/ModuleTableListCriteriaAhp";

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
    title: 'Kode Kriteria',
    dataIndex: 'criteriaCode',
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
            const options = {};
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
  // {
  //   title: 'Bobot',
  //   dataIndex: 'criteriaWeight',
  //   valueType: 'digit',
  //   formItemProps: {
  //     rules: [
  //       {
  //         required: true,
  //         message: 'This field is required',
  //       },
  //     ],
  //   },
  //   // renderFormItem: (item, { defaultRender, ...rest }, form) => {
  //   //   const hasChild = form.getFieldValue('hasChild');
  //   //   if (hasChild==='YA'){
  //   //     form.setFieldsValue({ criteriaWeight: 0 });
  //   //   }
  //   //   return (
  //   //     hasChild==='TIDAK' ? <ProFormDigit required={true}/>: <ProFormDigit disabled={true} placeholder={"0"}/>
  //   //   );
  //   // },
  //   width: 'md',
  //   colProps: {
  //     xs: 24,
  //     md: 12,
  //   },
  //   fieldProps: {
  //     style: {
  //       // width: '200px',
  //     },
  //   },
  // },
  {
    title: 'Tipe',
    width: 'md',
    colProps: {
      md: 12,
      xs: 24,
    },
    dataIndex: 'criteriaType',
    renderFormItem: (item, { defaultRender, ...rest }, form) => {
      const hasChild = form.getFieldValue('hasChild');
      if (hasChild === 'YA') {
        form.setFieldsValue({ criteriaType: 'TIDAK ADA' });
      }
      return hasChild === 'TIDAK' ? (
        <ProFormSelect
          valueEnum={{
            COST: 'COST',
            BENEFIT: 'BENEFIT',
          }}
        />
      ) : (
        <ProFormSelect disabled={true}></ProFormSelect>
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
    title: 'Kode Kriteria',
    dataIndex: 'criteriaCode',
    valueType: 'text',
    copyable: true,
    sorter: true,
  },
  // {
  //   title: 'Bobot',
  //   dataIndex: 'criteriaWeight',
  //   valueType: 'text',
  //   copyable: true,
  //   sorter: true,
  // },
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

const treeDataJson: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '1',
    children: [
      {
        title: 'parent 1-0',
        key: '2',
        children: [
          {
            title: 'leaf',
            key: '3',
          },
          {
            title: 'leaf',
            key: '4',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

const BaseCriteriaAhp: React.FC<any> = ({ pathName }) => {
  const [currentRow, setCurrentRow] = useState<API_TYPES.CriteriaListItem>(
    {} as API_TYPES.CriteriaListItem,
  );
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [showCriteriaTree, setShowCriteriaTree] = useState<boolean>(false);
  const actionRefProTable = useRef<ActionType>();
  const actionRefCard = useRef<ActionType>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [selectedRowsState, setSelectedRows] = useState<any[]>([]);
  const [treeData, setTreeData] = useState<any[]>(treeDataJson);
  const [bobot, setBobot] = useState(0);

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

    const options = {};
    const params = {
      current: 1,
      pageSize: 200,
    };
    getCriteriaTree(params, options).then((value) => {
      setTreeData(value.data);
    });

    getSumWeightAll().then(value => {
      setBobot(value.data)
    })
  };

  useEffect(() => {
    const options = {};
    const params = {
      current: 1,
      pageSize: 200,
    };
    getCriteriaTree(params, options).then((value) => {
      setTreeData(value.data);
    });
  }, []);

  const columnsProTable: ProColumns<API_TYPES.CriteriaListItem>[] = [
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
              setCurrentRow(record);
              handleModalOpen(true);
              setIsNew(false);
            }}
            menuDataItem={{ key: record.uuid }}
          />
        );
      },
    },
    {
      title: 'Nama Kriteria',
      dataIndex: 'criteriaName',
      valueType: 'text',
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
      title: 'Kode Kriteria',
      dataIndex: 'criteriaCode',
      valueType: 'text',
    },
    // {
    //   title: 'Bobot',
    //   dataIndex: 'criteriaWeight',
    //   valueType: 'digit',
    //   copyable: true,
    // },
    {
      title: 'Tipe',
      dataIndex: 'criteriaType',
      valueType: 'textarea',
      editable: false,
    },
    {
      title: 'Memiliki Sub',
      dataIndex: 'hasChild',
      valueType: 'text',
      editable: false,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      copyable: true,
    }
  ];

  const [display, setDisplay] = useState('List');
  useEffect(() => {
    const options = {};
    const params = {
      current: 1,
      pageSize: 20,
    };
    getCriteria(params, options).then(value => {
      value.data.forEach((value: { isAhp: boolean; uuid: any; hasChild: string }) => {
        setSelectedRows((prevState: any) => {
          if (value.isAhp && value.hasChild === 'TIDAK') {
            return [...prevState, value.uuid];
          } else {
            return prevState;
          }
        });
      });
    })

    getSumWeightAll().then(value => {
      setBobot(value.data)
    })
  }, []);

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
        <ModuleTableListCriteriaAhp
          setShowCriteriaTree={setShowCriteriaTree}
          setCurrentRow={setCurrentRow}
          setShowDrawer={setShowDrawer}
          actionRef={actionRefProTable}
          columnsProTable={columnsProTable}
          handleModalOpen={handleModalOpen}
          setIsNew={setIsNew}
          handleUpdate={(data: API_TYPES.CriteriaListItem) => {
            handleUpdateCriteria(data).then(() => {
              reload()
            });
          }}
          handleRemove={(uuid: string) => {
            handleRemoveCriteriaAhp(uuid).then((value) => {
              if (value) {
                reload();
              }
            });
          }}
          loadPaged={getCriteriaAllTree}
          setSelectedRows={setSelectedRows}
          selectedRowKeys={selectedRowsState}
          title={title}
          bobot={bobot}
          buttonNewVisibility={false}
          buttonTreeVisibility={false}
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

      <Drawer
        title="Criteria Tree"
        open={showCriteriaTree}
        onClose={() => {
          // setCurrentRow({});
          setShowCriteriaTree(false);
        }}
        closable={false}
      >
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['0-0-0']}
          treeData={treeData}
        />
      </Drawer>

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
    </>
  );
};

export default BaseCriteriaAhp;
