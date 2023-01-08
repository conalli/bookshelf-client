import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Bookmark as APIBookmark } from "../../utils/APITypes";

type BookmarkProps = {
  bookmark: APIBookmark;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmark }) => {
  return (
    <motion.div>
      <Link className="mx-2" href={bookmark.url}>
        {bookmark.name}
      </Link>
    </motion.div>
  );
};

export default Bookmark;
