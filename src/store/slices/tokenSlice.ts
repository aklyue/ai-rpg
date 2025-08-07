import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import uuid from "react-native-uuid";

const CLIENT_CREDENTIALS =
  "NDQ4ODk5NTAtMjBiOC00M2YzLWEzMmUtN2RlZDA5ODgyY2M3Ojg5MmMxNzY1LTI5ZWYtNDA4MC05NjNlLWIyNTU1N2Q3MjIwZA==";

interface TokenState {
  accessToken: string | null;
  expiresAt: number | null;
  loading: boolean;
  error?: string;
}

const initialState: TokenState = {
  accessToken: null,
  expiresAt: null,
  loading: false,
  error: undefined,
};

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
        "scope=GIGACHAT_API_PERS",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            RqUID: uuid.v4() as string,
            Authorization: CLIENT_CREDENTIALS,
          },
          timeout: 10000,
        }
      );

      return {
        accessToken: response.data.access_token,
        expiresAt: response.data.expires_at,
      };
    } catch (err: any) {
      console.error("Ошибка получения токена:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

const tokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccessToken.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.expiresAt = action.payload.expiresAt;
      })
      .addCase(getAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tokenSlice.reducer;
