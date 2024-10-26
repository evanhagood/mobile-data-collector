import { auth } from '../index';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion';

export const LoginWrapper = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);

    if (user && user.email.slice(-7) === 'asu.edu') {
        return children;
    } else if (loading) {
        return (
            <motion.div className="font-openSans absolute bg-white inset-0 flex flex-col items-center justify-around">
                <motion.p className="text-black text-3xl">Authenticating user...</motion.p>
            </motion.div>
        );
    } else if (error) {
        return (
            <motion.div className="font-openSans absolute bg-white inset-0 flex flex-col items-center justify-around">
                <motion.p className="text-black text-3xl">Error signing in: {error}</motion.p>
            </motion.div>
        );
    } else {
        return (
            <motion.div className="font-openSans absolute bg-white inset-0 flex flex-col items-center justify-around">
                <motion.h1 className="text-black text-4xl">Welcome to Field Day</motion.h1>
                <p className='text-black text-xl text-center'>Logged in as {user ? user.email : 'none'}</p>
                <motion.p className="text-black text-lg text-center">
                    Login with your ASU Google account to continue
                </motion.p>
                <motion.button
                    className="text-black border-asu-maroon text-2xl w-1/2 py-2 border-2 rounded-2xl"
                    onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
                >
                    Login
                </motion.button>
            </motion.div>
        );
    }
};

/*

// Initialize Firestore
const db = getFirestore();

export class Authenticator {
    constructor() {
        this.user = null; // Will hold the current user after login
    }

    // Check if the user is already authorized in Firestore
    async isAuthorizedUser(email) {
        const authorizedUsersRef = collection(db, 'authorized_users');
        const q = query(authorizedUsersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // True if user exists in the collection
    }

    // Add a new user to the 'authorized_users' collection in Firestore
    async addUserToDatabase(email) {
        const authorizedUsersRef = collection(db, 'authorized_users');
        await addDoc(authorizedUsersRef, { email });
    }

    // Prompt the user for a password to register them in the database
    async promptForPassword() {
        const password = window.prompt('Enter the registration password:');
        if (password === 'lizard') {
            return true; // Password matches
        } else {
            alert('Invalid password. You are not authorized.');
            return false;
        }
    }

    // Login method with user validation
    async login() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const result = await signInWithPopup(auth, provider);
            this.user = result.user; // Assign the logged-in user

            const email = this.user.email;
            const isAuthorized = await this.isAuthorizedUser(email);

            if (!isAuthorized) {
                const passwordCorrect = await this.promptForPassword();
                if (passwordCorrect) {
                    await this.addUserToDatabase(email); // Register the user
                    alert('You have been registered successfully!');
                } else {
                    await this.logout(); // Logout if password is incorrect
                    return false;
                }
            }

            console.log('User successfully logged in and validated:', email);
            return true; // Successful login
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }

    // Logout function to clear cookies and local storage
    async logout() {
        try {
            await signOut(auth);
            document.cookie.split(';').forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, '')
                    .replace(/=./, '=;expires=' + new Date().toUTCString() + ';path=/');
                });
                localStorage.clear();
                window.location.href = '/login'; // Redirect to login page
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }
    }

*/
   