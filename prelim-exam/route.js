const router = require('express').Router();

const tasks =
[
    { id: 1, title: "Studying", status: "pending" },
    { id: 2, title: "Sleeping", status: "pending" }
];

router.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    res.json(task);
});

router.get('/tasks', (req, res) => {
    res.json(tasks);
});

router.post('/tasks', (req, res) => {
    const task = req.body;

    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: task.title,
        status: task.status
    }

    tasks.push(newTask);

    res.json(tasks);
});

router.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  const { title, status } = req.body || {};

  const task = tasks[taskIndex];

  if (title !== undefined) 
  {
    task.title = title;
  }

  if (status !== undefined) 
  {
    task.status = status;
  }

  res.json(task);
});

router.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    tasks.splice(index, 1);

    res.json(tasks);
});

module.exports = router;