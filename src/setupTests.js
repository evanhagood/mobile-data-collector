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

// Unit test for adding a new user to Firestore

// Unit test for loading state in UI (LoginWrapper)

// Unit test for unauthenticated UI state (LoginWrapper)
