import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import CircularIndeterminate from "@/components/CircularIndeterminate";
import { ROLE } from "@/constant/core";

import ErrorPage from "@/pages/404";
import RequireAuth from "@/components/Auth/RequireAuth";
import PersistLogin from "@/components/Auth/PersistLogin";
import UnauthorizedPage from "@/pages/403";
import AuthenticationPage from "@/pages/Authentication";

////Patient////
import BookingPage from "@/components/Booking";
import DashboardPage from "@/pages/Patient/Dashboard";
import PatientLayout from "@/pages/Patient";
import Calendar from "@/pages/Patient/Calendar";
import PatientAppointmentList from "@/pages/Patient/Appointment/AppointmentList";
import PatientAppointmentDetail from "@/pages/Patient/Appointment/AppointmentDetail";
import PatientReschedulePage from "@/pages/Patient/Reschedule";
import DentistRescheduleRequest from "@/pages/Patient/Reschedule/DentistRequest";

////Dentist////
import DentistLayout from "@/pages/Dentist";
import DentistAppointmentList from "@/pages/Dentist/Appointment";
import DentistDashboardPage from "@/pages/Dentist/Dashboard";
import DentistCalendar from "@/pages/Dentist/Calendar";
import DentistAppointmentNotes from "@/pages/Dentist/Appointment/DentistAppointmentNotes";
import DentistPatientList from "@/pages/Dentist/Patient/PatientList";
import DentistPatientDetail from "@/pages/Dentist/Patient/PatientDetail";
import DentistReschedulePage from "@/pages/Dentist/Reschedule";

////Manager////
import ManagerLayout from "@/pages/Manager/ManagerLayout";
import ManagerAllStaffList from "@/pages/Manager/Employees/ManagerAllStaffList";
import ManagerStaffsDetailBody from "@/pages/Manager/components/EmployeesDetail";
import RescheduleRequest from "@/pages/Manager/RescheduleRequest";

////Admin////
import AdminLayout from "@/pages/Admin";
//AdminList
import BranchList from "@/pages/Admin/adminViewList/BranchList/BranchList";
import TreatmentList from "@/pages/Admin/adminViewList/TreatmentList/TreatmentList";
import AdminAllStaffList from "@/pages/Admin/adminViewList/AllStaffList";
import PatientList from "@/pages/Admin/adminViewList/PatientList/PatientList";
import AdminDashboard from "@/pages/Admin/adminDashboard/AdminDashboard";
import AdminAppointmentList from "@/pages/Admin/adminAppointment/AppointmentList";
//AdminDetail
import AllStaffsDetail from "@/pages/Admin/adminViewDetail/AllStaffsDetail/AllStaffsDetail";
import BranchDetail from "@/pages/Admin/adminViewDetail/BranchDetail/BranchDetail";
import TreatmentDetail from "@/pages/Admin/adminViewDetail/TreatmentDetail/TreatmentDetail";
import AdminAppointmentDetail from "@/pages/Admin/adminAppointment/AppointmentDetail";
//AdminCreate
import CreateBranch from "@/pages/Admin/adminCreate/Branchs/CreateBranch";
import CreateTreatment from "@/pages/Admin/adminCreate/Treatments/CreateTreatment";
import CreateStaff from "@/pages/Admin/adminCreate/Staffs/Staff/CreateStaff";
import CreateManager from "@/pages/Admin/adminCreate/Staffs/Manager/CreateManager";
import CreateDentist from "@/pages/Admin/adminCreate/Staffs/Dentist/CreateDentist";
import PatientDetail from "@/pages/Admin/adminViewDetail/PatientDetail/PatientDetail";
//AdminUpdate
import BranchUpdate from "@/pages/Admin/adminUpdate/BranchUpdate/BranchUpdate";
import TreatmentUpdate from "@/pages/Admin/adminUpdate/TreatmentUpdate/TreatmentUpdate";
import EmployeeUpdate from "@/pages/Admin/adminUpdate/EmployeeUpdate/EmployeeUpdate";
import UpdateEmployeeBranch from "@/pages/Admin/adminUpdate/UpdateBranchForEmployee.tsx";

////Landging Page////
import LandingPage from "@/pages/Landing/Landing";
import SettingsPage from "@/pages/User/Settings";
import ManagerAppointmentList from "@/pages/Manager/Appointments/ManagerAppointmentList";
import ManagerDashboard from "@/pages/Manager/Dashboard/ManagerDashboard";
//User

