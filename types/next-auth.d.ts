import NextAuth from "next-auth"

declare module "next-auth" {

  interface Session {
    user: {
      /** The user's postal address. */
      address: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }

  interface User {
    id: number,
    name: string,
    username: string,
    role: string
  }

  interface JWT {
    id: number,
    name: string,
    username: string,
    role: string
    & DefaultSession["jwt"]
  }
}