import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Axios from 'axios'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Row,
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useSelector } from 'react-redux'

import axios from 'axios'
// id and prevTitle, prevContent are brought from Boardlist id is considered as user_id
const BoardWrite = ({ id, prevTitle, prevContent }) => {
  const [title, setTitle] = useState(id ? prevTitle : '')
  const [content, setContent] = useState(id ? prevContent : '')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFailed, setShowFailed] = useState(false)

  const state = useSelector((state) => state)

  const historyObj = useHistory()
  const writeBoard = () => {
    let visibility = true

    const DATA = {
      title: title,
      content: content,
      visibility: visibility,
    }

    if (id > 0) {
      axios
        .put(`https://api-v2.saleslog.co/dev/boards/${id}`, DATA, {
          Headers: state.token,
        })
        .then((res) => {
          setShowSuccess(!showSuccess)
        })
        .catch((err) => {
          setShowFailed(!showFailed)
          console.log('PUT_BOARD err', err)
        })
    } else {
      axios
        .post(`https://api-v2.saleslog.co/dev/boards/${id}/${DATA}`, {
          Headers: state.token,
        })
        .then((res) => {
          setShowSuccess(!showSuccess)
        })
        .catch((err) => {
          setShowFailed(!showFailed)
          console.log('POST_BOARD err', err)
        })
    }
  }
  return (
    <>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>제목</InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder='제목을 입력하세요.'
          onChange={(event) => setTitle(event.target.value)}
          defaultValue={title}
        />
      </InputGroup>
      <br />
      <ReactQuill
        style={{ height: 400, marginBottom: 60 }}
        onChange={(text) => setContent(text)}
        placeholder='내용을 입력하세요.'
        defaultValue={content}
      />
      <Row className='justify-content-center'>
        <Button color='secondary' onClick={writeBoard}>
          작성
        </Button>
      </Row>

      {/* 글 작성 성공 alert */}
      {showSuccess && (
        <SweetAlert
          success
          title='글을 작성하였습니다.'
          onConfirm={() => {
            setShowSuccess(!showSuccess)
            historyObj.push('/dashboard')
          }}
        />
      )}

      {/* 글 작성 실패 alert */}
      {showFailed && (
        <SweetAlert
          warning
          title='글 작성에 실패하였습니다.'
          onConfirm={() => setShowFailed(!showFailed)}
        />
      )}
    </>
  )
}

export default BoardWrite
