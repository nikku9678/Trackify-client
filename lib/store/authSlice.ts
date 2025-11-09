// lib/store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { api } from "@/lib/store/authApi";
import type { RootState } from "./store";

export type Role = "admin" | "user" | string;

export interface User {
  id: number;
  username: string;
  email?: string;
  role?: Role;
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
  token: Cookies.get("token") || localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const normalizeLoginPayload = (payload: any) => {
  if (!payload) return { token: null, user: null };
  if (payload.token && payload.user) return { token: payload.token, user: payload.user };
  if (payload.data && payload.data.token && payload.data.user) return { token: payload.data.token, user: payload.data.user };
  if (payload.user) return { token: payload.token ?? null, user: payload.user };
  // fallback if payload itself is user
  if (payload.id || payload.username) return { token: null, user: payload };
  return { token: payload.token ?? null, user: payload.user ?? null };
};

const normalizeFetchUserPayload = (payload: any) => {
  if (!payload) return null;
  if (payload.user) return payload.user;
  if (payload.data && payload.data.user) return payload.data.user;
  if (payload.id || payload.username) return payload;
  return null;
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (body: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", body);
      const { token } = normalizeLoginPayload(data);
       // Normalize role to lowercase to simplify checks on frontend
      if (data?.user?.role) {
        data.user.role = String(data.user.role).toLowerCase(); // "ADMIN" -> "admin"
      }

      if (token) {
        Cookies.set("token", token, { expires: 7 });
        localStorage.setItem("token", token);
      }
      console.log("nk",data)
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (body: { username: string; email: string; phone?: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/register", body);
      const { token } = normalizeLoginPayload(data);
      if (token) {
        Cookies.set("token", token, { expires: 7 });
        localStorage.setItem("token", token);
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Registration failed");
    }
  }
);

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
  const token = Cookies.get("token") || localStorage.getItem("token");
  if (!token) return rejectWithValue("No token found");
  try {
    const { data } = await api.get("/auth/me");
    console.log("Me: ",data)
    return data;
  } catch (err: any) {
    Cookies.remove("token");
    localStorage.removeItem("token");
    return rejectWithValue("Failed to fetch user");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("token");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    setAuthManually: (state, { payload }: { payload: { token?: string | null; user?: User | null } }) => {
      const { token, user } = payload;
      if (token) {
        Cookies.set("token", token, { expires: 7 });
        localStorage.setItem("token", token);
      }
      if (token === null) {
        Cookies.remove("token");
        localStorage.removeItem("token");
      }
      state.token = token ?? state.token;
      state.user = user ?? state.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, { payload }) => {
        s.loading = false;
        const { token, user } = normalizeLoginPayload(payload);
        s.token = token ?? s.token;
        s.user = user ?? s.user;
      })
      .addCase(loginUser.rejected, (s, { payload }) => { s.loading = false; s.error = payload as string; })
      .addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(registerUser.fulfilled, (s, { payload }) => {
        s.loading = false;
        const { token, user } = normalizeLoginPayload(payload);
        s.token = token ?? s.token;
        s.user = user ?? s.user;
      })
      .addCase(registerUser.rejected, (s, { payload }) => { s.loading = false; s.error = payload as string; })
      .addCase(fetchUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchUser.fulfilled, (s, { payload }) => {
        s.loading = false;
        const u = normalizeFetchUserPayload(payload);
        s.user = u ?? s.user;
      })
      .addCase(fetchUser.rejected, (s) => {
        s.loading = false;
        s.user = null;
        s.token = null;
      });
  },
});

export const { logout, setAuthManually } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token);
export const selectRole = (state: RootState) => state.auth.user?.role ?? null;
export const selectIsAdmin = (state: RootState) => state.auth.user?.role === "admin";
export const selectIsUser = (state: RootState) => state.auth.user?.role === "user";
