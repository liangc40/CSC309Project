import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Table from 'react-bootstrap/Table'
import adminContext from '../../context/admin/adminContext'

const AdminTab = (props) => {
  const { setEdit, getUsers, deleteUser, users } = useContext(adminContext)

  useEffect(() => {
    getUsers()
  }, [users])

  return (
    <div>
      <Container className='AdminUsers-Table'>
        <Table responsive>
          <thead>
            <tr>
              <th className='AdminUsers-TableCell'>Avatar</th>
              <th className='AdminUsers-TableCell'>Username</th>
              <th className='AdminUsers-TableCell'>Email</th>
              <th className='AdminUsers-TableCell'>School</th>
              <th className='AdminUsers-TableCell'>Major</th>
              <th className='AdminUsers-TableCell'>Created At</th>
              <th className='AdminUsers-TableCell'></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className='AdminUsers-tr' key={user._id}>
                <td className='AdminUsers-TableCell'>
                  <img src={user.avatar} />
                </td>
                <td className='AdminUsers-TableCell'>{user.username}</td>
                <td className='AdminUsers-TableCell'>{user.email}</td>
                <td className='AdminUsers-TableCell'>{user.school}</td>
                <td className='AdminUsers-TableCell'>{user.major}</td>
                <td className='AdminUsers-TableCell'>
                  {moment(users[0].createdAt).format('MMM Do YYYY')}
                </td>
                <td>
                  <DropdownButton
                    title={' Actions '}
                    variant={'danger'}
                    id={`dropdown-variants-${'Danger'}`}
                    key={'Danger'}
                    className='AdminUsers-DropdownButton'
                  >
                    <Dropdown.Item
                      key='1'
                      onClick={() => {
                        setEdit(user)
                      }}
                    >
                      View
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      key='2'
                      onClick={() => {
                        deleteUser(user._id)
                      }}
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default AdminTab
