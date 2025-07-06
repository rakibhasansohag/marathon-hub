import { clsx } from "clsx";
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Timer constants
export const minuteSeconds = 60;
export const hourSeconds = 3600;
export const daySeconds = 86400;

// Timer styles
export const timerProps = {
	isPlaying: true,
	size: 120,
	strokeWidth: 6,
};

// Helper functions
export const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
export const getTimeMinutes = (time) =>
	((time % hourSeconds) / minuteSeconds) | 0;
export const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
export const getTimeDays = (time) => (time / daySeconds) | 0;

const baseTitle = 'Marathon Hub';

export const useStaticTitle = () => {
	const location = useLocation();

	useEffect(() => {
		let pageTitle = '';

		switch (location.pathname) {
			case '/':
				pageTitle = 'Home';
				break;
			case '/marathons':
				pageTitle = 'Marathon Events';
				break;
			case '/auth/register':
				pageTitle = 'Register';
				break;
			case '/auth/login':
				pageTitle = 'Login';
				break;
			case '/auth/forget-password':
				pageTitle = 'Forgot Password';
				break;
			case '/auth/register-v1':
				pageTitle = 'V1 Register || Login';
				break;
			case '/dashboard':
				pageTitle = 'Dashboard';
				break;
			case '/dashboard/add-marathon':
				pageTitle = 'Add Marathon';
				break;
			case '/dashboard/my-marathons':
				pageTitle = 'My Marathons';
				break;
			case '/dashboard/my-apply-list':
				pageTitle = 'My Apply List';
				break;
			default:
				pageTitle = 'Page Not Found';
		}

		document.title = `${pageTitle} | ${baseTitle}`;
	}, [location]);
};
