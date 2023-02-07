import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddComment = ({ asin }) => {
  const [comment, setComment] = useState({
    comment: '',
    rate: 1,
    elementId: asin
  });

  useEffect(() => {
    setComment({
      ...comment,
      elementId: asin
    });
  }, [asin]);

  const sendComment = async e => {
    e.preventDefault();
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(comment),
          headers:{
            'Content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2Q0OGU3MzczODAwMTUzNzQzOTkiLCJpYXQiOjE2NzU3NzQ0ODgsImV4cCI6MTY3Njk4NDA4OH0.eoRyX7oH4lW7QPeKbtys9r-oTRqV_03rz2tltAGD-Is'
          }
        }
      );
      if (response.ok) {
        alert('Comment was sent!');
        setComment({
          comment: '',
          rate: 1,
          elementId: asin
        });
      } else {
        console.log('error');
        alert('something went wrong');
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={comment.comment}
            onChange={e =>
              setComment({
                ...comment,
                comment: e.target.value
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={e =>
              setComment({
                ...comment,
                rate: e.target.value
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;