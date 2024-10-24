import { StatisticCard } from '@ant-design/pro-components';
import { EllipsisOutlined } from '@ant-design/icons';
import React from 'react';

const StatisticDashboard = (props: { responsive: any }) => {
  const { Divider, Statistic } = StatisticCard;
  return (
    <StatisticCard.Group direction={props.responsive ? 'column' : 'row'}>
      <StatisticCard
        title="Market trend"
        tip="Market description"
        style={{ maxWidth: 480 }}
        extra={<EllipsisOutlined />}
        // chart={
        //   <img
        //     src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
        //     alt="Pillar"
        //     width="100%"
        //   />
        // }
      >
        <Statistic
          title="Overall income"
          value={1982312}
          layout="vertical"
          description={<Statistic title="Year -on -year" value="6.15%" trend="down" />}
        />
      </StatisticCard>
      <Divider type={props.responsive ? 'horizontal' : 'vertical'} />
      <StatisticCard
        statistic={{
          title: 'Number of design resources',
          value: 234,
        }}
        // chart={
        //   <img
        //     src="https://gw.alipayobjects.com/zos/alicdn/snEBTn9ax/zhexiantuchang.svg"
        //     alt="line chart"
        //     width="100%"
        //   />
        // }
      >
        <Statistic
          title="Overall income"
          value={1982312}
          layout="vertical"
          description={<Statistic title="Year -on -year" value="6.15%" trend="down" />}
        />
      </StatisticCard>
      <Divider type={props.responsive ? 'horizontal' : 'vertical'} />
      <StatisticCard
        statistic={{
          title: 'Information completion',
          value: 5,
          suffix: '/ 100',
        }}
        // chart={
        //   <img
        //     src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
        //     alt="Square diagram"
        //     width="100%"
        //   />
        // }
      >
        <Statistic
          title="Overall income"
          value={1982312}
          layout="vertical"
          description={<Statistic title="Year -on -year" value="6.15%" trend="down" />}
        />
      </StatisticCard>
      <Divider type={props.responsive ? 'horizontal' : 'vertical'} />
      <StatisticCard
        statistic={{
          title: 'Total income of fiscal year',
          value: 601987768,
          description: <Statistic title="Year -on -year" value="6.15%" trend="up" />,
        }}
        // chart={
        //   <img
        //     src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
        //     alt="line chart"
        //     width="100%"
        //   />
        // }
      >
        <Statistic
          title="Overall income"
          value={1982312}
          layout="vertical"
          description={<Statistic title="Year -on -year" value="6.15%" trend="down" />}
        />
      </StatisticCard>
    </StatisticCard.Group>
  );
};

export default StatisticDashboard;
