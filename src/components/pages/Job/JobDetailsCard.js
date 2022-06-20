import React from 'react'
import { Line } from "../../ui/Line";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Card, Typography } from '@mui/material';
import { COLORS } from '../../../constants/colors';
import { Col, Row } from "react-bootstrap";

export const JobDetailsCard = () => {
  return (
    <Card>
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
             Job Details
             
           </Typography>
           <Line color={COLORS.primary}/>
           <p>Technical Architect (JOB ID: 3u37373)</p>
           <Row>
            <Col sm={3}>
            <LocationOnIcon style={{color: COLORS.primary}}/> <p>Remove/Onsite</p>
 
            </Col>
           <Col sm={3}>
           <VisibilityIcon style={{color: COLORS.primary}}/> <p>10 years</p>
 
            </Col>
           <Col sm={3}>
           <AccessTimeIcon style={{color: COLORS.primary}}/> <p>Contract (12 months)</p>
 
            </Col>
           <Col sm={3}>
           <AttachMoneyIcon style={{color: COLORS.primary}}/> <p>Pay Rate 125/Hrs</p>
 
            </Col>
           </Row>
 
           <Typography variant="body2" color="text.secondary">
           "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
           "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
 
           </Typography>
         </CardContent>
         <CardActions>
           <Button size="small">View Job Posting</Button>
          
         </CardActions>
       </Card>
  )
}
