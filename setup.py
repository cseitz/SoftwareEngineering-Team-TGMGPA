import dataset

if __name__ == "__main__":
    taskbook_db = dataset.connect('sqlite:///taskbook.db')  
    task_table = taskbook_db.get_table('task')
    task_table.drop()
    task_table = taskbook_db.create_table('task')
    task_table.insert_many([
        {"time":0.0, "description":"Do something useful", "list":"today", "completed":True},
        {"time":0.5, "description":"Do something fantastic", "list":"today", "completed":False},
        {"time":0.3, "description":"Do something remarkable", "list":"tomorrow", "completed":False},
        {"time":0.7, "description":"Do something unusual", "list":"tomorrow", "completed":True}
    ]) 