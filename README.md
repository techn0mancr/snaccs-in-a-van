**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository

Welcome!

* **README.md**: is the document you are currently reading. It should be replaced with information about your project, and instructions on how to use your code in someone else's local computer.

## Table of contents
* [Team Members](#team-members)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Workflow](#Workflow)
* [Postman Request](#Postman-Request)

## Team Members

| Name | Task | State |
| :---         |     :---:      |          ---: |
| Nathaneal Putro  | Back End     |  Testing |
| Callista Low   | Front End      |  Testing |
| Livya Natasha Riany    | Front End      |  Testing |
| Joseph Leonardi   | Back End  | Testing |
| Jeffrey Kolenchery  | Back End  | Testing |

## General info
Your team has been contracted to design and build web apps for Snacks in a Van, a new startup company operating in Melbourne. Snacks in a Van runs a fleet of food trucks that work as popup cafes. You need to make two web apps: one for customers and one for vendors


## Technologies
Project is created with:
* NodeJs 14.16.X
* Ament library version: 999
* heroku web app
* mongoDB 
* mongoose
* TypeScript
* Mongoose
* figma
* canva
* react


**Now Get ready to complete all the tasks:**

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [x] App server mockup
- [ ] Front-end + back-end (one feature)
- [ ] Complete system + source code
- [ ] Report on your work(+ test1 feature)

## Workflow: 
1) git clone https://github.com/INFO30005-2021-SM1/project-t05-snaccoverflow.git
2) Navigate into local repository and 
3) npm start
4) browser window opens

## Postman-Request:

1) Customer starts a new order by requesting a item (for Customers):
      url: https://snaccs-in-a-van.herokuapp.com/api/customer/order/add/607074c63ed89dee65af788e
      This request attempts to add two Lattes to Nathanael's cart.
      Conditions: 
        POST
        - input: this REST endpoint accepts {"customerId": "<some Customer ObjectId>",
          "quantity": "<amount of item to add to the cart>"}
        - output: this will give a 200 http status and OK if success
        - fault conditions:
          - send {"customerId": "<some valid ID, but nonexisting Customer ObjectId>", 
            "quantity": 1}, then a 404 Not Found will be thrown
          - send {"customerId": "<some random, invalid string>", 
            "quantity": 1}, then a 500 Internal Server Error will be thrown
        - addSnackToCart() in customerContoller.ts

2) Mark an order as \"fulfilled\" i.e. the order is ready to be picked up by customer :
      url: https://snaccs-in-a-van.herokuapp.com/api/order/60780115c5c0362b60d60376/fulfill
      This request marks the order with an ID of 60780115c5c0362b60d60376 as \"Fulfilled\".
      This also set the status message as "fulfilled order" so the customer can be notified.
      Conditions: 
        GET
        - input: this REST endpoint accepts {"orderID": "<some Order ObjectId associated with Vendor>"}
        - output: this will give a 200 http status and OK if success
        - fault conditions:
          - send {"orderID": "<some valid ID, but nonexisting Order ObjectId>"}, then a 404 Not Found will be thrown
          - send {"orderID": "<some random, invalid string>"}, then a 500 Internal Server Error will be thrown
        - fulfillOrder() in orderController.ts

3) Show list of all outstanding orders:
      url: https://snaccs-in-a-van.herokuapp.com/api/vendor/60707b103ed89dee65af78a2/orders/outstanding
      This request gets all the outstanding orders of the vendor with an ID of 60707b103ed89dee65af78a2
      This is done by querying database for orders (for the vendor in question) which have not been marked as fulfilled. 
      Conditions: 
        GET
          - input: this REST endpoint accepts {"vendorID": "<some Vendor ObjectId>"}
          - output: this will give a 200 http status and display outstanding orders if success
          - fault conditions:
            - send {"vendorID": "<some random, invalid string>"}, then a 500 Internal Server Error will be thrown
            - send {"vendorID": "<some valid string, no incomplete orders available for vendor>"}, then an 204 No Content will be thrown.
          - getOutstandingOrders() in vendorController.ts

