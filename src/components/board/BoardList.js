import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Table } from 'reactstrap'
import Item from './BoardListItem'
import NoBoard from './NoBoard'
import { useSelector } from 'react-redux'

const BoardList = () => {
  const state = useSelector((state) => state)
  const [BoardData, setBoardData] = useState({ isNoBoard: false, data: [] })
  const { isNoBoard, data } = BoardData

  const fetchGetBoard = async () => {
    Axios.get(`https://api-v2.saleslog.co/dev/boards`, {
      Headers: state.token,
      Params: { getAll: true },
    })
      .then((res) => {
        setBoardData({ data: res.data.body ? res.data.body : [] })
        if (data.length !== 0) setBoardData({ isNoBoard: false })
      })
      .catch((err) => {
        console.log('GET_BOARD error :>> ', err)
      })
  }

  useEffect(() => {
    fetchGetBoard()
  })
  return (
    <>
      {isNoBoard ? (
        <NoBoard />
      ) : (
        <Table style={{ width: '100%' }}>
          <colgroup>
            <col width='10%' />
            <col width='*' />
            <col width='15%' />
            <col width='15%' />
            <col width='15%' />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <Item data={data} number={index + 1} key={index} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default BoardList
