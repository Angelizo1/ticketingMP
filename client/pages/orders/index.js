const OrderIndex = ({ orders }) => {
  return <ul>
    { orders.map( order => {
      return <li key={order.id} >
        { order.ticket.title } - { order.status }
      </li>
    }) }
  </ul>
}

OrderIndex.getInitialProps = async(client, context) => {
  const { data } = await client.get('/api/orders')

  return { orders: data };
}

export default OrderIndex;