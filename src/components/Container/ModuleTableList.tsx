import { DeleteFilled, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, Col, Row, Space, Tooltip } from 'antd';
import React from 'react';

const ModuleTableList: React.FC<any> = ({
  actionRef,
  columnsProTable,
  handleModalOpen,
  setIsNew,
  setShowCriteriaTree,
  handleUpdate,
  handleRemove,
  handleRemoveSelection = () => {},
  loadPaged,
  // setSelectedRows,
  paramsTable,
  title,
  buttonNewVisibility = true,
  buttonTreeVisibility = true,
  handleChange = () => {},
}) => {
  return (
    <>
      <Row gutter={18}>
        <Col span={24}>
          <ProTable<any, API_TYPES.TableParams>
            scroll={{ x: 'max-content' }}
            headerTitle={title}
            actionRef={actionRef}
            rowKey="uuid"
            search={{
              filterType: 'query',
              searchText: 'Search',
              labelWidth: 'auto',
            }}
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
            request={loadPaged}
            columns={columnsProTable}
            params={paramsTable}
            // rowSelection={{
            //   onChange: (_, selectedRows) => {
            //     setSelectedRows(selectedRows);
            //   },
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
                    <Button
                      shape="circle"
                      icon={<DeleteFilled />}
                      danger
                      onClick={handleRemoveSelection}
                    ></Button>
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
export default ModuleTableList;
