import React, { useEffect } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import LogList from '../../components/saleslog/SalesLogList'

const SalesLog = () => {
  return (
    <React.Fragment>
      <div className=''>
        <Row>
          <Col>
            <div className='page-title-box'>
              <Row>
                <Col lg={7}>
                  <h4 className='page-title'>
                    더클랩 &nbsp;&gt;&nbsp; 세일즈로그 현황
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
                <LogList />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Saleslog */}
      </div>
    </React.Fragment>
  )
}
export default SalesLog
