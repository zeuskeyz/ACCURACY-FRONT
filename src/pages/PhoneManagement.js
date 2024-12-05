import React from 'react'
import FlexibleTable from '../components/FlexibleTable'

export const PhoneManagement = () => {
  const addButton = {
    path: '/phones/new',
    text: 'Add Device',
    icon: "bi bi-file-plus-fill"
  }

  const columns = [
    { header: 'Names', key: 'name' },
    { header: 'Code', key: 'code' },
    { header: 'Cash', key: 'cash' },
    { header: 'Deposit', key: 'deposit' },
  ]

  const dataPath="/phones"; const editPath="/phones/edit/:id";  const deletePath="/phones"

  return (
    <>
      <FlexibleTable columns={columns} dataPath = {dataPath} editPath = {editPath} deletePath = {deletePath} button={addButton} />
    </>
  )
}

