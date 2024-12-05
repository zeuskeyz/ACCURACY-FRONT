import React from 'react'
import FlexibleTable from '../components/FlexibleTable'

export const UserManagement = () => {
  const addButton = {
    path: '/users/new',
    text: 'Add User',
    icon: "bi bi-person-fill-add"
    
  }

  const columns = [
    { header: 'Names', key: 'fullName' },
    { header: 'Contact', key: 'phoneNumber' },
    { header: 'Username', key: 'username' },
    { header: 'Gender', key: 'gender' },
    { header: 'Role', key: 'role' },
    { header: 'Branch', key: 'branchCode' },
    { header: 'Login', key: 'isLogged' }
  ]

  const dataPath="/users"; const editPath="/users/edit";  const deletePath="/users"
  return (
    <>
      <FlexibleTable columns={columns} dataPath = {dataPath} editPath = {editPath} deletePath = {deletePath} button={addButton} />
    </>
  )
}

