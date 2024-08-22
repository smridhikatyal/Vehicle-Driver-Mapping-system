import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AssignmentForm from './components/AssignmentForm';
import DriverList from './components/DriverList';
import Login from './components/Login';
import VehicleList from './components/VehicleList';

const App = () => {
    return (
        <Router>
            <div>
                <header>
                    <h1>Vehicle-Driver Mapping System</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={
                            <>
                                <section>
                                    <h2>Drivers</h2>
                                    <DriverList />
                                </section>
                                <section>
                                    <h2>Vehicles</h2>
                                    <VehicleList />
                                </section>
                                <section>
                                    <h2>Assign Vehicle to Driver</h2>
                                    <AssignmentForm />
                                </section>
                            </>
                        } />
                        <Route path="/" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
