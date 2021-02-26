

from driver import driver, Keys

driver.get("http://localhost:8080")
#driver.get("http://google.com")


#grab taskbook text
elem = driver.find_element_by_xpath("/html/body/div[1]/span[1]/b")
#print taskbook text in cmd line
print("Taskbook found")
#print all tasks in today column
#Today0 = driver.find_element_by_xpath('//*[@id="task-2"]/div[1]/div/span')
print("first task found")
#Today1 = driver.find_element_by_xpath('//*[@id="task-1"]/div[1]/div/span')
print("second task found")

test = input("press enter when done")