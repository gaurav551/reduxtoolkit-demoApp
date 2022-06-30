import React, { useState, useEffect } from "react";
import { CompensationCalculator } from "./CompensationCalculator";
import { useSelector, useDispatch } from 'react-redux'
import { COLORS } from "../../../constants/colors";
import getCheckedValues from "../../../utils/getCheckedValues";
import { CandidateForm } from "./CandidateForm";
import { clear, postData } from "../../../features/candidate/candidateSlice";
import { uploadAttachment } from "../../../features/candidate/uploadAttachmentSlice";
import { Alert } from "@mui/material";
import { showModal } from "../../../features/alertModal/alertModalSlice";
import generateUniqueId from "../../../utils/generateUniqeId";
export const SubmitCandidateDetail = () => {


  let jobPosition = "Technical Architect";
  let jobId = "00047564991";
  const [showCompensationCalculator, setShowCompensationCalculator] =
    useState(false);
  const [formErrorMessage, setformErrorMessage] = useState(null);
  const onError = () => {
    setformErrorMessage("Please fill all required");
  };
  const dispatch = useDispatch()



  React.useEffect(() => {
    dispatch(clear())
    return () => {
      dispatch(clear())
    }
  }, [dispatch])
  const candidate = useSelector((state) => state.candidate);

  const { data, error, success, loading } = candidate;

  const onSubmit = (data) => {
    dispatch(clear())
    let requestData = JSON.parse(JSON.stringify(data));
    let formData = new FormData();
    let resume = data.attachment.resume[0];
    let document = data.attachment.document[0];

    let resumePath = generateUniqueId() + resume?.name;
    let documentPath = generateUniqueId() + document?.name;

    formData.append("Resume", resume);
    formData.append("Document", document);
    formData.append("ResumePath", resumePath);
    formData.append("DocumentPath", documentPath);
    dispatch(uploadAttachment(formData));

    requestData.attachment.resume = resume?.name;
    requestData.attachment.document = document?.name;
    requestData.attachment.resumePath = resumePath;
    requestData.attachment.documentPath = documentPath;

    //Get only checked items
    requestData.employmentTypes = getCheckedValues(data.employmentTypes);
    requestData.workAuthorizationStatuses = getCheckedValues(
      data.workAuthorizationStatuses
    );
    requestData.skillMatches = getCheckedValues(data.skillMatches);
    console.log(requestData);
    dispatch(postData(requestData));
    setformErrorMessage(null);
  };
  const showAlertModal = (data) => {
    dispatch(showModal(data));
  }


  return (
    <>
      {/* {showAlertModal} */}
      <CompensationCalculator
        jobId={jobId}
        open={showCompensationCalculator}
        close={() => setShowCompensationCalculator(false)}
      />
      <h5 style={{ color: COLORS.primary }}>
        You are submiting candidate detail for {jobPosition} (Job Id: {jobId})
      </h5>
      <br />
      <CandidateForm
        loading={loading}
        onError={onError}
        onSubmit={onSubmit}
        showCompensationCalculator={setShowCompensationCalculator}
        formErrorMessage={formErrorMessage}
      />
      <br />
      {success !== null && success && showAlertModal({ type: "success", message: "Thank you for submitting your candidate for this job post. As a next step we will send email to the candidate to confirm his/her interest. Candidate acknowledgement is mandatory to  proceed further.", linkText: "View Job Posting", link: `/viewCandidateDetail/${data?.id}` })}
      {success !== null && success && <Alert severity="success">{"Your request was successfully submitted"}</Alert>}

      {error !== null && error && <Alert severity="error">{error}</Alert>}
    </>
  );
};
