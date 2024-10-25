import { Dayjs } from "dayjs";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import useProgressDone from "./hooks/useProgress";
import { BranchCardProps } from "../Branch/BranchCard";
import { TreatmentCardProps } from "../Treatment/TreatmentCard";
import { DentistCardProps } from "../Dentist/DentistCard";
import useFirstTime from "./hooks/useFirstTime";
import { APPOINTMENT_RULE } from "@/constant/core";
import { AppointmentResponse } from "./SummaryBooking/hooks/useCreateAppointment";
import { PaymentResponseType } from "@/utils/api/paymentApi";
import useStep from "@/hooks/useStep";

type BookingType = {
  branch?: BranchCardProps;
  treatment?: TreatmentCardProps;
  dentist?: DentistCardProps;
  date?: Dayjs | null;
  slot?: number;
  appointments?: AppointmentResponse[] | null;
  payment?: PaymentResponseType | null;
} | null;

type ProgressContextType = {
  data: BookingType;
  setData: Dispatch<SetStateAction<BookingType>>;
  done: number;
  setDone: Dispatch<SetStateAction<number>>;
  handleDoneIncrement: () => void;
  handleDoneDecrement: () => void;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  isStepSkipped: (step: number) => boolean;
  firstTime: boolean;
};

const ProgressContext = createContext<ProgressContextType>({
  data: null,
  setData: () => null,
  done: 0,
  setDone: () => 0,
  handleDoneIncrement: () => {},
  handleDoneDecrement: () => {},
  activeStep: 0,
  setActiveStep: () => 0,
  handleNext: () => {},
  handleBack: () => {},
  handleReset: () => {},
  isStepSkipped: () => false,
  firstTime: false,
});

const ProgressProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<BookingType>(null);
  const {
    activeStep,
    setActiveStep,
    handleNext,
    handleBack,
    handleReset,
    isStepSkipped,
  } = useStep();
  const { done, handleDoneIncrement, handleDoneDecrement, setDone } =
    useProgressDone();
  const { result } = useFirstTime();

  useEffect(() => {
    if (!result?.isFirstTime || Array.isArray(result.treatment)) {
      return;
    }
    setData({
      treatment: {
        ...result.treatment,
        numOfAppointment: result.treatment.numOfApp,
        ruleName: APPOINTMENT_RULE[0],
      },
    });
  }, [result]);

  useEffect(() => {
    if (result?.isFirstTime && done === 1) {
      setDone(2);
    }
  }, [done, result?.isFirstTime, setDone]);

  const value = {
    data,
    setData,
    done,
    setDone,
    handleDoneIncrement,
    handleDoneDecrement,
    activeStep,
    setActiveStep,
    isStepSkipped,
    handleNext,
    handleBack,
    handleReset,
    firstTime: result?.isFirstTime || false,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export type { BookingType, ProgressContextType };
export { ProgressContext, ProgressProvider };
