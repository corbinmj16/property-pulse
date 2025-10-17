import PropretyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
  await connectDB();
  const { id } = await params;
  const property = await Property.findById(id).lean();

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Properties
          </Link>
        </div>
      </section>

      <section class="bg-blue-50">
        <div class="container m-auto py-10 px-6">
          <div class="flex flex-col md:flex-row w-full gap-6">
            <PropretyDetails property={property} />
            {/* aside */}
            <aside className="bg-amber-400 min-h-dvh max-w-[300px] w-full rounded-lg"></aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
