import { auth } from "@clerk/nextjs/server"

export default async function SavedPages()
{
    await auth.protect();

    return(

        <main className="p-8">
      <h1 className="text-2xl font-bold">
        My Saved Properties
      </h1>

      <p className="mt-2 text-gray-600">
        Your saved properties will appear here.
      </p>
    </main>
    )
}