import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import BoardList from '../../components/board/BoardList'

const Dashboard = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <div className='page-title-box'>
            <Row>
              <Col lg={7}>
                <h4 className='page-title'>
                  더클랩 &nbsp;&gt;&nbsp; 게시글 조회
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
              <BoardList />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default Dashboard
