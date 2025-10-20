import Image from "next/image";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import profileDefault from "@/assets/images/profile.png";
import { convertServerToClientObject } from "@/utils/convertToObject";
import ProfileProperties from "@/components/ProfileProperties";

const ProfilePage = async () => {
  await connectDB();
  const { user, userId } = await getSessionUser();

  if (!userId) {
    throw new Error("user id is required");
  }

  const properties = await Property.find({ owner: userId }).lean();

  console.log(properties);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-10">Your Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="col-span-1">
              <div className="mb-4">
                <Image
                  className="h-20 w-20 md:h-24 md:w-24 rounded-full mx-auto md:mx-0"
                  src={user.image}
                  width={100}
                  height={100}
                  alt="User"
                />
              </div>

              <h2 className="mb-4">
                <span className="font-bold block">Name: </span> {user.name}
              </h2>
              <h2>
                <span className="font-bold block">Email: </span> {user.email}
              </h2>
            </div>

            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <ProfileProperties properties={convertServerToClientObject(properties)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
