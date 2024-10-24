import { StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import { Line, Column } from '@ant-design/charts';

// const DemoRing = () => {
//   const percent = 0.9995;
//   const config = {
//     title: 'This is the title of chart.',
//     size: 26,
//     percent,
//     width: 100,
//     height: 100,
//     color: ['#E8EFF5', '#66AFF4'],
//     annotations: [
//       {
//         type: 'text',
//         style: {
//           text: `${percent * 100}%`,
//           x: '50%',
//           y: '50%',
//           textAlign: 'center',
//           fontSize: 16,
//           fontStyle: 'bold',
//         },
//       },
//     ],
//   };

//   return <Tiny.Ring {...config} />;
// };

const DemoLine = () => {
  const data = [
    { year: '2021', value: 4 },
    { year: '2022', value: 4 },
    { year: '2023', value: 5 },
    { year: '2024', value: 3 },
  ];
  const config = {
    data,
    axis: {
      x: {},
      y: { line: true },
    },
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 1,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 1,
    },
  };
  return <Line height={150} {...config} />;
};

const DemoColumn = () => {
  const data = [
    { year: '2021', value: 0 },
    { year: '2022', value: 0 },
    { year: '2023', value: 1 },
    { year: '2024', value: 2 },
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    // label: {
    //   text: (d) => `${(d.frequency * 100).toFixed(1)}%`,
    //   textBaseline: 'bottom',
    // },
    axis: {
      y: {
        // labelFormatter: '.0%',
      },
    },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };
  return <Column height={150} {...config} />;
};

const StatisticDashboard = (props: { responsive: any }) => {
  const { Divider, Statistic } = StatisticCard;
  return (
    <StatisticCard.Group direction={props.responsive ? 'column' : 'row'}>
      <StatisticCard
        title="Experienced in both international and local projects。"
        statistic={{
          title: 'Total experiences',
          value: 11,
          suffix: '++ Years',
          description: 'Since 2012',
          // icon: (
          //   <img
          //     style={{ display: 'block', width: 45, height: 45 }}
          //     src="/images/experiencesicon.png"
          //     alt="icon"
          //   />
          // ),
        }}
      >
        <Statistic
          style={{ marginBlockStart: 20 }}
          title="Nearly"
          value={24}
          suffix="Professional"
          layout="vertical"
          description={<Statistic title="Year -on -year" value="0%" />}
          // icon={
          //   <img
          //     style={{ display: 'block', width: 45, height: 45 }}
          //     src="/images/professionalicon.png"
          //     alt="icon"
          //   />
          // }
        />
      </StatisticCard>
      <Divider type={props.responsive ? 'horizontal' : 'vertical'} />
      <StatisticCard
        // title="Market trend"
        // tip="Market description"
        statistic={{
          title: 'Success Stories',
          value: 100,
          suffix: '++',
          description: <Statistic title="Year -on -year" value="30%" trend="up" />,
          // icon: (
          //   <img
          //     style={{ display: 'block', width: 45, height: 45 }}
          //     src="/images/successicon.png"
          //     alt="icon"
          //   />
          // ),
        }}
        style={{ maxWidth: 480 }}
        // extra={<EllipsisOutlined />}
        chart={<DemoLine />}
        footer={
          <>
            <Statistic value="20%" title="Rise in project count in 2023" layout="horizontal" />
            <Statistic value="0%" title="Rise in project count in 2022" layout="horizontal" />
          </>
        }
      />
      {/* >
        <Statistic
          title="On-Going Project"
          value={3}
          layout="vertical"
          description={<Statistic title="Year -on -year" value="50%" trend="down" />}
        />
      </StatisticCard> */}
      <Divider type={props.responsive ? 'horizontal' : 'vertical'} />
      <StatisticCard
        statistic={{
          title: 'On-Going Project',
          value: 2,
          description: <Statistic title="Year -on -year" value="50%" trend="down" />,
          // icon: (
          //   <img
          //     style={{ display: 'block', width: 45, height: 45 }}
          //     src="/images/projecticon.png"
          //     alt="icon"
          //   />
          // ),
        }}
        chart={<DemoColumn />}
        footer={
          <>
            <Statistic value="20%" title="On-going project since 2023" layout="horizontal" />
            <Statistic value="100%" title="On-going project since 2024" layout="horizontal" />
          </>
        }
      ></StatisticCard>
    </StatisticCard.Group>
  );
};

export default StatisticDashboard;
