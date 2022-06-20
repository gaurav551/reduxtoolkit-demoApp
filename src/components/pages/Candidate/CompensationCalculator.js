import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Col, Row } from "react-bootstrap";
import { Slider } from "@mui/material";
import { COLORS } from "../../../constants/colors";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 680,
  bgcolor: "background.paper",
  padding: 25,

  boxShadow: 24,
  p: 4,
};
export const CompensationCalculator = (props) => {
  function valueLabelFormat(value) {
    return `$ ${value}`;
  }

  return (
    <Modal
      open={props.open}
      onClose={props.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          style={{ color: COLORS.primary }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Compensation calculator (Job ID: {props.jobId})
        </Typography>
        <br />
        <Row>
          <Col sm={6}>
            <Typography gutterBottom>
              Maximum pay rate <b>$80/Hr</b>
            </Typography>
            <Row>
              <Col sm={9}>
                <Slider
                  valueLabelFormat={valueLabelFormat}
                  valueLabelDisplay="auto"
                  aria-label="custom thumb label"
                  defaultValue={20}
                />
              </Col>
              <Col sm={3}>
                <p>/Hr</p>
              </Col>
            </Row>
            <Typography gutterBottom>
              Your compensation <b>$1.3/Hr</b>
            </Typography>
          </Col>
          <Col sm={6}>
            <p>
              Please note that compensation will be function of the pay rate
              for....."Neque porro quisquam est qui dolorem ipsum quia dolor sit
              amet, consectetur, adipisci velit..."
            </p>
          </Col>
        </Row>
        <Typography gutterBottom>
          Your potential compensation in 1 year for this position{" "}
          <b>${"2,939"}/Hr </b>
        </Typography>
      </Box>
    </Modal>
  );
};
