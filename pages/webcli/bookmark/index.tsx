import React from "react";

const Bookmark = () => {
  return <div>Bookmark</div>;
};

export default Bookmark;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
