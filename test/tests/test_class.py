#Joel Lee and Jeremy Reese
#3/12/2021
#creates task for today column

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

#clicks the create task button
click_create = driver.find_element_by_xpath('/html/body/span[2]/div/div/span/button').click()

test = input("press enter when done")

