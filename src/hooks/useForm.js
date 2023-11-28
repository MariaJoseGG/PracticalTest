import { useState } from "react"

export const useForm = (initialForm = {}) => {

  const [formState, setFormState] = useState(initialForm)

  // From the onChange event, only the target is obtained
  const onInputChange = ({ target }) => {

    // Here we know which input has changed, and what is its new value
    // Name of the changing input -> name
    // New value entered to that input -> value
    const { name, value } = target

    setFormState(
      {
        ...formState,
        [name]: value
      }
    )
  }

  return {
    formState,
    onInputChange
  }
}
