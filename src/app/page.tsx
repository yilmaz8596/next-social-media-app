import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/create-post";
import { getPosts } from "@/actions/post.actions";
import WhoToFollow from "@/components/who-to-follow";
import { getDbUserId } from "@/actions/user.actions";
import PostCard from "@/components/post-card";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  console.log(posts);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}
        <div className="space-y-6 mt-6">
          {posts?.map((post, index) => (
            <PostCard key={index} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}
