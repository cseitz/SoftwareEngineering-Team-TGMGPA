#joel Lee
#3/21/2021
#creates a due date for a task

from driver import driver, Keys
import time

#connects to website
driver.get("http://localhost:8080")


#finds the create task button
findtask_button = driver.find_element_by_xpath('//*[@id="tasklist"]/div[1]/h2/span[1]/button').click()

time.sleep(2)

#finds the task input field
entertask = driver.find_element_by_xpath('/html/body/span[2]/div/div/span/input[1]')

time.sleep(1)

#asks the user for task name
task = input("Enter task name")
entertask.clear()
entertask.send_keys(task)

time.sleep(1)

dueDate = driver.find_element_by_xpath('/html/body/span[2]/div/div/span/input[3]')
MonthDayYear = input("input the Date using format Year-Month-Day Ex: 2021-03-22  :")
dueDate.clear()
dueDate.send_keys(MonthDayYear)

time.sleep(1)

dateTime = input("Do you want to set a specific time yes/no?")

#if statment to determine if you want to set a time for due date if not then it will set it automatically at midnight
if dateTime == 'yes':  
    
    dueDate.send_keys(Keys.TAB)
    timeInput = input("Enter due date time following this format  --:-- Ex: T05:30   :")
    dueDate.send_keys(timeInput)
else:
    print('skipping time')




time.sleep(1)
#clicks the create task button
click_create = driver.find_element_by_xpath('/html/body/span[2]/div/div/span/button').click()

test = input("press enter when done")