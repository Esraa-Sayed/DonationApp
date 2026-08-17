import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
const auth = getAuth();
export const createUser = async (fullName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(userCredential.user, { displayName: fullName });
    return userCredential;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return { error: 'The email you entered is already in use.' };
    } else if (error.code === 'auth/invalid-email') {
      return { error: 'Please enter a valid email address.' };
    }
    return { error: 'Something went wrong with your request.' };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const token = await response.user.getIdToken();
    return {
      status: true,
      data: {
        displayName: response.user.displayName,
        email: response.user.email,
        token,
      },
    };
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      return { status: false, error: 'Please enter a correct password' };
    } else if (error.code === 'auth/user-not-found') {
      return {
        status: false,
        error:
          'The email you entered does not exist. Please create a new account.',
      };
    }
    return { status: false, error: 'Something went wrong' };
  }
};
export const logOut = async () => {
  await signOut(auth);
};
export const checkToken = async () => {
  try {
    let response = await auth.currentUser.getIdToken(true);
    console.log('We are updating token for you');
    store.dispatch(updateToken(response));
    return response;
  } catch (error) {
    return error;
  }
};
