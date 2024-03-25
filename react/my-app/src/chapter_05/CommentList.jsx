import React from 'react';
import Comment from './Comment';

const comments = [
  {
    name: "김",
    comment: "안녕하세요",
  },
  {
    name: "이",
    comment: "리액트 재미있네",
  },
  {
    name: "박",
    comment: "좋아요",
  },
];

function CommentList(props) {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comment name={comment.name} comment={comment.comment} />
        );
      })}
    </div>
  );
}

export default CommentList;