const RouterComponent = () => {
  const router = createBrowserRouter([
    // Public routes
    { index: true, element: <Navigate to="landing" /> },
    { path: "unauthorized", element: <UnauthorizedPage /> },
    ...["login", "register"].map((path) => ({
      path,
      element: <AuthenticationPage />,
    })),
    { path: "*", element: <ErrorPage /> },
    // Protected routes
    {
      element: <PersistLogin />,
      children: [
        {
          // Patient routes
          path: "patient",
          element: <RequireAuth allowedRoles={[ROLE.PATIENT]} />,
          children: [
            {
              element: <PatientLayout />,
              children: [
                { index: true, element: <DashboardPage /> },
                { path: "calendar", element: <Calendar /> },
                {
                  path: "booking",
                  children: [
                    {
                      index: true,
                      element: <BookingPage />,
                    },
                    {
                      path: "payment-status/:id",
                      element: <BookingPage />,
                    },
                    {
                      path: "reschedule/:id",
                      element: <PatientReschedulePage />,
                    },
                  ],
                },
                {
                  path: "reschedule/:token",
                  element: <DentistRescheduleRequest />,
                },
                {
                  path: "appointments",
                  element: <PatientAppointmentList />,
                },
                {
                  path: "appointments/:id",
                  element: <PatientAppointmentDetail />,
                },
                {
                  path: "settings",
                  element: <SettingsPage />,
                },
              ],
            },
          ],
        },
        {
          // Admin routes
          path: ROLE.ADMIN,
          element: <RequireAuth allowedRoles={[ROLE.ADMIN]} />,
          children: [
            {
              element: <AdminLayout />,
              children: [
                {
                  index: true,
                  element: <Navigate to="branch" />,
                },
                //List
                {
                  path: "branch",
                  element: <BranchList />,
                },
                {
                  path: "treatments",
                  element: <TreatmentList />,
                },
                {
                  path: "adminAllStaffList",
                  element: <AdminAllStaffList />,
                },
                {
                  path: "patientList",
                  element: <PatientList />,
                },
                {
                  path: "dashboard",
                  element: <AdminDashboard />,
                },
                {
                  path: "appointments",
                  element: <AdminAppointmentList />,
                },
                //Create
                {
                  path: "branch/createBranch",
                  element: <CreateBranch />,
                },
                {
                  path: "treatments/createTreatment",
                  element: <CreateTreatment />,
                },
                {
                  path: "adminAllStaffList/createStaff",
                  element: <CreateStaff />,
                },
                {
                  path: "adminAllStaffList/createDentist",
                  element: <CreateDentist />,
                },
                {
                  path: "adminAllStaffList/createManager",
                  element: <CreateManager />,
                },
                //Detail
                {
                  path: "branch/:id",
                  element: <BranchDetail />,
                },
                {
                  path: "treatments/:id",
                  element: <TreatmentDetail />,
                },
                {
                  path: "adminAllStaffList/:id",
                  element: <AllStaffsDetail />,
                },
                {
                  path: "patientList/:id",
                  element: <PatientDetail />,
                },
                {
                  path: "appointments/:id",
                  element: <AdminAppointmentDetail />,
                },
                {
                  path: "settings",
                  element: <SettingsPage />,
                },
                //Update
                {
                  path: "branch/:id/update",
                  element: <BranchUpdate />,
                },
                {
                  path: "treatments/:id/update",
                  element: <TreatmentUpdate />,
                },
                {
                  path: "adminAllStaffList/:id/update",
                  element: <EmployeeUpdate />,
                },
                {
                  path: "adminAllStaffList/:id/assign",
                  element: <UpdateEmployeeBranch />,
                },
              ],
            },
          ],
        },
        {
          // Dentist routes
          path: ROLE.DENTIST,
          element: <RequireAuth allowedRoles={[ROLE.DENTIST]} />,
          children: [
            {
              element: <DentistLayout />,
              children: [
                {
                  index: true,
                  element: <DentistDashboardPage />,
                },
                { path: "calendar", element: <DentistCalendar /> },
                {
                  path: "appointments",
                  element: <DentistAppointmentList />,
                },
                {
                  path: "appointments/:id",
                  element: <DentistAppointmentNotes />,
                },
                {
                  path: "settings",
                  element: <SettingsPage />,
                },
                {
                  path: "patients/",
                  element: <DentistPatientList />,
                },
                {
                  path: "patients/:id",
                  element: <DentistPatientDetail />,
                },
                {
                  path: "reschedule/:id",
                  element: <DentistReschedulePage />,
                },
              ],
            },
          ],
        },
        {
          // Manager routes
          path: ROLE.MANAGER,
          element: <RequireAuth allowedRoles={[ROLE.MANAGER]} />,
          children: [
            {
              element: <ManagerLayout />,
              children: [
                {
                  index: true,
                  element: <Navigate to="appointments" />,
                },
                //List
                {
                  path: "managerAllStaffList",
                  element: <ManagerAllStaffList />,
                },
                {
                  path: "appointments",
                  element: <ManagerAppointmentList />,
                },
                {
                  path: "settings",
                  element: <SettingsPage />,
                },
                {
                  path: "dashboard",
                  element: <ManagerDashboard />,
                },
                // Detail
                {
                  path: "appointments/:id",
                  element: <PatientAppointmentDetail />,
                },
                {
                  path: "managerAllStaffList/:id",
                  element: <ManagerStaffsDetailBody />,
                },
                // Update
                {
                  path: "managerAllStaffList/:id/update",
                  element: <EmployeeUpdate />,
                },
                {
                  path: "reschedule-request",
                  element: <RescheduleRequest />,
                },
              ],
            },
          ],
        },
        {
          // Staff routes
          path: "staff",
          element: <RequireAuth allowedRoles={[ROLE.STAFF]} />,
          children: [],
        },
      ],
    },

    // ManagerTest routes
    {
      path: "managerTest",
      element: <ManagerLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="calendar" />,
        },
        //List
        {
          path: "managerAllStaffList",
          element: <ManagerAllStaffList />,
        },
        {
          path: "appointments",
          element: <PatientAppointmentList />,
        },
        //
        {
          path: "calendar",
          element: <Calendar />,
        },

        {
          path: "appointments/:id",
          element: <PatientAppointmentDetail />,
        },
      ],
    },
    // Guest routes
    { path: "landing", element: <LandingPage /> },
  ]);
  return (
    <RouterProvider
      fallbackElement={<CircularIndeterminate />}
      router={router}
    />
  );
};

export default RouterComponent;
