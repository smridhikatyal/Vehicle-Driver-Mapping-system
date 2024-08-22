# Vehicle-Driver-Mapping-system
Vehicle-Driver Mapping System
Overview
The Vehicle-Driver Mapping System is a web application for managing vehicles and drivers, as well as assigning drivers to vehicles. This system uses Express.js for the server-side application and MongoDB for data storage.
Features
Add, Remove Drivers: Manage driver information including name and license number.
Add, Remove Vehicles: Manage vehicle information including model and license plate.
Assign Drivers to Vehicles: Assign drivers to specific vehicles and track assignments.


![Screenshot 2024-08-22 230911](https://github.com/user-attachments/assets/403fa4b5-2fc6-4d81-8314-9a140f817502)
Driver page -> showing list of drivers
can add new driver C
delete the existing driver
![Screenshot 2024-08-22 230842](https://github.com/user-attachments/assets/8185e263-5417-4974-90b9-1fdf3ac291d6)
Assigning particular vehical to the driver
![Screenshot 2024-08-22 231120](https://github.com/user-attachments/assets/0c0ee2ec-fbb5-451f-b013-555c828f282d)
If we try to assign in the same vehicle which is not available now->
![Screenshot 2024-08-22 231120](https://github.com/user-attachments/assets/8f018f5d-44cd-4ff8-94fb-e493856a0f18)
this the updated vehicle list showing that the vehicles that can be assigned to the driver without overlapping
![Screenshot 2024-08-22 230939](https://github.com/user-attachments/assets/125590ea-5f3a-462d-9b65-4cf4fbf69ce0)




Steps->
1. Starting the Server
File: server.js
The server starts by importing required modules (express, cors, body-parser, etc.).
MongoDB is connected using Mongoose models (driverschema, vehicleschema, assignmentschema).
The server listens on port 4000 for incoming requests.
2. Handling Requests
The Express server defines routes to handle various HTTP requests related to drivers, vehicles, and assignments.
Driver Operations
GET /drivers: Fetches all drivers from the MongoDB database.

Uses the Driver.find() method to retrieve driver data.
Returns a JSON response with the list of drivers.
POST /drivers: Adds a new driver to the database.

Creates a new Driver object from the request body.
Saves the driver to the database using driver.save().
Returns the newly created driver object in the response.
PUT /drivers/:id: Updates an existing driver's information.

Finds the driver by id using Driver.findById() and updates it with new data from the request body.
Saves the updated driver and returns the updated object.
DELETE /drivers/:id: Deletes a driver from the database.

Finds the driver by id and removes it using driver.remove().
Returns a message indicating that the driver was deleted.
Vehicle Operations
GET /vehicles: Fetches all vehicles from the database.

Uses Vehicle.find() to retrieve vehicle data.
Returns the list of vehicles as a JSON response.
POST /vehicles: Adds a new vehicle to the database.

Creates a new Vehicle object from the request body.
Saves the vehicle using vehicle.save() and returns the newly created object.
DELETE /vehicles/:id: Deletes a vehicle from the database.

Finds the vehicle by id and removes it.
Returns a message confirming the deletion.
Assignment Operations
GET /assignments: Fetches all driver-vehicle assignments.

Uses Assignment.find() to retrieve assignment data.
Returns the list of assignments in the response.
POST /assignments: Assigns a driver to a vehicle for a specified time period.

Receives driver_id, vehicle_id, start_time, and end_time in the request body.
Checks for any overlapping assignments using Assignment.find() with appropriate time conditions.
If no overlap exists, it creates a new assignment, saves it, and returns the assignment object.
3. Client-Side Interaction
Frontend Code (React):
The frontend interacts with the backend using the defined API endpoints.
Axios is used to send HTTP requests (GET, POST, DELETE) to the backend.
For example, to get the list of drivers, the frontend might call axios.get('/drivers'), which hits the backend’s /drivers route.
The frontend displays the data and handles user interactions like adding/removing drivers or vehicles and assigning drivers to vehicles.
4. Data Flow
Adding Data:

When a user adds a driver or vehicle, the data is sent via POST requests to the backend.
The backend processes the request, stores the data in MongoDB, and returns the new data to the frontend.
Deleting Data:

Deleting a driver or vehicle triggers a DELETE request from the frontend.
The backend processes the request, removes the data from MongoDB, and confirms the deletion.
Assigning a Driver to a Vehicle:

Assignment involves sending a POST request with driver and vehicle IDs along with assignment time details.
The backend checks for conflicts before creating the assignment.
Successful assignments are stored in MongoDB and reflected on the frontend.
