import { createServerAction, createServerActionProcedure } from "zsa"
import { auth } from "./auth"

const authProducer = createServerActionProcedure().handler(async () => {
  try {
    const session = await auth()

    if (!session) throw "Invalid credentials."

    return {
      user: session.user
    }
  } catch (error) {
    console.error(error)
    throw 'Invalid credentials.'
  }
})

export const publicProducer = createServerAction()

export const protectedProducer = authProducer.createServerAction()
