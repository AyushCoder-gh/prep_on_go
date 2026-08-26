import { useEffect, useState } from "react";
import { getAdminQuestions, deleteQuestion, createQuestion, updateQuestion } from "../api/userApi";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  
  const [formData, setFormData] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "A",
    category: "",
    difficulty: "Easy",
  });

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "A",
    category: "",
    difficulty: "Easy",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
        ...currentData,
        [name]: value,
    }));
  };

  const { user } = useContext(AuthContext);

  const handleDelete = async (questionId) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this question ?"
    );

    if(!confirmed){
        return ;
    }

    try{
        await deleteQuestion(questionId);

        setMessage("Question deleted successfully.");

        setQuestions((currentQuestions) =>
            currentQuestions.filter((question) => question.id !== questionId)
        );
    } catch(error){
        console.error(error);

        if(error.response){
            setMessage(error.response.data.message);
        }else{
            setMessage("Failed to delete question.");
        }
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try{
        const data = await createQuestion(formData);

        setQuestions((currentQuestions) => [
            ...currentQuestions,
            data.question,
        ]);

        setMessage("Question created successfully.");

        setFormData({
            question: "",
            option_a: "",
            option_b: "",
            option_c: "",
            option_d: "",
            correct_option: "A",
            category: "",
            difficulty: "Easy",
        });
    }catch(error){
        console.error(error);

        if(error.response){
            setMessage(error.response.data.message);
        }else{
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
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditData((currentData) => ({
        ...currentData,
        [name]: value,
    }));
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    try{
        const data = await updateQuestion(editingId, editData);

        setQuestions((currentQuestions) =>
            currentQuestions.map((question) =>
                question.id === editingId ? data.question : question
            )
        );

        setMessage("Question updated successfully.");

        setEditingId(null);

        setEditData({
            question: "",
            option_a: "",
            option_b: "",
            option_c: "",
            option_d: "",
            correct_option: "A",
            category: "",
            difficulty: "Easy",
        });
    }catch(error){
        console.error(error);

        if(error.response){
            setMessage(error.response.data.message);
        }else{
            setMessage("Failed to update question.");
        }
    }
  };

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

  return (
    <div>
      <h2>Manage Questions</h2>

      <h3>Create Question</h3>

      <form onSubmit={handleCreate}>
        <div>
            <label>Question</label>
            <br />
            <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
            />
        </div>

        <div>
            <label>Option A</label>
            <br />
            <input
                type="text"
                name="option_a"
                value={formData.option_a}
                onChange={handleChange}
                required
            />
        </div>

        <div>
            <label>Option B</label>
            <br />
            <input 
                type="text"
                name="option_b"
                value={formData.option_b}
                onChange={handleChange}
                required
            />
        </div>

        <div>
            <label>Option C</label>
            <br />
            <input
                type="text"
                name="option_c"
                value={formData.option_c}
                onChange={handleChange}
                required
            />
        </div>

        <div>
            <label>Option D</label>
            <br />
            <input
                type="text"
                name="option_d"
                value={formData.option_d}
                onChange={handleChange}
                required
            />
        </div>

        <div>
            <label>Correct Option</label>
            <br />
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

        <div>
            <label>Category</label>
            <br />
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            />
        </div>

        <div>
            <label>Difficulty</label>
            <br />
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

        <br />

        <button type="submit">
            Create Question
        </button>
      </form>

      {message && <p>{message}</p>}

      {questions.map((question) => (
        <div key={question.id}>
          <p>
            <strong>Question:</strong> {question.question}
          </p>

          <p>
            <strong>A:</strong> {question.option_a}
          </p>

          <p>
            <strong>B:</strong> {question.option_b}
          </p>

          <p>
            <strong>C:</strong> {question.option_c}
          </p>

          <p>
            <strong>D:</strong> {question.option_d}
          </p>

          <p>
            <strong>Category:</strong> {question.category}
          </p>

          <p>
            <strong>Difficulty:</strong> {question.difficulty}
          </p>

          <button type="button"onClick={() => handleEdit(question)}>
            Edit
          </button>
        
        {editingId === question.id && (
  <form onSubmit={handleSaveEdit}>
    <div>
      <label>Question</label>
      <br />
      <textarea
        name="question"
        value={editData.question}
        onChange={handleEditChange}
        required
      />
    </div>

    <div>
      <label>Option A</label>
      <br />
      <input
        type="text"
        name="option_a"
        value={editData.option_a}
        onChange={handleEditChange}
        required
      />
    </div>

    <div>
      <label>Option B</label>
      <br />
      <input
        type="text"
        name="option_b"
        value={editData.option_b}
        onChange={handleEditChange}
        required
      />
    </div>

    <div>
      <label>Option C</label>
      <br />
      <input
        type="text"
        name="option_c"
        value={editData.option_c}
        onChange={handleEditChange}
        required
      />
    </div>

    <div>
      <label>Option D</label>
      <br />
      <input
        type="text"
        name="option_d"
        value={editData.option_d}
        onChange={handleEditChange}
        required
      />
    </div>

    <div>
      <label>Correct Option</label>
      <br />

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

    <div>
      <label>Category</label>
      <br />

      <input
        type="text"
        name="category"
        value={editData.category}
        onChange={handleEditChange}
        required
      />
    </div>

    <div>
      <label>Difficulty</label>
      <br />

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

    <br />

    <button type="submit">
      Save Changes
    </button>

    <button
      type="button"
      onClick={() => setEditingId(null)}
    >
      Cancel
    </button>
  </form>
)}

          <button type="button"onClick={() => handleDelete(question.id)}>
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminQuestions;