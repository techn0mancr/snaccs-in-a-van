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

## Postman-Request:<br />

1) Customer starts a new order by requesting a item (for Customers):<br />
      url: https://snaccs-in-a-van.herokuapp.com/api/customer/order/add/607074c63ed89dee65af788e<br />
      This request attempts to add two Lattes to Nathanael's cart.<br />
      Conditions: <br />
        POST<br />
        - input: this REST endpoint accepts {"customerId": "<some Customer ObjectId>",
          "quantity": "<amount of item to add to the cart>"}<br />
        - output: this will give a 200 http status and OK if success<br />
        - fault conditions:<br />
          - send {"customerId": "<some valid ID, but nonexisting Customer ObjectId>", <br />
            "quantity": 1}, then a 404 Not Found will be thrown<br />
          - send {"customerId": "<some random, invalid string>", <br />
            "quantity": 1}, then a 500 Internal Server Error will be thrown<br />
        - addSnackToCart() in customerContoller.ts<br />

2) Mark an order as \"fulfilled\" i.e. the order is ready to be picked up by customer :<br />
      url: https://snaccs-in-a-van.herokuapp.com/api/order/60780115c5c0362b60d60376/fulfill<br />
      This request marks the order with an ID of 60780115c5c0362b60d60376 as \"Fulfilled\".<br />
      This also set the status message as "fulfilled order" so the customer can be notified.<br />
      Conditions: <br />
        GET<br />
        - input: this REST endpoint accepts {"orderID": "<some Order ObjectId associated with Vendor>"}<br />
        - output: this will give a 200 http status and OK if success<br />
        - fault conditions:<br />
          - send {"orderID": "<some valid ID, but nonexisting Order ObjectId>"}, then a 404 Not Found will be thrown<br />
          - send {"orderID": "<some random, invalid string>"}, then a 500 Internal Server Error will be thrown<br />
        - fulfillOrder() in orderController.ts<br />

3) Show list of all outstanding orders:<br />
      url: https://snaccs-in-a-van.herokuapp.com/api/vendor/60707b103ed89dee65af78a2/orders/outstanding<br />
      This request gets all the outstanding orders of the vendor with an ID of 60707b103ed89dee65af78a2<br />
      This is done by querying database for orders (for the vendor in question) which have not been marked as fulfilled. <br />
      Conditions: <br />
        GET<br />
          - input: this REST endpoint accepts {"vendorID": "<some Vendor ObjectId>"}<br />
          - output: this will give a 200 http status and display outstanding orders if success<br />
          - fault conditions:<br />
            - send {"vendorID": "<some random, invalid string>"}, then a 500 Internal Server Error will be thrown<br />
            - send {"vendorID": "<some valid string, no incomplete orders available for vendor>"}, then an 204 No Content will be thrown.<br />
          - getOutstandingOrders() in vendorController.ts<br />

4) Setting van status and location (vendor shares geo-location):<br />
      url: https://snaccs-in-a-van.herokuapp.com/api/vendor/60707b103ed89dee65af78a2/update/location<br />
      This request updates the geolocation and location description of the vendor with an ID of 60707b103ed89dee65af78a2.<br />
      Geolocation will be captured with a location tracking api in future versions.<br />
      Conditions: <br />
        POST<br />
          - input: this REST endpoint accepts {"vendorID": "<some Vendor ObjectId>", "geoLocation": "<some geoLocation string Coordinates(number x, number y)>", <br />
            "locationDescription": "<some locationDescription string>"}<br />
          - output: this will give a 200 http status and OK if success<br />
          - fault conditions:<br />
            - send {"vendorID": "<some valid string>","geoLocation": "<missing string Coordinates(number x, number y)>", <br />
              "locationDescription": "<missing string>"}, then an 400 Bad Request will be thrown<br />
            - send {"vendorID": "<some random, invalid string>","geoLocation": "<valid string Coordinates(number x, number y)>", <br />
              "locationDescription": "<valid string>"}, then an 404 Not Found Error will be thrown<br />
            - send {"vendorID": "<some random, invalid string>","geoLocation": "<random, invalid string>", <br />
              "locationDescription": "<random, invalid string>"}, then an 500 Internal Server Error will be thrown<br />
          -setVendorLocation() in vendorController.ts<br />

5) Setting van status (marks van as ready-for-orders):<br />
      url: https://snaccs-in-a-van.herokuapp.com/api/vendor/60707b103ed89dee65af78a2/update/status<br />
      This request updates the status of the vendor with an ID of 60780115c5c0362b60d60376 to ready-for-orders.<br />
      Conditions: <br />
        POST<br />
          - input: this REST endpoint accepts {"vendorID": "<some Vendor ObjectId>", "isOpen": "<some boolean>"}<br />
          - output: this will give a 200 http status and OK if success<br />
          - fault conditions:<br />
            - send {"vendorID": "<some valid string>", "isOpen": "<some invalid boolean>"},<br />
               then an 400 Bad Request will be thrown<br />
            - send {"vendorID": "<some random, invalid string>", "isOpen": "<some valid boolean>"}, <br />
              then an 404 Not Found Error will be thrown<br />
            - send {"vendorID": "<some random, invalid string>", "isOpen": "<random, invalid string>"}, <br />
              then an 500 Internal Server Error will be thrown<br />
          - setVendorAvailability() in vendorController.ts<br />

6) View menu of snacks (including pictures and prices):<br />
      url: https://snaccs-in-a-van.herokuapp.com/api/menu/60707b103ed89dee65af78a2<br />
      This request gets the menu associated with the vendor with an ID of 60707b103ed89dee65af78a2.<br />
      images will load as base64 (will not be shown) and will render as complete images in future versions.<br />
      Conditions: <br />
        GET<br />
          - input: this REST endpoint accepts {"vendorID": "<some Vendor ObjectId>"}<br />
          - output: this will give a 200 http status and display menu if success<br />
          - fault conditions:<br />
            - send {"vendorID": "<some valid string but no menu available>"}, then an 204 No Content Error will be thrown<br />
            - send {"vendorID": "<some invalid string>"}, then an 500 Internal Server Error will be thrown<br />
          - getMenu() in menuController.ts<br />

7) View details of a item:<br />
      url: https://snaccs-in-a-van.herokuapp.com/api/menu/item/607074c63ed89dee65af788e<br />
      This request gets the details of the snack with an ID of 607074c63ed89dee65af788e.<br />
      This details include name and price of an item.<br />
      Conditions: <br />
        GET<br />
          - input: this REST endpoint accepts {"itemID": "<some Item ObjectId>"}<br />
          - output: this will give a 200 http status and display item details if success<br />
          - fault conditions:<br />
            - send {"itemID": "<some random, invalid string>"}, then an 404 Not Found Error will be thrown<br />
            - send {"itemID": "<some invalid string>"}, then an 500 Internal Server Error will be thrown<br />
          - getItemDetails() in menuController.ts<br />


