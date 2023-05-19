import Promptcard from "./Promptcard";

interface creator {
  image: string;
  username: string;
  email: string;
  _id: string;
}

interface post {
  _id: string;
  prompt: string;
  tag: string;
  creator: creator;
}

interface props {
  name: string;
  desc: string;
  data: Array<post>;
  handleEdit: () => void;
  handleDelete: () => void;
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: props) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Affirmations</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data &&
          data.reverse().map((post: post) => (
            //@ts-ignore
            <Promptcard
              key={post._id}
              post={post}
              //@ts-ignore
              handleEdit={() => handleEdit && handleEdit(post)}
              //@ts-ignore
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
      </div>
    </section>
  );
};

export default Profile;
