import {getPageTitle, PageContainer} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import {Breadcrumb, Button, Flex, Tooltip} from 'antd';
import {DownloadOutlined, ExportOutlined, PrinterOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import * as AntdIcons from '@ant-design/icons';
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import {DraggablePanel, Position} from '@ant-design/pro-editor';
import {useLocalStorageState} from 'ahooks';
import moment from "moment";


const ModulContainer: React.FC<any> = ({
                                         children,
                                         statistikDashboard = <></>,
                                         printContainer = <></>,
                                         isPrint = false,
                                          printName = 'print'
                                       }) => {
  const pathNameLoc = location.pathname;
  const [positionPrint, setPosPrint] = useLocalStorageState<Position>('print-pos');
  const [showPrint, setShowPrint] = useState(false);



  const title = getPageTitle({
    pathname: pathNameLoc
  });
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={() =>
        // offset
      {
        // setResponsive(offset.width < 596);
      }
      }
    >
      <PageContainer
        breadcrumbRender={() => {
          // setAttr(props)
          let item: any[] = [];

          return <Breadcrumb style={{paddingBlockStart: 18}} items={item}/>;
        }}
        header={{
          title: title,
        }}
        content={statistikDashboard}
        // tabList={[
        //   {
        //     tab: 'Overview',
        //     key: 'overview',
        //   },
        //   {
        //     tab: 'Statistic',
        //     key: 'statistic',
        //   },
        // ]}
      >
        {children}
        {!isPrint ? (
          <></>
        ) : (
          <DraggablePanel
            style={{
              paddingInline: 0,
              paddingBlockEnd: 20,
              paddingBlockStart: 0,
              backgroundColor: 'rgb(37,37,37)',
              display: showPrint ? 'block' : 'none',
            }}
            mode="float"
            position={positionPrint}
            defaultPosition={{x: 10, y: 10}}
            onPositionChange={setPosPrint}
            minWidth={700}
            maxWidth={700}
            minHeight={800}
            maxHeight={800}
            expandable={false}
          >
            <Flex justify="end">
              <Button
                size="large"
                danger
                type="link"
                icon={<AntdIcons.CloseCircleOutlined/>}
                onClick={() => setShowPrint(false)}
              />
            </Flex>
            <Flex style={{paddingInline: 20, height: '100%'}}>
              <PDFViewer width={'100%'} height={'95%'} style={{border: 0, marginHorizontal: 20}}>
                {printContainer}
              </PDFViewer>
            </Flex>
          </DraggablePanel>
        )}
      </PageContainer>
    </RcResizeObserver>
  );
};

export default ModulContainer;
