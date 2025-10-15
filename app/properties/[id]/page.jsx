// [...id] = catch all route
const PropertyPage = async ({ params }) => {
  const { id } = await params;
  return <section>Property Page {id}</section>;
};

export default PropertyPage;
