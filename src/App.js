import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  LoginPage,
  LoginPageFull,
  AuthPage,
  Profile,
  ForgotPassword,
  AdminPage,
  DepartmentList,
  OrganisationList,
  PositionList,
  RoomList,
  UserList,
} from './Pages'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginFull" element={<LoginPageFull />} />
        <Route path="/password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="OrganisationList" element={<OrganisationList />} />
          <Route path="DepartmentList" element={<DepartmentList />} />
          <Route path="PositionList" element={<PositionList />} />
          <Route path="RoomList" element={<RoomList />} />
          <Route path="UserList" element={<UserList />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
