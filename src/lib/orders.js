import supabase from "./supabase";

// Create an order with its order_lines
export const createOrder = async (order, orderLines) => {
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: order.customer_id,
      date: order.date,
      status: order.status,
      total: order.total,
      delivery_fee: order.delivery_fee
    })
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw orderError;
  }

  const orderId = orderData.id;

  const orderLinesData = orderLines.map((line) => ({
    order_id: orderId,
    product_id: line.product_id,
    quantity: line.quantity,
    price: line.price,
    subtotal: line.subtotal,
  }));

  const { error: linesError } = await supabase
    .from("order_lines")
    .insert(orderLinesData);

  if (linesError) {
    console.error("Error inserting order lines:", linesError);
    throw linesError;
  }

  return orderData;
};

// Get all orders
export const getOrders = async ({ limit = 10, offset = 0 } = {}) => {
  const { data, error, count } = await supabase
    .from("orders")
    .select("*", { count: "exact" })
    .order("id", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  return { orders: data, count };
};

// Get one order with its lines
export const getOrderById = async (id) => {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (orderError) {
    console.error("Error fetching order:", orderError);
    throw orderError;
  }

  const { data: orderLines, error: linesError } = await supabase
    .from("order_lines")
    .select("*")
    .eq("order_id", id);

  if (linesError) {
    console.error("Error fetching order lines:", linesError);
    throw linesError;
  }

  return { ...order, order_lines: orderLines };
};

export const updateOrder = async (id, updates, lines) => {
    
    const { data: updatedOrder, error: orderError } = await supabase
      .from("orders")
      .update({
        customer_id: updates.customer_id,
        date: updates.date,
        status: updates.status,
        total: updates.total,
        delivery_fee: updates.deliveryFee
      })
      .eq("id", id)
      .select()
      .single()
  
    if (orderError) {
      console.error("Error updating order:", orderError)
      throw orderError
    }
  
    // 2. Loop through lines: update if has id, insert if not
    for (const line of lines) {
      if (line.id) {
        // Update existing line
        const { error: updateError } = await supabase
          .from("order_lines")
          .update({
            product_id: line.product_id,
            quantity: line.quantity,
            price: line.price,
            subtotal: line.subtotal
          })
          .eq("id", line.id)
  
        if (updateError) {
          console.error("Error updating order line:", updateError)
          throw updateError
        }
      } else {
        // Insert new line
        const { error: insertError } = await supabase
          .from("order_lines")
          .insert({
            order_id: id,
            product_id: line.product_id,
            quantity: line.quantity,
            price: line.price,
            subtotal: line.subtotal
          })
  
        if (insertError) {
          console.error("Error inserting new order line:", insertError)
          throw insertError
        }
      }
    }
  
    return updatedOrder
  }
  

// Delete an order and its lines
export const deleteOrder = async (id) => {
  const { error: linesError } = await supabase
    .from("order_lines")
    .delete()
    .eq("order_id", id);

  if (linesError) {
    console.error("Error deleting order lines:", linesError);
    throw linesError;
  }

  const { data, error: orderError } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
    .select();

  if (orderError) {
    console.error("Error deleting order:", orderError);
    throw orderError;
  }

  return data;
};
