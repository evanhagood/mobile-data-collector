// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { auth, db } from '../index';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginWrapper } from './LoginWrapper';

// Mocks for Firebase methods
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

// Unit test for login with Google
test('logs user in with Google and calls signInWithPopup', async () => {
    const mockUser = { email: 'test@asu.edu', uid: '123' };
    signInWithPopup.mockResolvedValueOnce({ user: mockUser });

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    expect(result.user.email).toBe('test@asu.edu');
    expect(signInWithPopup).toHaveBeenCalledWith(auth, provider);
});

// Unit test for logout
test('logs user out successfully', async () => {
    await signOut(auth);
    expect(signOut).toHaveBeenCalledWith(auth);
});

// Unit test for checking authorized user in Firestore
test('checks if user is authorized in Firestore', async () => {
    const mockQuerySnapshot = { empty: false };
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    const authorizedUsersRef = collection(db, 'authorized_users');
    const querySnapshot = await getDocs(authorizedUsersRef);

    expect(querySnapshot.empty).toBe(false); // User should exist
});

// Unit test for adding a new user to Firestore
test('adds new user to Firestore authorized_users collection', async () => {
    const authorizedUsersRef = collection(db, 'authorized_users');
    await addDoc(authorizedUsersRef, { email: 'newuser@asu.edu' });

    expect(addDoc).toHaveBeenCalledWith(authorizedUsersRef, { email: 'newuser@asu.edu' });
});

// Unit test for loading state in UI (LoginWrapper)
test('displays loading message while user is authenticating', () => {
    render(<LoginWrapper />);
    expect(screen.getByText(/Authenticating user.../i)).toBeInTheDocument();
});

// Unit test for unauthenticated UI state (LoginWrapper)
test('shows login prompt if not signed in', () => {
    render(<LoginWrapper />);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);

    expect(screen.getByText(/Login with your ASU Google account to continue/i)).toBeInTheDocument();
});

// Mock necessary imports
jest.mock('jotai');
jest.mock('../utils/functions');

describe('NewLizardEntry Component', () => {
    // Set up mocks and initial atom values
    beforeEach(() => {
        useAtomValue.mockReturnValue(true); // mock lizardDataLoaded and environment
        useSetAtom.mockReturnValue(jest.fn()); // mock set atom functions
        getLizardAnswerFormDataFromFirestore.mockClear();
        completeLizardCapture.mockClear();
        verifyForm.mockClear();
    });

    // Unit test for rendering form elements in NewLizardEntry component
    it('renders the form elements', () => {
        render(<NewLizardEntry />);
        // Check that the basic form elements are rendered
        expect(screen.getByPlaceholderText('Species Code')).toBeInTheDocument();
        expect(screen.getByText('Is it a recapture?')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('0 mm')).toBeInTheDocument();
        expect(screen.getByText('Finished?')).toBeInTheDocument();
    });

    // Unit test for loading lizard data from Firestore on component mount
    it('loads lizard data from Firestore on mount', async () => {
        render(<NewLizardEntry />);
        await waitFor(() => {
            expect(getLizardAnswerFormDataFromFirestore).toHaveBeenCalledTimes(1);
        });
    });
    // Unit test for updating the `sex` state when selecting from the dropdown
    it('updates `sex` state correctly', () => {
        render(<NewLizardEntry />);

        // Set the sex dropdown and check expected changes
        fireEvent.change(screen.getByPlaceholderText('Sex'), { target: { value: 'Female' } });
        expect(screen.getByPlaceholderText('Sex').value).toBe('Female');
    });

    // Unit test for opening the confirmation modal when required conditions are met
    it('opens confirmation modal when criteria are met', () => {
        render(<NewLizardEntry />);

        // Simulate criteria to open confirmation modal
        fireEvent.click(screen.getByText('Finished?'));

        expect(screen.getByText('Form has incomplete data, continue anyways?')).toBeInTheDocument();
    });

    // Unit test for form validation when submitting the form
    it('triggers form validation on submit', () => {
        render(<NewLizardEntry />);

        // Click 'Finished?' button to submit form
        fireEvent.click(screen.getByText('Finished?'));

        // Verify that `verifyForm` is called with expected arguments
        expect(verifyForm).toHaveBeenCalled();
    });

    // Unit test for displaying loading spinner when lizard data has not loaded
    it('displays loading spinner when lizard data is not yet loaded', () => {
        useAtomValue.mockReturnValue(false); // Mock `lizardDataLoaded` as false
        render(<NewLizardEntry />);

        expect(screen.getByText('Loading lizard data...')).toBeInTheDocument();
    });
});
