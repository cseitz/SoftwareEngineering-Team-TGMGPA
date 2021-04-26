

from driver import driver, Keys

driver.get("http://localhost:8080")
#driver.get("http://google.com")


#grab taskbook text
elem = driver.find_element_by_xpath("/html/body/div[1]/span[1]/b")

#converts elem into a string
elemtxt = elem.text

#print taskbook text in cmd line
print("Taskbook found: " + elemtxt)

#print all tasks in today column
Today0 = driver.find_element_by_xpath('//*[@id="task-2"]/div[1]/div/span')
txt0 = Today0.text
print("first task found: " + txt0)
Today1 = driver.find_element_by_xpath('//*[@id="task-1"]/div[1]/div/span')
txt1 = Today1.text
print("second task found: " + txt1)

#placeholder so window doesnt close
test = input("press enter when done")