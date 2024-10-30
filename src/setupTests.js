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

// Unit test for logout

// Unit test for checking authorized user in Firestore

// Unit test for adding a new user to Firestore

// Unit test for loading state in UI (LoginWrapper)

// Unit test for unauthenticated UI state (LoginWrapper)
