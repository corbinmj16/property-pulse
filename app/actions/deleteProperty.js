'use server'

import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function deleteProperty(propertyId) {
    await connectDB()
    const {user, userId} = await getSessionUser()

    if (!user || !userId) {
        throw new Error('User Id is required')
    }

    const property = await Property.findById(propertyId)

    if (!property) throw new Error('Property not found.')

    // Verify Ownership
    if (property.owner.toString() !== userId) {
        throw new Error('Unauthorized')
    }

    // delete images associated with property
    const imageIds = property.images.map((imageUrl) => {
        const lastSegment = imageUrl.split('/').pop();
        const imageName = lastSegment.split('.').at(0)

        console.log(imageName)
        return imageName
    });

    if (imageIds.length > 0) {
        console.log('uploader: ', cloudinary);
        
        console.log('ids kkddd:::::', imageIds);
        for (let publicId of imageIds) {
            await cloudinary.uploader.destroy(publicId)
        }
    }

    await property.deleteOne()

    revalidatePath('/', 'layout')
}