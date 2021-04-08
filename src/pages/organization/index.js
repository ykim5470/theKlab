import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import OrganizationList from '../../components/organization/OrganizationList'

const Organization = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <div className='page-title-box'>
            <Row>
              <Col lg={7}>
                <h4 className='page-title'>
                  더클랩 &nbsp;&gt;&nbsp; 조직 현황
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
              <OrganizationList />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default Organization
