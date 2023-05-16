import Feed from "components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Ayira's Affirmations
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered Affirmations for you</span>
        <img
          className="emoji"
          src=" https://em-content.zobj.net/thumbs/240/apple/354/index-pointing-at-the-viewer_1faf5.png"
          alt="pointing finger"
          height={50}
          width={50}
        />
      </h1>
      <p>
        This GPT-powered prompter is a custom-designed AI prompting tool that i
        have made to give you daily affirmations about how i feel about you. Log
        in at any time to generate affirmations for you.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
