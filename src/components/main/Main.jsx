import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './Main.module.scss';

import plus from '/plus.svg';
import clipBoard from '/Clipboard.svg';
import check from '/check.svg';
import trash from '/trash.svg';
import checkOn from '/checkOn.svg';

import apiRequest from '../../customHook/apiRecuest';

const Main = () => {
  const [Loading, setLoading] = useState(true);
  const [Tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const url = 'http://localhost:3502/tasks';
    setLoading(true);
    const data = await apiRequest(url);
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:3502/tasks';
    const taskToAdd = { id: uuidv4(), title: newTask, complate: false };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taskToAdd),
    };

    const data = await apiRequest(url, options);
    if (data.error) {
      setError(data.error);
    } else {
      setTasks((prevTasks) => [...prevTasks, taskToAdd]);
      setNewTask('');
    }
  };

  const handleRemoveTask = async (id) => {
    const url = `http://localhost:3502/tasks/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = await apiRequest(url, options);
    if (data.error) {
      setError(data.error);
    } else {
      setTasks((pervTasks) => pervTasks.filter((task) => task.id != id));
    }
  };

  const handleComplatedTask = async (id) => {
    const taskupdate = Tasks.find((task) => task.id === id);
    const url = `http://localhost:3502/tasks/${id}`;
    const updateTask = { ...taskupdate, complate: !taskupdate.complate };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateTask),
    };

    const data = await apiRequest(url, options);
    if (data.error) {
      setError(data.error);
    } else {
      fetchTasks();
    }
  };

  const totalTasks = Tasks.length;
  console.log(totalTasks);
  const completedTasks = Tasks.filter((task) => task.complate).length;
  console.log(completedTasks);

  return (
    <main>
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          <div className={styles.form_container}>
            <form onSubmit={handleAddTask}>
              <label>
                <input
                  type='text'
                  value={newTask}
                  onChange={(e) => {
                    setNewTask(e.target.value);
                  }}
                  placeholder='Add a new task'
                  required
                />
              </label>
              <button type='submit'>
                <div>
                  <span>Add</span>
                  <img src={plus} alt='plus' />
                </div>
              </button>
            </form>
          </div>
          <div className={styles.Tasks_container}>
            <div className={styles.tasks_header}>
              <div className={styles.Total_tasks_Box}>
                <p>
                  Tasks created <div>{totalTasks}</div>
                </p>
              </div>
              <div className={styles.complate_tasks_Box}>
                <p>
                  Completed{' '}
                  <div>
                    {completedTasks} of {totalTasks}
                  </div>
                </p>
              </div>
            </div>
            <div className={styles.tasks_Container}>
              {Tasks.length === 0 ? (
                <div className={styles.tasks_Not_Found}>
                  <div>
                    <img src={clipBoard} alt='No tasks' />
                  </div>
                  <p className={styles.not_Found_p}>
                    You don't have any tasks registered yet. Create tasks and
                    organize your to-do items.
                  </p>
                </div>
              ) : (
                <ul>
                  {Tasks.map((task) => (
                    <li key={task.id}>
                      <div className={styles.taskBox}>
                        <button onClick={() => handleComplatedTask(task.id)}>
                          <div>
                            <img
                              src={task.complate ? checkOn : check}
                              alt='off'
                            />
                          </div>
                        </button>
                        <div>
                          <p
                            className={`${styles.task} ${
                              task.complate ? styles['underline'] : ''
                            }`}
                          >
                            {task.title}
                          </p>
                        </div>
                        <button>
                          <div onClick={() => handleRemoveTask(task.id)}>
                            <img src={trash} alt='remove' />
                          </div>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
