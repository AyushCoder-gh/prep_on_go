const pool = require("../config/db");

const getAllQuestions = async (req, res, next) => {
    try {
        const { category, difficulty, limit = 10 } = req.query;

        const parsedLimit = Number(limit);

        if (
            !Number.isInteger(parsedLimit) ||
            parsedLimit < 1 ||
            parsedLimit > 50
        ) {
            return res.status(400).json({
                message: "Limit must be a number between 1 and 50.",
            });
        }

        const values = [];
        const conditions = [];

        if (category && category !== "All") {
            values.push(category);
            conditions.push(`category = $${values.length}`);
        }

        if (difficulty && difficulty !== "All") {
            values.push(difficulty);
            conditions.push(`difficulty = $${values.length}`);
        }

        values.push(parsedLimit);

        const limitPosition = values.length;

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(" AND ")}`
                : "";

        const result = await pool.query(
            `
                SELECT
                    id,
                    question,
                    option_a,
                    option_b,
                    option_c,
                    option_d,
                    category,
                    difficulty,
                    created_at
                FROM questions
                ${whereClause}
                ORDER BY RANDOM()
                LIMIT $${limitPosition}
            `,
            values
        );

        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
};

const getAllQuestionsForAdmin = async (req, res, next) => {
    try{
        const result = await pool.query(`
            SELECT 
                id, 
                question,
                option_a,
                option_b, 
                option_c,
                option_d,
                correct_option,
                category,
                difficulty,
                created_at
            FROM questions
            ORDER BY id ASC
        `);
        res.status(200).json(result.rows);
    }catch(error){
        next(error);
    }
};

const createQuestion = async (req, res, next) => {
    try {
        const {
            question, 
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            category,
            difficulty,
        } = req.body;

        const result = await pool.query(
            `
                INSERT INTO questions(
                    question,
                    option_a,
                    option_b,
                    option_c,
                    option_d,
                    correct_option,
                    category,
                    difficulty
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING
                    id,
                    question,
                    option_a,
                    option_b,
                    option_c,
                    option_d,
                    correct_option,
                    category,
                    difficulty,
                    created_at;
            `,
            [
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option,
                category,
                difficulty,
            ]
        );

        res.status(201).json({
            message: "Question created successfully",
            question: result.rows[0],
        });
    } catch(error){
        next(error);
    }
};

const deleteQuestion = async (req, res, next) => {
    try{
        const questionId = Number(req.params.id);

        const result = await pool.query(
            `
                DELETE FROM questions
                WHERE id = $1
                RETURNING id, question, category, difficulty;
            `,
            [questionId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Question not found",
            });
        }

        res.status(200).json({
            message: "Question deleted successfully",
            question: result.rows[0],
        });
    }catch(error){
        next(error);
    }
};

const updateQuestion = async (req, res, next) => {
    try{
        const questionId = Number(req.params.id);

        const {
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            category,
            difficulty,
        } = req.body;

        const result = await pool.query(
            `
                UPDATE questions
                SET
                    question = $1,
                    option_a = $2,
                    option_b = $3,
                    option_c = $4, 
                    option_d = $5,
                    correct_option = $6,
                    category = $7,
                    difficulty = $8
                WHERE id = $9
                RETURNING 
                    id,
                    question,
                    option_a,
                    option_b,
                    option_c,
                    option_d,
                    correct_option,
                    category,
                    difficulty,
                    created_at;
            `,
            [
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option,
                category,
                difficulty,
                questionId,
            ]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Question not found",
            });
        }

        res.status(200).json({
            message: "Question updated successfully",
            question: result.rows[0],
        });
    }catch(error){
        next(error);
    }
};

module.exports = {
    getAllQuestions,
    getAllQuestionsForAdmin,
    createQuestion,
    deleteQuestion,
    updateQuestion,
};