import React, { useEffect } from 'react'
import { getDatabase } from '../../redux/thunk'
import { useSelector, useDispatch } from 'react-redux'

const OrganizationList = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDatabase())
  }, [])
  console.log(state.db) //["all", "hansolhomedeco", "lsmetal"]

  return <div>a</div>
}

export default OrganizationList
