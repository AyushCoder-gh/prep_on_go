function QuestionForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing = false,
}) {
  return (
    <form
      className={isEditing ? "question-edit-form" : "question-form"}
      onSubmit={onSubmit}
    >
      <div className="form-field full-width">
        <label>Question</label>

        <textarea
          name="question"
          value={formData.question}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Enter option D"
          required
        />
      </div>

      <div className="form-field">
        <label>Correct Option</label>

        <select
          name="correct_option"
          value={formData.correct_option}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="e.g. Data Structures"
          required
        />
      </div>

      <div className="form-field">
        <label>Difficulty</label>

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={onChange}
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
          {isEditing ? "Save Changes" : "Create Question"}
        </button>

        {isEditing && (
          <button
            type="button"
            className="secondary-action-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default QuestionForm;