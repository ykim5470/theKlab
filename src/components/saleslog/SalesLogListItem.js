import React, { useEffect } from 'react'

import { getDateInTimestamp } from '../../helpers/tStampUtil'

function SalesLogItem({ number, data }) {
  useEffect(() => {}, data)
  return (
    <>
      <tr>
        <td>{getDateInTimestamp(data.meeting_date)}</td>
        <td>{getDateInTimestamp(data.modification_date)}</td>
        <td>{data.title}</td>
        <td>{data.user_name}</td>
        <td>{data.account_name}</td>
        {data.strategy != null ? <td>{data.strategy.length}</td> : null}
        {data.operation != null ? <td>{data.operation.length}</td> : null}
        {data.product != null ? <td>{data.product.length}</td> : null}
        {data.personal != null ? <td>{data.personal.length}</td> : null}
      </tr>
    </>
  )
}

export default SalesLogItem
