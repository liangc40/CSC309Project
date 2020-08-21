import { ResponsiveLine } from '@nivo/line'
import React from 'react'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export let dataPosts = [
  {
    id: 'Posts',
    color: 'hsl(145, 70%, 50%)',
    data: [
      {
        x: '2/28',
        y: 193,
      },
      {
        x: '2/29',
        y: 214,
      },
      {
        x: '2/30',
        y: 144,
      },
      {
        x: '3/1',
        y: 108,
      },
      {
        x: '3/2',
        y: 206,
      },
      {
        x: '3/3',
        y: 52,
      },
    ],
  },
]

export let dataNewUser = [
  {
    id: 'New Users',
    color: 'hsl(80, 70%, 50%)',
    data: [
      {
        x: '2/28',
        y: 4344,
      },
      {
        x: '2/29',
        y: 2142,
      },
      {
        x: '2/30',
        y: 4444,
      },
      {
        x: '3/1',
        y: 1132,
      },
      {
        x: '3/2',
        y: 2032,
      },
      {
        x: '3/3',
        y: 2034,
      },
    ],
  },
]

const MyResponsiveLine = (props) => (
  <ResponsiveLine
    data={props.data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: false,
      reverse: false,
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'date',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -50,
      legendPosition: 'middle',
    }}
    colors={{ scheme: 'nivo' }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel='y'
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 70,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'bottom-to-top',
        itemWidth: 60,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
)

export default MyResponsiveLine
