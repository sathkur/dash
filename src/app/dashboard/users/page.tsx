'use client'

import {UserTable} from "@/components/users-table"


export default function UserData() {
  
  return (
    <>
      <h1 className="text-2xl font-bold">Users</h1>
      <UserTable/>
    </>
  )
}
