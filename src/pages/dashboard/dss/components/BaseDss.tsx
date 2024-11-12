import React, { useEffect, useRef, useState } from 'react';

import { history } from '@@/exports';
import { ActionType, FooterToolbar, ProColumns } from '@ant-design/pro-components';

import DrawerContainer from '@/components/Operation/DrawerContainer';
import { getAlternativeByUuid } from '@/services/api-app/api/alternative_api';
import { getCriteriaChild } from '@/services/api-app/api/criteria_api';
import { getSawRank, getTopsisRank, getWpRank } from '@/services/api-app/api/dssrank_api';
import {
  handleRemoveAlternative,
  handleRemoveAlternativeList,
} from '@/services/api-app/handle/alternative_handle';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Col, Row, Space, Tooltip } from 'antd';
import ModuleTableListDashboard from "@/components/Container/ModuleTableListDashboard";

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
  const [saw, setSaw] = useState({ alternativeName: '' });
  const [wp, setWp] = useState({ alternativeName: '' });
  const [topsis, setTopsis] = useState({ alternativeName: '' });

  const pathNameLoc = pathName ? pathName : location.pathname;

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
              getAlternativeByUuid(entity.uuid).then((value) => {
                setCurrentRow({ ...entity, ...value.data });
                setShowDrawer(true);
              });
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

    getSawRank(params, options).then((value) => {
      if (value.data.length > 0) {
        setSaw(value.data.find((item: { rank: number }) => item.rank === 1));
      }
    });
    getWpRank(params, options).then((value) => {
      if (value.data.length > 0) {
        setWp(value.data.find((item: { rank: number }) => item.rank === 1));
      }
    });
    getTopsisRank(params, options).then((value) => {
      if (value.data.length > 0) {
        setTopsis(value.data.find((item: { rank: number }) => item.rank === 1));
      }
    });
  }, []);

  return (
    <>
      <Row>
        <Col span={7} style={{ margin: '3px' }}>
          <ModuleTableListDashboard
            title={'SAW'}
            footer={() => {
              return (
                <>
                  Nilai terbesar dari <b>SAW</b> adalah Kabupaten/Kota{' '}
                  <b>{saw.alternativeName ? saw.alternativeName : ''}, </b> <br />
                  Sehingga Kabupaten/Kota <b>
                    {saw.alternativeName ? saw.alternativeName : ''}
                  </b>{' '}
                  terpilih sebagai alternatif terbaik.
                  <br /> Dengan demikian, Kabupaten/Kota paling rawan jika terjadi bencana adalah
                  Kabupaten/Kota <b>{saw.alternativeName ? saw.alternativeName : ''}</b>
                </>
              );
            }}
            setCurrentRow={setCurrentRow}
            setShowDrawer={setShowDrawer}
            actionRef={actionRefProTable}
            columnsProTable={columnsProTable}
            handleModalOpen={handleModalOpen}
            buttonNewVisibility={false}
            buttonTreeVisibility={false}
            setIsNew={setIsNew}
            handleUpdate={() => {}}
            handleRemove={() => {}}
            loadPaged={getSawRank}
            setSelectedRows={setSelectedRows}
          />
        </Col>
        <Col span={7} style={{ margin: '3px' }}>
          <ModuleTableListDashboard
            title={'WP'}
            footer={() => {
              return (
                <>
                  Nilai terbesar dari <b>WP</b> adalah Kabupaten/Kota{' '}
                  <b>{wp.alternativeName ? wp.alternativeName : ''}, </b> <br />
                  Sehingga Kabupaten/Kota <b>{wp.alternativeName ? wp.alternativeName : ''}</b>{' '}
                  terpilih sebagai alternatif terbaik.
                  <br /> Dengan demikian, Kabupaten/Kota paling rawan jika terjadi bencana adalah
                  Kabupaten/Kota <b>{wp.alternativeName ? wp.alternativeName : ''}</b>
                </>
              );
            }}
            setCurrentRow={setCurrentRow}
            setShowDrawer={setShowDrawer}
            actionRef={actionRefProTable}
            columnsProTable={columnsProTable}
            handleModalOpen={handleModalOpen}
            buttonNewVisibility={false}
            buttonTreeVisibility={false}
            setIsNew={setIsNew}
            handleUpdate={() => {}}
            handleRemove={() => {}}
            loadPaged={getWpRank}
            setSelectedRows={setSelectedRows}
          />
        </Col>
        <Col span={7} style={{ margin: '3px' }}>
          <ModuleTableListDashboard
            title={'TOPSIS'}
            footer={() => {
              return (
                <>
                  Nilai terbesar dari <b>TOPSIS</b> adalah Kabupaten/Kota{' '}
                  <b>{topsis.alternativeName ? topsis.alternativeName : ''}, </b> <br />
                  Sehingga Kabupaten/Kota{' '}
                  <b>{topsis.alternativeName ? topsis.alternativeName : ''}</b> terpilih sebagai
                  alternatif terbaik.
                  <br /> Dengan demikian, Kabupaten/Kota paling rawan jika terjadi bencana adalah
                  Kabupaten/Kota <b>{topsis.alternativeName ? topsis.alternativeName : ''}</b>
                </>
              );
            }}
            setCurrentRow={setCurrentRow}
            setShowDrawer={setShowDrawer}
            actionRef={actionRefProTable}
            columnsProTable={columnsProTable}
            handleModalOpen={handleModalOpen}
            buttonNewVisibility={false}
            buttonTreeVisibility={false}
            setIsNew={setIsNew}
            handleUpdate={() => {}}
            handleRemove={() => {}}
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
