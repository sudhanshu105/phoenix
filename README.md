# Gadget Inventory API

## Description
This is a Node.js Express API for managing gadgets for the Impossible Missions Force (IMF). The API allows for secure management of gadgets, including adding, updating, retrieving, and decommissioning gadgets.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your database connection settings and JWT secret:
   ```plaintext
   DB_USER=avnadmin
   DB_PASSWORD=AVNS_-qIOu_2GPRSMjpFiwCZ
   DB_HOST=pg-34837887-aaweeye07-6d25.f.aivencloud.com
   DB_PORT=25738
   DB_NAME=defaultdb
   JWT_SECRET=your_jwt_secret_key
   ```

## Usage
To start the server, run:
```bash
node server.js
```
The server will run on `http://localhost:3000`.

## API Endpoints

### Gadget Inventory
- **GET /gadgets**: Retrieve a list of all gadgets with a random mission success probability.
- **POST /gadgets**: Add a new gadget to the inventory.
  - **Request Body**: 
    ```json
    {
      "name": "Gadget Name"
    }
    ```
- **PATCH /gadgets/:id**: Update an existing gadget's information.
  - **Request Body**: 
    ```json
    {
      "name": "Updated Gadget Name",
      "status": "Available"
    }
    ```
- **DELETE /gadgets/:id**: Mark a gadget as "Decommissioned."
- **POST /gadgets/:id/self-destruct**: Trigger the self-destruct sequence for a specific gadget.

## License
This project is licensed under the MIT License.
