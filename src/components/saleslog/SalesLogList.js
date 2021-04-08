import React, { useEffect } from 'react'
import {
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import 'flatpickr/dist/themes/material_green.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  getSalesLog,
  orgChange,
  timeSetFrom,
  timeSetTo,
} from '../../redux/thunk'
import InfiniteScroll from 'react-infinite-scroller'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_green.css'
import NoSalesLog from './NoSalesLog'
import Item from './SalesLogListItem'
import SalesLogStatList from './SalesLogStatList'
import { stat } from 'fs-extra'

const LogList = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSalesLog())
  }, [])

  const toggleDropDown = () => {
    return () => {
      dispatch({ type: 'TOGGLE_SWITCH', payload: !state.isOpen })
    }
  }

  const changeOrganization = async (name) => {
    await dispatch(orgChange(name))
    dispatch(getSalesLog())
  }

  console.log(state.db)

  return (
    <>
      <div
        className='row'
        style={{ justifyContent: 'space-between', marginBottom: 30 }}>
        <div className='col'>
          <Dropdown isOpen={state.isOpen} toggle={toggleDropDown()}>
            <DropdownToggle>{state.organization}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => changeOrganization('theklab')}>
                theklab
              </DropdownItem>
              <DropdownItem onClick={() => changeOrganization('lsmetal')}>
                lsmetal
              </DropdownItem>
              <DropdownItem
                onClick={() => changeOrganization('hansolhomedeco')}>
                hansolhomedeco
              </DropdownItem>
              <DropdownItem onClick={() => changeOrganization('kt')}>
                kt
              </DropdownItem>
              <DropdownItem onClick={() => changeOrganization('hansolpaper')}>
                hansolpaper
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className='row'>
          <Flatpickr
            value={state.from_date}
            onChange={(date) => {
              dispatch(timeSetFrom(date))
              dispatch(getSalesLog())
            }}
            style={{ marginRight: 15 }}
          />
          <h4>~</h4>
          <Flatpickr
            value={state.to_date}
            onChange={(date) => {
              dispatch(timeSetTo(date))
              dispatch(getSalesLog())
            }}
            style={{ marginRight: 15, marginLeft: 15 }}
          />
        </div>
      </div>
      {state.isNoSalesLog ? (
        <NoSalesLog />
      ) : (
        <>
          <SalesLogStatList data={state.data} />
          <InfiniteScroll pageStart={0} hasMore={state.hasMore}>
            <Table style={{ width: '100%', marginTop: 30 }}>
              <colgroup>
                <col width='5%' />
                <col width='5%' />
                <col width='*' />
                <col width='7%' />
                <col width='7%' />
                <col width='12%' />
                <col width='12%' />
                <col width='12%' />
                <col width='12%' />
              </colgroup>
              <thead>
                <tr>
                  <th>작성일</th>
                  <th>마지막수정일</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>고객사</th>
                  <th>전략</th>
                  <th>운영</th>
                  <th>제품</th>
                  <th>개인</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((data, index) => (
                  <Item data={data} key={index} number={index + 1} />
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </>
      )}
    </>
  )
}

export default LogList
