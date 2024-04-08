import { Tables } from "@/database/types/supabase";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type User = Tables<"users">;

const initialUser: User = {
  id: "",
  created_at: "",
  username: "user",
  description: null,
  avatar: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.avatar = action.payload.avatar;
      state.username = action.payload.username;
      state.description = action.payload.description;
    },
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;

export const getUser = (state: RootState) => state.user;
