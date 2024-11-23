import React, { useEffect, useRef, useState } from 'react';

import { history } from '@@/exports';
import { ActionType, FooterToolbar, ProColumns } from '@ant-design/pro-components';

import ModuleTableListDashboard from '@/components/Container/ModuleTableListDashboard';
import DrawerContainer from '@/components/Operation/DrawerContainer';
import { getAlternativeByUuid } from '@/services/api-app/api/alternative_api';
import { getCriteriaChild, getSumWeightAll } from '@/services/api-app/api/criteria_api';
import { getSawRank, getTopsisRank, getWpRank } from '@/services/api-app/api/dssrank_api';
import {
  handleRemoveAlternative,
  handleRemoveAlternativeList,
} from '@/services/api-app/handle/alternative_handle';
import { DeleteFilled } from '@ant-design/icons';
import {Alert, Button, Card, Col, Row, Space, Spin, Table, Tooltip} from 'antd';
import {getCalculateAhp, getCalculateAhpAll} from "@/services/api-app/api/ahprank_api";


const BaseAhp: React.FC<any> = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch AHP Data for all parents
  useEffect(() => {
    setLoading(true);
    getCalculateAhpAll().then(value => {
      setData(value.data)
    }).finally(() => {setLoading(false);})
    // const fetchAhpData = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await axios.get("/api/ahp/calculate/all"); // Change the API endpoint as needed
    //     setData(response.data); // Assuming response.data contains the array of parent calculations
    //     setLoading(false);
    //   } catch (err) {
    //     setError(err.message || "Failed to fetch AHP data");
    //     setLoading(false);
    //   }
    // };
    //
    // fetchAhpData();
  }, []);

  // Table columns for criteria weights
  const weightColumns = [
    {
      title: "Criteria Name",
      dataIndex: "criteriaName",
      key: "criteriaName",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      render: (weight) => weight.toFixed(4), // Format weights
    },
  ];

  if (loading) {
    return <Spin size="large" style={{ margin: "50px auto", display: "block" }} />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ padding: "20px" }}>
      {data.map((parent) => (
        <Card
          key={parent.parentId}
          title={`Parent: ${parent.parentName} (ID: ${parent.parentId})`}
          style={{ marginBottom: "20px" }}
        >
          <h3>Overall Metrics</h3>
          <p>
            <strong>Lambda Max:</strong> {parent.lambdaMax.toFixed(4)}
          </p>
          <p>
            <strong>CI:</strong> {parent.ci.toFixed(4)}
          </p>
          <p>
            <strong>RI:</strong> {parent.ri.toFixed(4)}
          </p>
          <p>
            <strong>CR:</strong> {parent.cr ? parent.cr.toFixed(4) : 0 }{" "}
            {parent.cr < 0.1 ? (
              <span style={{ color: "green" }}>(Consistent)</span>
            ) : (
              <span style={{ color: "red" }}>(Inconsistent)</span>
            )}
          </p>

          <h3>Criteria Weights</h3>
          <Table
            dataSource={parent.criteriaWeights}
            columns={weightColumns}
            pagination={false}
            rowKey="criteriaName"
          />
        </Card>
      ))}
    </div>
  );
};

export default BaseAhp;
