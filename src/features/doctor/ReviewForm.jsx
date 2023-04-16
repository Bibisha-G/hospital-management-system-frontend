// import React, { useState } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { ErrorToast } from "../../components/Toasts/Toasts";
// import { useCreateReviewMutation } from "../patient/patientApiSlice";

// const ReviewForm = ({ doctor_profile_id, patient_id }) => {
//   const [review, setReview] = useState("");
//   const [rating, setRating] = useState(0);
//   const { addReview } = useCreateReviewMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const values = {
//       text: review,
//       rating,
//       doctor: doctor_profile_id,
//       reviewer: patient_id,
//     };

//     try {
//       const response = await addReview(values).unwrap();
//       setReview("");
//       setRating(0);
//     } catch (e) {
//       ErrorToast("Failed to add review");
//     }
//   };

//   const handleRatingChange = (e) => {
//     setRating(parseInt(e.target.value));
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="review">
//         <Form.Label>Leave a review:</Form.Label>
//         <Form.Control
//           as="textarea"
//           placeholder="Enter your review here"
//           value={review}
//           onChange={(e) => setReview(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="rating">
//         <Form.Label>Rate your experience:</Form.Label>
//         <Row>
//           {[...Array(5)].map((_, index) => (
//             <Col key={index}>
//               <Form.Check
//                 type="radio"
//                 name="rating"
//                 value={index + 1}
//                 label={`${index + 1} stars`}
//                 onChange={handleRatingChange}
//                 checked={rating === index + 1}
//               />
//             </Col>
//           ))}
//         </Row>
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default ReviewForm;

import React, { useState } from "react";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { ErrorToast, SuccessToast } from "../../components/Toasts/Toasts";
import { useCreateReviewMutation } from "../patient/patientApiSlice";
import "./ReviewForm.css";

const ReviewForm = ({ doctor_profile_id, patient_id }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview] = useCreateReviewMutation();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      text: comment,
      rating,
      doctor: doctor_profile_id,
      reviewer: patient_id,
    };

    try {
      const response = await addReview(values).unwrap();
      setComment("");
      setRating(0);
      SuccessToast("Successfully added review");
    } catch (e) {
      console.log(e);
      ErrorToast("Failed to add review");
    }
  };

  return (
    <div className="review-form-container">
      <h4>Leave a Review</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group control Id="formRating">
          <Form.Label>Rating:</Form.Label>
          <Row>
            <Col xs={12}>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      style={{ visibility: "hidden" }}
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => handleRatingChange(ratingValue)}
                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                      size={30}
                    />
                  </label>
                );
              })}
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formComment">
          <Form.Label>Review:</Form.Label>
          <InputGroup>
            <Form.Control
              as="textarea"
              placeholder="Enter your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Button
          className="mt-2 rounded-4 text-black-50 shadow"
          style={{
            backgroundColor: "#1e81b0",
            border: "solid 1px #1e81b0",
          }}
          type="submit"
        >
          <span className="text-white">Submit</span>
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;
