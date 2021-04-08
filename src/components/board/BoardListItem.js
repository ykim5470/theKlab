import React, { useState } from 'react'
import { Button } from 'reactstrap'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDateInTimestamp } from '../../helpers/tStampUtil'
function BoardListItem({ number, data }) {
  const [showAlert, setShowAlert] = useState(false)
  const [showSuccess, setSuccess] = useState(false)
  const [showFailed, setFailed] = useState(false)
  const history = useHistory()
  const state = useSelector((state) => state)

  const modifyBoard = () => {
    history.push({
      pathname: `/dashboard/modify/${data.content_id}`,
      state: { data: data },
    })
  }

  const deleteBoard = () => {
    const ID = data.content_id
    axios
      .delete(`https://api-v2.saleslog.co/dev/boards/${ID}`, {
        Headers: state.token,
      })
      .then((res) => {
        toggleSuccess()
      })
      .catch((err) => {
        console.log(err)
        toggleFailed()
      })
  }

  const toggleAlert = () => {
    setShowAlert(!showAlert)
  }

  const toggleSuccess = () => {
    setSuccess(!showSuccess)
  }

  const toggleFailed = () => {
    setFailed(!showFailed)
  }

  return (
    <>
      <tr>
        <td>{number}</td>
        <td>{data.title}</td>
        <td>{data.author}</td>
        <td>{getDateInTimestamp(data.write_date)}</td>
        <td>
          <Button color='primary' size='sm' onClick={modifyBoard}>
            수정
          </Button>{' '}
          {/* before delete, get confirm using alert */}
          <Button color='danger' size='sm' onClick={toggleAlert}>
            삭제
          </Button>
        </td>
      </tr>

      {/* 글 삭제 alert */}
      {showAlert && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText='삭제'
          confirmBtnBsStyle='danger'
          cancelBtnText='취소'
          title='삭제하시겠습니까?'
          onConfirm={() => {
            deleteBoard()
            toggleAlert()
          }}
          onCancel={toggleAlert}
        />
      )}

      {/* 글 삭제 성공 alert */}
      {showSuccess && (
        <SweetAlert
          success
          title='글을 삭제하였습니다.'
          onConfirm={() => {
            //글 삭제 후 페이지 새로고침
            window.location.reload()
            toggleSuccess()
          }}
        />
      )}

      {/* 글 삭제 실패 alert */}
      {showFailed && (
        <SweetAlert
          danger
          title='글 삭제에 실패하였습니다.'
          onConfirm={toggleFailed}
        />
      )}
    </>
  )
}

export default BoardListItem
