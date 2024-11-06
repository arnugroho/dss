import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, Col, Row, Space } from 'antd';
import React from 'react';

const ModuleTableListCriteria: React.FC<any> = ({
  actionRef,
  columnsProTable,
  handleModalOpen,
  setIsNew,
  setShowCriteriaTree,
  handleUpdate,
  handleRemove,
  loadPaged,
  paramsTable,
  title,
  footer,
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
            footer={footer}
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
            expandable={{
              defaultExpandAllRows: true, // Expand all rows by default
            }}
            columns={columnsProTable}
            params={paramsTable}

          />
        </Col>
      </Row>
    </>
  );
};
export default ModuleTableListCriteria;
