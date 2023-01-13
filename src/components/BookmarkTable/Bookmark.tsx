import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Bookmark as APIBookmark } from "../../utils/api/types";

type BookmarkProps = {
  bookmark: APIBookmark;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmark }) => {
  return (
    <motion.div className="truncate">
      <Link className="ml-2" href={bookmark.url}>
        {bookmark.name !== "" ? bookmark.name : bookmark.url}
      </Link>
    </motion.div>
  );
};

export default Bookmark;
