import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchUsers = createAsyncThunk('users/fetchUsers', async (thunkAPI) => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=3');
    const data = await response.json();
    // console.log('data:', data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const usersSlice = createSlice({
  name: 'marco',
  initialState: {
    users: [],
    isLoading: true,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      // console.log(action.payload.results);
      state.users = action.payload.results;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.error = fetchUsers();
    });
  },
});

export { fetchUsers };
export default usersSlice.reducer;
