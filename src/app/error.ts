const getErrorMessage = (error: any) => {
    const errors = error?.errors
  
    if (!errors) return error?.message || 'Something went wrong'
  
    return Object.values(errors)
      .flat()
      .join(', ')
  }

export default getErrorMessage;