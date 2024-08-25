import React from 'react';

import styles from './Main.module.scss';

import plus from '/plus.svg';
import clipBoard from '/Clipboard.svg';

const Main = () => {
  return (
    <main>
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          <div className={styles.form_container}>
            <form>
              <label>
                <input type='text' placeholder='Add a new task' />
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
                  Tasks created <div>0</div>
                </p>
              </div>
              <div className={styles.complate_tasks_Box}>
                <p>
                  Completed <div>0</div>
                </p>
              </div>
            </div>
            <div className={styles.tasks_Container}>
              <div className={styles.tasks_Not_Found}>
                <div>
                  <img src={clipBoard} alt='clip Board' />
                </div>
                <p>
                  You don't have any tasks registered yet Create tasks and
                  organize your to-do items
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
