from driver import driver, Keys
import time

#connects to website
driver.get("http://localhost:8080")

deletion = input("What task would you like to delete? The format is 1 below 2 upper for today same for tomorrow \n Type Done when finished" )

#switch defintion for task deletion
def deletion_switch(deletion):
    something = ""
    if deletion == "1":
        Deletetask = driver.find_element_by_xpath('//*[@id="task-1"]/div[1]/span/i[2]').click()
        print("Task 1 was deleted")
    elif deletion == "2":
        DeleteTask = driver.find_element_by_xpath('//*[@id="task-2"]/div[1]/span/i[2]').click()
        print("Task 2 was deleted")
    elif deletion == "3":
        Deletetask = driver.find_element_by_xpath('//*[@id="task-3"]/div[1]/span/i[2]').click()
        print("Task 3 was deleted")
    elif deletion == "4":
        Deletetask = driver.find_element_by_xpath('//*[@id="task-4"]/div[1]/span/i[2]').click()
        print("Task 4 was deleted")
    elif deletion == "5":
        Deletetask = driver.find_element_by_xpath('//*[@id="task-5"]/div[1]/span/i[2]').click()
        print("Task 5 was deleted")
    elif deletion == "6":
        Deletetask = driver.find_element_by_xpath('//*[@id="task-6"]/div[1]/span/i[2]').click()
        print("Task 6 was deleted")
    else:
        print("use a number for the task")
   
#do while until done is typed
while deletion != "done":
    deletion_switch(deletion)
