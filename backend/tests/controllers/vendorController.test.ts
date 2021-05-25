/* Import the required types and libraries */
//import { agent } from "supertest";
//import app from "../../src/server";

/* Import the Vendor model */
import { Vendor } from "../../src/models";

/* Import the vendor controller */
import * as controller from "../../src/controllers/vendorController";

//describe("Open Snax McTest's van using toggleVendorAvailability()", () => {
    //beforeAll(async () => {
        //await Vendor.updateOne(
            //{
                //"email": "snaxmctest@snaccsinavan.com"
            //},
            //{
                //"isOpen": false
            //}
        //);        
    //});

    //test("Vendor \"Test McTest\" is currently closed", async () => {
        //const vendorDetails = await Vendor.findOne(
            //{
                //"email": "snaxmctest@snaccsinavan.com"
            //}
        //);
        //if (vendorDetails)
            //expect(vendorDetails.isOpen).toBe(false);
    //});
    
    //test("Toggle \"Test McTest\"'s availability", async () => {
        //const req: any = {
            //session: {
                //customerId: undefined,
                //vendorId: "60ac0dd6cc0ab2dbb4036917",
                //cart: undefined
            //}
        //}
        //const res: any = {
            //send: jest.fn()
        //}
        
        //await controller.toggleVendorAvailability(req, res);
    //});
    
    //test("Vendor \"Test McTest\" is now open", async () => {
        //const vendorDetails = await Vendor.findOne(
            //{
                //"email": "snaxmctest@snaccsinavan.com"
            //}
        //);
        //if (vendorDetails)
            //expect(vendorDetails.isOpen).toBe(true);
    //});
//});

//describe("Integration testing of opening and closing Snax McTest's van", () => {
    //var customerAgent = agent(app);
    //var customerCookie: string = "";

    //var vendorAgent = agent(app);
    //var vendorCookie: string = "";

    //beforeAll(() => {
        //[> Log the vendor in <]
        //vendorAgent
        //.patch("/api/vendor/login")
        //.set("Content-Type", "application/json")
        //.send(
            //{
                //"email": "snaxmctest@snaccsinavan.com",
                //"password": "4321dcba"
            //}
        //).then((res) => {
            //[> Store the vendor's cookie <]
            //vendorCookie = res
                           //.headers["set-cookie"][0]
                           //.split(",")
                           //.map((item: string) => item.split(";")[0])
                           //.join(";");
        //});

        //[> Log the customer in <]
        //customerAgent
        //.patch("/api/customer/login")
        //.set("Content-Type", "application/json")
        //.send(
            //{
                //"email": "pherson@test.com",
                //"password": "4321dcba"
            //}
        //).then((res) => {
            //[> Store the customer's cookie <]
            //customerCookie = res
                             //.headers["set-cookie"][0]
                             //.split(",")
                             //.map((item: string) => item.split(";")[0])
                             //.join(";");
        //});
    //});

    //test("Vendor \"Snax McTest\" sets its status to open", () => {
        //console.log(customerCookie, vendorCookie)
        //expect(0).toBe(0);
    //});
    //console.log(vendorCookie, customerCookie);
//});

/*
Customer deets:
email: pherson@test.com
pass: 4321dcba
session ID: Buy6abmYJ5HU07_mSOALsOgNq2p9no7Z

Vendor deets:
email: snaxmctest@snaccsinavan.com
pass: 4321dcba
session ID: Buy6abmYJ5HU07_mSOALsOgNq2p9no7Z 
*/
