import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from '../components/ui/Button';
import {ArrowBigLeft} from "lucide-react";

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <h1 className="text-9xl font-bold text-blue-100">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">Page Not Found</h2>
            <p className="text-gray-500 mt-2 max-w-md">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <div className="mt-8">
                <Link to="/dashboard">
                    <Button><ArrowBigLeft className="mr-2" /> Back to Dashboard</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;