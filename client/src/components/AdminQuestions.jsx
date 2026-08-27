import { useEffect, useState, useContext } from "react";
import {
  getAdminQuestions,
  deleteQuestion,
  createQuestion,
  updateQuestion,
} from "../api/userApi";
import AuthContext from "../context/AuthContext";

const initialFormData = {
  question: "",
  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",
  correct_option: "A",
  category: "",
  difficulty: "Easy",
};

function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(initialFormData);
  const [editData, setEditData] = useState(initialFormData);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      return;
    }

    const fetchQuestions = async () => {
      try {
        const data = await getAdminQuestions();
        setQuestions(data);
      } catch (error) {
        console.error(error);

        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Failed to fetch questions.");
        }
      }
    };

    fetchQuestions();
  }, [user]);

  if (!user || user.role !== "admin") {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const data = await createQuestion(formData);

      setQuestions((currentQuestions) => [
        ...currentQuestions,
        data.question,
      ]);

      setMessage("Question created successfully.");

      setFormData(initialFormData);
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to create question.");
      }
    }
  };

  const handleEdit = (question) => {
    setEditingId(question.id);

    setEditData({
      question: question.question,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      option_d: question.option_d,
      correct_option: question.correct_option || "A",
      category: question.category,
      difficulty: question.difficulty,
    });

    setMessage("");
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    try {
      const data = await updateQuestion(editingId, editData);

      setQuestions((currentQuestions) =>
        currentQuestions.map((question) =>
          question.id === editingId ? data.question : question
        )
      );

      setMessage("Question updated successfully.");

      setEditingId(null);
      setEditData(initialFormData);
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to update question.");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(initialFormData);
    setMessage("");
  };

  const handleDelete = async (questionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteQuestion(questionId);

      setMessage("Question deleted successfully.");

      setQuestions((currentQuestions) =>
        currentQuestions.filter(
          (question) => question.id !== questionId
        )
      );
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to delete question.");
      }
    }
  };

  return (
    <section className="admin-questions-section">

      {/* Section heading */}

      <div className="section-heading">
        <div>
          <h2>Manage Questions</h2>
          <p>
            Create, edit and manage quiz questions for students.
          </p>
        </div>

        <span className="question-count">
          {questions.length} Questions
        </span>
      </div>

      {/* Create question */}

      <div className="create-question-card">

        <div className="subsection-heading">
          <div>
            <h3>Create Question</h3>
            <p>Add a new question to the quiz.</p>
          </div>
        </div>

        <form
          className="question-form"
          onSubmit={handleCreate}
        >

          <div className="form-field full-width">
            <label>Question</label>

            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter the question..."
              required
            />
          </div>

          <div className="form-field">
            <label>Option A</label>

            <input
              type="text"
              name="option_a"
              value={formData.option_a}
              onChange={handleChange}
              placeholder="Enter option A"
              required
            />
          </div>

          <div className="form-field">
            <label>Option B</label>

            <input
              type="text"
              name="option_b"
              value={formData.option_b}
              onChange={handleChange}
              placeholder="Enter option B"
              required
            />
          </div>

          <div className="form-field">
            <label>Option C</label>

            <input
              type="text"
              name="option_c"
              value={formData.option_c}
              onChange={handleChange}
              placeholder="Enter option C"
              required
            />
          </div>

          <div className="form-field">
            <label>Option D</label>

            <input
              type="text"
              name="option_d"
              value={formData.option_d}
              onChange={handleChange}
              placeholder="Enter option D"
              required
            />
          </div>

          <div className="form-field">
            <label>Correct Option</label>

            <select
              name="correct_option"
              value={formData.correct_option}
              onChange={handleChange}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="form-field">
            <label>Category</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Data Structures"
              required
            />
          </div>

          <div className="form-field">
            <label>Difficulty</label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="form-actions full-width">
            <button
              type="submit"
              className="primary-action-button"
            >
              Create Question
            </button>
          </div>

        </form>
      </div>

      {/* Message */}

      {message && (
        <div className="admin-message">
          {message}
        </div>
      )}

      {/* Questions */}

      <div className="questions-management-list">

        <div className="subsection-heading">
          <div>
            <h3>Question Bank</h3>
            <p>
              Questions currently available in the system.
            </p>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="admin-empty-state">
            <p>No questions found.</p>
          </div>
        ) : (
          questions.map((question, index) => (
            <div
              className="admin-question-card"
              key={question.id}
            >

              {editingId === question.id ? (

                /* EDIT MODE */

                <form
                  className="question-edit-form"
                  onSubmit={handleSaveEdit}
                >

                  <div className="admin-question-header">
                    <span className="question-number">
                      Question {index + 1}
                    </span>
                  </div>

                  <div className="form-field full-width">
                    <label>Question</label>

                    <textarea
                      name="question"
                      value={editData.question}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="edit-options-grid">

                    <div className="form-field">
                      <label>Option A</label>

                      <input
                        type="text"
                        name="option_a"
                        value={editData.option_a}
                        onChange={handleEditChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Option B</label>

                      <input
                        type="text"
                        name="option_b"
                        value={editData.option_b}
                        onChange={handleEditChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Option C</label>

                      <input
                        type="text"
                        name="option_c"
                        value={editData.option_c}
                        onChange={handleEditChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Option D</label>

                      <input
                        type="text"
                        name="option_d"
                        value={editData.option_d}
                        onChange={handleEditChange}
                        required
                      />
                    </div>

                  </div>

                  <div className="edit-meta-grid">

                    <div className="form-field">
                      <label>Correct Option</label>

                      <select
                        name="correct_option"
                        value={editData.correct_option}
                        onChange={handleEditChange}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Category</label>

                      <input
                        type="text"
                        name="category"
                        value={editData.category}
                        onChange={handleEditChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Difficulty</label>

                      <select
                        name="difficulty"
                        value={editData.difficulty}
                        onChange={handleEditChange}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                  </div>

                  <div className="question-actions">

                    <button
                      type="submit"
                      className="primary-action-button"
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      className="secondary-action-button"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              ) : (

                /* VIEW MODE */

                <>
                  <div className="admin-question-header">

                    <span className="question-number">
                      Question {index + 1}
                    </span>

                    <div className="question-badges">

                      <span className="category-badge">
                        {question.category}
                      </span>

                      <span
                        className={`difficulty-badge difficulty-${question.difficulty?.toLowerCase()}`}
                      >
                        {question.difficulty}
                      </span>

                    </div>

                  </div>

                  <h3 className="admin-question-title">
                    {question.question}
                  </h3>

                  <div className="admin-options-grid">

                    <div className="admin-option">
                      <span>A</span>
                      <p>{question.option_a}</p>
                    </div>

                    <div className="admin-option">
                      <span>B</span>
                      <p>{question.option_b}</p>
                    </div>

                    <div className="admin-option">
                      <span>C</span>
                      <p>{question.option_c}</p>
                    </div>

                    <div className="admin-option">
                      <span>D</span>
                      <p>{question.option_d}</p>
                    </div>

                  </div>

                  <div className="question-footer">

                    <div className="correct-answer">
                      <span>Correct Answer</span>
                      <strong>
                        {question.correct_option}
                      </strong>
                    </div>

                    <div className="question-actions">

                      <button
                        type="button"
                        className="secondary-action-button"
                        onClick={() => handleEdit(question)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-question-button"
                        onClick={() => handleDelete(question.id)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </>
              )}

            </div>
          ))
        )}

      </div>

    </section>
  );
}

export default AdminQuestions;