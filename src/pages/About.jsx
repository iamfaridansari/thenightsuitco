import React from "react";
import Tile from "../components/Tile";

const About = () => {
  return (
    <>
      <Tile title="About us" />

      <div className="container text-center py-4">
        <h2 className="text-capitalize mb-2">The Nightsuit Company</h2>
        <p>
          Welcome to The Night Suit Co., your number one source for all things
          [product]. We're dedicated to giving you the very best of [product],
          with a focus on [store characteristic 1], [store characteristic 2],
          [store characteristic 3]. <br />
          <br /> Founded in [year] by [founder name], The Night Suit Co. has
          come a long way from its beginnings in [starting location]. When
          [founder name] first started out, [his/her/their] passion for [brand
          message - e.g. "eco-friendly cleaning products"] drove them to
          [action: quit day job, do tons of research, etc.] so that The Night
          Suit Co. can offer you [competitive differentiator - e.g. "the world's
          most advanced toothbrush"]. We now serve customers all over [place -
          town, country, the world], and are thrilled that we're able to turn
          our passion into [my/our] own website. <br />
          <br /> [I/we] hope you enjoy [my/our] products as much as [I/we] enjoy
          offering them to you. If you have any questions or comments, please
          don't hesitate to contact [me/us]. Sincerely, [founder name]
        </p>
      </div>
    </>
  );
};

export default About;
