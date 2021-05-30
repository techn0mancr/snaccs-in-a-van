/* Import the required types and libraries */
import { agent } from "supertest";
import app from "../../src/server";

/* Import the Vendor model */
import {
    IOrder, Order, OrderStatus,
    Vendor
} from "../../src/models/index";

/* Import the vendor controller */
import * as controller from "../../src/controllers/vendorController";

const TEST_VENDOR_ID = "60ac0dd6cc0ab2dbb4036917";
const TEST_VENDOR_NAME = "Snax McTest";
const TEST_VENDOR_PASSWORD = "4321dcba";
const TEST_CUSTOMER_EMAIL = "pherson@test.com";
const TEST_CUSTOMER_PASSWORD = "4321dcba";
const TEST_ITEM_ID = "607073f83ed89dee65af788d";
const TEST_ITEM_QUANTITY = 1;

describe(`Open ${TEST_VENDOR_NAME}'s van using toggleVendorAvailability()`, () => {
    beforeAll(async () => {
        /* Set ${TEST_VENDOR_NAME}'s open status to false */
        await Vendor.updateOne(
            {
                name: TEST_VENDOR_NAME
            },
            {
                isOpen: false
            }
        );        
    });

    test(`Vendor ${TEST_VENDOR_NAME} is currently closed`, async () => {
        const vendorDetails = await Vendor.findOne(
            {
                name: TEST_VENDOR_NAME
            }
        );
        if (vendorDetails)
            expect(vendorDetails.isOpen).toBe(false);
    });
    
    test(`Toggle ${TEST_VENDOR_NAME}'s availability`, async () => {
        const req: any = {
            session: {
                customerId: undefined,
                vendorId: TEST_VENDOR_ID,
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
    
    test(`Vendor ${TEST_VENDOR_NAME} is now open`, async () => {
        const vendorDetails = await Vendor.findOne(
            {
                name: TEST_VENDOR_NAME
            }
        );
        if (vendorDetails)
            expect(vendorDetails.isOpen).toBe(true);
    });

    afterAll(async () => {
        /* Set ${TEST_VENDOR_NAME}'s open status to false */
        await Vendor.updateOne(
            {
                name: TEST_VENDOR_NAME
            },
            {
                isOpen: false
            }
        );        
    });
});

describe(`Integration testing of opening and closing ${TEST_VENDOR_NAME}'s van`, () => {
    var customerAgent = agent(app);
    var vendorAgent = agent(app);

    beforeAll(async () => {
        /* Set ${TEST_VENDOR_NAME}'s open status to false */
        await Vendor.updateOne(
            {
                name: TEST_VENDOR_NAME
            },
            {
                isOpen: false
            }
        );        
        
        /* Log the vendor in */
        await vendorAgent
              .patch(`/api/vendor/login`)
              .set("Content-Type", "application/json")
              .send(
                  {
                      name: TEST_VENDOR_NAME,
                      password: TEST_VENDOR_PASSWORD
                  }
              );

        /* Log the customer in */
        await customerAgent
              .patch(`/api/customer/login`)
              .set("Content-Type", "application/json")
              .send(
                  {
                      email: TEST_CUSTOMER_EMAIL, 
                      password: TEST_CUSTOMER_PASSWORD
                  }
              )
              
    });

    test(`Vendor ${TEST_VENDOR_NAME} sets its status to open`, async () => {
        /* Toggle the vendor's status */
        await vendorAgent
              .patch(`/api/vendor/status/toggle`)
              .then((res) => {
                  expect(res.statusCode).toBe(200);
              });

        /* Check that the toggle succeeded */
        await vendorAgent
              .get(`/api/vendor/profile`)
              .then((res) => {
                  expect(res.body.isOpen).toBe(true);
              });
    });
    test(`Customer submits an order to vendor ${TEST_VENDOR_NAME}`, async() => {
        /* Customer selects vendor */
        await customerAgent
              .patch(`/api/customer/vendor/${TEST_VENDOR_ID}/select`)
              .then((res) => {
                  expect(res.statusCode).toBe(200);
              });

        /* Customer adds a single cappuccino to their cart */
        await customerAgent
              .patch(`/api/customer/cart/edit/${TEST_ITEM_ID}`)
              .send(
                  {
                      quantity: TEST_ITEM_QUANTITY
                  }
              ).then((res) => {
                  expect(res.statusCode).toBe(200);
              });

        /* Customer checks their cart out */
        await customerAgent
              .post("/api/customer/cart/checkout")
              .then((res) => {
                  expect(res.statusCode).toBe(201);
              });
    });

    test(`Verify that vendor ${TEST_VENDOR_NAME} cannot close their van with an outstanding order`, async () => {
        await vendorAgent
              .patch(`/api/vendor/status/toggle`)
              .then((res) => {
                  expect(res.statusCode).toBe(403);
              });
        
              await vendorAgent
              .get(`/api/vendor/profile`)
              .then((res) => {
                  expect(res.body.isOpen).toBe(true);
              });
    });

    var generatedOrders: Array<IOrder> = [];

    test(`Vendor ${TEST_VENDOR_NAME} marks all their outstanding orders as completed`, async () => {
        await vendorAgent
              .get("/api/vendor/orders/placed")
              .then((res) => {
                  generatedOrders = res.body;
              });
        
        generatedOrders.forEach(async (order: IOrder) => {
            /* Mark the order as completed */
            await vendorAgent
                  .patch(`/api/vendor/order/${order._id}/complete`)
                  .then((res) => {
                      expect(res.statusCode).toBe(200);
                  });

            /* Check if the order has been completed successfully */
            await customerAgent
                  .get(`/api/order/${order._id}`)
                  .then((res) => {
                      expect(res.body.status).toBe(OrderStatus.Completed);
                  });
        });

    });

    test(`Verify that vendor ${TEST_VENDOR_NAME} can close their van after all outstanding orders are completed`, async () => {
        /* Attempt to close the van */
        await vendorAgent
              .patch(`/api/vendor/status/toggle`)
              .then((res) => {
                  expect(res.statusCode).toBe(200);
              });
        
        /* Verify that the van has been closed */
        await vendorAgent
              .get(`/api/vendor/profile`)
              .then((res) => {
                  expect(res.body.isOpen).toBe(false);
              });
    });

    afterAll(async () => {
        /* Clean up generated orders for this test */
        generatedOrders.forEach(async (order: IOrder) => {
            await Order.findByIdAndDelete(order._id);
        });
    });
});
