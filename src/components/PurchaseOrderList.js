import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

import purchaseOrdersData from '../purchaseorders.json';

const PurchaseOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    console.log('Full data:', purchaseOrdersData);
    if (purchaseOrdersData && purchaseOrdersData.mvPurchaseOrders) {
      const sortedOrders = purchaseOrdersData.mvPurchaseOrders.sort((a, b) => a.PurchaseOrderNo - b.PurchaseOrderNo);
      setOrders(sortedOrders);
    }
  }, []);

  const handleOrderClick = (order) => {
    console.log('Selected order:', order);
    setSelectedOrder(order);
  };

  const closeDialog = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order.PurchaseOrderId}>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => handleOrderClick(order)}
              >
                {order.PurchaseOrderTypeAbbreviation || '?'} - {order.PurchaseOrderNo || '?'}
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={!!selectedOrder} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div>
              <p><strong>Address:</strong> {selectedOrder.PurchaseOrderAddress || 'N/A'}</p>
              <p><strong>Contact Person:</strong> {selectedOrder.PurchaseOrderContactPerson || 'N/A'}</p>
              <p><strong>Status:</strong> {selectedOrder.PurchaseOrderStatus || 'N/A'}</p>
              {selectedOrder.PurchaseOrderDetails && selectedOrder.PurchaseOrderDetails.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product SKU</TableHead>
                      <TableHead>Quantity Ordered</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Total Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.PurchaseOrderDetails.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{detail.PurchaseOrderRowProductSKU}</TableCell>
                        <TableCell>{detail.PurchaseOrderRowQuantity}</TableCell>
                        <TableCell>{detail.PurchaseOrderRowUnitPriceWithoutTaxOrDiscount}</TableCell>
                        <TableCell>{detail.PurchaseOrderRowTotalAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No order details available.</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrderList;
