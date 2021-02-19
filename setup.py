import dataset

install_requires=[
    'libsass'
]

if __name__ == "__main__":
    taskbook_db = dataset.connect('sqlite:///taskbook.db')
    task_table = taskbook_db.get_table('task')
    task_table.drop()
    task_table = taskbook_db.create_table('task')
    task_table.insert_many([
        {"time": 0.0, "name": "Do something useful", "day":"today", "email": "shared@example.com", "completed": True, "color": "#ffffff"},
        {"time": 0.5, "name": "Do something fantastic", "day": "today", "email": "shared@example.com", "completed": False, "color": "#ffffff"},
        {"time": 0.3, "name": "Do something remarkable", "day": "tomorrow", "email": "shared@example.com", "completed": False, "color": "#ffffff"},
        {"time": 0.7, "name": "Do something unusual", "day": "tomorrow", "email": "shared@example.com", "completed": True, "color": "#ffffff"}
    ])
