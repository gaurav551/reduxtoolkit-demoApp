import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { COLORS } from "../../../constants/colors";
import { Col, Row } from "react-bootstrap";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector,useDispatch } from 'react-redux';
import { baseUrl } from "../../../configs";
import { attachmentPath } from "../../../configs/attachmentPath";
import { Asterisk } from "../../ui/Asterisk";
import { getCandidate,clear } from "../../../features/candidate/getCandidateSlice";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { JobDetailsCard } from "../Job/JobDetailsCard";
import Checkbox from "@mui/material/Checkbox";


export const ViewCandidateDetail = () => {
  let { id } = useParams(); 

  const dispatch = useDispatch();
 
  const candidate = useSelector((state) => state.getCandidate);
  
  const{data,error,success,loading} = candidate;
  React.useEffect(() => {
    dispatch(clear())

    dispatch(getCandidate(id))
    }, [dispatch])

    const content = () =>
     {
         if(loading!==null && loading) return <Alert severity="error"> please wait... </Alert>
         if(error!==null && error) return <Alert severity="error"> {error} </Alert>
         if(!loading && data==null) return <Alert severity="info"> No data to show </Alert>
         return <> 
         <JobDetailsCard/>
         <br/>
       <Card>
         <CardContent>
           <Typography  gutterBottom variant="h5" component="div">
             Candidate Information
           </Typography>
           <Row>
             <Col sm={4}>First Name <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.firstName}</p>
             </Col>
             
             <Col sm={4}>Middle Name <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.middleName}</p>
             </Col>
             <Col sm={4}>Last Name <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.lastName}</p>
             </Col>
           </Row>
           <Row>
             <Col sm={4}>Email <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.email}</p>
             </Col>
             
             <Col sm={4}>Phone <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.phone}</p>
             </Col>
            
           </Row>
           <Row>
             <Col sm={4}>Address <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.address}</p>
             </Col>
             
             <Col sm={4}>City <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.city}</p>
             </Col>
             <Col sm={4}>State <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.state}</p>
             </Col>
           </Row>
           <Row>
             <Col sm={4}>Country <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.country}</p>
             </Col>
              
             <Col sm={4}>Zip <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.zip}</p>
             </Col>
            
           </Row>
           <Row>
             <Col sm={4}>Total Experience <Asterisk/>
             <p style={{fontWeight:'bold'}}>{data?.totalExperienceInYears}</p>
             </Col>
             
             <Col sm={4}>SKill Match <Asterisk/>
             <p style={{fontWeight:'bold'}}>
             {data?.skillMatches?.map(x=> {return <> {x}</>})}
             </p>
             </Col>
            
           </Row>
           <Row>
             <Col sm={4}>Work Authorization Status <Asterisk/>
             <p style={{fontWeight:'bold'}}>
             {data?.workAuthorizationStatuses?.map(x=> {return <> {x}</>})}
             </p>
             </Col>
             
             <Col sm={4}>Canididate Employment
             <p style={{fontWeight:'bold'}}>
             {data?.employmentTypes?.map(x=> {return <> {x}</>})}
             </p>
             </Col>
            
           </Row>
           <Row>
             <Col sm={4}>Employer Name
             <p style={{fontWeight:'bold'}}>{data?.employerName}</p>
             </Col>
             
             <Col sm={4}>Pay Rate Expected
             <p style={{fontWeight:'bold'}}>${data?.payRate?.rate}   {data?.payRate?.period}</p>
             </Col>
            
           </Row>
           <Typography>Current Work Location</Typography>
           <Row>
             <Col sm={4}>City
             <p style={{fontWeight:'bold'}}>{data?.currentCity}</p>
             </Col>
             
             <Col sm={4}>State
             <p style={{fontWeight:'bold'}}>{data?.currentState}</p>
             </Col>
             <Col sm={4}>Willing to relocate
              
             <p style={{fontWeight:'bold'}}><Checkbox disabled checked={data?.willingToRelocate}/></p>
             </Col>
            
           </Row>
           <Row>
             <Col sm={4}>Resume
             <p> <CheckBoxRoundedIcon style={{color:COLORS.primary}}/> {data?.attachment?.resume} <a target="_blank" href={`${baseUrl}${attachmentPath}${data?.attachment?.resumePath}`}> <DownloadOutlinedIcon  style={{color:COLORS.primary}}/> </a> </p>
             </Col>
             
             <Col sm={4}>Document
             <p> <CheckBoxRoundedIcon style={{color:COLORS.primary}}/> {data?.attachment?.resume} <a target="_blank" href={`${baseUrl}${attachmentPath}${data?.attachment?.documentPath}`}>  <DownloadOutlinedIcon  style={{color:COLORS.primary}}/> </a> </p>
             </Col>
            
           </Row>
          
         </CardContent>
        
       </Card>
           <br/>
       <Card>
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
             The following recruiter has requested your Authorization, Please confirm
             
           </Typography>
           <TableContainer component={Paper}>
       <Table sx={{ minWidth: 700 }} aria-label="customized table">
         <TableHead>
           <TableRow>
             <TableCell >Recuiter Id</TableCell>
             <TableCell >Full Name</TableCell>
             <TableCell >Email Address</TableCell>
             <TableCell >Contact Detail</TableCell>
             <TableCell >Provider</TableCell>
             <TableCell >Location</TableCell>
             <TableCell >Action</TableCell>
 
 
           </TableRow>
         </TableHead>
         <TableBody>
          
             <TableRow key={"DD"}>
               <TableCell >
               {data?.id}
               </TableCell>
            
               <TableCell >{`${data?.firstName} ${data?.middleName} ${data?.lastName}`.replace('  ',' ')}</TableCell>
               <TableCell >{data?.email}</TableCell>
               <TableCell >{data?.phone}</TableCell>
               <TableCell >{data?.employerName}</TableCell>
               <TableCell >{data?.address}</TableCell>
               <TableCell ><Button variant="contained"> Authorize Now </Button> </TableCell>
 
 
             </TableRow>
         
         </TableBody>
       </Table>
     </TableContainer>
           
         </CardContent>
         
       </Card>
       </>
     }


  return (
    <>
       

      
       
       {content()}
      
    </>
  );
};
