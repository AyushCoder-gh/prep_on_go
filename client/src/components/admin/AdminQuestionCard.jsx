import QuestionForm from "./QuestionForm";

function AdminQuestionCard({
  question,
  index,
  editingId,
  editData,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onEdit,
  onDelete,
}) {
  const isEditing = editingId === question.id;

  return (
    <div className="admin-question-card">

      {isEditing ? (
        /* EDIT MODE */
        <QuestionForm
          formData={editData}
          onChange={onEditChange}
          onSubmit={onSaveEdit}
          onCancel={onCancelEdit}
          isEditing
        />
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
                onClick={() => onEdit(question)}
              >
                Edit
              </button>

              <button
                type="button"
                className="delete-question-button"
                onClick={() => onDelete(question.id)}
              >
                Delete
              </button>

            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default AdminQuestionCard;