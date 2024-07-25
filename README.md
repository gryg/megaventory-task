# How to Run

## Prerequisites

* npm or other package manager(adjust the CLI commands for your package manager of choice);
* Node.js
  
## CLI commands

### Step 1: Clone repo

    ```
    git clone https://github.com/gryg/megaventory-task
    ```

### Step 2: Install dependencies

    ```
    npm install
    ```

### Step 3: Run the dev Server

    ```
    npm run dev
    ```

    or

    ```
    npm run
    ```

Subsequent runs that don't require rebuilds can be done through:

    ```
    npm start
    ```

# Features

    1. Displays a sorted list of purchase orders;
    2. Allows clicking on an order, in order(pun intended) to view its details;
    3. Shows the detailed order information in a modal dialog; 
    4. Presents order details in a tabular format.

# Component Structure

## State Management

The component uses two main state variables:

1. `orders`: An array that stores the list of pruchase orders.
2. `selectedOrder`: Stores the currently selected order for displaying details.

These states are managed with a `useState` hook:

```javascript
const [orders, setOrders] = useState([]);
const [selectedOrder, setSelectedOrder] = useState(null);
```
## Data Loading & Sorting

We're using the `useEffect` hook in order to load and sort the purchase order data when the component mounts:

```javascript
useEffect(() => {
  if (purchaseOrdersData && purchaseOrdersData.mvPurchaseOrders) {
    const sortedOrders = purchaseOrdersData.mvPurchaseOrders.sort((a, b) => a.PurchaseOrderNo - b.PurchaseOrderNo);
    setOrders(sortedOrders);
  }
}, []);
```

* **NOTE**: This effect runs only once when the component mounts, sorts the orders by their `PurchaseOrderNo` and updates the `orders` state.
  
## Event Handlers

Two main event handlers are used:

1. `handleOrderClick`: Triggered when an order is clicked, setting the `selectedOrder` state;
2. `closeDialog`: Resets the `selectedOrder` state to `null`, closing the details dialog.


## Rendering

The component's render method can be broken down into two main parts:

1. The list of purchase orders
2. The dialog for displaying order details

### List of Purchase Orders

The component renders a list of purchase orders or, for lack of a better term, an "error" messsage("No orders available") message if the list is empty:

```jsx
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
```

### Order Details Dialog

The dialog content includes basic order information and a table of order details if available.
It is rendered using the `Dialog` component from the UI library ShadCN(same goes for the list, a ShadCN component as well):

```jsx
<Dialog open={!!selectedOrder} onOpenChange={closeDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Order Details</DialogTitle>
    </DialogHeader>
    {selectedOrder && (
      // content for order details 
    )}
  </DialogContent>
</Dialog>
```

# How does it relate to my Resume/CV ?

It doesn't really relate to it. I've tried using ShadCN components, which I've previously used in one of my projects, in order to have some sort of common point. I assume this `question` was supposed to weed out for people that worked with JSONs modelling purchase orders, let me know if my guess is on point ;).