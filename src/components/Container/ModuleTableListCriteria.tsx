import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import {Alert, Button, Col, Row, Space} from 'antd';
import React from 'react';

const ModuleTableListCriteria: React.FC<any> = ({
  actionRef,
  columnsProTable,
  handleModalOpen,
  setIsNew,
  setShowCriteriaTree,
  handleUpdate,
  handleRemove,
  handleRemoveSelection = () => {},
  selectedRowKeys,
  loadPaged,
  setSelectedRows,
  paramsTable,
  title,
  footer,
  buttonNewVisibility = true,
  buttonTreeVisibility = true,
  handleChange = () => {},
  bobot
}) => {
  return (
    <>
      <Row gutter={18}>
        <Col span={24}>
          <ProTable<any, API_TYPES.TableParams>
            scroll={{ x: 'max-content' }}
            headerTitle={title}
            footer={footer}
            actionRef={actionRef}
            rowKey="uuid"
            // search={{
            //   filterType: 'query',
            //   searchText: 'Search',
            //   labelWidth: 'auto',
            // }}
            search={false}
            onChange={handleChange}
            editable={{
              type: 'multiple',
              onSave: async (_key, record) => {
                return handleUpdate(record);
              },
              onDelete: async (_key, row) => {
                return handleRemove(row.uuid);
              },
            }}
            toolBarRender={() => [
              buttonNewVisibility ? (
                <Button
                  type="primary"
                  key="primary"
                  onClick={() => {
                    handleModalOpen(true);
                    setIsNew(true);
                  }}
                >
                  <PlusOutlined />
                  New
                </Button>
              ) : (
                <></>
              ),
              buttonTreeVisibility ? (
                <Button
                  type="default"
                  key="treeview"
                  onClick={() => {
                    setShowCriteriaTree(true);
                  }}
                >
                  <PlusCircleOutlined />
                  Tree View
                </Button>
              ) : (
                <></>
              ),
            ]}
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
            }}
            request={(params) => loadPaged(params)}
            expandable={{
              defaultExpandedRowKeys: selectedRowKeys,
            }}
            columns={columnsProTable}
            params={paramsTable}
            rowSelection={{
              selectedRowKeys,
              onChange: (_selectedKey, selectedRows) => {
                // di filter khusus yg gak punya chiild
                const filteredSelectedRows = selectedRows
                  .filter((item) => item.hasChild === 'TIDAK')
                  .map((item) => item.uuid);

                setSelectedRows(_selectedKey);
                let selectedData = selectedRowKeys.filter((item) => !_selectedKey.includes(item));
                if (selectedData.length === 0) {
                  selectedData = _selectedKey.filter((item) => !selectedRowKeys.includes(item));
                }
                setSelectedRows(filteredSelectedRows);
                selectedData.forEach((dataValue: any) => {
                  handleRemove(dataValue);
                });
              },
              getCheckboxProps: (record) => ({
                style: record.isDisabled ? { display: 'none' } : {}, // Hide checkbox if `isDisabled` is true
              }),
            }}
            tableAlertRender={({ selectedRows }) => {
              return (
                <Space size={24}>
                  {/*<span>*/}
                  {/*  Selected {selectedRowKeys.length} item*/}
                  {/*  /!*<Button*!/*/}
                  {/*  /!*  type="dashed"*!/*/}
                  {/*  /!*  style={{ marginInlineStart: 12 }}*!/*/}
                  {/*  /!*  onClick={onCleanSelected}*!/*/}
                  {/*  /!*>*!/*/}
                  {/*  /!*  Cancel Selection*!/*/}
                  {/*  /!*</Button>*!/*/}
                  {/*</span>*/}
                  <span>{`Kriteria Aktif: ${selectedRows.length} `}</span>
                  <span>{bobot === 100 ? <Alert message={`Total Bobot : ${bobot} `} type="success" />
                    : <Alert message={`Total Bobot : ${bobot}, Silahkan Cek Kembali Bobot Kriteria`} type="error" />}</span>
                </Space>
              );
            }}
            tableAlertOptionRender={() => {
              return (
                <Space>
                  {/*<Tooltip trigger={'hover'} placement={'bottom'} title="Delete">*/}
                  {/*  <Button*/}
                  {/*    shape="circle"*/}
                  {/*    icon={<DeleteFilled />}*/}
                  {/*    danger*/}
                  {/*    onClick={handleRemoveSelection}*/}
                  {/*  ></Button>*/}
                  {/*</Tooltip>*/}
                </Space>
              );
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default ModuleTableListCriteria;
