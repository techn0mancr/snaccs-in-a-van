**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository

Welcome!

We have added to this repository a `README.md`, `.gitignore`, and `.gitattributes`.

* **README.md**: is the document you are currently reading. It should be replaced with information about your project, and instructions on how to use your code in someone else's local computer.

* **.gitignore**: lets you filter out files that should not be added to git. For example, Windows 10 and Mac OS create hidden system files (e.g., .DS_Store) that are local to your computer and should not be part of the repository. This files should be filtered by the `.gitignore` file. This initial `.gitignore` has  been created to filter local files when using MacOS and Node. Depending on your project make sure you update the `.gitignore` file.  More information about this can be found in this [link](https://www.atlassian.com/git/tutorials/saving-changes/gitignore).

* **.gitattributes**: configures the line ending of files, to ensure consistency across development environments. More information can be found in this [link](https://git-scm.com/docs/gitattributes).

Remember that _"this document"_ can use `different formats` to **highlight** important information. This is just an example of different formating tools available for you. For help with the format you can find a guide [here](https://docs.github.com/en/github/writing-on-github).

## Table of contents
* [Team Members](#team-members)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Code Implementation](#code-implementation)
* [Workflow](#Workflow)
* [Postman Request Details}(#Postman-Request)

## Team Members

| Name | Task | State |
| :---         |     :---:      |          ---: |
| Nathaneal Putro  | Back End     |  Testing |
| Callista Low   | Front End      |  Testing |
| Livya Natasha Riany    | Front End      |  Testing |
| Joseph Leonardi   | Back End  | Testing |
| Jeffrey Kolenchery  | Back End  | Testing |

## General info
This is project ...
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

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

## Code Implementation

You can include a code snippet here.

```HTML
<!--
Example code from: https://www.w3schools.com/jsref/met_win_alert.asp
__>

<!DOCTYPE html>
<html>
<body>

<p>Click the button to display an alert box.</p>

<button onclick="myFunction()">Try it</button>

<script>
function myFunction() {
  alert("Hello! I am an alert box!");
}
</script>

</body>
</html>
```


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

1) Customer starts a new order by requesting a snack (for Customers):
      url: localhost:48080/api/customer/order/add/607074c63ed89dee65af788e
      This request attempts to add two Lattes to Nathanael's cart.
      Fault Conditions: 
        POST
        - input: this REST endpoint accepts {"customerId": "<some Customer ObjectId>", "quantity": "<amount of item to add to the cart>"}
        - output: this will give a 200 OK if success
        - fault conditions:
          - send {"customerId": "<some valid, but nonexisting Customer ObjectId>", "quantity": 1}, then a 404 Not Found will be thrown
          - send {"customerId": "<some random string>", "quantity": 1}, then a 500 Internal Server Error will be thrown
          - send {"customerId": "<some random string>", "quantity": "<some random non-numeric string>"
        - addSnackToCart() in customerContoller.ts

2) Mark an order as \"fulfilled\" i.e. the order is ready to be picked up by customer :
      url: localhost:48080/api/order/60780115c5c0362b60d60376/fulfill
      This request marks the order with an ID of 60780115c5c0362b60d60376 as \"Fulfilled\".
      This also set the status message as "fulfilled order" so the customer can be notified.
      Fault Condition: 
        GET
        - input: this REST endpoint accepts {"vendorId": "<some Vendor ObjectId>", "orderID": "<some Order ObjectId associated with Vendor>", 
        "isFulfilled": "any boolean value"}
        - output: this will give a 200 OK if success
        - fault conditions:
          - send {"vendorId": "<some valid, but nonexisting Vendor ObjectId>", "quantity": 1}, then a 404 Not Found will be thrown
          - send {"vendorId": "<some random string>", "quantity": 1}, then a 500 Internal Server Error will be thrown

3) Show list of all outstanding orders:
      url: localhost:48080/api/vendor/60707b103ed89dee65af78a2/orders/outstanding
      This request gets all the outstanding orders of the vendor with an ID of 60707b103ed89dee65af78a2
      This is done by querying database for orders (for the vendor in question) which have not been marked as fulfilled. 
      Fault Condition: 

4) Setting van status and location (vendor shares geo-location):
      url: localhost:48080/api/vendor/60707b103ed89dee65af78a2/update/location
      This request updates the geolocation and location description of the vendor with an ID of 60707b103ed89dee65af78a2.
      Geolocation will be captured with a location tracking api in future versions.
      Fault Condition: 

5) Setting van status (marks van as ready-for-orders):
      url: localhost:48080/api/vendor/60707b103ed89dee65af78a2/update/status
      This request updates the status of the vendor with an ID of 60780115c5c0362b60d60376 to ready-for-orders.
      Fault Condition: 

6) View menu of snacks (including pictures and prices):
      url: localhost:48080/api/menu/60707b103ed89dee65af78a2
      This request gets the menu associated with the vendor with an ID of 60707b103ed89dee65af78a2.
      images will load as base64 (will not be shown) and will render as complete images in future versions.
      Fault Condition: 

7) View details of a item:
      url: localhost:48080/api/menu/item/607074c63ed89dee65af788e
      This request gets the details of the snack with an ID of 607074c63ed89dee65af788e.
      This details include name and price of an item.
      Fault Condition: (invalid itemID entered -> return 404)


