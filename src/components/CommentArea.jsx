import React, { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = ({ asin }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
    setIsLoading(true)
    try {
      let response = await fetch(
      'https://striveschool-api.herokuapp.com/api/comments/' + asin,
      {
      headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2Q0OGU3MzczODAwMTUzNzQzOTkiLCJpYXQiOjE2NzU3NzQ0ODgsImV4cCI6MTY3Njk4NDA4OH0.eoRyX7oH4lW7QPeKbtys9r-oTRqV_03rz2tltAGD-Is',
      },
      }
      )
      console.log(response)
      if (response.ok) {
        let comments = await response.json()
        setComments(comments)
        setIsLoading(false)
        setIsError(false)
    } else {
        console.log('error')
        setIsLoading(false)
        setIsError(true)
    }
    } catch (error) {
        console.log(error)
        setIsLoading(false)
        setIsError(true)
    }
    }
    fetchData()
    }, [asin])

  return (
  <div className="text-center">
    {isLoading && <Loading />}
    {isError && <Error />}
    <AddComment asin={asin} />
    <CommentList commentsToShow={comments} />
  </div>
  )
}

export default CommentArea