import MiniHeader from "@/pages/Admin/components/MiniHeader/MiniHeader";
import { Box } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MyTable from "@/components/Table/MyTable";
import { ListColumn } from "@/components/Table/types/core";
import { API_ENDPOINTS } from "@/utils/api";
import { formatDentistName } from "@/utils/helper";

export type DentistAppointmentListData = {
  id: string;
  treatName: string;
  status: string;
  customerName: string | null;
  startDate: Date;
  tempDent: string;
};

const columns: readonly ListColumn<
  Omit<DentistAppointmentListData, "cusId">
>[] = [
  { id: "treatName", label: "Name", isDetail: true, minWidth: 170 },
  { id: "status", label: "Status", minWidth: 100, isStatus: true },
  {
    id: "tempDent",
    label: "Temporary Dentist",
    minWidth: 170,
    format: formatDentistName,
  },
  {
    id: "customerName",
    label: "Patient",
    minWidth: 170,
    isPatientDetail: true,
  },
  {
    id: "startDate",
    label: "Date",
    minWidth: 200,
    isDate: true,
  },
];

const DentistAppointmentList = () => {
  return (
    <Box sx={{ p: "24px" }}>
      <MiniHeader content="Appointments" IconComponent={ChecklistIcon} />
      <MyTable<DentistAppointmentListData & { cusId: string; timeSlot: number }>
        url={API_ENDPOINTS.DENTIST.APPOINTMENT.LIST}
        columns={columns}
      />
    </Box>
  );
};

// const DentistAppointmentList = () => {
//   return <AppointmentList url={API_ENDPOINTS.DENTIST.APPOINTMENT.LIST} />;
// };

export default DentistAppointmentList;
