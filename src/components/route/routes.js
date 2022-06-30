import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { SubmitCandidateDetail } from '../pages/Candidate/SubmitCandidateDetail';
import { ViewCandidateDetail } from '../pages/Candidate/ViewCandidateDetail';

const routes = [
  {
    path: '/',
    element: <SubmitCandidateDetail/>,
    exact: true
  },
  {
    path: '/about',
    element: <About/>,
    exact: true
  },
  {
    path: '/contact',
    element: <Contact/>,
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