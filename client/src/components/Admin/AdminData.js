import React, { useContext, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import MyResponsivePie from '../Charts/PieChart'
import adminContext from '../../context/admin/adminContext'

const AdminData = (props) => {
  const { getUsers, users } = useContext(adminContext)
  useEffect(() => {
    getUsers()
  }, [])

  const dataSchool = {}
  users.forEach((user) => {
    if (dataSchool[user.school]) {
      dataSchool[user.school].value += 1
    } else {
      dataSchool[user.school] = {
        id: user.school,
        label: user.school,
        value: 1,
      }
    }
  })

  const dataMajor = {}
  users.forEach((user) => {
    if (dataMajor[user.major]) {
      dataMajor[user.major].value += 1
    } else {
      dataMajor[user.major] = {
        id: user.major,
        label: user.major,
        value: 1,
      }
    }
  })

  return (
    <Tab.Container>
      <Row>
        <Col className='AdminData-pie-col'>
          <strong>User School Distribution</strong>
          <MyResponsivePie
            data={Object.keys(dataSchool).map((key) => dataSchool[key])}
          />
        </Col>
      </Row>
      <Row>
        <Col className='AdminData-pie-col'>
          <strong>User Major Distribution</strong>
          <MyResponsivePie
            data={Object.keys(dataMajor).map((key) => dataMajor[key])}
          />
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default AdminData
