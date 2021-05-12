const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
});

const todos = [
    {
        id: 1,
        text: 'test',
        done: false
    },
    {
        id: 2,
        text: 'test',
        done: true
    },
    {
        id: 3,
        text: 'test',
        done: false
    }
]

/**
 * GET: '/todos
 * Returns all the currently assigned todos
 * query: ?done=true|false
 */
app.get('/todos', (req, res) => {
    let results = todos;
    if ('done' in req.query) {
        results = todos.filter(r => r.done === Boolean(req.query.done));
    }
    res.json({
        todos: results
    });
});

/**
 * POST: /todos
 * Adds a new todo, needs a JSON body with { text }
 */
app.post('/todos', (req, res) => {
    const { text } = req.body;
    todos.push({
        id: todos.length,
        done: false,
        text
    })
    res.json({
        success: true
    });
});

app.listen(3001);
console.log('Server is listening...');