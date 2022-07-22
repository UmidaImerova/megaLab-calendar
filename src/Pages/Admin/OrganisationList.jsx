import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TextField from '../../components/AdminPanel/TextField'

function OrganisationList() {
  const [orgName, setOrgName] = useState({ name: '', id: '' })
  const handleAddOrg = () => {
    setOrgName({ name: '' })
  }
  const organisations = [
    { name: 'MegaCom', id: '0' },
    { name: 'MegaLab', id: '1' },
  ]
  return (
    <div>
      <h1>Список организаций</h1>
      <TextField
        label="Название организации"
        inputProps={{ type: 'text' }}
        id="orgName"
        value={orgName.name}
        onChange={(e) => setOrgName({ ...orgName, name: e.target.value, id: uuidv4() })}
      />
      <button type="submit" onClick={handleAddOrg}>
        Добавить организацию
      </button>
      <div>
        <ul>
          {organisations.map((org) => (
            <li key={uuidv4()}>{org.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default OrganisationList
