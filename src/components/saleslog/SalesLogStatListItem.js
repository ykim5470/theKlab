import React, { useEffect } from 'react'

function Item({ number, data }) {
  useEffect(() => {}, [data])

  let diffStat = '0'
  if (typeof data.diff !== 'undefined') {
    if (data.diff > 0) {
      diffStat = `${data.diff}건 증가`
    } else {
      diffStat = `${data.diff * -1}건 감소`
    }
  }
  return (
    <>
      <tr>
        <td>{`${data.year}년 ${data.month}월`}</td>
        <td>{data.log_count}</td>
        <td>{data.strategy}</td>
        <td>{data.operation}</td>
        <td>{data.product}</td>
        <td>{data.personal}</td>
        <td>{diffStat}</td>
      </tr>
    </>
  )
}

export default Item
