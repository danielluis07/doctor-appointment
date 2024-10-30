import { SearchedDoctors } from "./_components/searched-doctors";
import { auth } from "@/auth";
import { getSearchedDoctors } from "@/queries/get-searched-doctors";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q?: string | undefined; page?: string };
}) => {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const data = await getSearchedDoctors(searchParams.q);

  return <SearchedDoctors data={data} />;
};

export default SearchPage;
