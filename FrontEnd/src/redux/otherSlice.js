import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

const initialState = {
  other: [],
  isLoading: false,
  error: null,
};
export const getOther = createAsyncThunk(
  "other/getOther",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/otherVaccine");
      console.log(res.data.otherVaccine);
      return res.data.otherVaccine;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusOder = createAsyncThunk(
  "other/updateStatusOder",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/otherVaccine/update",
        payload
      );
      console.log(res.data.otherVaccine);
      return res.data.otherVaccine;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOtherById = createAsyncThunk(
  "other/getOtherById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/otherVaccine/${payload}`
      );
      return res.data.otherVaccine;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOther = createAsyncThunk(
  "other/addOther",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/otherVaccine/add",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = "/my-order";
      return res.data.other;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {},
  extraReducers: {
    [addOther.pending]: (state) => {
      state.isLoading = true;
    },
    [addOther.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addOther.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.other.push(action.payload);
    },
    [getOther.pending]: (state) => {
      state.isLoading = true;
    },
    [getOther.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getOther.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.other = action.payload;
    },
    [getOtherById.pending]: (state) => {
      state.isLoading = true;
    },
    [getOtherById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getOtherById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.other = action.payload;
    },
    [updateStatusOder.pending]: (state) => {
      state.isLoading = true;
    },
    [updateStatusOder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateStatusOder.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      const { status, id } = action.meta.arg;
      const index = state.other.findIndex((item) => item._id === id);
      state.other[index].status = status;
    },
  },
});
export default otherSlice.reducer;

export const selectOther = (state) => state.other.other;
export const selectOtherLoading = (state) => state.other.isLoading;
