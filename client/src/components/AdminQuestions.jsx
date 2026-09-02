import { useEffect, useState, useContext } from "react";
import {
  getAdminQuestions,
  deleteQuestion,
  createQuestion,
  updateQuestion,
} from "../api/userApi";
import AuthContext from "../context/AuthContext";
import QuestionForm from "./admin/QuestionForm";
import AdminQuestionCard from "./admin/AdminQuestionCard";

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

function AdminQuestions({ onQuestionChanged }) {
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
          setMessage(
            error.response.data.message || "Failed to fetch questions."
          );
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

  const resetEditState = () => {
    setEditingId(null);
    setEditData(initialFormData);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const data = await createQuestion(formData);

      setQuestions((currentQuestions) => [
        ...currentQuestions,
        data.question,
      ]);

      onQuestionChanged();

      setMessage("Question created successfully.");

      setFormData(initialFormData);
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(
          error.response.data.message || "Failed to create question."
        );
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

      resetEditState();
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(
          error.response.data.message || "Failed to update question."
        );
      } else {
        setMessage("Failed to update question.");
      }
    }
  };

  const handleCancelEdit = () => {
    resetEditState();
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

      setQuestions((currentQuestions) =>
        currentQuestions.filter(
          (question) => question.id !== questionId
        )
      );

      onQuestionChanged();

      setMessage("Question deleted successfully.");
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(
          error.response.data.message || "Failed to delete question."
        );
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

            <p>
              Add a new question to the quiz.
            </p>
          </div>
        </div>

        <QuestionForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleCreate}
        />

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
            <AdminQuestionCard
              key={question.id}
              question={question}
              index={index}
              editingId={editingId}
              editData={editData}
              onEditChange={handleEditChange}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}

      </div>

    </section>
  );
}

export default AdminQuestions;