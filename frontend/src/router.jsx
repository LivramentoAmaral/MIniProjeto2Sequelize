import { createBrowserRouter } from 'react-router-dom'

import Base from './layouts/Base'
import Course from './pages/course'
import Student from './pages/student'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    children: [
      {
        path: '/',
        element: <Course />
      },
      {
        path: '/student',
        element: <Student />
      }
    ]
  }
])

export default routes
