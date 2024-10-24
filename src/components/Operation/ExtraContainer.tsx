import React from 'react';
import {Button, Tooltip} from 'antd';
import {

     DownloadOutlined,
     ExportOutlined,
     PrinterOutlined
} from '@ant-design/icons';

const ExtraContainer: React.FC = () => {

    return (
        <>
            <Tooltip trigger={'hover'} placement={'bottom'} title="Import">
                <Button key="1" icon={<DownloadOutlined/>} type="primary" shape="default">
                    Import
                </Button>
            </Tooltip>
            <Tooltip trigger={'hover'} placement={'bottom'} title="Export">
                <Button key="3" icon={<ExportOutlined/>} type="text" shape="default"></Button>
            </Tooltip>
            <Tooltip trigger={'hover'} placement={'bottom'} title="Print">
                <Button key="1" icon={<PrinterOutlined/>} type="text" shape="default"></Button>
            </Tooltip>
        </>
    )
        ;
};

export default ExtraContainer;
