import React, { useEffect, useRef, useState } from 'react';

import { history } from '@@/exports';
import { ActionType, FooterToolbar, getPageTitle, ProColumns } from '@ant-design/pro-components';

import ModuleTableList from '@/components/Container/ModuleTableList';
import DrawerContainer from '@/components/Operation/DrawerContainer';
import {getAlternativeByUuid} from '@/services/api-app/api/alternative_api';
import { getCriteriaChild } from '@/services/api-app/api/criteria_api';
import {
  handleRemoveAlternative,
  handleRemoveAlternativeList
} from '@/services/api-app/handle/alternative_handle';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Col, Row, Space, Tooltip } from 'antd';
import {getSawRank, getTopsisRank, getWpRank} from "@/services/api-app/api/dssrank_api";

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
  },
];

const BaseDss: React.FC<any> = ({ pathName }) => {
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
  const [saw, setSaw] = useState({});
  const [wp, setWp] = useState({});
  const [topsis, setTopsis] = useState({});


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
      title: 'Nama Alternative',
      dataIndex: 'alternativeName',
      valueType: 'text',
      sorter: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {

              getAlternativeByUuid(entity.uuid).then(value => {
                setCurrentRow({...entity, ...value.data})
                setShowDrawer(true);
              })

            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Skor',
      dataIndex: 'score',
      valueType: 'digit',
    },
    {
      title: 'Ranking',
      dataIndex: 'rank',
      valueType: 'digit',
    },
  ];

  const [columnsTable, setColumnsTable] = useState<any>(columnsProTable);

  useEffect(() => {
    const options = {};
    const params = {
      current: 1,
      pageSize: 200,
    };

    getCriteriaChild(params, options).then((value) => {
      let criteria = value.data as [];
      criteria.forEach((cr) => {
        let jsonCr = {
          title: cr.description,
          dataIndex: cr.criteriaCode,
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
          dataIndex: cr.criteriaCode,
          valueType: 'digit',
          search: false,
        };

        setColumnsTable((prevState: any) => {
          return [...prevState, jsonTable];
        });

        setColumnsModal((prevState: any) => {
          return [...prevState, jsonCr];
        });
      });
    });

    getSawRank(params, options).then(value => {
        setSaw(value.data.find((item: { rank: number }) => item.rank === 1));

      }
    )
    getWpRank(params, options).then(value => {
        setWp(value.data.find((item: { rank: number }) => item.rank === 1));

      }
    )
    getTopsisRank(params, options).then(value => {
        setTopsis(value.data.find((item: { rank: number }) => item.rank === 1));

      }
    )
  }, []);

  return (
    <>
      <Row>
        <Col span={7} style={{ margin: '3px' }}>
          <ModuleTableList
            title={'SAW'}
            footer={()=> `Nilai terbesar adalah Kabupaten/Kota ${saw.alternativeName} \n` +
              `, Sehingga Kabupaten/Kota ${saw.alternativeName}  terpilih sebagai alternatif terbaik.\n` +
              ` Dengan demikian, Kabupaten/Kota paling rawan jika terjadi bencana adalah Kabupaten/Kota ${saw.alternativeName}`}
            setCurrentRow={setCurrentRow}
            setShowDrawer={setShowDrawer}
            actionRef={actionRefProTable}
            columnsProTable={columnsProTable}
            handleModalOpen={handleModalOpen}
            buttonNewVisibility={false}
            buttonTreeVisibility={false}
            setIsNew={setIsNew}
            handleUpdate={() => {
            }}
            handleRemove={() => {

            }}
            loadPaged={getSawRank}
            setSelectedRows={setSelectedRows}
          />
        </Col>
        <Col span={7} style={{ margin: '3px' }}>
          <ModuleTableList
            title={'WP'}
            footer={()=> `Nilai terbesar adalah Kabupaten/Kota ${wp.alternativeName} \n` +
              `, Sehingga Kabupaten/Kota ${wp.alternativeName}  terpilih sebagai alternatif terbaik.\n` +
              ` Dengan demikian, Kabupaten/Kota paling rawan jika terjadi bencana adalah Kabupaten/Kota ${wp.alternativeName}`}
            setCurrentRow={setCurrentRow}
            setShowDrawer={setShowDrawer}
            actionRef={actionRefProTable}
            columnsProTable={columnsProTable}
            handleModalOpen={handleModalOpen}
            buttonNewVisibility={false}
            buttonTreeVisibility={false}
            setIsNew={setIsNew}
            handleUpdate={() => {
            }}
            handleRemove={() => {

            }}
            loadPaged={getWpRank}
            setSelectedRows={setSelectedRows}
          />
        </Col>
        <Col span={7} style={{ margin: '3px' }}>
          <ModuleTableList
            title={'TOPSIS'}
            footer={()=> `Nilai terbesar adalah Kabupaten/Kota ${topsis.alternativeName} \n` +
              `, Sehingga Kabupaten/Kota ${topsis.alternativeName}  terpilih sebagai alternatif terbaik.\n` +
              ` Dengan demikian, Kabupaten/Kota paling rawan jika terjadi bencana adalah Kabupaten/Kota ${topsis.alternativeName}`}
            setCurrentRow={setCurrentRow}
            setShowDrawer={setShowDrawer}
            actionRef={actionRefProTable}
            columnsProTable={columnsProTable}
            handleModalOpen={handleModalOpen}
            buttonNewVisibility={false}
            buttonTreeVisibility={false}
            setIsNew={setIsNew}
            handleUpdate={() => {
            }}
            handleRemove={() => {

            }}
            loadPaged={getTopsisRank}
            setSelectedRows={setSelectedRows}
          />
        </Col>
      </Row>
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

export default BaseDss;
