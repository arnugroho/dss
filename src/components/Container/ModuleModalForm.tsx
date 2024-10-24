import { BetaSchemaForm } from '@ant-design/pro-components';
import { Col, Flex, Form, Modal, Row } from 'antd';
import React, { useEffect } from 'react';

// export type FormValueType = {
//   target?: string;
//   template?: string;
//   type?: string;
//   time?: string;
//   frequency?: string;
// } & Partial<API_TYPES.AccountListItem>;

// type DataItem = {
//   name: string;
//   state: string;
// };

const ModuleModalForm: React.FC<any> = ({
  createModalOpen,
  handleModalOpen,
  isNew,
  uuid,
  handleAdd,
  handleUpdate,
  loadData,
  title,
  columnsModalForm,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isNew) {
      form.resetFields();
    } else {
      loadData(uuid).then((response: API_TYPES.DefaultResponse) => {
        let { data } = response;
        form.setFieldsValue(data);
      });
    }
  }, [createModalOpen]);

  return (
    <>
      <Modal
        title={'Add New ' + title}
        width={800}
        onCancel={() => handleModalOpen(false)}
        open={createModalOpen}
        footer={''}
        destroyOnClose
      >
        <Row justify={'start'} align={'top'} style={{ paddingBlock: 20 }}>
          <Col span={24}>
            <BetaSchemaForm<any>
              form={form}
              // trigger={<a>点击我</a>}
              layoutType={'Form'}
              steps={[
                {
                  title: 'ProComponent',
                },
              ]}
              rowProps={{
                gutter: [16, 0],
              }}
              colProps={{
                span: 12,
              }}
              style={{
                width: '100%',
                justifyContent: 'space-between',
                marginBlockStart: 10,
                paddingInline: 0,
              }}
              grid={true}
              columns={columnsModalForm}
              title={'Add New ' + title}
              open={createModalOpen}
              onOpenChange={handleModalOpen}
              layout="vertical"
              submitter={{
                submitButtonProps: { style: { marginInline: 10 } },
                render: (_, dom) => {
                  return (
                    <>
                      <Flex justify="center" gap={'small'} style={{ paddingBlockStart: 30 }}>
                        {dom}
                      </Flex>
                    </>
                  );
                },
              }}
              onFinish={async (value) => {
                if (isNew) {
                  handleAdd(value);
                } else {
                  handleUpdate({ ...value, uuid: uuid });
                }
              }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModuleModalForm;
