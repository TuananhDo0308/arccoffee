import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpState {
  currentStep: number;
  formData: {
    Name: string;
    Email: string;
    Password: string;
    PhoneNumber: string;
    Gender: string;
    Year: number;
    Month: number;
    Day: number;
    RegionId: string;
    CityId: string;
    DistrictId: string;
    Street: string;
    Picture: File | null;
  };
  errors: any;
}

const initialState: SignUpState = {
  currentStep: 1,
  formData: {
    Name: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    Gender: "",
    Year: 1900,
    Month: 12,
    Day: 1,
    RegionId: "",
    CityId: "",
    DistrictId: "",
    Street: "",
    Picture: null,
  },
  errors: {},
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    updateFormData(
      state,
      action: PayloadAction<{ field: string; value: string | number | File | null }>
    ) {
      const { field, value } = action.payload;
      state.formData = { ...state.formData, [field]: value };
    },
    setErrors(state, action: PayloadAction<any>) {
      state.errors = action.payload;
    },
    resetSignUpState() {
      return initialState;
    },
  },
});

export const { setCurrentStep, updateFormData, setErrors, resetSignUpState } = signupSlice.actions;
export default signupSlice.reducer;
