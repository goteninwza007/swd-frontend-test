import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MobilePhone = {
  code: string;
  number: string;
};

export type UserData = {
  id: string;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenID: string;
  gender: string;
  mobile: MobilePhone;
  passportNo?: string;
  expectedSalary: number;
};

const STORAGE_KEY = "users";

const saveUsers = (users: UserData[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export type UserFormData = Omit<UserData, "id">;

export type UserState = {
  list: UserData[];
  editingUser: UserData | null;
  formData: UserFormData;
};

const emptyForm: UserFormData = {
  title: "",
  firstname: "",
  lastname: "",
  birthday: "",
  nationality: "",
  citizenID: "",
  gender: "",
  mobile: {
    code: "",
    number: "",
  },
  passportNo: "",
  expectedSalary: 0,
};

const initialState: UserState = {
  list: [],
  editingUser: null,
  formData: emptyForm,
};

export type FormFieldKey = keyof UserFormData;

export type UpdateFieldPayload<K extends FormFieldKey> = {
  field: K;
  value: UserFormData[K];
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserData[]>) => {
      state.list = action.payload;
    },
    updateField: <K extends FormFieldKey>(
      state: UserState,
      action: PayloadAction<UpdateFieldPayload<K>>,
    ) => {
      state.formData[action.payload.field] = action.payload.value;
    },
    updateMobile: (state, action: PayloadAction<MobilePhone>) => {
      state.formData.mobile = action.payload;
    },
    resetForm: (state) => {
      state.formData = emptyForm;
      state.editingUser = null;
    },
    addUser: (state) => {
      const newUser: UserData = {
        id: crypto.randomUUID(),
        ...state.formData,
      };

      state.list.push(newUser);
      saveUsers(state.list);

      state.formData = emptyForm;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
      saveUsers(state.list);
    },
    startEdit: (state, action: PayloadAction<UserData>) => {
      state.editingUser = action.payload;

      state.formData = {
        title: action.payload.title,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        birthday: action.payload.birthday,
        nationality: action.payload.nationality,
        citizenID: action.payload.citizenID,
        gender: action.payload.gender,
        mobile: action.payload.mobile,
        passportNo: action.payload.passportNo,
        expectedSalary: action.payload.expectedSalary,
      };
    },
    updateUser: (state) => {
      if (!state.editingUser) return;

      state.list = state.list.map((u) =>
        u.id === state.editingUser?.id ? { id: u.id, ...state.formData } : u,
      );

      saveUsers(state.list);

      state.editingUser = null;
      state.formData = emptyForm;
    },
    resetEdit: (state) => {
      state.editingUser = null;
      state.formData = emptyForm;
    },
  },
});

export const {
  setUsers,
  updateField,
  updateMobile,
  resetForm,
  addUser,
  deleteUser,
  startEdit,
  updateUser,
  resetEdit,
} = userSlice.actions;

export default userSlice.reducer;
