import { configureStore } from '@reduxjs/toolkit'
import candidateSlice from '../features/candidate/candidateSlice'
import uploadAttachmentSlice from '../features/candidate/uploadAttachmentSlice'
import alertModalSlice from '../features/alertModal/alertModalSlice'
import getCandidateSlice from '../features/candidate/getCandidateSlice'

export default configureStore({
  reducer: {
    candidate : candidateSlice,
    getCandidate : getCandidateSlice,
    uploadAttachment : uploadAttachmentSlice,
    alertModal : alertModalSlice,
  
  },
 

})