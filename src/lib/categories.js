import supabase from './supabase'

//  Create a category
export const createCategory = async (category) => {
  const categoryData = {
    name: category.name,
  }

  const { data, error } = await supabase
    .from('categories')
    .insert(categoryData)
    .select()
    .single()

  if (error) {
    console.error("Error creating category:", error)
    throw error
  }

  return data
}

//  Get all category 
export const getCategories = async ({ limit = 20, offset = 0 } = {}) => {
  const { data, error, count } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching categories:", error)
    throw error
  }

  return { categories: data, count }
}

// Get a category by ID
export const getCategoryById = async (id) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error("Error fetching category:", error)
    throw error
  }

  return data
}

//  Update a category
export const updateCategory = async (id, updates) => {
  const { data, error } = await supabase
    .from('categories')
    .update({
      name: updates.name,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error("Error updating category:", error)
    throw error
  }

  return data
}

// Delete a category
export const deleteCategory = async (id) => {
  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    console.error("Error deleting category:", error)
    throw error
  }

  return data
}
