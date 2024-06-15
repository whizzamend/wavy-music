import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="bg-neutral-900 h-full w-full overflow-hidden overflow-y-auto rounded-lg">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back?</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-col-3 2xl:grid-col-4 gap-3 mt-4">
            <ListItem
              name="Liked Songs"
              image="/images/liked.png"
              href="liked"
            ></ListItem>
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
}
