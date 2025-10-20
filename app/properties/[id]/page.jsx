import PropretyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
  await connectDB();
  const { id } = await params;
  const property = await Property.findById(id).lean();

  if (!property) {
    return <h1 className="text-center text-2xl font-bold mt-10">Property Not Found</h1>;
  }

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

      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
            <PropretyDetails property={property} />
            {/* aside */}
            <aside className="bg-amber-400 min-h-dvh w-full rounded-lg col-span-1"></aside>
          </div>
        </div>
      </section>

      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
