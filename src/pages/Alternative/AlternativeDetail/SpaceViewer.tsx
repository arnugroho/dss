import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { loadSmplrJs } from '@smplrspace/smplr-loader';
import { Space } from '@smplrspace/smplr-loader/dist/generated/smplr';
import chroma from 'chroma-js';
import { compose, groupBy, mapObjIndexed, pluck, prop, sum, values } from 'ramda';
import { AppstoreOutlined, PercentageOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Segmented, Button } from 'antd';
import numeral from 'numeral';
import data from './data.json';

// import { Room, Desk, rooms, desks } from './data';

const colorScale = chroma.scale('Spectral');
const randomColor = () => colorScale(Math.random()).hex();
const addRandomColor = (e) => ({
  ...e,
  color: randomColor(),
});

const addCoordinates =
  ({ padding = 0 } = {}) =>
  (e) => ({
    ...e,
    coordinates: [
      {
        levelIndex: 0,
        x: e.sx - padding,
        z: e.sz - padding,
      },
      {
        levelIndex: 0,
        x: e.sx + e.sw + padding,
        z: e.sz - padding,
      },
      {
        levelIndex: 0,
        x: e.sx + e.sw + padding,
        z: e.sz + e.sd + padding,
      },
      {
        levelIndex: 0,
        x: e.sx - padding,
        z: e.sz + e.sd + padding,
      },
    ],
  });

const items = data.items.map(addCoordinates()).map(addRandomColor);

const occupancyPercent = compose(
  values,
  mapObjIndexed((items, bin) => {
    const percentUtilised = compose((vol) => vol / Math.pow(150, 3), sum, pluck('vol'))(items);
    const { sx, sy, sz } = items[0];
    const side = 1.5 - 0.04;
    const padding = 0;
    const coordinates = [
      {
        levelIndex: 0,
        x: sx - padding,
        z: sz - padding,
      },
      {
        levelIndex: 0,
        x: sx + side + padding,
        z: sz - padding,
      },
      {
        levelIndex: 0,
        x: sx + side + padding,
        z: sz + side + padding,
      },
      {
        levelIndex: 0,
        x: sx - padding,
        z: sz + side + padding,
      },
    ];
    return { bin, percentUtilised, sy, coordinates };
  }),
  groupBy(prop('bin')),
)(data.items);

export const SpaceViewer: FC = () => {
  const spaceRef = React.useRef<Space>();

  const [view, setView] = useState('items');

  const [viewerReady, setViewerReady] = useState(false);

  // start viewer
  useEffect(() => {
    // we recommend using the default value 'esm' in your code but stackblitz required 'umd'
    loadSmplrJs('umd')
      .then((smplr) => {
        spaceRef.current = new smplr.Space({
          // spaceId: 'f438671f-9979-42c6-8338-05c0015abb2d',
          // clientToken: 'pub_eb760fee77634cdab2fe31146fc371c2',
          // containerId: 'smplr-container',
          spaceId: '191c8376-342c-4bec-81eb-4dfe0538cbd0',
          clientToken: 'pub_eb760fee77634cdab2fe31146fc371c2',
          containerId: 'smplr-container',
        });
        spaceRef.current.startViewer({
          preview: false,
          mode: '3d',
          allowModeChange: true,
          onReady: () => setViewerReady(true),
          onError: (error) => console.error('Could not start viewer', error),
        });
      })
      .catch((error) => console.error(error));
  }, []);

  // show data when viewer ready
  useEffect(() => {
    if (!viewerReady) {
      return;
    }

    // spaceRef.current.addDataLayer<Room>({
    // id: 'rooms',
    // type: 'polygon',
    // data: rooms,
    // tooltip: (d) => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
    // color: (d) => (d.available ? '#3aa655' : '#ff3f34'),
    // alpha: 0.7,
    // height: 2.9,
    // });
    // spaceRef.current.addDataLayer<Desk>({
    // id: 'desks',
    // type: 'furniture',
    // data: desks,
    // tooltip: (d) => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
    // color: (d) => (d.available ? '#50b268' : '#f75e56'),
    // });
    // return () => {
    // spaceRef.current.removeDataLayer('rooms');
    // spaceRef.current.removeDataLayer('desks');
    // };

    if (view === 'items') {
      spaceRef.current.addDataLayer({
        id: 'items',
        type: 'polygon',
        data: items,
        baseHeight: (d) => d.sy,
        height: (d) => d.sh,
        tooltip: (d) => `Bin: ${d.bin} - Item: ${d.item}`,
        color: (d) => d.color,
      });
      return () => {
        spaceRef.current.removeDataLayer('items');
      };
    }
    if (view === 'occupancy') {
      spaceRef.current.addDataLayer({
        id: 'occupancy',
        type: 'polygon',
        data: occupancyPercent,
        baseHeight: (d) => d.sy,
        height: (d) => d.percentUtilised * (1.5 - 0.04),
        tooltip: (d) => `Bin: ${d.bin} - ${numeral(d.percentUtilised).format('0.00%')} utilised`,
        color: (d) => (d.percentUtilised >= 0.5 ? '#3aa655' : '#cd4343'),
      });
      return () => {
        spaceRef.current.removeDataLayer('occupancy');
      };
    }
  }, [viewerReady, view]);

  // render
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="smplr-wrapper">
            <div id="smplr-container" className="smplr-embed"></div>
          </div>
          <div
            style={{
              background: '#ffffff',
              width: 180,
              height: 50,
              position: 'absolute',
              bottom: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Segmented
              options={[
                {
                  value: 'items',
                  icon: <AppstoreOutlined />,
                  title: 'Items View',
                },
                {
                  value: 'occupancy',
                  icon: <PercentageOutlined />,
                  title: 'Occupancy View',
                },
              ]}
              size="large"
              onChange={(value) => {
                setView(value);
              }}
            />
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => {
                spaceRef.current.removeDataLayer('items');
                spaceRef.current.removeDataLayer('occupancy');
                spaceRef.current.addDataLayer({
                  id: 'items',
                  type: 'polygon',
                  data: items.filter((e) => {
                    return e.id === 8;
                  }),
                  baseHeight: (d) => d.sy,
                  height: (d) => d.sh,
                  tooltip: (d) => `Bin: ${d.bin} - Item: ${d.item}`,
                  color: (d) => d.color,
                });
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
