import React, { useEffect } from 'react'
import { Table } from 'reactstrap'

import Item from './SalesLogStatListItem'

const NoStatMessage = <td colSpan='7'>표시할 통계가 존재하지 않습니다.</td>

function SalesLogStatList({ data }) {
  useEffect(() => {}, [data])

  return (
    <Table size='sm' bordered style={{ borderBottomWidth: 1 }}>
      <colgroup>
        <col width='10%' />
        <col width='15%' />
        <col width='15%' />
        <col width='15%' />
        <col width='15%' />
        <col width='15%' />
        <col width='15%' />
      </colgroup>
      <thead>
        <tr>
          <th>기간</th>
          <th>영업일지</th>
          <th>전략니즈</th>
          <th>운영니즈</th>
          <th>제품니즈</th>
          <th>개인니즈</th>
          <th>전월대비 (일지)</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length !== 0
          ? data.map((data, index) => <Item data={data} key={index} />)
          : NoStatMessage}
      </tbody>
    </Table>
  )
}

export default SalesLogStatList
