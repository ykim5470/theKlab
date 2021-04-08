import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import BoardWrite from '../../components/board/BoardWrite'

const Write = () => {
  return (
    <React.Fragment>
      <div className=''>
        <Row>
          <Col>
            <div className='page-title-box'>
              <Row>
                <Col lg={7}>
                  <h4 className='page-title'>
                    더클랩 &nbsp;&gt;&nbsp; 게시글 작성
                  </h4>
                </Col>
                <Col lg={5} className='mt-lg-3 mt-md-0'></Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <BoardWrite />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default Write
