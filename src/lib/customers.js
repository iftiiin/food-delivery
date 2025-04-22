import supabase from './supabase'

//  Create a customer
export const createCustomer = async (customer) => {
  const customerData = {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address
  }

  const { data, error } = await supabase
    .from('customers')
    .insert(customerData)
    .select()
    .single()

  if (error) {
    console.error("Error creating customer:", error)
    throw error
  }

  return data
}

//  Get all customers 
export const getCustomers = async ({ limit = 10, offset = 0 } = {}) => {
  const { data, error, count } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching customers:", error)
    throw error
  }

  return { customers: data, count }
}

// Get a customer by ID
export const getCustomerById = async (id) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error("Error fetching customer:", error)
    throw error
  }

  return data
}

//  Update a customer
export const updateCustomer = async (id, updates) => {
  const { data, error } = await supabase
    .from('customers')
    .update({
      name: updates.name,
      email: updates.email,
      phone: updates.phone,
      address: updates.address
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error("Error updating customer:", error)
    throw error
  }

  return data
}

// Delete a customer
export const deleteCustomer = async (id) => {
  const { data, error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    console.error("Error deleting customer:", error)
    throw error
  }

  return data
}
