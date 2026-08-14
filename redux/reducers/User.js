import { createSlice } from '@reduxjs/toolkit';

// Defining the initial state for the user slice of the store
const initialState = {
  firstName: 'Esraa',
  lastName: 'Sayed',
  userId: 1,
  profileImage:
    'https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top',
};

// Creating a new slice of the store named "user" with its own set of reducers
export const User = createSlice({
  name: 'User',
  initialState: initialState,
  reducers: {
    updateFirstName: (state, action) => {
      state.firstName = action.payload.firstName;
    },
  },
});
export default User.reducer;
export const { updateFirstName } = User.actions;
