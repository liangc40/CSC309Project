import React from 'react'
import { ResponsivePie } from '@nivo/pie'

export let dataSchool = [
  {
    id: 'UofT',
    label: 'UofT',
    value: 1204,
  },
  {
    id: 'McGIll',
    label: 'McGIll',
    value: 1300,
  },
  {
    id: 'UBC',
    label: 'UBC',
    value: 400,
  },
  {
    id: 'UWaterloo',
    label: 'UWaterloo',
    value: 432,
  },
  {
    id: 'Ryerson',
    label: 'Ryerson',
    value: 332,
  },
]

export let dataMajor = [
  {
    id: 'CS',
    label: 'CS',
    value: 4012,
  },
  {
    id: 'Stats',
    label: 'Stats',
    value: 1320,
  },
  {
    id: 'Art History',
    label: 'Art History',
    value: 843,
  },
  {
    id: 'Medicine',
    label: 'Medicine',
    value: 212,
  },
  {
    id: 'Engineering Science',
    label: 'Engineering Science',
    value: 132,
  },
]

const MyResponsivePie = (props) => (
  <ResponsivePie
    data={props.data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: 'nivo' }}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor='#333333'
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: 'color' }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor='#333333'
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: 'CS',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'Stats',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'UofT',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'UBC',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'McGill',
        },
        id: 'lines',
      },
    ]}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        translateY: 56,
        itemWidth: 80,
        itemHeight: 18,
        itemTextColor: '#999',
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
)

export default MyResponsivePie
