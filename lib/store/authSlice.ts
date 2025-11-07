import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./authApi";
import Cookies from "js-cookie";

interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get("token") || null,
  loading: false,
  error: null,
};

// --- Async Thunks ---
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (body: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", body);
      localStorage.setItem("token", data.token);
      
      Cookies.set("token", data.token, { expires: 7 });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (body: { username: string; email: string; phone: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/register", body);
      Cookies.set("token", data.token, { expires: 7 });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// Fetch logged-in user (for refresh)
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
  const token = Cookies.get("token");
  if (!token) return rejectWithValue("No token found");

  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (err: any) {
    Cookies.remove("token");
    return rejectWithValue("Failed to fetch user");
  }
});

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("token");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
