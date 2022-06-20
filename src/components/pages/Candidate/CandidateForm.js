import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import getAddress from "../../../utils/getAddress";
import GoogleAutoCompelete from "../../../utils/googleAutocomplete";
import Radio from "@mui/material/Radio";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import { Alert } from "@mui/material";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
export const CandidateForm = (props) => {
    let skillMatches = [
        "Java",
        "Hibernate",
        "Angular",
        "Jira",
        "REST API",
        "ReachJS",
        "GIT",
      ];
      let workAuthorizationStatuses = [
        "Permanent Residence",
        "E3 Visa",
        "EAO",
        "H18",
      ];
      let employmentTypes = [
        "Contract through current employer",
        "Direct contract(1099)",
        "W2 Employee",
        "Overseas/Not Applicable",
      ];
      let payratePeriods = ["Hourly", "Daily", "Monthly", "Yearly"];
      //Validation
      const validationSchema=yup.object().shape({
        email: yup.string().email().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        address: yup.string().required(),
        phone: yup.string().required(),
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        zip: yup.string().required(),
        totalExperienceInYears: yup.number().required(),
        recruiterComments: yup.string().required().max(500,'not more'),
        currentCity: yup.string().required(),
        currentState: yup.string().required(),
        payRate: yup.object().shape({
        rate: yup.number().required(),
       period: yup.string().required()
       }),
       attachment: yup.object().shape({
         resume : yup.mixed()
         .required("You need to provide a file")
         .test("fileSize", "File Size is too large", (value) => {
           return value[0] && value[0].size <= 2000000;
         }),          
         document : yup.mixed()
         .required("You need to provide a file")
         .test("fileSize", "File Size is too large", (value) => {
           return value[0] && value[0].size <= 2000000;
         })
       }),
     })
    //Form
    const {
        register,
        handleSubmit,
        setError,
        formState,
        clearErrors,
        watch,
        setValue,
      } = useForm({    reValidateMode: 'onChange',
      resolver: yupResolver(validationSchema)});
      
     //AutoComplete
     const [addresses, setAddresses] = useState([]);
  const handleChangeAddress = async (searchValue) => {
    if (!searchValue.target.value) {
      return null;
    }
    const results = await GoogleAutoCompelete(searchValue.target.value);
    if (results) {
      setAddresses(results);
    }
  };
  const changeAddress = async (value) => {
    let result = null;
    for (let x = 0; x < addresses.length; x++) {
      if (value === addresses[x].description) {
        result = await getAddress(addresses[x].description);
        console.log(result);
        // Get Zip code
      }
    }
    if (!result) {
      return;
    }
    setValue("address", value);
    setValue("zip", result.pin);
    setValue("city", result.city);
    setValue("state", result.state);
    setValue("country", result.country);
  };
     const { errors } = formState;
     const watchPayRate = watch("payRate.rate", "");
     const watchPayPeriod = watch("payRate.period", "");
     //states
     const [disabled, setdisabled] = useState(true);
      useEffect(() => {
        const subscription = watch((value, { name, type }) =>
          console.log(value, name, type)
        );
        //We can use this function to disable the browser auto complete from the fields because it looks really annoying
        window.document
          .querySelector('input[name="address"]')
          .setAttribute("autocomplete", "disable");
        window.document
          .querySelector('input[name="address"]')
          .setAttribute("aria-autocomplete", "off");
        watchPayPeriod === "Hourly" && watchPayRate > 80
          ? setError("payRate.rate", { type: "focus" }, { shouldFocus: true })
          : clearErrors("payRate.rate");
        return () => {subscription.unsubscribe();
      };
      }, [watchPayRate, watchPayPeriod]);
  return (
    <Row>
        <Col sm={9}>
          {props.formErrorMessage != null && (
            <>
              <Alert severity="error">{props.formErrorMessage}</Alert>
              <br />{" "}
            </>
          )}
          <Row>
            <Col sm={4}>
              <TextField
                {...register("firstName")}
                label="First Name"
                required
                variant="outlined"
                fullWidth
                error={errors.firstName}
              />
            </Col>
            <Col sm={4}>
              <TextField
                {...register("middleName")}
                label="Middle Name"
                variant="outlined"
                fullWidth
              />
            </Col>
            <Col sm={4}>
              <TextField
                required
                {...register("lastName")}
                label="Last Name"
                variant="outlined"
                fullWidth
                error={errors.lastName}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12}>
              <TextField
                required
                {...register("email")}
                label="Candidate Email"
                variant="outlined"
                fullWidth
                error={errors.email}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12}>
              <Autocomplete
                options={addresses.map((option) => option.description)}
                // closeIcon= { () => { return; } }
                onInputChange={(event, value) => {
                  changeAddress(value);
                }}
                autoComplete={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("address")}
                    name="address"
                    label="Address"
                    onChange={(value) => {
                      handleChangeAddress(value);
                    }}
                    variant="outlined"
                  />
                )}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={3}>
              <TextField
                required
                {...register("city")}
                label="City"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                error={errors.city}
              />
            </Col>
            <Col sm={3}>
              <TextField
                required
                {...register("state")}
                label="State"
                variant="outlined"
                fullWidth
                error={errors.state}
                InputLabelProps={{ shrink: true }}
              />
            </Col>
            <Col sm={3}>
              <TextField
                required
                {...register("country")}
                label="Country"
                variant="outlined"
                fullWidth
                error={errors.country}
                InputLabelProps={{ shrink: true }}
              />
            </Col>
            <Col sm={3}>
              <TextField
                required
                {...register("zip")}
                label="Zip"
                variant="outlined"
                fullWidth
                error={errors.zip}
                InputLabelProps={{ shrink: true }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={6}>
              <TextField
                required
                {...register("phone")}
                label="Phone"
                variant="outlined"
                fullWidth
                error={errors.phone}
              />
            </Col>
            <Col sm={6}>
              <TextField
                required
                {...register("totalExperienceInYears")}
                label="Total Experience"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Year(s)</InputAdornment>
                  ),
                }}
                error={errors.totalExperienceInYears}
              />
            </Col>
          </Row>
          <br />
          <FormLabel required component="legend">
            Skill match
          </FormLabel>
          {skillMatches.map((x) => {
            return (
              <FormControlLabel
                key={x}
                control={<Checkbox {...register(`skillMatches.${x}`)} />}
                label={x}
              />
            );
          })}
          <br />
          <br />
          <FormLabel required component="legend">
            Work Authorization Status
          </FormLabel>
          {workAuthorizationStatuses.map((x) => {
            return (
              <FormControlLabel
                key={x}
                control={
                  <Checkbox {...register(`workAuthorizationStatuses.${x}`)} />
                }
                label={x}
              />
            );
          })}
          <br />
          <br />
          <Row>
            <Col sm={12}>
              <FormLabel component="legend">
                Employer Name (If HIB, TN Visa and E3 Visa){" "}
              </FormLabel>
              <TextField
                {...register("employerName")}
                label="Employer Name"
                variant="outlined"
                fullWidth
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={6}>
              <FormLabel required id="demo-row-radio-buttons-group-label">
                Pay rate expected (Maximum pay rate for this position $80/hr)
              </FormLabel>
              <TextField
                type={"number"}
                {...register("payRate.rate")}
                error={errors.payRate?.rate}
                variant="standard"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Col>
            <Col sm={6}>
              <br />
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {payratePeriods.map((x) => {
                  return (
                    <FormControlLabel
                      key={x}
                      value={x}
                      label={x}
                      control={
                        <Radio
                          {...register("payRate.period")}
                        />
                      }
                    />
                  );
                })}
              </RadioGroup>
            </Col>
            <h6 style={{ cursor: "pointer" }}>
              <u onClick={() => props.showCompensationCalculator(true)}>
                How much Will I be compensated?
              </u>{" "}
            </h6>
          </Row>
          <br />
          <FormLabel component="legend">Candidate Employment</FormLabel>
          <Row>
            {employmentTypes.map((x) => {
              return (
                <Col key={x} sm={6}>
                  {" "}
                  <FormControlLabel
                    control={<Checkbox {...register(`employmentTypes.${x}`)} />}
                    label={x}
                  />{" "}
                </Col>
              );
            })}
          </Row>
          <br />
          <FormLabel component="legend">
            Candidate Current work location
          </FormLabel>
          <Row>
            <Col sm={4}>
              <TextField
                {...register("currentCity")}
                label={"City"}
                required
                variant="outlined"
                fullWidth
                error={errors.currentCity}
              />
            </Col>
            <Col sm={4}>
              <TextField
                required
                {...register("currentState")}
                label="State"
                variant="outlined"
                fullWidth
                error={errors.currentState}
              />
            </Col>
            <Col sm={4}>
              <FormControlLabel
                control={<Checkbox />}
                label="Willing to relocate"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12}>
              <FormLabel required component="legend">
                Limit 500 words
              </FormLabel>
              <TextField
                {...register("recruiterComments")}
                label="Recruiter Comments"
                multiline
                inputProps={{ maxLength: 500 }}
                rows={4}
                defaultValue=""
                fullWidth
                required
                error={errors.recruiterComments}
              />
            </Col>
          </Row>
          <br />
          <Col sm={12}>
          <FormLabel required component="legend">
                Resume
              </FormLabel>
            <TextField
              type={"file"}
              
              fullWidth
              {...register("attachment.resume")}
              variant="standard"
              inputProps={{ accept:".doc, .pdf, .docx" }}
              helperText="Max file size 2MB as pdf, doc, docx"
              error={errors.attachment?.resume}
            />
          </Col>
          <br />
          <Col sm={12}>
          <FormLabel required component="legend">
                Other document
              </FormLabel>
            <TextField
              type="file"
              
              fullWidth
              {...register("attachment.document")}
              variant="standard"
              inputProps={{ accept:".doc, .pdf, .docx" }}
              error={errors.attachment?.document}
              helperText="Max file size 2MB as pdf, doc, docx"
            />
          </Col>
          <br />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setdisabled(!disabled)}
                name="antoine"
              />
            }
            label="I acknowledge that I have verified the availability of the candidate I also acknowledge that candidate has not been submitted to the same job in the
            last 30 days"
          />
          <br />
          <br />
          <p>1. W2 Employment available thorough our partner Compunnel Inc.</p>
          <p>
            2. Will need additional paperwork for payment information and terms
            of engagement.
          </p>
          {/* ERROR {error } LOADING {loading?.toString()} SUCKSESS{success?.toString()}  */}
          <Button
            disabled={props.loading || disabled}
            onClick={handleSubmit(props.onSubmit, props.onError)}
            size="large"
            variant="contained"
          >
            Submit Candidate
          </Button>
        </Col>
      </Row>
  )
}
