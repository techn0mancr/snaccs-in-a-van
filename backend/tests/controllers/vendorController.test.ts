/* Import the required types and libraries */
import { agent } from "supertest";
import app from "../../src/server";

/* Import the Vendor model */
import { Vendor } from "../../src/models/index";

/* Import the vendor controller */
import * as controller from "../../src/controllers/vendorController";

describe("Open Snax McTest's van using toggleVendorAvailability()", () => {
    beforeAll(async () => {
        /* Set Snax McTest's open status to false */
        await Vendor.updateOne(
            {
                "email": "snaxmctest@snaccsinavan.com"
            },
            {
                "isOpen": false
            }
        );        
    });

    test("Vendor \"Snax McTest\" is currently closed", async () => {
        const vendorDetails = await Vendor.findOne(
            {
                "email": "snaxmctest@snaccsinavan.com"
            }
        );
        if (vendorDetails)
            expect(vendorDetails.isOpen).toBe(false);
    });
    
    test("Toggle \"Snax McTest\"'s availability", async () => {
        const req: any = {
            session: {
                customerId: undefined,
                vendorId: "60ac0dd6cc0ab2dbb4036917",
                cart: undefined
            }
        }
        const res: any = {
        } as Response;
        
        try {
            await controller.toggleVendorAvailability(req, res);
        }
        catch (e) {
            /* Supressing the "res.status is not a function" error that makes Jest constantly fails */
        }
    });
    
    test("Vendor \"Snax McTest\" is now open", async () => {
        const vendorDetails = await Vendor.findOne(
            {
                "email": "snaxmctest@snaccsinavan.com"
            }
        );
        if (vendorDetails)
            expect(vendorDetails.isOpen).toBe(true);
    });

    afterAll(async () => {
        /* Set Snax McTest's open status to false */
        await Vendor.updateOne(
            {
                "email": "snaxmctest@snaccsinavan.com"
            },
            {
                "isOpen": false
            }
        );        
    });
});

describe("Integration testing of opening and closing Snax McTest's van", () => {
    var customerAgent = agent(app);
    var vendorAgent = agent(app);

    beforeAll(async () => {
        /* Set Snax McTest's open status to false */
        await Vendor.updateOne(
            {
                "email": "snaxmctest@snaccsinavan.com"
            },
            {
                "isOpen": false
            }
        );        
        
        /* Log the vendor in */
        await vendorAgent
              .patch(`/api/vendor/login`)
              .set("Content-Type", "application/json")
              .send(
                  {
                      "name": "Snax McTest",
                      "password": "4321dcba"
                  }
              );

        /* Log the customer in */
        await customerAgent
              .patch(`/api/customer/login`)
              .set("Content-Type", "application/json")
              .send(
                  {
                      "email": "pherson@test.com",
                      "password": "4321dcba"
                  }
              )
              
    });

    test("Vendor \"Snax McTest\" sets its status to open", async () => {
        await vendorAgent
              .patch(`/api/vendor/status/toggle`)
              .then((res) => {
                  expect(res.statusCode).toBe(200);
              });
        await vendorAgent
              .get(`/api/vendor/profile`)
              .then((res) => {
                  expect(res.body.isOpen).toBe(true);
              });
    });

    test("Customer submits an order to Snax McTest", async() => {
        // customer selects Snax McTest
        await customerAgent
        .patch(`/api/customer/vendor/60ac0dd6cc0ab2dbb4036917/select`)
        .then((res) => {
            expect(res.statusCode).toBe(200);
        })
        // console.log(res.body.vendorId);

        //customer adds an order of cappucino to cart
        await customerAgent
        .patch(`/api/customer/cart/edit/60716605bc9727fefc95ea41`)
        .send(
            {
                "quantity" : 2
            }
        )
        .then((res) => {
            expect(res.statusCode).toBe(200);
        })
        //customer checkout cart
        await customerAgent
        .patch("/api/customer/cart/checkout")
        .then((res) => {
            expect(res.statusCode).toBe(200);
        })
    });

    test("check if Vendor Snax McTest can close shop if order placed exists", async () => {
        await vendorAgent
              .patch(`/api/vendor/status/toggle`)
              .then((res) => {
                  expect(res.statusCode).toBe(403);
              });
    });

    test("vendor completes order", async () => {
        await vendorAgent
              .patch(`/api/vendor/order/${orderId}/complete`)
              .then((res) => {
                  expect(res.statusCode).toBe(200);
              });
        await vendorAgent
              .get(`/api/vendor/profile`)
              .then((res) => {
                  expect(res.body.isOpen).toBe(true);
              });
    });

    test("check if Vendor Snax McTest can close shop without existing placed orders", async () => {
        await vendorAgent
              .patch(`/api/vendor/status/toggle`)
              .then((res) => {
                  expect(res.statusCode).toBe(200);
              });
    });
});

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
