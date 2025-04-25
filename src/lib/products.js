
import supabase from './supabase'

// Create a product
export const createProduct = async (product) => {
  const productData = {
    name: product.name,
    image: product.image,
    category_id: product.category,
    price: product.price,
    description: product.description
  }

  const { data, error } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single()

  if (error) {
    console.error("Error creating product:", error)
    throw error
  }

  return data
}

// Get all products
export const getProducts = async ({ limit = 150, offset = 0 } = {}) => {
  const { data, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching products:", error)
    throw error
  }

  return { products: data, count }
}

// Get a product by ID
export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    throw error
  }

  return data
}

// Update a product
export const updateProduct = async (id, updates) => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: updates.name,
      image: updates.image,
      category_id: updates.category,
      price: updates.price,
      description: updates.description
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error("Error updating product:", error)
    throw error
  }

  return data
}

// Delete a product
export const deleteProduct = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    console.error("Error deleting product:", error)
    throw error
  }

  return data
}
