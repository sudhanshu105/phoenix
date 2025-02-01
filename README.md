# Gadget Inventory API

## Description
This is a Node.js Express API for managing gadgets for the Impossible Missions Force (IMF). The API allows for secure management of gadgets, including adding, updating, retrieving, and decommissioning gadgets.

#Deployment:
Server is deployed on render. URL: https://pheonix-0404.onrender.com

#Postman collection
URL: https://www.postman.com/garuda-api/workspace/pheonix/collection/35349355-d3b47917-a8a7-4ce1-bf11-0e0596d9af04?action=share&creator=35349355
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
  - **Query Parameters**: 
    - `status`: Filter gadgets by their status.
  - **Response Example**:
    ```json
    [
      {
        "id": "some-uuid",
        "name": "Gadget Name",
        "codename": "The Nightingale",
        "status": "Available",
        "missionSuccessProbability": 75
      }
    ]
    ```

- **POST /gadgets**: Add a new gadget to the inventory.
  - **Request Body**: 
    ```json
    {
      "name": "Gadget Name"
    }
    ```
  - **Response Example**:
    ```json
    {
      "id": "some-uuid",
      "name": "Gadget Name",
      "codename": "The Kraken",
      "status": "Available"
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
  - **Response Example**:
    ```json
    {
      "id": "some-uuid",
      "name": "Updated Gadget Name",
      "status": "Available"
    }
    ```

- **DELETE /gadgets/:id**: Mark a gadget as "Decommissioned."
  - **Response Example**:
    ```json
    {
      "id": "some-uuid",
      "status": "Decommissioned",
      "decommissioned_at": "2023-10-01T12:00:00Z"
    }
    ```

- **POST /gadgets/:id/self-destruct**: Trigger the self-destruct sequence for a specific gadget.
  - **Response Example**:
    ```json
    {
      "message": "Self-destruct sequence initiated",
      "confirmationCode": 1234
    }
    ```

## License
This project is licensed under the MIT License.
