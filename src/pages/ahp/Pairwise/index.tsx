import { getCriteria } from '@/services/api-app/api/criteria_api';
import {Button, Card, Col, Form, Row, Slider} from 'antd';
import { useEffect, useState } from 'react';
import {getPairwise, updatePairwise} from "@/services/api-app/api/pairwise_api";
import {handleUpdatePairwise} from "@/services/api-app/handle/pairwise_handle";


const Index = () => {
  const criteriaFeeder = [{ name: 'Cost' }, { name: 'Quality' }, { name: 'Speed' }]; // Daftar kriteria

  const [form] = Form.useForm();
  const [criteria, setCriteria] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [groupedByParent, setGroupedByParent] = useState({});


  useEffect(() => {
    const options = {};
    const params = {
      current: 1,
      pageSize: 200,
    };
    getPairwise(params, options).then(value => {
      const dataPairwise = value.data
      console.log(dataPairwise)
      getCriteria(params, options).then((value) => {

        // Step 1: Filter Valid Criteria (statusDelete = false)
        const validCriteria = value.data.filter((item) => !item.isDelete);
        setCriteria(validCriteria)
        console.log(validCriteria)
        // Step 2: Group by `criteriaParentId`
        const grouped = validCriteria.reduce((acc, item) => {
          const parentId = item.criteriaParentId || "0"; // "root" for top-level criteria
          if (!acc[parentId]) {
            acc[parentId] = [];
          }
          acc[parentId].push(item);
          return acc;
        }, {});
        console.log(grouped)
        setGroupedByParent(grouped);

        // Step 3: Generate Pairwise Comparisons
        const pairs = {};
        Object.entries(grouped).forEach(([parentId, criteria]) => {
          pairs[parentId] = [];
          for (let i = 0; i < criteria.length; i++) {
            for (let j = i + 1; j < criteria.length; j++) {
              const filteredPairwise = dataPairwise.filter(
                (item) => item.criteria1Id === criteria[i].id && item.criteria2Id === criteria[j].id
              );
              console.log(filteredPairwise)
              pairs[parentId].push({
                criteria1: criteria[i],
                criteria2: criteria[j],
                score: filteredPairwise.length > 0 ? filteredPairwise[0].score : 4 , // Default score (AHP scale, 1 = 4 index)
              });
            }
          }
        });
        console.log(pairs)
        setComparisons(pairs);
      });
    })


  }, []);

  // Step 4: Handle Slider Change
  const handleSliderChange = (parentId, index, value) => {
    const updatedComparisons = { ...comparisons };
    updatedComparisons[parentId][index].score = value;
    handleUpdatePairwise(updatedComparisons[parentId][index]).then(value1 => {
      if (value1){
        setComparisons(updatedComparisons);
      }
    })

  };

  // const handleSubmit = () => {
  //   console.log(comparisons);
  //   // Send pairwise comparisons to the backend
  //   // axios.post("/api/pairwise/save", comparisons).then(() => {
  //   //   alert("Pairwise comparisons saved successfully!");
  //   // });
  // };

  const ahpMarks = {
    0: '9',
    1: '7',
    2: '5',
    3: '3',
    4: '1',
    5: '3',
    6: '5',
    7: '7',
    8: '9',
  };

  return (
    <div>
      {Object.entries(comparisons).map(([parentId, pairs], parentIndex) => (
        <Card
          key={parentIndex}
          title={`Parent Criteria : ${ parentId !== '0' ? criteria.filter((item) => item.id == parentId)[0].criteriaName : 'ROOT' }`}
          style={{ marginBottom: "16px" }}
        >
          {pairs.map((pair, pairIndex) => (
            <Form.Item
              key={pairIndex}
              // label={`Compare: ${pair.criteria1.criteriaName} vs ${pair.criteria2.criteriaName}`}
              style={{ marginBottom: "24px" }}
            >
              <Row gutter={[16, 16]} align="middle">
                <Col span={6}>
                  <strong>{pair.criteria1.criteriaName}</strong>
                </Col>
                <Col span={12}>
                  <Slider
                    min={0}
                    max={8}
                    included={false}
                    marks={{
                      0: "9",
                      1: "7",
                      2: "5",
                      3: "3",
                      4: "1",
                      5: "3",
                      6: "5",
                      7: "7",
                      8: "9",
                    }}
                    step={null}
                    value={pair.score}
                    tooltip={{
                      formatter: (value) =>
                        ["9", "7", "5", "3", "1", "3", "5", "7", "9"][
                          value
                          ],
                    }}
                    onChange={(value) =>
                      handleSliderChange(parentId, pairIndex, value)
                    }
                  />
                </Col>
                <Col span={6}>
                  <strong>{pair.criteria2.criteriaName}</strong>
                </Col>
              </Row>
            </Form.Item>
          ))}
        </Card>
      ))}

      {/*<Button type="primary" onClick={handleSubmit}>*/}
      {/*  Save Comparisons*/}
      {/*</Button>*/}
    </div>
  );
};

export default Index;