4) Setting van status and location (vendor shares geo-location):
      url: https://snaccs-in-a-van.herokuapp.com/api/vendor/60707b103ed89dee65af78a2/update/location
      This request updates the geolocation and location description of the vendor with an ID of 60707b103ed89dee65af78a2.
      Geolocation will be captured with a location tracking api in future versions.
      Conditions: 
        POST
          - input: this REST endpoint accepts {"vendorID": "<some Vendor ObjectId>", "geoLocation": "<some geoLocation string Coordinates(number x, number y)>", 
            "locationDescription": "<some locationDescription string>"}
          - output: this will give a 200 http status and OK if success
          - fault conditions:
            - send {"vendorID": "<some valid string>","geoLocation": "<missing string Coordinates(number x, number y)>", 
              "locationDescription": "<missing string>"}, then an 400 Bad Request will be thrown
            - send {"vendorID": "<some random, invalid string>","geoLocation": "<valid string Coordinates(number x, number y)>", 
              "locationDescription": "<valid string>"}, then an 404 Not Found Error will be thrown
            - send {"vendorID": "<some random, invalid string>","geoLocation": "<random, invalid string>", 
              "locationDescription": "<random, invalid string>"}, then an 500 Internal Server Error will be thrown
          -setVendorLocation() in vendorController.ts

5) Setting van status (marks van as ready-for-orders):
      url: https://snaccs-in-a-van.herokuapp.com/api/vendor/60707b103ed89dee65af78a2/update/status
      This request updates the status of the vendor with an ID of 60780115c5c0362b60d60376 to ready-for-orders.
      Conditions: 
        POST
          - input: this REST endpoint accepts {"vendorID": "<some Vendor ObjectId>", "isOpen": "<some boolean>"}
          - output: this will give a 200 http status and OK if success
          - fault conditions:
            - send {"vendorID": "<some valid string>", "isOpen": "<some invalid boolean>"},
               then an 400 Bad Request will be thrown
            - send {"vendorID": "<some random, invalid string>", "isOpen": "<some valid boolean>"}, 
              then an 404 Not Found Error will be thrown
            - send {"vendorID": "<some random, invalid string>", "isOpen": "<random, invalid string>"}, 
              then an 500 Internal Server Error will be thrown
          - setVendorAvailability() in vendorController.ts

6) View menu of snacks (including pictures and prices):
      url: https://snaccs-in-a-van.herokuapp.com/api/menu/60707b103ed89dee65af78a2
      This request gets the menu associated with the vendor with an ID of 60707b103ed89dee65af78a2.
      images will load as base64 (will not be shown) and will render as complete images in future versions.
      Conditions: 
        GET
          - input: this REST endpoint accepts {"vendorID": "<some Vendor ObjectId>"}
          - output: this will give a 200 http status and display menu if success
          - fault conditions:
            - send {"vendorID": "<some valid string but no menu available>"}, then an 204 No Content Error will be thrown
            - send {"vendorID": "<some invalid string>"}, then an 500 Internal Server Error will be thrown
          - getMenu() in menuController.ts

7) View details of a item:
      url: https://snaccs-in-a-van.herokuapp.com/api/menu/item/607074c63ed89dee65af788e
      This request gets the details of the snack with an ID of 607074c63ed89dee65af788e.
      This details include name and price of an item.
      Conditions: 
        GET
          - input: this REST endpoint accepts {"itemID": "<some Item ObjectId>"}
          - output: this will give a 200 http status and display item details if success
          - fault conditions:
            - send {"itemID": "<some random, invalid string>"}, then an 404 Not Found Error will be thrown
            - send {"itemID": "<some invalid string>"}, then an 500 Internal Server Error will be thrown
          - getItemDetails() in menuController.ts


