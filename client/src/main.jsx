import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import router from './routes/router';
import { RouterProvider } from 'react-router';
import { Bounce, ToastContainer } from 'react-toastify';
import AuthProvider from './context/AuthProvider';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
			<ToastContainer
				position='top-right'
				autoClose={1500}
				pauseOnFocusLoss
				pauseOnHover
				transition={Bounce}
			/>
		</AuthProvider>
	</StrictMode>,
);
