import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [newOrders, setNewOrders] = useState([]);
  useEffect(() => {
    const getNewOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ordersRoutes");
        const newOrdersData = response.data;
        setNewOrders(newOrdersData);
      } catch (error) {
        console.error("Failed to fetch new orders list:", error);
      }
    }
    getNewOrders();
  }, [newOrders])

  const removeOrderHandler = async (currentOrder) => {
    console.log(currentOrder)
    console.log('order should be removed')
    const deleteOrderUrl = `http://localhost:8080/ordersRoutes/orders/${currentOrder.id}`
    console.log(deleteOrderUrl)
    const response = await axios.delete(deleteOrderUrl);
    //make an axios  to localhost:8080/ordersRoutes/orders/{currentOrder.id}
  }

  return (
    <div className="App">
      <section>
        <table>
          <thead>
            <tr>
             
              <th>Table #</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newOrders.map((currentOrder, key) => {
              return (
                <tr key={key}>
                  
                  <td>{currentOrder.table_number}</td>
                  <td>{currentOrder.name}</td>
                  <td>{currentOrder.quantity}</td>
                  <td><button className='remove' onClick={() => removeOrderHandler(currentOrder)}>Remove Order</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
