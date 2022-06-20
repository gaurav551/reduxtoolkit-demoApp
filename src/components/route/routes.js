import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { SubmitCandidateDetail } from '../pages/Candidate/SubmitCandidateDetail';
import { ViewCandidateDetail } from '../pages/Candidate/ViewCandidateDetail';
import { SimpleForm } from '../pages/Candidate/SimpleForm';

const routes = [
  {
    path: '/',
    element: <ViewCandidateDetail/>,
    exact: true
  },
  {
    path: '/about',
    element: <SubmitCandidateDetail/>,
    exact: true
  },
  {
    path: '/contact',
    element: <SimpleForm/>,
    exact: true
  },
  {
    path: '/viewCandidateDetail/:id',
    element: <ViewCandidateDetail/>,
    exact: true
  },
 // and so on for other routes in your project
]

export default routes;