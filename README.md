**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository

Welcome!

## Table of contents
* [Team Members](#team-members)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Workflow](#Workflow)
* [Postman Request](#Postman-Request)

## Team Members

| Name | Task | State |
| :--- | :---: | :---: |
| Nathanael Putro | Back End | Idling (for now) |
| Callista Li Yin Low | Front End | Preparing |
| Livya Natasha Riany | Front End | Preparing |
| Joseph Leonardi | Front End | Preparing |
| Jeffrey Kolenchery | Back End | Idling (for now) |

## General info
Your team has been contracted to design and build web apps for Snacks in a Van, a new startup company operating in Melbourne. Snacks in a Van runs a fleet of food trucks that work as popup cafes. You need to make two web apps: one for customers and one for vendors

## Technologies
Project is created with the following technologies:

### UI/UX Design
- Canva
- Figma

### Database
- MongoDB

### Backend
- Bcrypt
- Cors
- Express
- Mongoose
- Node.JS
- TypeScript

### Frontend
- Axios
- Bootstrap
- Create React App
- Moment
- TypeScript
- Vue
- @material-UI

**Now Get ready to complete all the tasks:**

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [x] App server mockup
- [ ] Front-end + back-end (one feature)
- [ ] Complete system + source code
- [ ] Report on your work(+ test1 feature)

## Workflow: 
1. `git clone https://github.com/INFO30005-2021-SM1/project-t05-snaccoverflow.git`
2. `cd project-t05-snaccoverflow`
3. `npm install && npm start`

## Postman-Requests:  

1. Customer starts a new order by requesting a item (for Customers)  
    - URL: https://snaccs-in-a-van.herokuapp.com/api/customer/order/add/607074c63ed89dee65af788e
    - Implementation details:
        - HTTP request type: `POST`
        - Route: `/api/customer/order/add/:itemId`
        - Controller function: `addSnackToCart()` in `backend/src/controllers/customerContoller.ts`
    - Description: This request attempts to add two Lattes to Nathanael's cart.
    - Success condition:
        - Input:
            - Params: `<some valid itemId>`
            - Body: `{"customerId": "<some Customer ObjectId>", "quantity": "<amount of item to add to the cart>"}`
        - Output: 200 OK.
    - Fault conditions:
        - Send `{"customerId": "<some valid but nonexisting Customer ObjectId>", "quantity": 1}` as the request body, then a 404 Not Found will be returned.
        - Send `{"customerId": "<some invalid ObjectId>", "quantity": 1}` as the request body, then a 500 Internal Server Error will be returned.
2. Mark an order as \"fulfilled\" i.e. the order is ready to be picked up by customer
    - URL: https://snaccs-in-a-van.herokuapp.com/api/order/60780115c5c0362b60d60376/fulfill
    - Implementation details:
        - HTTP request type: `GET`
        - Route: `/api/order/:orderId/fulfill`
        - Controller function: `fulfillOrder()` in `backend/src/controllers/orderController.ts`
    - Description: This request marks the order with an ID of `60780115c5c0362b60d60376` as \"Fulfilled\". This also set the status message as "fulfilled order" so the customer can be notified.
    - Success condition:
        - Input: `orderId` parameter.
        - Output: 200 OK.
    - Fault conditions:
        - Send a valid but non-existent `orderId`, then a 404 Not Found will be returned.
        - Send an invalid `orderId`, then a 500 Internal Server Error will be returned.
3. Show list of all outstanding orders
    - URL: https://snaccs-in-a-van.herokuapp.com/api/vendor/60707b103ed89dee65af78a2/orders/outstanding
    - Implementation details:
        - HTTP request type: `GET`
        - Route: `/api/vendor/:vendorId/orders/outstanding`
        - Controller function: `getOutstandingOrder()` in `backend/src/controllers/vendorController.ts`
    - Description: This request gets all the outstanding orders of the vendor with an ID of `60707b103ed89dee65af78a2`. This is done by querying database for orders (for the vendor in question) which have not been marked as "Completed".
    - Success condition:
        - Input: `vendorId` parameter with outstanding orders.
        - Output: 200 OK with the outstanding orders of the vendor with the given `vendorId` as the response body.
    - Fault conditions:
        - Send a valid but non-existent `vendorId`, then a 404 Not Found will be returned.
        - Send an invalid `vendorId`, then a 500 Internal Server Error will be returned.
        - Send a valid, existing `vendorId` with no outstanding orders, then a 204 No Content will be returned.
4. Setting van status and location (vendor shares geolocation):
    - URL: https://snaccs-in-a-van.herokuapp.com/api/vendor/60707b103ed89dee65af78a2/update/location
    - Implementation details:
        - HTTP request type: `POST`
        - Route: `/api/vendor/:vendorId/update/location`
        - Controller function: `setVendorLocation()` in `backend/src/controllers/vendorController.ts`
    - Description: This request updates the geolocation and location description of the vendor with an ID of `60707b103ed89dee65af78a2`. Geolocation will be captured with a location tracking api in future versions.
    - Success condition:
        - Input:
            - Params: `<some existing vendorId>`
            - Body: `{"geolocation": [<some x-coordinate>, <some y-coordinate>], "locationDescription": "<some location description string>"}`
        - Output: 200 OK.
    - Fault conditions:
        - Send a valid but non-existent `vendorId`, then a 404 Not Found will be returned.
        - Send an invalid `vendorId`, then a 500 Internal Server Error will be returned.
        - Set the geolocation or location description of a valid existing `vendorId` with the same values it already was in, then a 400 Bad Request will be returned.
5. Setting van status (marks van as ready-for-orders)
    - URL: https://snaccs-in-a-van.herokuapp.com/api/vendor/60707b103ed89dee65af78a2/update/status
    - Implementation details:
        - HTTP request type: `POST`
        - Route: `/api/vendor/:vendorId/update/status`
        - Controller function: `setVendorAvailability()` in `backend/src/controllers/vendorController.ts`
    - Description: This request updates the status of the vendor with an ID of `60780115c5c0362b60d60376` to ready-for-orders.
    - Success condition:
        - Input:
            - Params: `<some existing vendorId>`
            - Body: `{"isOpen": <some boolean value>}`
        - Output: 200 OK.
    - Fault conditions:
        - Send a valid but non-existent `vendorId`, then a 404 Not Found will be returned.
        - Send an invalid `vendorId`, then a 500 Internal Server Error will be returned.
        - Set the status of a valid existing `vendorId` with the same status it already was in, then a 400 Bad Request will be returned.
6. View menu of snacks (including pictures and prices):
    - URL: https://snaccs-in-a-van.herokuapp.com/api/menu/60707b103ed89dee65af78a2
    - Implementation details:
        - HTTP request type: `GET`
        - Route: `/api/menu/:vendorId`
        - Controller function: `getMenu()` in `backend/src/controllers/menuController.ts`
    - Description: This request gets the menu associated with the vendor with an ID of `60707b103ed89dee65af78a2`. Images are currently stored as base64 (not currently returned in the query) and will render in future versions.
    - Success condition:
        - Input:
            - `<some existing vendorId>` with a menu associated to it as parameter.
        - Output: 200 OK with the menu associated with the given `vendorId` as the response body.
    - Fault conditions:
        - Send a valid `vendorId` without a menu associated with it, then a 204 No Content will be returned.
        - Send an invalid `vendorId`, then a 500 Internal Server Error will be returned.
7. View details of a item
    - URL: https://snaccs-in-a-van.herokuapp.com/api/menu/item/607074c63ed89dee65af788e
    - Implementation details:
        - HTTP request type: `GET`
        - Route: `/api/menu/item/:itemId`
        - Controller function: `getItemDetails()` in `backend/src/controllers/menuController.ts`
    - Description: This request gets the details of the snack with an ID of `607074c63ed89dee65af788e`. The details include the name and price of an item; once again images are omitted.
    - Success condition:
        - Input: `<some existing itemId>` as parameter.
        - Output: 200 OK with the details of the item with the given `itemId` as the response body.
    - Fault conditions:
        - Send a valid but non-existent `itemId`, then a 404 Not Found will be returned.
        - Send an invalid `itemId`, then a 500 Internal Server Error will be returned.

### MongoDB Compass Access
- Connection string: `mongodb+srv://<username>:<password>@snaccs-in-a-van.4ciyf.mongodb.net/test`
- Username: `pbhattacharj`
- Password: `wPOIjfztrqvCKOMe`

### Dummy Customer Login Details
- Username: `nputro@student.unimelb.edu.au`
- Password: `123456`

### Vendor Login Details
- Username: 'Tasty Trailer'
- Password: 'abcd1234'

- Username: 'Snaccy Van'
- Password: 'abcd1234'

- Username: 'Snax McTest'
- Password: '4321dcba'

- Username: 'Hungry FoodTruck'
- Password: 'abcd1234'

- Username: 'BIG CAKES ONLY'
- Password: 'abcd1234'

- Username: 'Caffeine School'
- Password: 'abcd1234'
