import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const classes = useStyles();
    // console.log(post);
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const user = JSON.parse(localStorage.getItem("profile"));

    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');

    const handleClick = async () => {
        setComment('');
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id));
        // console.log(newComments);
        setComments(newComments);

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom varient="h6" >Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1" >
                            <strong>{c.split(':')[0]}</strong>: {c.split(':')[1]}
                            <Divider style={{ margin: '5px 0' }} />
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>

                {user?.result?.name && (
                    <div style={{ width: '70%' }} className="">
                        <Typography gutterBottom varient="h6" >Write a comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick} >
                            comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;