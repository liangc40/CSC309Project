import React from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'

export default function HomeQuestion(props) {
  const [value, setValue] = React.useState([1, 3])
  const handleChange = val => setValue(val)
  return (
    <div className='homeQuestion'>
      <Header />
      <div className='questions'>
        <div className='questionHeader'>
          Some Questions for Finding Your Study Mate ~
        </div>

        {/* Input fields */}
        <div className='wrapper'>
          {/* School div */}
          <div className='inputField'>
            <div className='typeText'>School:</div>
            <input className='inputText' type='text' />
            <div className='underline'></div>
          </div>

          {/* Gender div */}
          <div className='gender'>
            <div className='typeText'>Gender:</div>
            <div className='btn-group'>
              <ToggleButtonGroup
                type='checkbox'
                value={value}
                onChange={handleChange}
              >
                <Button className='btn-group-button'>Male</Button>
                <Button className='btn-group-button'>Female</Button>
                <Button className='btn-group-button'>Other</Button>
              </ToggleButtonGroup>
            </div>
          </div>

          {/* Major div */}
          <div className='inputField'>
            <div className='typeText'>Major:</div>
            <input className='inputText' type='text' />
            <div className='underline'></div>
          </div>

          {/* Interests div */}
          <div className='inputField'>
            <div className='typeText'>Interests:</div>
            <input className='inputText' type='text' />
            <div className='underline'></div>
          </div>

          {/* Find Now button */}
          <Button className='findNow' as={NavLink} to='/home'>
            Find Now
          </Button>
        </div>
      </div>
    </div>
  )
}
