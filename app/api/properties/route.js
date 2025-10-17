import connectDB from "@/config/database"
import Property from "@/models/Property"

export const GET = async () => {

    connectDB()
    const properties = await Property.find({})

    try {
        return new Response(
            properties,
            {
                status: 200, 
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
    } catch (error) {
        return new Response('Something went wrong', { status: 500 })
    }
}